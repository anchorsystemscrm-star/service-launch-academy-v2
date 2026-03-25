import { SubscriptionTier } from "@/types/business";

export type CoachMode =
  | "general"
  | "pricing"
  | "checklist"
  | "script"
  | "marketing"
  | "sop"
  | "followup"
  | "image";

export type CoachBuildStage = "pricing" | "upsells" | "script" | "followup" | "system";

export type CoachConversationRole = "user" | "assistant";

export interface CoachContext {
  businessId?: string;
  businessName?: string;
  businessType?: string;
  businessDescription?: string;
  serviceModel?: string;
  phase?: string;
  entryOffer?: string;
  secondaryOffer?: string;
  keyInclusions?: string;
  serviceArea?: string;
  targetCustomer?: string;
  priceFloor?: string;
  phone?: string;
  bookingMethod?: string;
  paymentMethod?: string;
  leadSourcePlan?: string;
  salesProcessNotes?: string;
  automationNotes?: string;
  focusThisWeek?: string;
  leadCount?: number;
  quotedCount?: number;
  bookedCount?: number;
  completedCount?: number;
  budgetRange?: string;
  city?: string;
  state?: string;
  zip?: string;
  accessTier?: SubscriptionTier;
  completedTasks?: string[];
  selectedCategory?: string;
  preferredPositioning?: string;
}

export interface CoachImageRefinement {
  sourcePrompt: string;
  assetType?: "logo" | "flyer" | "truck_wrap" | "social_ad" | "yard_sign" | "general";
  instruction: string;
  transparentBackground?: boolean;
}

export interface CoachConversationMessageInput {
  role: CoachConversationRole;
  content: string;
}

export interface CoachConversationState {
  summary?: string;
  recentMessages?: CoachConversationMessageInput[];
}

export interface CoachRequest {
  message: string;
  requestedMode?: CoachMode;
  context?: CoachContext;
  conversation?: CoachConversationState;
  imageRefinement?: CoachImageRefinement;
}

export interface CoachPricingPackage {
  name: string;
  price: string;
  includes: string[];
  bestFor: string;
}

export interface CoachPricingStructured {
  starter: CoachPricingPackage;
  standard: CoachPricingPackage;
  premium: CoachPricingPackage;
  upsells?: string[];
  pricingNotes?: string[];
}

export interface CoachChecklistItem {
  task: string;
  priority: "now" | "soon" | "later";
  notes?: string;
}

export interface CoachChecklistStructured {
  title: string;
  items: CoachChecklistItem[];
}

export interface CoachScriptObjectionResponse {
  objection: string;
  response: string;
}

export interface CoachScriptStructured {
  scriptType: string;
  primaryScript: string;
  variations?: string[];
  objectionResponses?: CoachScriptObjectionResponse[];
}

export interface CoachFollowupStep {
  day: string;
  channel: "sms" | "email" | "call";
  message: string;
}

export interface CoachFollowupStructured {
  goal: string;
  sequence: CoachFollowupStep[];
}

export interface CoachMarketingIdea {
  idea: string;
  whyItWorks?: string;
  execution?: string;
}

export interface CoachMarketingStructured {
  title: string;
  ideas: CoachMarketingIdea[];
}

export interface CoachSopStep {
  step: string;
  owner?: string;
  notes?: string;
}

export interface CoachSopStructured {
  title: string;
  steps: CoachSopStep[];
}

export type CoachStructuredPayload =
  | CoachPricingStructured
  | CoachChecklistStructured
  | CoachScriptStructured
  | CoachFollowupStructured
  | CoachMarketingStructured
  | CoachSopStructured;

export interface CoachImagePayload {
  prompt: string;
  b64_json?: string[];
  urls?: string[];
  assetType?: "logo" | "flyer" | "truck_wrap" | "social_ad" | "yard_sign" | "general";
  transparentBackground?: boolean;
  refinements?: string[];
}

export interface CoachAction {
  id: string;
  label: string;
  prompt: string;
  mode?: CoachMode;
  style?: "primary" | "secondary";
  kind?: "follow_up" | "save" | "refine_image";
  imageRefinement?: CoachImageRefinement;
}

export interface CoachNextStep {
  title: string;
  prompt: string;
  mode?: CoachMode;
  why: string;
}

export interface CoachResponse {
  mode: CoachMode;
  buildStage?: CoachBuildStage;
  title?: string;
  text?: string;
  structured?: CoachStructuredPayload;
  image?: CoachImagePayload;
  updatedSummary?: string;
  suggestions?: string[];
  primaryAction?: CoachAction;
  actions?: CoachAction[];
  nextStep?: CoachNextStep;
  secondaryNextSteps?: CoachAction[];
  anchorBridge?: string;
}

export interface CoachConversationMessage {
  id: string;
  role: CoachConversationRole;
  content: string;
  createdAt: string;
  buildStage?: CoachBuildStage;
  mode?: CoachMode;
  title?: string;
  structured?: CoachStructuredPayload;
  image?: CoachImagePayload;
  suggestions?: string[];
  primaryAction?: CoachAction;
  actions?: CoachAction[];
  nextStep?: CoachNextStep;
  secondaryNextSteps?: CoachAction[];
  anchorBridge?: string;
}

export interface SavedCoachOutput {
  id: string;
  userId?: string | null;
  businessId: string;
  businessContext: CoachContext;
  mode: CoachMode;
  buildStage?: CoachBuildStage;
  title: string;
  prompt: string;
  text?: string;
  structured?: CoachStructuredPayload;
  image?: CoachImagePayload;
  createdAt: string;
  primaryAction?: CoachAction;
  actions?: CoachAction[];
  nextStep?: CoachNextStep;
  secondaryNextSteps?: CoachAction[];
  anchorBridge?: string;
}
