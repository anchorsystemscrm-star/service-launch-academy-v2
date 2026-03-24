import { businesses } from "@/data/businesses";
import {
  Benchmark,
  BlueprintMilestone,
  BlueprintMilestoneKey,
  Business,
  ChatMessage,
  ExecutionChecklistItem,
  ExecutionStage,
  KPIData,
  Phase,
  Script,
  WeekGroup
} from "@/types/business";

export type ExecutionStageStatus = "not_started" | "in_progress" | "completed";

export interface NextActionSuggestion {
  stageIndex: number;
  taskIndex: number;
  stageTitle: string;
  weekLabel: string;
  title: string;
  description: string;
  effortLabel: string;
  completed: boolean;
}

export type BlueprintGuidedAction = "generate_ai" | "mark_complete" | "next_step";
export type BlueprintAnchorStage = 0 | 1 | 2 | 3 | 4;

export const weekGroups: WeekGroup[] = [
  { title: "Weeks 1-2: Foundation", weeks: [1, 2] },
  { title: "Weeks 3-4: Launch Motion", weeks: [3, 4] },
  { title: "Weeks 5-8: Operating Rhythm", weeks: [5, 6, 7, 8] },
  { title: "Weeks 9-13: Systemize & Scale", weeks: [9, 10, 11, 12, 13] }
];

export const executionStageWeekMap: number[][] = [
  [1],
  [2],
  [3],
  [4],
  [5, 6, 7, 8],
  [9, 10, 11, 12, 13]
];

export const milestoneTemplate = [
  "Lock the starter offer and minimum price",
  "Register the business and secure insurance proof",
  "Stand up phone, CRM, scheduling, and invoicing",
  "Launch the first outreach channels and Google profile",
  "Send same-day quotes and close first jobs",
  "Capture before/after proof and ask for reviews",
  "Install recurring or repeat-service pathway",
  "Tighten lead follow-up and quote reminders",
  "Document your job checklist",
  "Review pricing and raise weak minimums",
  "Systemize communication and reminders",
  "Protect route density or project profitability",
  "Set the next 30-day operating target"
];

export const blueprintMilestones: Record<BlueprintMilestoneKey, BlueprintMilestone> = {
  first_task_completed: {
    key: "first_task_completed",
    title: "First step complete",
    description: "You are in motion now. Keep the first win small and stack the next one fast."
  },
  first_week_completed: {
    key: "first_week_completed",
    title: "Week complete",
    description: "The first milestone is locked in. Keep the same pace into the next stage."
  },
  first_five_tasks_completed: {
    key: "first_five_tasks_completed",
    title: "Five tasks down",
    description: "Momentum is real now. The execution rhythm is starting to form."
  },
  first_phase_completed: {
    key: "first_phase_completed",
    title: "Phase complete",
    description: "The foundation is built. You are ready to operate with more confidence."
  },
  full_blueprint_completed: {
    key: "full_blueprint_completed",
    title: "Blueprint complete",
    description: "You completed the tracked blueprint. Now the work becomes consistency and scale."
  }
};

export const defaultKpiData: KPIData = {
  leads: 0,
  quotes: 0,
  jobs: 0,
  revenue: 0,
  reviews: 0
};

export const defaultChatIntro = (business: Business): ChatMessage => ({
  role: "assistant",
  text:
    `You're coaching for ${business.name}. Ask about setup, pricing, marketing, operations, or follow-up.\n` +
    "Use the prompt starters to get tactical help for the selected business."
});

export function getBusinessById(id?: string | null): Business | undefined {
  return businesses.find((business) => business.id === id);
}

export function getFallbackBusiness(id?: string | null): Business {
  return getBusinessById(id) ?? businesses[0];
}

export function filterBusinesses(list: Business[], query: string, filters: string[]): Business[] {
  const normalizedQuery = query.trim().toLowerCase();

  return list.filter((business) => {
    const matchesQuery =
      !normalizedQuery ||
      business.name.toLowerCase().includes(normalizedQuery) ||
      business.summary.toLowerCase().includes(normalizedQuery);
    const matchesFilters = filters.every((filter) => business.tags.includes(filter as Business["tags"][number]));
    return matchesQuery && matchesFilters;
  });
}

