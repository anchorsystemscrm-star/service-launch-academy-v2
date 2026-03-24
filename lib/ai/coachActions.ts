import {
  CoachAction,
  CoachBuildStage,
  CoachContext,
  CoachImagePayload,
  CoachImageRefinement,
  CoachMode,
  CoachNextStep,
  CoachResponse
} from "@/lib/ai/coachTypes";

const buildStages: CoachBuildStage[] = ["pricing", "upsells", "script", "followup", "system"];

function makeId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function createAction(
  label: string,
  prompt: string,
  mode?: CoachMode,
  style: CoachAction["style"] = "secondary",
  imageRefinement?: CoachImageRefinement
): CoachAction {
  return {
    id: makeId(label),
    label,
    prompt,
    mode,
    style,
    kind: imageRefinement ? "refine_image" : "follow_up",
    imageRefinement
  };
}

function getNextBuildStage(stage: CoachBuildStage): CoachBuildStage {
  const index = buildStages.indexOf(stage);
  if (index < 0 || index === buildStages.length - 1) {
    return "system";
  }
  return buildStages[index + 1];
}

export function getBuildStageFromSummary(summary?: string): CoachBuildStage | null {
  const match = summary?.match(/Build stage:\s*(pricing|upsells|script|followup|system)/i);
  const stage = match?.[1]?.toLowerCase();
  if (stage === "pricing" || stage === "upsells" || stage === "script" || stage === "followup" || stage === "system") {
    return stage;
  }
  return null;
}

export function resolveBuildStage(
  mode: CoachMode,
  userMessage: string,
  previousStage?: CoachBuildStage | null
): CoachBuildStage {
  const normalized = userMessage.toLowerCase();

  if (mode === "followup") return "followup";
  if (mode === "script") return "script";
  if (mode === "sop" || normalized.includes("system") || normalized.includes("automation") || normalized.includes("workflow")) {
    return "system";
  }
  if (normalized.includes("upsell") || normalized.includes("add-on") || normalized.includes("increase ticket")) {
    return "upsells";
  }
  if (mode === "pricing") {
    return previousStage === "pricing" ? "upsells" : "pricing";
  }
  if (previousStage) {
    return previousStage;
  }
  return "pricing";
}

export function buildCoachTitle(mode: CoachMode, context?: CoachContext) {
  const businessName = context?.businessType;

  switch (mode) {
    case "pricing":
      return businessName ? `${businessName} Pricing Plan` : "Pricing Plan";
    case "checklist":
      return businessName ? `${businessName} Launch Checklist` : "Launch Checklist";
    case "script":
      return businessName ? `${businessName} Sales Script` : "Sales Script";
    case "followup":
      return businessName ? `${businessName} Follow-Up Sequence` : "Follow-Up Sequence";
    case "marketing":
      return businessName ? `${businessName} Marketing Plan` : "Marketing Plan";
    case "sop":
      return businessName ? `${businessName} Operating SOP` : "Operating SOP";
    case "image":
      return businessName ? `${businessName} Creative Direction` : "Creative Direction";
    default:
      return businessName ? `${businessName} Tactical Plan` : "Tactical Plan";
  }
}

