export type BusinessTag =
  | "low2k"
  | "low5k"
  | "low10k"
  | "solo"
  | "crew"
  | "high"
  | "indoor"
  | "outdoor"
  | "mobile"
  | "beginner"
  | "recurring"
  | "seasonal";

export type SubscriptionTier = "preview" | "core" | "pro" | "elite";
export type SoftwareRequirement = "required" | "recommended" | "optional";
export type BlueprintMilestoneKey =
  | "first_task_completed"
  | "first_week_completed"
  | "first_five_tasks_completed"
  | "first_phase_completed"
  | "full_blueprint_completed";

export interface Benchmark {
  leads: [number, number];
  quotes: [number, number];
  jobs: [number, number];
  revenue: [number, number];
}

export interface Script {
  title: string;
  body: string;
  whenToUse?: string;
  whyItWorks?: string;
}

export interface ExecutionChecklistItem {
  id: string;
  title: string;
  instruction: string;
  instructions: string[];
  template: string;
  doneDefinition: string;
  ifStuck: string;
  aiPrompt: string;
  documentation?: string;
  avoid?: string;
  example: string;
  trackThis?: string[];
  trackingToolHint?: string;
}

export interface BlueprintMilestone {
  key: BlueprintMilestoneKey;
  title: string;
  description: string;
}

export interface MomentumMessages {
  notStarted: string;
  inProgress: string;
  nearComplete: string;
  complete: string;
}

export interface Phase {
  title: string;
  goal: string;
  tasks: string[];
  benchmarks: Benchmark;
  rule: string;
  successLooksLike: string;
}

export interface ExecutionStage {
  title: string;
  summary: string;
  actions: string[];
  checklist: ExecutionChecklistItem[];
  rule: string;
  successLooksLike: string;
  nextAction: string;
  momentumMessages: MomentumMessages;
}

export interface BudgetBucket {
  label: string;
  range: string;
  note: string;
}

export interface StartupRequirements {
  tools: string[];
  equipment: string[];
  vehicleNeeds: string[];
  requiredItems: string[];
  optionalItems: string[];
  budgetBuckets: BudgetBucket[];
}

export interface SoftwareRecommendation {
  category: string;
  tool: string;
  requirement: SoftwareRequirement;
  notes: string;
}

export interface LicensingGuidance {
  disclaimer: string;
  whereToCheck: string[];
  checklist: string[];
  commonCategories: string[];
  agencyPrompts: string[];
}

export interface InsuranceGuidance {
  generalLiability: string;
  commercialAuto: string;
  workersComp: string;
  equipmentCoverage: string;
  questionsToAsk: string[];
  documentsToKeep: string[];
}

export interface OfferPricing {
  starterOffer: string;
  standardOffer: string;
  premiumOffer: string;
  addOns: string[];
  recurringOption: string;
  minimumPriceGuidance: string;
  sampleUpsells: string[];
  pricingNotes: string[];
}

export interface AcquisitionPlan {
  bestFirstLeadSources: string[];
  onlineSources: string[];
  offlineSources: string[];
  localOutreachIdeas: string[];
  referralIdeas: string[];
  neighborhoodMarketingIdeas: string[];
  socialProofIdeas: string[];
  beforeAfterContentIdeas: string[];
  googleBusinessProfileGuidance: string[];
}

export interface OperationsSetup {
  leadResponseProcess: string[];
  quotingProcess: string[];
  schedulingProcess: string[];
  jobPrep: string[];
  completionChecklist: string[];
  invoicing: string[];
  reviewRequestProcess: string[];
  followUpProcess: string[];
}

export interface PromptSuggestions {
  setup: string[];
  pricing: string[];
  marketing: string[];
  operations: string[];
  sales: string[];
}

export interface UpgradeTeaser {
  title: string;
  description: string;
  items: string[];
}

export interface BusinessCosts {
  equipment: string;
  insurance: string;
  marketing: string;
  software: string;
  misc: string;
}

export interface Business {
  id: string;
  name: string;
  tags: BusinessTag[];
  summary: string;
  teaser: string;
  goodFor: string[];
  operatorModel: string;
  teamModel: string;
  serviceMode: string;
  difficulty: string;
  startup_cost_range: string;
  revenue_90_range: string;
  revenue_1yr_range: string;
  margin_range: string;
  demandLevel: string;
  seasonality: string;
  recurringRevenuePotential: string;
  recommended_first_offer: string;
  whyAttractive: string;
  whyPeopleStartIt: string;
  pros: string[];
  cons: string[];
  bestFitOperatorType: string;
  phaseBenchmarks: Benchmark[];
  blueprintPhases: Phase[];
  executionPlan: ExecutionStage[];
  costs: BusinessCosts;
  startupRequirements: StartupRequirements;
  softwareStack: SoftwareRecommendation[];
  licensingGuidance: LicensingGuidance;
  insuranceGuidance: InsuranceGuidance;
  offerPricing: OfferPricing;
  acquisitionPlan: AcquisitionPlan;
  operationsSetup: OperationsSetup;
  promptSuggestions: PromptSuggestions;
  scripts: Script[];
  previewTeasers: UpgradeTeaser[];
  advancedSystems: string[];
}

export interface KPIData {
  leads: number;
  quotes: number;
  jobs: number;
  completed: number;
  revenue: number;
  reviews: number;
}

export interface BusinessPanelData {
  businessName: string;
  serviceType: string;
  businessDescription: string;
  ownerName: string;
  serviceModel: string;
  serviceArea: string;
  starterOffer: string;
  secondaryOffer: string;
  priceFloor: string;
  keyInclusions: string;
  pricingNotes: string;
  packageIdeas: string;
  idealTicketSizeNotes: string;
  targetCustomer: string;
  marketNotes: string;
  territoryNotes: string;
  competitionNotes: string;
  leadSourcePlan: string;
  phone: string;
  bookingMethod: string;
  paymentMethod: string;
  salesProcessNotes: string;
  followUpNotes: string;
  objectionHandlingNotes: string;
  crmTools: string;
  websiteFunnelNotes: string;
  automationNotes: string;
  setupNotes: string;
  schedulingNotes: string;
  fulfillmentNotes: string;
  equipmentNotes: string;
  hiringNotes: string;
  operationsNotes: string;
  brandPositioningNotes: string;
  headlineOfferNotes: string;
  toneMessagingNotes: string;
  trustBuildersNotes: string;
  brandNotes: string;
  goal30Day: string;
  goal90Day: string;
  revenueGoal: string;
  milestoneNotes: string;
  focusThisWeek: string;
  focusSupportNote: string;
  generalNotes: string;
  currentPhase: string;
  completedTasks: number;
  leads: number;
  quoted: number;
  booked: number;
  completed: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

export interface WeekGroup {
  title: string;
  weeks: number[];
}