export function getCompletedWeeks(progress: boolean[]): number {
  return progress.filter(Boolean).length;
}

export function getChecklistCompletion(taskProgress: boolean[][]) {
  const total = taskProgress.reduce((sum, stage) => sum + stage.length, 0);
  const completed = taskProgress.reduce((sum, stage) => sum + stage.filter(Boolean).length, 0);
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, percentage };
}

export function getTaskEffortLabel(item: ExecutionChecklistItem): string {
  const complexityScore =
    item.instructions.length +
    (item.documentation ? 1 : 0) +
    (item.avoid ? 1 : 0);

  if (complexityScore <= 2) {
    return "5 min";
  }

  if (complexityScore <= 4) {
    return "10 min";
  }

  return "15 min";
}

export function formatWeekLabel(stageIndex: number): string {
  const weeks = executionStageWeekMap[stageIndex] ?? [];

  if (weeks.length <= 1) {
    return `Week ${weeks[0] ?? 1}`;
  }

  return `Weeks ${weeks[0]}-${weeks[weeks.length - 1]}`;
}

export function getNextActionSuggestion(
  executionPlan: ExecutionStage[],
  taskProgress: boolean[][]
): NextActionSuggestion | null {
  if (!executionPlan.length) {
    return null;
  }

  for (let stageIndex = 0; stageIndex < executionPlan.length; stageIndex += 1) {
    const stage = executionPlan[stageIndex];
    const stageTasks = taskProgress[stageIndex] ?? [];

    for (let taskIndex = 0; taskIndex < stage.checklist.length; taskIndex += 1) {
      if (!stageTasks[taskIndex]) {
        const item = stage.checklist[taskIndex];
        return {
          stageIndex,
          taskIndex,
          stageTitle: stage.title,
          weekLabel: formatWeekLabel(stageIndex),
          title: item.title,
          description: item.instruction || item.instructions[0] || item.doneDefinition,
          effortLabel: getTaskEffortLabel(item),
          completed: false
        };
      }
    }
  }

  const lastStageIndex = Math.max(executionPlan.length - 1, 0);
  const lastStage = executionPlan[lastStageIndex];
  const lastTaskIndex = Math.max(lastStage.checklist.length - 1, 0);
  const lastTask = lastStage.checklist[lastTaskIndex];

  return {
    stageIndex: lastStageIndex,
    taskIndex: lastTaskIndex,
    stageTitle: lastStage.title,
    weekLabel: formatWeekLabel(lastStageIndex),
    title: "Blueprint complete",
    description: "All tracked blueprint tasks are complete. Review the system or move into execution support.",
    effortLabel: "Locked in",
    completed: true
  };
}

export function getBlueprintTaskCoachHref(prompt: string): string {
  const params = new URLSearchParams({
    autoprompt: prompt,
    mode: "checklist",
    source: "blueprint"
  });

  return `/ai-coach?${params.toString()}`;
}

export function getBlueprintGuidedAction(hasOutput: boolean, completed: boolean): BlueprintGuidedAction {
  if (completed) {
    return "next_step";
  }

  if (!hasOutput) {
    return "generate_ai";
  }

  return "mark_complete";
}

function getCurrentIncompleteStageIndex(taskProgress: boolean[][]) {
  const firstIncompleteIndex = taskProgress.findIndex((stageTasks) => stageTasks.some((taskDone) => !taskDone));
  return firstIncompleteIndex >= 0 ? firstIncompleteIndex : Math.max(taskProgress.length - 1, 0);
}

export function getBlueprintBuildStage(taskProgress: boolean[][]): BlueprintAnchorStage {
  const currentStageIndex = getCurrentIncompleteStageIndex(taskProgress);

  if (currentStageIndex <= 0) {
    return 0;
  }

  if (currentStageIndex <= 1) {
    return 1;
  }

  if (currentStageIndex <= 3) {
    return 2;
  }

  if (currentStageIndex <= 4) {
    return 3;
  }

  return 4;
}

