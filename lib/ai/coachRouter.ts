import { CoachMode } from "@/lib/ai/coachTypes";

const imagePatterns = [
  "logo",
  "flyer",
  "truck wrap",
  "yard sign",
  "social ad",
  "ad graphic",
  "make image",
  "generate image",
  "create image",
  "mockup"
];

const pricingPatterns = ["price", "pricing", "package", "tier", "quote", "estimate"];
const scriptPatterns = ["script", "what do i say", "objection", "text back", "phone script", "call script"];
const checklistPatterns = ["checklist", "launch steps", "startup steps", "to-do", "todo", "what should i do first"];
const followupPatterns = ["follow up", "follow-up", "no reply", "nurture", "re-open", "reopen", "ghosted"];
const sopPatterns = ["sop", "workflow", "process", "intake process", "standard operating procedure"];
const marketingPatterns = ["marketing", "lead", "lead gen", "customer acquisition", "google profile", "ads", "campaign"];

function matchesPattern(message: string, patterns: string[]) {
  return patterns.some((pattern) => message.includes(pattern));
}

export function detectCoachMode(message: string, requestedMode?: CoachMode): CoachMode {
  if (requestedMode) {
    return requestedMode;
  }

  const normalized = message.trim().toLowerCase();

  if (matchesPattern(normalized, imagePatterns)) {
    return "image";
  }

  if (matchesPattern(normalized, pricingPatterns)) {
    return "pricing";
  }

  if (matchesPattern(normalized, scriptPatterns)) {
    return "script";
  }

  if (matchesPattern(normalized, checklistPatterns)) {
    return "checklist";
  }

  if (matchesPattern(normalized, followupPatterns)) {
    return "followup";
  }

  if (matchesPattern(normalized, sopPatterns)) {
    return "sop";
  }

  if (matchesPattern(normalized, marketingPatterns)) {
    return "marketing";
  }

  return "general";
}

export function getCoachModeLabel(mode: CoachMode) {
  switch (mode) {
    case "pricing":
      return "Pricing Builder";
    case "checklist":
      return "Launch Checklist";
    case "script":
      return "Script Writer";
    case "marketing":
      return "Marketing Planner";
    case "sop":
      return "SOP Builder";
    case "followup":
      return "Follow-Up Generator";
    case "image":
      return "Image Generator";
    default:
      return "Tactical Coach";
  }
}
