import { businesses } from "@/data/businesses";
import { Benchmark, Business, ChatMessage, KPIData, Phase, Script, WeekGroup } from "@/types/business";

export const weekGroups: WeekGroup[] = [
  { title: "Weeks 1-2: Foundation", weeks: [1, 2] },
  { title: "Weeks 3-4: First Customers", weeks: [3, 4] },
  { title: "Weeks 5-8: Consistency", weeks: [5, 6, 7, 8] },
  { title: "Weeks 9-13: Systemize & Scale", weeks: [9, 10, 11, 12, 13] }
];

export const milestoneTemplate = [
  "Lock offer and pricing floor",
  "Insurance and licensing checklist done",
  "Launch outreach and collect first leads",
  "Send quotes within 2-hour standard",
  "Complete first paid jobs with photos",
  "Request reviews on every finished job",
  "Install weekly lead + quote scorecard",
  "Add follow-up cadence (Day 2/Day 7)",
  "Create simple SOP for job delivery",
  "Package recurring or maintenance option",
  "Set automation for missed calls and reminders",
  "Raise minimum pricing based on data",
  "Plan month-4 growth target"
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
    `You're coaching for ${business.name}. Ask about pricing, leads, scripts, tools, LLC, or insurance.\n` +
    "I'll answer with tactical steps for your current phase."
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
    const matchesQuery = !normalizedQuery || business.name.toLowerCase().includes(normalizedQuery);
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
  const outdoorChannel = business.tags.includes("outdoor");
  const channelText = outdoorChannel
    ? "door hangers, neighborhood apps, and before/after photo posts"
    : "Google Business Profile, local groups, and referral asks";
  const recurringAngle = business.tags.includes("high")
    ? "a recurring maintenance option"
    : "a light recurring service add-on";

  return [
    {
      title: "Phase 1 (Days 1-14): Foundation",
      goal: `Set up ${business.name} with legal basics, pricing clarity, and a starter offer people can buy quickly.`,
      tasks: [
        `Define exactly 2 core services for ${business.name} plus 1 add-on.`,
        "Write a one-page price sheet with minimum job price and optional upsells.",
        "Choose your operating model (sole proprietor or LLC) and register locally.",
        "Get at least 2 general liability insurance quotes and select one policy.",
        `Buy only essential starter equipment tied to your first offer: "${business.recommended_first_offer}".`,
        "Create a simple business profile: service area, phone number, business hours, and response-time promise.",
        "Set up Google Business Profile and upload 5 initial service photos.",
        "Prepare quote and invoice templates so every lead gets the same process."
      ],
      benchmarks: business.phaseBenchmarks[0]
    },
    {
      title: "Phase 2 (Days 15-30): First Customers",
      goal: `Generate steady leads and close your first paid jobs in ${business.name}.`,
      tasks: [
        `Post your offer in at least 5 local channels using ${channelText}.`,
        "Reach out to 15-20 prospects per day using one outreach script.",
        "Commit to under-2-hour quote turnaround during business hours.",
        "Book estimate slots in batches (at least 2 blocks per week).",
        "Use a simple follow-up cadence: same day, Day 2, and Day 7.",
        "Complete first jobs with clear before/after photos for proof.",
        "Ask every happy customer for a short written review.",
        "Track weekly leads, quotes, wins, and gross revenue in your scorecard."
      ],
      benchmarks: business.phaseBenchmarks[1]
    },
    {
      title: "Phase 3 (Days 31-60): Consistency",
      goal: "Turn early wins into a repeatable weekly system with predictable lead flow.",
      tasks: [
        "Create a job delivery checklist and use it on every job.",
        "Block fixed weekly marketing time (minimum 3 sessions/week).",
        "Call older leads from past 30 days and re-open stale quotes.",
        `Introduce ${recurringAngle} to increase repeat revenue.`,
        "Raise pricing 5-10% on new quotes if close rate is above 45%.",
        "Build 2 local referral partners (real estate agents, property managers, or related trades).",
        "Set one admin block weekly for invoicing, collections, and KPI review.",
        "Document the top 5 customer objections and your standard responses."
      ],
      benchmarks: business.phaseBenchmarks[2]
    },
    {
      title: "Phase 4 (Days 61-90): Systemize & Scale",
      goal: "Stabilize operations, automate key steps, and prepare for month-4 growth.",
      tasks: [
        "Document SOPs from lead intake to final payment.",
        "Set pipeline stages and definitions for lead, quote, won, and lost.",
        "Implement missed-call text-back and quote reminder workflow.",
        "Create 2 package tiers (starter and premium) for easier selling.",
        "Launch a 30-day past-customer reactivation campaign.",
        "Set weekly capacity targets and decide when to add help.",
        "Build a monthly budget with ad spend ceiling and margin guardrails.",
        "Set quarter goals for leads, jobs, revenue, and review count."
      ],
      benchmarks: business.phaseBenchmarks[3]
    }
  ];
}