export function getBlueprintAnchorStage(
  taskProgress: boolean[][],
  taskOutputMap: Record<string, boolean>
): BlueprintAnchorStage {
  const buildStage = getBlueprintBuildStage(taskProgress);
  const completedTasks = getChecklistCompletion(taskProgress).completed;
  const userActivity = Object.values(taskOutputMap).filter(Boolean).length;
  let anchorStage = buildStage;

  if (completedTasks >= 14 || userActivity >= 5) {
    anchorStage = (Math.max(anchorStage, 3) as BlueprintAnchorStage);
  }

  if (completedTasks >= 18 || userActivity >= 7) {
    anchorStage = (Math.max(anchorStage, 4) as BlueprintAnchorStage);
  }

  return Math.min(anchorStage, 4) as BlueprintAnchorStage;
}

export function getBlueprintOperationalNote(anchorStage: BlueprintAnchorStage): string | null {
  switch (anchorStage) {
    case 2:
      return "Once you are juggling multiple leads, quotes, or follow-ups, missed details usually come from inconsistent tracking.";
    case 3:
      return "This becomes harder to manage manually once volume increases.";
    default:
      return null;
  }
}

export function getMilestoneState(progress: boolean[], taskProgress: boolean[][]) {
  const checklist = getChecklistCompletion(taskProgress);
  const completedWeeks = getCompletedWeeks(progress);

  return {
    first_task_completed: checklist.completed >= 1,
    first_week_completed: completedWeeks >= 1,
    first_five_tasks_completed: checklist.completed >= 5,
    first_phase_completed: Boolean(progress[0] && progress[1]),
    full_blueprint_completed: checklist.total > 0 && checklist.completed === checklist.total
  } satisfies Record<BlueprintMilestoneKey, boolean>;
}

export function getExecutionStageStatus(
  progress: boolean[],
  taskProgress: boolean[][],
  stageIndex: number
): ExecutionStageStatus {
  const weekIndexes = executionStageWeekMap[stageIndex] ?? [];
  const completedWeeks = weekIndexes.filter((week) => progress[week - 1]).length;
  const totalWeeks = weekIndexes.length;
  const stageTasks = taskProgress[stageIndex] ?? [];
  const completedTasks = stageTasks.filter(Boolean).length;
  const totalTasks = stageTasks.length;

  if (completedTasks > 0 && completedTasks === totalTasks && completedWeeks === totalWeeks) {
    return "completed";
  }

  if (completedTasks > 0 || completedWeeks > 0) {
    return "in_progress";
  }

  return "not_started";
}

export function getPhaseIndexByProgress(progress: boolean[]): number {
  const done = getCompletedWeeks(progress);
  if (done <= 2) return 0;
  if (done <= 4) return 1;
  if (done <= 8) return 2;
  return 3;
}

export function formatCurrencyRange(range: [number, number]): string {
  return `$${range[0].toLocaleString()}-$${range[1].toLocaleString()}`;
}

export function formatNumberRange(range: [number, number]): string {
  return `${range[0]}-${range[1]}`;
}

export function buildBlueprint(business: Business): Phase[] {
  return business.blueprintPhases;
}

export function buildScripts(business: Business): Script[] {
  return business.scripts;
}

export function getTrackStatus(business: Business, progress: boolean[], kpis: KPIData) {
  const phaseIndex = getPhaseIndexByProgress(progress);
  const phase = business.blueprintPhases[phaseIndex];
  const benchmark: Benchmark = business.phaseBenchmarks[phaseIndex];
  const checks = [
    Number(kpis.leads) >= benchmark.leads[0],
    Number(kpis.quotes) >= benchmark.quotes[0],
    Number(kpis.jobs) >= benchmark.jobs[0],
    Number(kpis.revenue) >= benchmark.revenue[0]
  ];
  const score = checks.filter(Boolean).length;
  const onTrack = score >= 3;

  return {
    onTrack,
    phaseTitle: phase.title,
    score,
    summary: onTrack
      ? `You are meeting ${score}/4 core benchmark minimums this week.`
      : `Only ${score}/4 core benchmark minimums are currently met. Focus on response time, quote quality, and lead volume.`
  };
}

