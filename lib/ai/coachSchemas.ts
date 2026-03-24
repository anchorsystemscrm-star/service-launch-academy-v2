import { ResponseFormatTextJSONSchemaConfig } from "openai/resources/responses/responses";

import {
  CoachChecklistStructured,
  CoachFollowupStructured,
  CoachMarketingStructured,
  CoachMode,
  CoachPricingStructured,
  CoachScriptStructured,
  CoachSopStructured,
  CoachStructuredPayload
} from "@/lib/ai/coachTypes";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const coachStructuredFormats: Partial<Record<Exclude<CoachMode, "general" | "image">, ResponseFormatTextJSONSchemaConfig>> = {
  pricing: {
    type: "json_schema",
    name: "coach_pricing_plan",
    strict: true,
    description: "A three-tier pricing plan for a service business.",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["starter", "standard", "premium", "upsells", "pricingNotes"],
      properties: {
        starter: {
          $ref: "#/$defs/package"
        },
        standard: {
          $ref: "#/$defs/package"
        },
        premium: {
          $ref: "#/$defs/package"
        },
        upsells: {
          type: "array",
          items: { type: "string" }
        },
        pricingNotes: {
          type: "array",
          items: { type: "string" }
        }
      },
      $defs: {
        package: {
          type: "object",
          additionalProperties: false,
          required: ["name", "price", "includes", "bestFor"],
          properties: {
            name: { type: "string" },
            price: { type: "string" },
            includes: { type: "array", items: { type: "string" } },
            bestFor: { type: "string" }
          }
        }
      }
    }
  },
  checklist: {
    type: "json_schema",
    name: "coach_checklist",
    strict: true,
    description: "A tactical checklist for the user's current request.",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["title", "items"],
      properties: {
        title: { type: "string" },
        items: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["task", "priority", "notes"],
            properties: {
              task: { type: "string" },
              priority: { type: "string", enum: ["now", "soon", "later"] },
              notes: { type: "string" }
            }
          }
        }
      }
    }
  },
  script: {
    type: "json_schema",
    name: "coach_script",
    strict: true,
    description: "A service-business sales or communication script.",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["scriptType", "primaryScript", "variations", "objectionResponses"],
      properties: {
        scriptType: { type: "string" },
        primaryScript: { type: "string" },
        variations: {
          type: "array",
          items: { type: "string" }
        },
        objectionResponses: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["objection", "response"],
            properties: {
              objection: { type: "string" },
              response: { type: "string" }
            }
          }
        }
      }
    }
  },
  followup: {
    type: "json_schema",
    name: "coach_followup_sequence",
    strict: true,
    description: "A follow-up sequence with days, channels, and messages.",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["goal", "sequence"],
      properties: {
        goal: { type: "string" },
        sequence: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["day", "channel", "message"],
            properties: {
              day: { type: "string" },
              channel: { type: "string", enum: ["sms", "email", "call"] },
              message: { type: "string" }
            }
          }
        }
      }
    }
  },
  marketing: {
    type: "json_schema",
    name: "coach_marketing_plan",
    strict: true,
    description: "A marketing plan with ideas, why they work, and execution notes.",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["title", "ideas"],
      properties: {
        title: { type: "string" },
        ideas: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["idea", "whyItWorks", "execution"],
            properties: {
              idea: { type: "string" },
              whyItWorks: { type: "string" },
              execution: { type: "string" }
            }
          }
        }
      }
    }
  },
  sop: {
    type: "json_schema",
    name: "coach_sop",
    strict: true,
    description: "An SOP with ordered steps, owners, and notes.",
    schema: {
      type: "object",
      additionalProperties: false,
      required: ["title", "steps"],
      properties: {
        title: { type: "string" },
        steps: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["step", "owner", "notes"],
            properties: {
              step: { type: "string" },
              owner: { type: "string" },
              notes: { type: "string" }
            }
          }
        }
      }
    }
  }
};

export function safeParseStructuredMode(
  mode: CoachMode,
  text: string
): CoachStructuredPayload | null {
  const parsed = parseJson(text);

  switch (mode) {
    case "pricing":
      return isPricingStructured(parsed) ? parsed : null;
    case "checklist":
      return isChecklistStructured(parsed) ? parsed : null;
    case "script":
      return isScriptStructured(parsed) ? parsed : null;
    case "followup":
      return isFollowupStructured(parsed) ? parsed : null;
    case "marketing":
      return isMarketingStructured(parsed) ? parsed : null;
    case "sop":
      return isSopStructured(parsed) ? parsed : null;
    default:
      return null;
  }
}

function isPricingStructured(value: unknown): value is CoachPricingStructured {
  if (!isObject(value)) {
    return false;
  }

  return ["starter", "standard", "premium"].every((key) => {
    const item = value[key];
    return (
      isObject(item) &&
      typeof item.name === "string" &&
      typeof item.price === "string" &&
      isStringArray(item.includes) &&
      typeof item.bestFor === "string"
    );
  });
}

function isChecklistStructured(value: unknown): value is CoachChecklistStructured {
  return (
    isObject(value) &&
    typeof value.title === "string" &&
    Array.isArray(value.items) &&
    value.items.every(
      (item) =>
        isObject(item) &&
        typeof item.task === "string" &&
        (item.priority === "now" || item.priority === "soon" || item.priority === "later") &&
        (typeof item.notes === "string" || typeof item.notes === "undefined")
    )
  );
}

function isScriptStructured(value: unknown): value is CoachScriptStructured {
  return (
    isObject(value) &&
    typeof value.scriptType === "string" &&
    typeof value.primaryScript === "string" &&
    (typeof value.variations === "undefined" || isStringArray(value.variations)) &&
    (typeof value.objectionResponses === "undefined" ||
      (Array.isArray(value.objectionResponses) &&
        value.objectionResponses.every(
          (item) =>
            isObject(item) &&
            typeof item.objection === "string" &&
            typeof item.response === "string"
        )))
  );
}

function isFollowupStructured(value: unknown): value is CoachFollowupStructured {
  return (
    isObject(value) &&
    typeof value.goal === "string" &&
    Array.isArray(value.sequence) &&
    value.sequence.every(
      (item) =>
        isObject(item) &&
        typeof item.day === "string" &&
        (item.channel === "sms" || item.channel === "email" || item.channel === "call") &&
        typeof item.message === "string"
    )
  );
}

function isMarketingStructured(value: unknown): value is CoachMarketingStructured {
  return (
    isObject(value) &&
    typeof value.title === "string" &&
    Array.isArray(value.ideas) &&
    value.ideas.every(
      (item) =>
        isObject(item) &&
        typeof item.idea === "string" &&
        (typeof item.whyItWorks === "string" || typeof item.whyItWorks === "undefined") &&
        (typeof item.execution === "string" || typeof item.execution === "undefined")
    )
  );
}

function isSopStructured(value: unknown): value is CoachSopStructured {
  return (
    isObject(value) &&
    typeof value.title === "string" &&
    Array.isArray(value.steps) &&
    value.steps.every(
      (item) =>
        isObject(item) &&
        typeof item.step === "string" &&
        (typeof item.owner === "string" || typeof item.owner === "undefined") &&
        (typeof item.notes === "string" || typeof item.notes === "undefined")
    )
  );
}
