import OpenAI from "openai";

import {
  COACH_IMAGE_MODEL,
  COACH_IMAGE_VARIATION_COUNT,
  getCoachTextModel
} from "@/lib/ai/coachConfig";
import { buildCoachContextBlock } from "@/lib/ai/coachContext";
import {
  CoachContext,
  CoachImagePayload,
  CoachImageRefinement,
  CoachMode
} from "@/lib/ai/coachTypes";

type CoachImageAssetType =
  | "logo"
  | "flyer"
  | "truck_wrap"
  | "social_ad"
  | "yard_sign"
  | "general";

interface CoachImagePromptPackage {
  title: string;
  assetType: CoachImageAssetType;
  prompt: string;
  supportingText: string;
  suggestions: string[];
  transparentBackground: boolean;
}

interface ImagePromptTemplate {
  assetType: CoachImageAssetType;
  title: string;
  size: "1024x1024" | "1024x1536" | "1536x1024";
  background: "transparent" | "opaque";
  transparentBackground: boolean;
  layoutGuidance: string[];
  qualityConstraints: string[];
  refinementOptions: string[];
}

const GLOBAL_IMAGE_QUALITY_BLOCK = [
  "Premium, minimal, brand-level visual language",
  "High legibility and clean hierarchy",
  "No clutter, no cheap stock-art feel, no noisy effects",
  "Confident composition with professional spacing",
  "Visually usable for a real service business brand"
];

const LOGO_QUALITY_BLOCK = [
  "Simple scalable wordmark or icon system",
  "Strong clarity at small sizes",
  "Balanced geometry and restrained detail",
  "No mascot illustration, no busy badge, no excessive gradients"
];

function detectAssetType(message: string, refinement?: CoachImageRefinement): CoachImageAssetType {
  if (refinement?.assetType) {
    return refinement.assetType;
  }

  const normalized = message.toLowerCase();

  if (normalized.includes("logo")) return "logo";
  if (normalized.includes("truck wrap")) return "truck_wrap";
  if (normalized.includes("yard sign")) return "yard_sign";
  if (normalized.includes("flyer")) return "flyer";
  if (normalized.includes("social")) return "social_ad";
  return "general";
}

