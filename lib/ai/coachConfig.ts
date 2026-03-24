import { CoachMode } from "@/lib/ai/coachTypes";
import { SubscriptionTier } from "@/types/business";

export const COACH_PRIMARY_MODEL =
  process.env.OPENAI_COACH_PRIMARY_MODEL || process.env.OPENAI_COACH_MODEL || "gpt-5.1";
export const COACH_FAST_MODEL =
  process.env.OPENAI_COACH_FAST_MODEL || process.env.OPENAI_COACH_MODEL || "gpt-5-mini";
export const COACH_IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1.5";
export const COACH_RECENT_MESSAGE_LIMIT = 6;
export const COACH_SUMMARY_MAX_LINES = 6;
export const COACH_IMAGE_VARIATION_COUNT = 1;

export function getCoachTextModel(mode: CoachMode, tier: SubscriptionTier) {
  if (mode === "image" || mode === "marketing" || mode === "sop") {
    return COACH_PRIMARY_MODEL;
  }

  if (tier === "elite" && mode === "general") {
    return COACH_PRIMARY_MODEL;
  }

  return COACH_FAST_MODEL;
}