export function getCoachResponse(message: string, business: Business, progress: boolean[]): string {
  const input = message.toLowerCase();
  const phase = business.executionPlan[Math.min(getPhaseIndexByProgress(progress), business.executionPlan.length - 1)];

  if (input.includes("price") || input.includes("pricing") || input.includes("offer")) {
    return (
      `Pricing direction for ${business.name}:\n` +
      `Starter: ${business.offerPricing.starterOffer}\n` +
      `Standard: ${business.offerPricing.standardOffer}\n` +
      `Premium: ${business.offerPricing.premiumOffer}\n\n` +
      `Minimum pricing guidance: ${business.offerPricing.minimumPriceGuidance}\n` +
      `Upsells: ${business.offerPricing.sampleUpsells.join(", ")}\n` +
      `Pricing note: ${business.offerPricing.pricingNotes[0]}`
    );
  }

  if (input.includes("lead") || input.includes("marketing") || input.includes("google")) {
    return (
      `Lead generation plan for ${business.name}:\n` +
      `Best first lead sources: ${business.acquisitionPlan.bestFirstLeadSources.join(", ")}\n` +
      `Local outreach: ${business.acquisitionPlan.localOutreachIdeas[0]}\n` +
      `Neighborhood marketing: ${business.acquisitionPlan.neighborhoodMarketingIdeas[0]}\n` +
      `Google Business Profile guidance: ${business.acquisitionPlan.googleBusinessProfileGuidance[0]}`
    );
  }

  if (input.includes("license") || input.includes("permit") || input.includes("insurance")) {
    return (
      `Setup guidance for ${business.name}:\n` +
      `${business.licensingGuidance.disclaimer}\n` +
      `Check first: ${business.licensingGuidance.whereToCheck.join(", ")}\n` +
      `Ask locally: ${business.licensingGuidance.agencyPrompts[0]}\n\n` +
      `Insurance note: ${business.insuranceGuidance.generalLiability}\n` +
      `Ask your agent: ${business.insuranceGuidance.questionsToAsk[0]}`
    );
  }

  if (input.includes("tool") || input.includes("equipment") || input.includes("app") || input.includes("software")) {
    return (
      `Operating stack for ${business.name}:\n` +
      `Required tools: ${business.startupRequirements.requiredItems.join(", ")}\n` +
      `Vehicle needs: ${business.startupRequirements.vehicleNeeds[0]}\n` +
      `Software stack: ${business.softwareStack
        .filter((item) => item.requirement !== "optional")
        .slice(0, 4)
        .map((item) => `${item.category}: ${item.tool}`)
        .join(" | ")}`
    );
  }

  if (input.includes("operation") || input.includes("workflow") || input.includes("process") || input.includes("checklist")) {
    return (
      `Operations setup for ${business.name}:\n` +
      `Lead response: ${business.operationsSetup.leadResponseProcess[0]}\n` +
      `Quoting: ${business.operationsSetup.quotingProcess[0]}\n` +
      `Scheduling: ${business.operationsSetup.schedulingProcess[0]}\n` +
      `Completion: ${business.operationsSetup.completionChecklist[0]}`
    );
  }

  if (input.includes("script") || input.includes("follow-up") || input.includes("follow up") || input.includes("sales")) {
    return (
      `Sales help for ${business.name}:\n` +
      `${business.scripts[0].body}\n\n` +
      `Follow-up note: ${business.operationsSetup.followUpProcess[0]}`
    );
  }

  return (
    `Current execution focus for ${business.name}:\n` +
    `${phase.title}: ${phase.summary}\n` +
    `1. ${phase.actions[0]}\n` +
    `2. ${phase.actions[1]}\n` +
    `3. ${phase.actions[2]}\n\n` +
    `Prompt starter: ${business.promptSuggestions.operations[0]}`
  );
}
