import { COACH_SUMMARY_MAX_LINES } from "@/lib/ai/coachConfig";
import {
  CoachChecklistStructured,
  CoachContext,
  CoachFollowupStructured,
  CoachMarketingStructured,
  CoachMode,
  CoachPricingStructured,
  CoachResponse,
  CoachScriptStructured,
  CoachSopStructured
} from "@/lib/ai/coachTypes";

function compact(text: string, maxLength = 140) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

function appendLine(lines: string[], next: string | null | undefined) {
  if (!next) {
    return;
  }

  const line = compact(next);

  if (!lines.includes(line)) {
    lines.push(line);
  }
}

function summarizeStructured(mode: CoachMode, response: CoachResponse) {
  if (!response.structured) {
    return response.title || response.text || "";
  }

  switch (mode) {
    case "pricing": {
      const pricing = response.structured as CoachPricingStructured;
      return `Pricing set: ${pricing.starter.name} ${pricing.starter.price}, ${pricing.standard.name} ${pricing.standard.price}, ${pricing.premium.name} ${pricing.premium.price}.`;
    }
    case "checklist": {
      const checklist = response.structured as CoachChecklistStructured;
      return `Checklist built: ${checklist.title} with ${checklist.items.length} tasks.`;
    }
    case "script": {
      const script = response.structured as CoachScriptStructured;
      return `Script generated: ${script.scriptType}.`;
    }
    case "followup": {
      const followup = response.structured as CoachFollowupStructured;
      return `Follow-up sequence created: ${followup.goal} across ${followup.sequence.length} touches.`;
    }
    case "marketing": {
      const marketing = response.structured as CoachMarketingStructured;
      return `Marketing plan created: ${marketing.title} with ${marketing.ideas.length} ideas.`;
    }
    case "sop": {
      const sop = response.structured as CoachSopStructured;
      return `SOP drafted: ${sop.title} with ${sop.steps.length} steps.`;
    }
    default:
      return response.text || response.title || "";
  }
}

export function updateCoachSummary(
  previousSummary: string | undefined,
  context: CoachContext | undefined,
  mode: CoachMode,
  userMessage: string,
  response: CoachResponse
) {
  const previousLines = previousSummary
    ? previousSummary
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  const nextLines: string[] = [];

  appendLine(nextLines, context?.businessType ? `Business focus: ${context.businessType}` : null);
  appendLine(nextLines, context?.phase ? `Current phase: ${context.phase}` : null);
  appendLine(nextLines, context?.entryOffer ? `Entry offer: ${context.entryOffer}` : null);
  appendLine(nextLines, context?.budgetRange ? `Budget range: ${context.budgetRange}` : null);
  appendLine(nextLines, context?.selectedCategory ? `Current category: ${context.selectedCategory}` : null);
  appendLine(nextLines, response.buildStage ? `Build stage: ${response.buildStage}` : null);
  appendLine(nextLines, `Current user priority: ${userMessage}`);
  appendLine(nextLines, summarizeStructured(mode, response));
  appendLine(nextLines, response.nextStep ? `Best next step: ${response.nextStep.title}` : null);

  for (const line of previousLines) {
    appendLine(nextLines, line);
  }

  return nextLines.slice(0, COACH_SUMMARY_MAX_LINES).join("\n");
}