export function buildScripts(business: Business): Script[] {
  return [
    {
      title: "Door Knock Script",
      body:
        `Hi, I'm [Your Name] with [Business Name]. We help nearby homeowners with ${business.name.toLowerCase()}.\n` +
        `We're offering a starter service this week: "${business.recommended_first_offer}".\n` +
        "Would it help if I gave you a quick estimate right now? It only takes 2 minutes."
    },
    {
      title: "Cold Call Script",
      body:
        `Hi [Name], this is [Your Name]. I run a local ${business.name.toLowerCase()} service.\n` +
        "I'm reaching out because we have room for a few new clients this week.\n" +
        "If I text you a simple service menu and price range, would you like a quick quote?"
    },
    {
      title: "Facebook / Nextdoor Message",
      body:
        `Hi neighbors, I'm launching a local ${business.name.toLowerCase()} service.\n` +
        `Current starter offer: "${business.recommended_first_offer}".\n` +
        'If you want a quick quote, comment "QUOTE" or message me your address and best contact number.'
    },
    {
      title: "Follow-Up Text Script",
      body:
        `Hi [Name], [Your Name] here checking in on the quote I sent for ${business.name.toLowerCase()}.\n` +
        "I still have [2] openings this week. Would you like me to reserve one for you?"
    },
    {
      title: "Review Request Script",
      body:
        "Thanks again for choosing us, [Name]. If the service helped, would you leave a short review?\n" +
        "It helps a small local business grow. Here's the link: [Review Link]"
    }
  ];
}

export function getTrackStatus(business: Business, progress: boolean[], kpis: KPIData) {
  const phaseIndex = getPhaseIndexByProgress(progress);
  const phase = buildBlueprint(business)[phaseIndex];
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
      : `Only ${score}/4 core benchmark minimums are currently met. Focus on lead volume and quote speed.`
  };
}

export function getCoachResponse(message: string, business: Business, progress: boolean[]): string {
  const input = message.toLowerCase();
  const phase = buildBlueprint(business)[getPhaseIndexByProgress(progress)];

  if (input.includes("price") || input.includes("pricing")) {
    return (
      `Pricing plan for ${business.name}:\n` +
      "1. Set a minimum job price that protects your time (travel + setup + service).\n" +
      "2. Build three options: Starter, Standard, Premium so customers can self-select value.\n" +
      "3. Quote with an expiration date (48-72 hours) and define what's included.\n" +
      "4. Review close rate weekly; if close rate is above 45%, increase new quotes by 5-10%.\n\n" +
      'Script (pricing objection): "I understand budget matters. I can offer the starter option today and keep quality high. Would you like me to reserve that slot?"'
    );
  }

  if (input.includes("lead") || input.includes("marketing")) {
    return (
      `Lead generation playbook for ${business.name}:\n` +
      "1. Pick 2 channels only this week (local groups + referral asks).\n" +
      "2. Publish one offer post daily with before/after proof and a clear call to action.\n" +
      "3. Run a daily outreach block (15-20 contacts) and log responses.\n" +
      "4. Follow up every open quote on Day 2 and Day 7.\n\n" +
      `Script (outreach opener): "Hi [Name], I help local homeowners with ${business.name.toLowerCase()}. Want a quick quote for '${business.recommended_first_offer}'?"`
    );
  }

  if (input.includes("script")) {
    return (
      "Use this quick outreach structure:\n" +
      "1. Introduce who you are and service area.\n" +
      "2. Offer one specific starter package.\n" +
      "3. Ask for permission to send a quote.\n\n" +
      `Script: "Hi [Name], this is [Your Name]. I run a local ${business.name.toLowerCase()} service. We're booking this week for '${business.recommended_first_offer}'. If I text pricing, would you like a quick quote?"`
    );
  }

  if (input.includes("equipment") || input.includes("tools")) {
    return (
      `Starter tools guidance for ${business.name}:\n` +
      "1. Buy only the essentials for your first offer, not every tool upfront.\n" +
      "2. Prioritize safety gear and reliability over premium brands.\n" +
      "3. Keep a replacement/maintenance budget each month.\n" +
      "4. Rent specialized items until demand is steady.\n\n" +
      `Suggested starter list: ${business.tools.slice(0, 6).join(", ")}.`
    );
  }

  if (input.includes("llc") || input.includes("insurance")) {
    return (
      "Foundation checklist:\n" +
      "1. Decide sole proprietor vs LLC based on local filing costs and risk tolerance.\n" +
      "2. Register the business name and verify any local permit requirements.\n" +
      "3. Get general liability insurance before major job activity.\n" +
      "4. Keep all licenses/policies in one folder for fast customer proof.\n\n" +
      'Script (customer trust): "Yes, we\'re insured and can share proof before booking. Would you like that in your quote email?"'
    );
  }

  return (
    `Next steps based on your current phase (${phase.title}):\n` +
    `1. ${phase.tasks[0]}\n` +
    `2. ${phase.tasks[1]}\n` +
    `3. ${phase.tasks[2]}\n` +
    "4. Track this week's numbers against your benchmark minimums.\n\n" +
    'Script (simple follow-up): "Hi [Name], checking in on your quote. I still have a slot open this week if you\'d like to lock it in."'
  );
}