export function buildCoachActions(
  mode: CoachMode,
  context: CoachContext | undefined,
  response: CoachResponse,
  buildStage?: CoachBuildStage
): CoachAction[] {
  const businessName = context?.businessType || "my service business";
  const entryOffer = context?.entryOffer || "my core offer";

  switch (mode) {
    case "pricing":
      if (buildStage === "upsells") {
        return [
          createAction("Write phone pitch", `Write a phone pitch that sells ${entryOffer} plus upsells without sounding pushy.`, "script", "primary"),
          createAction("Turn into quote template", `Turn this pricing and upsell stack into a client-facing quote template for ${businessName}.`, "script"),
          createAction("Build objection handling", `Write objection handling for this upsell-enhanced pricing when the lead hesitates.`, "script"),
          createAction("Create follow-up", `Write a follow-up sequence that reopens quotes using this package structure for ${businessName}.`, "followup")
        ];
      }

      return [
        createAction("Generate upsells", `Build 5 upsells for ${entryOffer} and show how to pitch each one.`, "pricing", "primary"),
        createAction("Turn into quote template", `Turn this pricing into a client-facing quote template for ${businessName}.`, "script"),
        createAction("Write phone pitch", `Write a phone pitch that sells this pricing without sounding cheap.`, "script"),
        createAction("Build objection handling", `Write objection handling for this pricing when the lead says it is too expensive.`, "script")
      ];
    case "script":
      return [
        createAction("Shorten script", "Shorten this script into a tighter version that keeps the close strong.", "script", "primary"),
        createAction("Make SMS version", "Turn this into a concise SMS version that still gets the response.", "script"),
        createAction("Make it more premium", "Rewrite this script to sound more premium and confident.", "script"),
        createAction("Add objection responses", "Add objection responses for price, timing, and trust pushback.", "script")
      ];
    case "checklist":
      return [
        createAction("Prioritize fastest wins", "Re-prioritize this checklist for the fastest route to first revenue.", "checklist", "primary"),
        createAction("Turn into SOP", "Turn this checklist into a simple SOP someone could follow.", "sop"),
        createAction("Build intake form", `Build a client intake form for ${businessName} based on this checklist.`, "sop"),
        createAction("Generate follow-up sequence", `Create a follow-up sequence that supports this ${businessName} launch checklist.`, "followup")
      ];
    case "marketing":
      return [
        createAction("Turn into 10 ad ideas", `Turn this marketing plan into 10 direct-response ad ideas for ${businessName}.`, "marketing", "primary"),
        createAction("Write outreach messages", `Write referral partner outreach messages for ${businessName}.`, "script"),
        createAction("Build social posts", `Write 7 social posts based on this ${businessName} marketing plan.`, "marketing"),
        createAction("Make flyer concept", `Create a premium flyer concept for ${businessName} based on this marketing plan.`, "image")
      ];
    case "sop":
      return [
        createAction("Turn into checklist", "Turn this SOP into a cleaner execution checklist.", "checklist", "primary"),
        createAction("Build intake form", `Build a client intake form from this ${businessName} SOP.`, "sop"),
        createAction("Write handoff workflow", `Write an internal handoff workflow for this ${businessName} SOP.`, "sop")
      ];
    case "followup":
      return [
        createAction("Write missed-call flow", `Write a missed-call text-back and callback process for ${businessName}.`, "script", "primary"),
        createAction("Build objection handling", "Add objection handling that helps this follow-up sequence get replies.", "script"),
        createAction("Create review request flow", `Create a review request sequence for ${businessName}.`, "followup")
      ];
    case "image": {
      const image = response.image as CoachImagePayload | undefined;
      const sourcePrompt = image?.prompt || `Premium creative direction for ${businessName}`;
      const assetType = image?.assetType || "general";
      const baseRefinement = (instruction: string, targetMode: CoachMode = "image", nextAssetType = assetType) =>
        createAction(
          instruction,
          `${instruction} using the current image direction for ${businessName}.`,
          targetMode,
          instruction === "Make it more premium" ? "primary" : "secondary",
          {
            sourcePrompt,
            assetType: nextAssetType,
            instruction,
            transparentBackground: image?.transparentBackground
          }
        );

      return [
        baseRefinement("Make it more premium"),
        baseRefinement("Make it cleaner"),
        baseRefinement("Remove background"),
        baseRefinement("Make it bolder"),
        baseRefinement("Create alternate version"),
        baseRefinement("Turn into flyer", "image", "flyer"),
        baseRefinement("Turn into truck wrap", "image", "truck_wrap"),
        baseRefinement("Turn into social ad", "image", "social_ad")
      ];
    }
    default:
      return [
        createAction("Build pricing", `Build a 3-tier pricing plan for ${entryOffer}.`, "pricing", "primary"),
        createAction("Generate checklist", `Build a launch checklist for ${businessName}.`, "checklist"),
        createAction("Write script", `Write a sales script for ${entryOffer}.`, "script")
      ];
  }
}

export function buildNextBestStep(
  mode: CoachMode,
  context: CoachContext | undefined,
  response: CoachResponse,
  buildStage?: CoachBuildStage
): {
  nextStep: CoachNextStep;
  secondaryNextSteps: CoachAction[];
} {
  const actions = buildCoachActions(mode, context, response, buildStage);
  const [primary, ...secondary] = actions;
  const nextBuildStage = buildStage ? getNextBuildStage(buildStage) : undefined;

  return {
    nextStep: {
      title: primary?.label || "Keep the workflow moving",
      prompt: primary?.prompt || "Build the next tactical asset from this response.",
      mode: primary?.mode || mode,
      why:
        buildStage === "pricing"
          ? "This is the fastest move from package design into better ticket size or better close rate."
          : buildStage === "upsells"
            ? "This turns pricing into a sellable package instead of leaving the value stack unfinished."
            : buildStage === "script"
              ? "This moves the offer out of planning and into real sales conversations."
              : buildStage === "followup"
                ? "This closes the loop so leads do not stall after the first touch."
                : nextBuildStage === "system"
                  ? "This is where the business starts turning into a repeatable system instead of founder memory."
          : mode === "image"
            ? "This keeps the creative direction moving toward an asset you can actually use in the market."
            : "This is the highest-leverage follow-up move from the current output."
    },
    secondaryNextSteps: secondary.slice(0, 4)
  };
}

export function buildAnchorBridge(mode: CoachMode, userMessage: string, response: CoachResponse) {
  const combinedText = `${userMessage} ${response.text || ""}`.toLowerCase();
  const complexitySignals = [
    "too many leads",
    "high lead volume",
    "can't keep up",
    "hard to manage",
    "missed call",
    "response time",
    "follow up",
    "follow-up",
    "scheduling",
    "calendar",
    "pipeline",
    "booking",
    "review request",
    "reminder",
    "automation",
    "dispatch"
  ];
  const strongAutomationNeed =
    complexitySignals.some((signal) => combinedText.includes(signal)) ||
    (mode === "sop" &&
      ["pipeline", "booking", "scheduling", "dispatch", "review", "follow up", "follow-up"].some((signal) =>
        combinedText.includes(signal)
      ));

  if (!strongAutomationNeed) {
    return undefined;
  }

  if (
    ["anchor systems", "anchor"].some((signal) => combinedText.includes(signal)) ||
    ["crm", "automation", "pipeline", "response time", "lead volume"].some((signal) =>
      combinedText.includes(signal)
    )
  ) {
    return "Once this starts happening consistently, this part usually becomes harder to manage manually. That is usually the point where a dedicated operating system or a later Anchor Systems setup starts to make sense.";
  }

  return "Once this starts happening consistently, this part usually becomes harder to manage manually. At that point, it is worth turning it into a real system instead of relying on memory and manual follow-up.";
}