function getImageTemplate(assetType: CoachImageAssetType): ImagePromptTemplate {
  switch (assetType) {
    case "logo":
      return {
        assetType,
        title: "Premium brand mark",
        size: "1024x1024",
        background: "transparent",
        transparentBackground: true,
        layoutGuidance: [
          "Centered balanced composition",
          "Strong wordmark or monogram with optional minimal symbol",
          "Vector-style simplicity with scalable silhouette",
          "High legibility at small sizes",
          "Clean brand-mark discipline over decorative service icon clutter"
        ],
        qualityConstraints: [
          "No generic clipart",
          "No over-complex icons",
          "No excessive gradients",
          "No cluttered badge styling",
          "No mascot-style illustration"
        ],
        refinementOptions: [
          "Make it more premium",
          "Make it cleaner",
          "Remove background",
          "Make it bolder",
          "Make it more modern",
          "Create alternate version"
        ]
      };
    case "flyer":
      return {
        assetType,
        title: "Local service flyer concept",
        size: "1024x1536",
        background: "opaque",
        transparentBackground: false,
        layoutGuidance: [
          "Strong offer-first hierarchy",
          "Readable headline, service list, proof, and CTA",
          "Premium but direct-response local-service feel",
          "Composition that leaves space for phone and offer stack"
        ],
        qualityConstraints: [
          "Avoid noisy backgrounds",
          "Avoid tiny unreadable copy blocks",
          "Avoid amateur coupon-sheet layout"
        ],
        refinementOptions: [
          "Make it more premium",
          "Make the CTA stronger",
          "Make it cleaner",
          "Create a darker version",
          "Create a lighter version",
          "Turn into social ad"
        ]
      };
    case "truck_wrap":
      return {
        assetType,
        title: "Truck wrap concept",
        size: "1536x1024",
        background: "opaque",
        transparentBackground: false,
        layoutGuidance: [
          "Side-view service truck mockup",
          "Extreme legibility at distance",
          "Clear hierarchy between logo, phone, service line, and trust cue",
          "Premium clean vinyl-wrap composition with bold contrast"
        ],
        qualityConstraints: [
          "No cluttered full-bleed collage",
          "No thin unreadable text",
          "No low-contrast layout"
        ],
        refinementOptions: [
          "Make it more premium",
          "Make phone number bigger",
          "Make it bolder",
          "Create alternate wrap",
          "Turn into yard sign",
          "Turn into flyer"
        ]
      };
    case "yard_sign":
      return {
        assetType,
        title: "Yard sign concept",
        size: "1024x1536",
        background: "opaque",
        transparentBackground: false,
        layoutGuidance: [
          "Bold high-contrast yard sign mockup",
          "Minimal copy with one service promise and one CTA",
          "Readable from the street",
          "Premium local-service branding"
        ],
        qualityConstraints: [
          "No long copy",
          "No weak contrast",
          "No cluttered icon overload"
        ],
        refinementOptions: [
          "Make it cleaner",
          "Make it bolder",
          "Make phone number bigger",
          "Create alternate version",
          "Turn into flyer",
          "Turn into social ad"
        ]
      };
    case "social_ad":
      return {
        assetType,
        title: "Social ad concept",
        size: "1024x1536",
        background: "opaque",
        transparentBackground: false,
        layoutGuidance: [
          "Thumb-stopping local service ad creative",
          "One dominant offer hook and one CTA",
          "Clean premium brand feel for Facebook or Instagram",
          "Readable mobile-first composition"
        ],
        qualityConstraints: [
          "No cluttered multi-offer layout",
          "No weak CTA hierarchy",
          "No generic stock-poster feel"
        ],
        refinementOptions: [
          "Make it more premium",
          "Make it cleaner",
          "Make the offer stronger",
          "Create alternate version",
          "Turn into flyer",
          "Turn into truck wrap"
        ]
      };
    default:
      return {
        assetType,
        title: "Service brand concept",
        size: "1024x1024",
        background: "opaque",
        transparentBackground: false,
        layoutGuidance: [
          "Premium local-service-business aesthetic",
          "Clear hierarchy and strong readability",
          "Composition matched to a commercial use case"
        ],
        qualityConstraints: [
          "No cluttered composition",
          "No generic low-value clipart styling"
        ],
        refinementOptions: [
          "Make it more premium",
          "Make it cleaner",
          "Create alternate version",
          "Turn into flyer",
          "Turn into social ad"
        ]
      };
  }
}

function buildImageStrategyPrompt(params: {
  assetType: CoachImageAssetType;
  context?: CoachContext;
  message: string;
  summary?: string;
  refinement?: CoachImageRefinement;
}) {
  const template = getImageTemplate(params.assetType);
  const contextBlock = buildCoachContextBlock(params.context, params.summary);
  const positioning =
    params.context?.preferredPositioning || "premium, trusted, local, operator-grade";

  return [
    "You are the creative strategist for a premium local service business brand system.",
    "Build a commercially usable image-generation direction, not generic art language.",
    "Use the asset template requirements exactly.",
    contextBlock,
    `Requested asset type: ${params.assetType}`,
    `Business positioning: ${positioning}`,
    `Primary request: ${params.message}`,
    params.refinement?.sourcePrompt
      ? `Previous image prompt to carry forward:\n${params.refinement.sourcePrompt}`
      : null,
    params.refinement?.instruction
      ? `Refinement instruction: ${params.refinement.instruction}`
      : null,
    `Layout guidance:\n- ${template.layoutGuidance.join("\n- ")}`,
    `Global quality block:\n- ${GLOBAL_IMAGE_QUALITY_BLOCK.join("\n- ")}`,
    params.assetType === "logo" ? `Logo quality block:\n- ${LOGO_QUALITY_BLOCK.join("\n- ")}` : null,
    `Quality constraints:\n- ${template.qualityConstraints.join("\n- ")}`,
    "Return JSON with title, assetType, prompt, supportingText, suggestions, and transparentBackground."
  ]
    .filter(Boolean)
    .join("\n\n");
}

