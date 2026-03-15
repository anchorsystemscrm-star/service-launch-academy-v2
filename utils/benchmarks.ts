import { businesses } from "@/data/businesses";
import { Benchmark, Business, ChatMessage, KPIData, Phase, Script, WeekGroup } from "@/types/business";

export const weekGroups: WeekGroup[] = [
  { title: "Weeks 1-2: Foundation", weeks: [1, 2] },
  { title: "Weeks 3-4: Launch Motion", weeks: [3, 4] },
  { title: "Weeks 5-8: Operating Rhythm", weeks: [5, 6, 7, 8] },
  { title: "Weeks 9-13: Systemize & Scale", weeks: [9, 10, 11, 12, 13] }
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
