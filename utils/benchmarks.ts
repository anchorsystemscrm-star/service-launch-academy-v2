import { businesses } from "@/data/businesses";
import {
  Benchmark,
  BlueprintMilestone,
  BlueprintMilestoneKey,
  Business,
  BusinessPanelData,
  ChatMessage,
  ExecutionChecklistItem,
  ExecutionStage,
  KPIData,
  Phase,
  Script,
  SubscriptionTier,
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

export interface BusinessSetupStrength {
  percentage: number;
  completed: number;
  total: number;
  missing: string[];
  summary: string;
}

export interface WorkspaceActionCard {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export interface WorkspaceRecommendation {
  title: string;
  body: string;
  href?: string;
}

export interface BlueprintAnchorCta {
  body: string;
  ctaLabel: string;
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
  completed: 0,
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

export function getBlueprintAnchorCta(item: ExecutionChecklistItem): BlueprintAnchorCta | null {
  switch (item.title) {
    case "Install the response standard":
      return {
        body: "At this stage, most operators start missing calls or forgetting the next reply. Anchor Systems installs the lead intake, missed-call text-back, and response workflow so every opportunity stays visible.",
        ctaLabel: "See How Anchor Handles This"
      };
    case "Track quality, not just activity":
      return {
        body: "Once lead volume picks up, spreadsheets stop giving a clean picture of who was quoted, who went cold, and what needs the next touch. Anchor Systems turns this into a live pipeline instead of a memory problem.",
        ctaLabel: "Turn This Into a Real System"
      };
    case "Run same-day quotes":
      return {
        body: "When quotes need to move fast, operators usually lose time between intake, follow-up, and booking. Anchor Systems keeps the quote path, reminders, and next action moving in one system.",
        ctaLabel: "Run This Automatically in Anchor"
      };
    case "Install quote and review follow-up":
      return {
        body: "At this stage, open quotes and review asks usually start slipping. Anchor Systems runs the follow-up, booking reminders, and review requests automatically so the workflow does not depend on memory.",
        ctaLabel: "Launch This in Anchor Systems"
      };
    case "Automate the obvious reminders":
      return {
        body: "Once reminders, confirmations, and follow-up need to fire consistently, this is where manual admin starts breaking. Anchor Systems handles the scheduling, reminder, and follow-up layer automatically.",
        ctaLabel: "Run This Automatically in Anchor"
      };
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

function hasValue(value: string | number | null | undefined) {
  if (typeof value === "number") {
    return value > 0;
  }

  return Boolean(value && value.trim().length > 0);
}

export function getBenchmarkSummary(kpis: KPIData) {
  return `Leads: ${kpis.leads}, Quotes: ${kpis.quotes}, Booked: ${kpis.jobs}, Completed: ${kpis.completed}, Revenue: $${Number(kpis.revenue || 0).toLocaleString()}, Reviews: ${kpis.reviews}`;
}

export function getBusinessSetupStrength(panel: BusinessPanelData): BusinessSetupStrength {
  const checklist = [
    { key: "businessName", label: "Business name", complete: hasValue(panel.businessName) },
    { key: "serviceArea", label: "Location", complete: hasValue(panel.serviceArea) },
    { key: "starterOffer", label: "Core offer", complete: hasValue(panel.starterOffer) },
    { key: "priceFloor", label: "Starting price", complete: hasValue(panel.priceFloor) },
    { key: "targetCustomer", label: "Target customer", complete: hasValue(panel.targetCustomer) },
    { key: "leadSourcePlan", label: "Lead source plan", complete: hasValue(panel.leadSourcePlan) },
    { key: "bookingMethod", label: "Booking method", complete: hasValue(panel.bookingMethod) },
    { key: "paymentMethod", label: "Payment method", complete: hasValue(panel.paymentMethod) }
  ];

  const completed = checklist.filter((item) => item.complete).length;
  const total = checklist.length;
  const percentage = Math.round((completed / total) * 100);
  const missing = checklist.filter((item) => !item.complete).map((item) => item.label);

  return {
    percentage,
    completed,
    total,
    missing,
    summary:
      missing.length === 0
        ? "Your core business setup is documented and ready for refinement."
        : `${missing.length} foundational field${missing.length === 1 ? "" : "s"} still need attention.`
  };
}

export function getDashboardNextBestAction(
  panel: BusinessPanelData,
  kpis: KPIData,
  tier: SubscriptionTier
): WorkspaceActionCard {
  if (tier === "preview") {
    return {
      title: "Unlock your launch workspace",
      description: "Move from exploration into execution with the Business workspace, Blueprint, and Benchmarks.",
      href: "/pricing?plan=core",
      ctaLabel: "Compare Plans"
    };
  }

  if (!hasValue(panel.focusThisWeek)) {
    return {
      title: "Set your current focus",
      description: "Pick the one thing that matters most right now so the rest of the workspace stays aligned.",
      href: "/business#current-focus",
      ctaLabel: "Set focus"
    };
  }

  if (!hasValue(panel.starterOffer)) {
    return {
      title: "Define your core offer",
      description: "Your first offer should be easy to explain, easy to quote, and easy to sell.",
      href: "/business#offer-pricing",
      ctaLabel: "Edit offer"
    };
  }

  if (!hasValue(panel.priceFloor)) {
    return {
      title: "Set your starting price",
      description: "Lock the minimum price before more leads come in so you do not improvise under pressure.",
      href: "/business#offer-pricing",
      ctaLabel: "Set pricing"
    };
  }

  if (!hasValue(panel.targetCustomer)) {
    return {
      title: "Tighten your target customer",
      description: "Get specific about who this business is for before you write outreach or build ads.",
      href: "/business#market-notes",
      ctaLabel: "Define customer"
    };
  }

  if (!hasValue(panel.leadSourcePlan)) {
    return {
      title: "Add your lead source plan",
      description: "Choose the first channels that should actually produce leads instead of relying on vague marketing ideas.",
      href: "/business#lead-flow",
      ctaLabel: "Add lead plan"
    };
  }

  if (kpis.leads === 0 && kpis.quotes === 0 && kpis.jobs === 0 && Number(kpis.revenue) === 0) {
    return {
      title: "Complete this week's benchmarks",
      description: "Track live activity so you know whether the business is producing enough lead flow and bookings.",
      href: "/benchmarks",
      ctaLabel: "Open benchmarks"
    };
  }

  if (!hasValue(panel.salesProcessNotes)) {
    return {
      title: "Write the sales process",
      description: "Capture how a lead turns into a quote and a booked job so follow-up stays consistent.",
      href: "/business#lead-flow",
      ctaLabel: "Add sales notes"
    };
  }

  return {
    title: "Sharpen your follow-up system",
    description: "Your core pieces are defined. Tighten the follow-up and booking flow so leads convert faster.",
    href: "/business#lead-flow",
    ctaLabel: "Refine lead flow"
  };
}

export function getDashboardAIRecommendations(panel: BusinessPanelData, kpis: KPIData): WorkspaceRecommendation[] {
  const recommendations: WorkspaceRecommendation[] = [];

  if (!hasValue(panel.priceFloor)) {
    recommendations.push({
      title: "Pricing still needs a floor",
      body: "Your entry price is not locked yet. Set the minimum before more quotes go out.",
      href: "/business#offer-pricing"
    });
  }

  if (!hasValue(panel.targetCustomer)) {
    recommendations.push({
      title: "Target customer is still broad",
      body: "Define who the business is really for before you write outreach, ads, or Google copy.",
      href: "/business#market-notes"
    });
  }

  if (!hasValue(panel.leadSourcePlan)) {
    recommendations.push({
      title: "Lead plan is missing",
      body: "You have a business idea, but not a real lead source sequence yet. Document that next.",
      href: "/business#lead-flow"
    });
  }

  if (kpis.leads > 0 && kpis.quotes === 0) {
    recommendations.push({
      title: "Leads are not turning into quotes",
      body: "That usually means intake, offer clarity, or response speed needs work.",
      href: "/ai-coach"
    });
  }

  if (Number(kpis.revenue) === 0 && kpis.leads + kpis.quotes + kpis.jobs > 0) {
    recommendations.push({
      title: "Activity is up, revenue is not",
      body: "Check quote speed, close rate, and whether the starting price is too soft.",
      href: "/benchmarks"
    });
  }

  if (!hasValue(panel.focusThisWeek)) {
    recommendations.push({
      title: "Current focus is empty",
      body: "Choose one operating priority so the rest of the workspace has direction.",
      href: "/business#current-focus"
    });
  }

  if (!recommendations.length) {
    recommendations.push(
      {
        title: "Your offer is taking shape",
        body: "Use AI Coach to tighten the pricing structure or write the next sales script.",
        href: "/ai-coach"
      },
      {
        title: "Your workspace is ready for traction",
        body: "Benchmarks will matter more now. Keep the weekly numbers updated so you can spot bottlenecks fast.",
        href: "/benchmarks"
      }
    );
  }

  return recommendations.slice(0, 3);
}

export function shouldShowAnchorSystemsCard(panel: BusinessPanelData, kpis: KPIData) {
  const definedCoreSystem =
    hasValue(panel.starterOffer) &&
    hasValue(panel.priceFloor) &&
    hasValue(panel.leadSourcePlan) &&
    (hasValue(panel.salesProcessNotes) || hasValue(panel.followUpNotes));

  const liveActivity = kpis.leads + kpis.quotes + kpis.jobs + kpis.completed > 0 || Number(kpis.revenue) > 0;

  return definedCoreSystem || liveActivity;
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