function buildImagePromptSchema(assetType: CoachImageAssetType) {
  const template = getImageTemplate(assetType);

  return {
    type: "json_schema" as const,
    name: "coach_image_prompt_package",
    strict: true,
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["title", "assetType", "prompt", "supportingText", "suggestions", "transparentBackground"],
      properties: {
        title: { type: "string" },
        assetType: {
          type: "string",
          enum: ["logo", "flyer", "truck_wrap", "social_ad", "yard_sign", "general"]
        },
        prompt: { type: "string" },
        supportingText: { type: "string" },
        suggestions: {
          type: "array",
          items: { type: "string" },
          minItems: 3,
          maxItems: 6
        },
        transparentBackground: { type: "boolean" }
      }
    },
    description: `Image prompt package for ${template.title.toLowerCase()}.`
  };
}

function getRefinementOptions(assetType: CoachImageAssetType) {
  return getImageTemplate(assetType).refinementOptions;
}

export async function generateCoachImage(
  openai: OpenAI,
  message: string,
  context: CoachContext | undefined,
  accessTier: CoachContext["accessTier"],
  summary?: string,
  refinement?: CoachImageRefinement
): Promise<{
  title: string;
  text: string;
  image: CoachImagePayload;
  suggestions: string[];
}> {
  const assetType = detectAssetType(message, refinement);
  const template = getImageTemplate(assetType);

  const promptBuilder = await openai.responses.create({
    model: getCoachTextModel("image" as CoachMode, accessTier ?? "elite"),
    instructions:
      "You are Service Launch Academy AI Coach acting as a premium creative strategist for local service businesses.",
    input: buildImageStrategyPrompt({
      assetType,
      context,
      message,
      summary,
      refinement
    }),
    text: {
      verbosity: "medium",
      format: buildImagePromptSchema(assetType)
    }
  });

  let parsed: CoachImagePromptPackage;

  try {
    parsed = JSON.parse(promptBuilder.output_text) as CoachImagePromptPackage;
  } catch {
    parsed = {
      title: template.title,
      assetType,
      prompt: message,
      supportingText: "Creative direction is ready. Refine it or rerun the request if you want a different angle.",
      suggestions: getRefinementOptions(assetType).slice(0, 4),
      transparentBackground: template.transparentBackground
    };
  }

  const finalPrompt = [
    parsed.prompt,
    `Quality direction: ${GLOBAL_IMAGE_QUALITY_BLOCK.join("; ")}.`,
    assetType === "logo" ? `Logo direction: ${LOGO_QUALITY_BLOCK.join("; ")}.` : null
  ]
    .filter(Boolean)
    .join(" ");

  try {
    const imageResponse = await openai.images.generate({
      model: COACH_IMAGE_MODEL,
      prompt: finalPrompt,
      size: template.size,
      background: parsed.transparentBackground ? "transparent" : template.background,
      output_format: "png",
      quality: "high",
      n: COACH_IMAGE_VARIATION_COUNT
    });
    const generatedImages = (imageResponse.data ?? []).slice(0, 1);

    return {
      title: parsed.title,
      text: parsed.supportingText,
      image: {
        prompt: finalPrompt,
        b64_json: generatedImages.map((item) => item.b64_json).filter(Boolean) as string[],
        urls: generatedImages.map((item) => item.url).filter(Boolean) as string[],
        assetType: parsed.assetType,
        transparentBackground: parsed.transparentBackground,
        refinements: getRefinementOptions(parsed.assetType)
      },
      suggestions: parsed.suggestions
    };
  } catch (error) {
    const messageText =
      error instanceof Error
        ? error.message
        : "Image generation is unavailable right now, but the design direction is ready.";

    return {
      title: parsed.title,
      text: `${parsed.supportingText}\n\nImage generation note: ${messageText}`,
      image: {
        prompt: finalPrompt,
        assetType: parsed.assetType,
        transparentBackground: parsed.transparentBackground,
        refinements: getRefinementOptions(parsed.assetType)
      },
      suggestions: parsed.suggestions
    };
  }
}
