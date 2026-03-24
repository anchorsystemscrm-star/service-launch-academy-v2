import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

import {
  buildAnchorBridge,
  buildCoachActions,
  buildCoachTitle,
  buildNextBestStep,
  getBuildStageFromSummary,
  resolveBuildStage
} from "@/lib/ai/coachActions";
import { COACH_RECENT_MESSAGE_LIMIT, getCoachTextModel } from "@/lib/ai/coachConfig";
import { buildCoachContextBlock, buildConversationTranscript } from "@/lib/ai/coachContext";
import { generateCoachImage } from "@/lib/ai/coachImage";
import { updateCoachSummary } from "@/lib/ai/coachMemory";
import { buildCoachSystemPrompt } from "@/lib/ai/coachPrompt";
import { detectCoachMode, getCoachModeLabel } from "@/lib/ai/coachRouter";
import { coachStructuredFormats, safeParseStructuredMode } from "@/lib/ai/coachSchemas";
import {
  CoachContext,
  CoachConversationMessageInput,
  CoachMode,
  CoachRequest,
  CoachResponse
} from "@/lib/ai/coachTypes";
import { businesses } from "@/data/businesses";
import {
  canUseCoachMode,
  getRequiredTierForCoachMode,
  getUpgradeMessage,
  normalizeSubscriptionTier,
  tierLabels
} from "@/utils/access";

function createOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing.");
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function getBusinessContext(context?: CoachContext) {
  const matchedBusiness = context?.businessId
    ? businesses.find((business) => business.id === context.businessId)
    : undefined;

  return {
    ...context,
    businessType: context?.businessType ?? matchedBusiness?.name,
    entryOffer: context?.entryOffer ?? matchedBusiness?.recommended_first_offer,
    budgetRange: context?.budgetRange ?? matchedBusiness?.startup_cost_range,
    preferredPositioning: context?.preferredPositioning ?? "premium, responsive, trustworthy"
  };
}

async function generateStructuredModeResponse(
  openai: OpenAI,
  mode: Exclude<CoachMode, "general" | "image">,
  message: string,
  context: CoachContext | undefined,
  summary: string | undefined,
  recentMessages: CoachConversationMessageInput[] | undefined
): Promise<CoachResponse> {
  const format = coachStructuredFormats[mode];
  const contextBlock = buildCoachContextBlock(context, summary);

  const response = await openai.responses.create({
    model: getCoachTextModel(mode, context?.accessTier ?? "pro"),
    instructions: [buildCoachSystemPrompt(mode), contextBlock].filter(Boolean).join("\n\n"),
    input: buildConversationTranscript(
      recentMessages?.slice(-COACH_RECENT_MESSAGE_LIMIT) ?? [],
      message
    ),
    text: {
      verbosity: "medium",
      format
    }
  });

  const structured = safeParseStructuredMode(mode, response.output_text);

  if (structured) {
    return {
      mode,
      title: buildCoachTitle(mode, context),
      text: response.output_text,
      structured
    };
  }

  return {
    mode,
    title: buildCoachTitle(mode, context),
    text: response.output_text
  };
}

async function generateGeneralModeResponse(
  openai: OpenAI,
  mode: CoachMode,
  message: string,
  context: CoachContext | undefined,
  summary: string | undefined,
  recentMessages: CoachConversationMessageInput[] | undefined
): Promise<CoachResponse> {
  const contextBlock = buildCoachContextBlock(context, summary);

  const response = await openai.responses.create({
    model: getCoachTextModel(mode, context?.accessTier ?? "pro"),
    instructions: [buildCoachSystemPrompt(mode), contextBlock].filter(Boolean).join("\n\n"),
    input: buildConversationTranscript(
      recentMessages?.slice(-COACH_RECENT_MESSAGE_LIMIT) ?? [],
      message
    ),
    text: {
      verbosity: "medium"
    }
  });

  return {
    mode,
    title: buildCoachTitle(mode, context),
    text: response.output_text
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CoachRequest>;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Missing message." }, { status: 400 });
    }

    const context = getBusinessContext(body.context);
    const accessTier = normalizeSubscriptionTier(context.accessTier ?? "preview");
    const mode = detectCoachMode(message, body.requestedMode);
    const requiredTier = getRequiredTierForCoachMode(mode);

    if (!canUseCoachMode(accessTier, mode)) {
      return NextResponse.json(
        {
          error: `${tierLabels[requiredTier]} tier required for ${getCoachModeLabel(mode).toLowerCase()}.`,
          requiredTier,
          upgradeMessage: getUpgradeMessage(requiredTier)
        },
        { status: 403 }
      );
    }

    const openai = createOpenAIClient();
    const summary = body.conversation?.summary;
    const recentMessages = body.conversation?.recentMessages ?? [];
    const previousBuildStage = getBuildStageFromSummary(summary);
    const buildStage = resolveBuildStage(mode, message, previousBuildStage);

    let response: CoachResponse;

    if (mode === "image") {
      const imageResult = await generateCoachImage(
        openai,
        message,
        context,
        accessTier,
        summary,
        body.imageRefinement
      );
      response = {
        mode,
        title: imageResult.title,
        text: imageResult.text,
        image: imageResult.image
      };
    } else if (
      mode === "pricing" ||
      mode === "checklist" ||
      mode === "script" ||
      mode === "marketing" ||
      mode === "sop" ||
      mode === "followup"
    ) {
      response = await generateStructuredModeResponse(
        openai,
        mode,
        message,
        context,
        summary,
        recentMessages
      );
    } else {
      response = await generateGeneralModeResponse(
        openai,
        mode,
        message,
        context,
        summary,
        recentMessages
      );
    }

    const actions = buildCoachActions(mode, context, response, buildStage);
    const primaryAction = actions[0];
    const { nextStep, secondaryNextSteps } = buildNextBestStep(mode, context, response, buildStage);
    const anchorBridge = buildAnchorBridge(mode, message, response);
    const suggestions = response.mode === "image" ? response.image?.refinements ?? [] : actions.map((action) => action.label);
    const enhancedResponse: CoachResponse = {
      ...response,
      buildStage,
      suggestions,
      primaryAction,
      actions,
      nextStep,
      secondaryNextSteps,
      anchorBridge
    };

    const updatedSummary = updateCoachSummary(summary, context, mode, message, enhancedResponse);

    return NextResponse.json({
      ...enhancedResponse,
      updatedSummary,
    });
  } catch (error) {
    console.error("AI coach route error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown AI request error.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
