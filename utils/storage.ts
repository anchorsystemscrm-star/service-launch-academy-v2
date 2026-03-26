"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import {
  CoachContext,
  CoachConversationMessage,
  CoachConversationMessageInput,
  CoachMode,
  SavedCoachOutput
} from "@/lib/ai/coachTypes";
import {
  SubscriptionTier,
  ChatMessage,
  KPIData,
  ExecutionStage,
  BlueprintMilestoneKey,
  Business,
  BusinessPanelData
} from "@/types/business";
import { AccessProfile, normalizeSubscriptionTier } from "@/utils/access";
import { getPhaseIndexByProgress } from "@/utils/benchmarks";

export const STORAGE_KEYS = {
  currentUserId: "sla_current_user_id",
  selectedBusiness: "sla_selected_business",
  activeBlueprint: "sla_active_blueprint",
  progressMap: "sla_progress_map",
  milestoneMap: "sla_milestone_map",
  kpiMap: "sla_kpi_map",
  chatMap: "sla_chat_map",
  coachConversationMap: "sla_coach_conversation_map",
  coachSummaryMap: "sla_coach_summary_map",
  coachSavedOutputMap: "sla_coach_saved_output_map",
  businessPanelMap: "sla_business_panel_map",
  blueprintTaskOutputMap: "sla_blueprint_task_output_map",
  subscriptionTier: "sla_subscription_tier"
} as const;

const COOKIE_KEYS = {
  accessToken: "sla-access-token",
  selectedBusiness: "sla-selected-business",
  subscriptionTier: "sla-tier"
} as const;

const STORAGE_EVENT = "sla:storage-change";
const USER_SCOPED_STORAGE_KEYS = new Set<string>([
  STORAGE_KEYS.selectedBusiness,
  STORAGE_KEYS.activeBlueprint,
  STORAGE_KEYS.progressMap,
  STORAGE_KEYS.milestoneMap,
  STORAGE_KEYS.kpiMap,
  STORAGE_KEYS.chatMap,
  STORAGE_KEYS.coachConversationMap,
  STORAGE_KEYS.coachSummaryMap,
  STORAGE_KEYS.coachSavedOutputMap,
  STORAGE_KEYS.businessPanelMap,
  STORAGE_KEYS.blueprintTaskOutputMap,
  STORAGE_KEYS.subscriptionTier
]);
const LEGACY_SHARED_STORAGE_KEYS = Array.from(USER_SCOPED_STORAGE_KEYS);

function getCurrentStorageUserId() {
  return readStorage<string | null>(STORAGE_KEYS.currentUserId, null);
}

function getScopedStorageKey(baseKey: string, userId = getCurrentStorageUserId()) {
  if (!USER_SCOPED_STORAGE_KEYS.has(baseKey)) {
    return baseKey;
  }

  return `${baseKey}:${userId ?? "anonymous"}`;
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
  } catch (error) {
    console.warn(`Failed to persist storage key "${key}"`, error);
  }
}

function removeStorageKey(key: string) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
  } catch (error) {
    console.warn(`Failed to remove storage key "${key}"`, error);
  }
}

function clearLegacySharedStorage() {
  if (typeof window === "undefined") {
    return;
  }

  LEGACY_SHARED_STORAGE_KEYS.forEach((key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to clear legacy storage key "${key}"`, error);
    }
  });
}

function setCookie(name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 365) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function setAccessCookie(token: string, expiresAt?: number | null) {
  if (typeof document === "undefined") {
    return;
  }

  const expires = expiresAt ? `; expires=${new Date(expiresAt * 1000).toUTCString()}` : "";
  document.cookie = `${COOKIE_KEYS.accessToken}=${encodeURIComponent(token)}; path=/; SameSite=Lax${expires}`;
}

export function clearAccessCookie() {
  clearCookie(COOKIE_KEYS.accessToken);
}

export function clearScopedClientState(userId = getCurrentStorageUserId()) {
  if (typeof window === "undefined") {
    clearCookie(COOKIE_KEYS.selectedBusiness);
    clearCookie(COOKIE_KEYS.subscriptionTier);
    return;
  }

  if (userId) {
    USER_SCOPED_STORAGE_KEYS.forEach((baseKey) => {
      removeStorageKey(getScopedStorageKey(baseKey, userId));
    });
  }

  removeStorageKey(STORAGE_KEYS.currentUserId);
  clearLegacySharedStorage();
  clearCookie(COOKIE_KEYS.selectedBusiness);
  clearCookie(COOKIE_KEYS.subscriptionTier);
}

export function setSelectedBusinessCookie(value: string | null) {
  if (value) {
    setCookie(COOKIE_KEYS.selectedBusiness, value);
    return;
  }

  clearCookie(COOKIE_KEYS.selectedBusiness);
}

export function setTierCookie(value: SubscriptionTier) {
  setCookie(COOKIE_KEYS.subscriptionTier, value);
}

function extractTierFromSession(session: Session | null | undefined): SubscriptionTier {
  const appTier = session?.user?.app_metadata?.subscription_tier ?? session?.user?.app_metadata?.tier;
  const userTier = session?.user?.user_metadata?.subscription_tier ?? session?.user?.user_metadata?.tier;
  return normalizeSubscriptionTier(appTier ?? userTier);
}

export function syncTierFromSession(session: Session | null | undefined) {
  const userId = session?.user?.id ?? null;
  const tier = extractTierFromSession(session);

  if (userId) {
    writeStorage(STORAGE_KEYS.currentUserId, userId);
    writeStorage(getScopedStorageKey(STORAGE_KEYS.subscriptionTier, userId), tier);
  }

  clearLegacySharedStorage();
  setTierCookie(tier);
  return tier;
}

export function readClientAccessProfile(): AccessProfile {
  const userId = getCurrentStorageUserId();
  return {
    userId,
    selectedBusinessId: readStorage<string | null>(getScopedStorageKey(STORAGE_KEYS.selectedBusiness, userId), null),
    tier: normalizeSubscriptionTier(
      readStorage<SubscriptionTier>(getScopedStorageKey(STORAGE_KEYS.subscriptionTier, userId), "preview")
    )
  };
}

export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const syncFromStorage = () => {
      setValue(readStorage(getScopedStorageKey(key), fallback));
      setHydrated(true);
    };

    const handleStorage = (event: StorageEvent) => {
      const scopedKey = getScopedStorageKey(key);
      if (!event.key || event.key === scopedKey || event.key === STORAGE_KEYS.currentUserId) {
        syncFromStorage();
      }
    };

    const handleCustomStorage = (event: Event) => {
      const customEvent = event as CustomEvent<{ key?: string }>;
      const scopedKey = getScopedStorageKey(key);
      if (
        !customEvent.detail?.key ||
        customEvent.detail.key === scopedKey ||
        customEvent.detail.key === STORAGE_KEYS.currentUserId
      ) {
        syncFromStorage();
      }
    };

    syncFromStorage();
    window.addEventListener("storage", handleStorage);
    window.addEventListener(STORAGE_EVENT, handleCustomStorage as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(STORAGE_EVENT, handleCustomStorage as EventListener);
    };
  }, [key]);

  function updateValue(next: T | ((previous: T) => T)) {
    setValue((previous) => {
      const resolved = next instanceof Function ? next(previous) : next;
      writeStorage(getScopedStorageKey(key), resolved);
      return resolved;
    });
  }

  return { hydrated, value, setValue: updateValue };
}

export function useSelectedBusiness() {
  const state = usePersistentState<string | null>(STORAGE_KEYS.selectedBusiness, null);

  useEffect(() => {
    if (state.hydrated) {
      setSelectedBusinessCookie(state.value);
    }
  }, [state.hydrated, state.value]);

  return {
    hydrated: state.hydrated,
    selectedBusinessId: state.value,
    setSelectedBusinessId: state.setValue
  };
}

export function useSubscriptionTier() {
  const state = usePersistentState<SubscriptionTier>(STORAGE_KEYS.subscriptionTier, "preview");

  useEffect(() => {
    if (state.hydrated) {
      setTierCookie(normalizeSubscriptionTier(state.value));
    }
  }, [state.hydrated, state.value]);

  return {
    hydrated: state.hydrated,
    tier: normalizeSubscriptionTier(state.value)
  };
}

export function useAccessProfile() {
  const tierState = useSubscriptionTier();
  const businessState = useSelectedBusiness();

  return {
    hydrated: tierState.hydrated && businessState.hydrated,
    profile: {
      userId: getCurrentStorageUserId(),
      selectedBusinessId: businessState.selectedBusinessId,
      tier: tierState.tier
    },
    setSelectedBusinessId: businessState.setSelectedBusinessId
  };
}

export function useActiveBlueprint() {
  const state = usePersistentState<string | null>(STORAGE_KEYS.activeBlueprint, null);

  return {
    hydrated: state.hydrated,
    activeBlueprintId: state.value,
    setActiveBlueprintId: state.setValue
  };
}

type StoredBlueprintProgress = {
  weeks: boolean[];
  tasks: boolean[][];
};

type StoredBlueprintMilestones = Partial<Record<BlueprintMilestoneKey, boolean>>;
export type BusinessPanelEditableField =
  | "businessName"
  | "serviceType"
  | "businessDescription"
  | "ownerName"
  | "serviceModel"
  | "serviceArea"
  | "starterOffer"
  | "secondaryOffer"
  | "priceFloor"
  | "keyInclusions"
  | "pricingNotes"
  | "packageIdeas"
  | "idealTicketSizeNotes"
  | "targetCustomer"
  | "marketNotes"
  | "territoryNotes"
  | "competitionNotes"
  | "leadSourcePlan"
  | "phone"
  | "bookingMethod"
  | "paymentMethod"
  | "salesProcessNotes"
  | "followUpNotes"
  | "objectionHandlingNotes"
  | "crmTools"
  | "websiteFunnelNotes"
  | "automationNotes"
  | "setupNotes"
  | "schedulingNotes"
  | "fulfillmentNotes"
  | "equipmentNotes"
  | "hiringNotes"
  | "operationsNotes"
  | "brandPositioningNotes"
  | "headlineOfferNotes"
  | "toneMessagingNotes"
  | "trustBuildersNotes"
  | "brandNotes"
  | "goal30Day"
  | "goal90Day"
  | "revenueGoal"
  | "milestoneNotes"
  | "focusThisWeek"
  | "focusSupportNote"
  | "generalNotes";
type StoredBusinessPanel = Partial<Record<BusinessPanelEditableField, string>> & {
  updatedAt?: string;
};
type StoredBlueprintTaskOutputMap = Record<string, boolean>;

function normalizeWeeks(raw: unknown): boolean[] {
  return Array.isArray(raw) && raw.length === 13 ? raw.map(Boolean) : new Array(13).fill(false);
}

function normalizeTaskProgress(raw: unknown, executionPlan: ExecutionStage[]): boolean[][] {
  if (!executionPlan.length) {
    return [];
  }

  const normalized = Array.isArray(raw) ? raw : [];

  return executionPlan.map((stage, stageIndex) => {
    const existing = normalized[stageIndex];
    return Array.isArray(existing) && existing.length === stage.checklist.length
      ? existing.map(Boolean)
      : new Array(stage.checklist.length).fill(false);
  });
}

function normalizeStoredProgress(raw: unknown, executionPlan: ExecutionStage[]): StoredBlueprintProgress {
  if (Array.isArray(raw)) {
    return {
      weeks: normalizeWeeks(raw),
      tasks: normalizeTaskProgress([], executionPlan)
    };
  }

  const record = raw as Partial<StoredBlueprintProgress> | null;

  return {
    weeks: normalizeWeeks(record?.weeks),
    tasks: normalizeTaskProgress(record?.tasks, executionPlan)
  };
}

export function useBlueprintProgress(businessId: string, executionPlan: ExecutionStage[] = []) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, boolean[] | StoredBlueprintProgress>>(
    STORAGE_KEYS.progressMap,
    {}
  );

  const existing = value[businessId];
  const normalized = normalizeStoredProgress(existing, executionPlan);
  const progress = normalized.weeks;
  const taskProgress = normalized.tasks;

  function setWeekComplete(weekIndex: number, checked: boolean) {
    setValue((previous) => {
      const next = { ...previous };
      const current = normalizeStoredProgress(next[businessId], executionPlan);
      const weeks = [...current.weeks];
      weeks[weekIndex] = checked;
      next[businessId] = { ...current, weeks };
      return next;
    });
  }

  function setTaskComplete(stageIndex: number, taskIndex: number, checked: boolean) {
    setValue((previous) => {
      const next = { ...previous };
      const current = normalizeStoredProgress(next[businessId], executionPlan);
      const tasks = current.tasks.map((stageTasks) => [...stageTasks]);

      if (!tasks[stageIndex]) {
        return previous;
      }

      tasks[stageIndex][taskIndex] = checked;
      next[businessId] = { ...current, tasks };
      return next;
    });
  }

  return { hydrated, progress, taskProgress, setWeekComplete, setTaskComplete };
}

export function useBlueprintMilestones(businessId: string) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, StoredBlueprintMilestones>>(
    STORAGE_KEYS.milestoneMap,
    {}
  );

  const milestones = value[businessId] ?? {};

  function setMilestoneAchieved(key: BlueprintMilestoneKey, achieved = true) {
    setValue((previous) => ({
      ...previous,
      [businessId]: {
        ...(previous[businessId] ?? {}),
        [key]: achieved
      }
    }));
  }

  return { hydrated, milestones, setMilestoneAchieved };
}

function hasCompletedTask(taskProgress: boolean[][], executionPlan: ExecutionStage[], title: string) {
  return executionPlan.some((stage, stageIndex) =>
    stage.checklist.some((item, taskIndex) => item.title === title && Boolean(taskProgress[stageIndex]?.[taskIndex]))
  );
}

function extractSuggestedPriceFloor(guidance: string) {
  const match = guidance.match(/\$[\d,]+(?:-\$?[\d,]+)?/);
  return match?.[0] ?? guidance;
}

function deriveKeyInclusions(offer: string) {
  const normalized = offer.replace(/\.$/, "");
  const tokens = normalized
    .split(/\s+with\s+|,\s*|\s+and\s+/i)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  const trimmed = tokens.slice(0, 3);
  return trimmed.join("\n");
}

function deriveServiceModel(business: Business) {
  const modelParts = [business.serviceMode, business.operatorModel].filter(Boolean);
  return modelParts.join(" | ");
}

function deriveSecondaryOffer(business: Business) {
  const addOns = business.offerPricing.addOns.slice(0, 3).join(", ");
  return [business.offerPricing.standardOffer, addOns ? `Upsells: ${addOns}` : ""].filter(Boolean).join("\n");
}

function deriveCrmTools(business: Business) {
  return business.softwareStack
    .slice(0, 4)
    .map((item) => `${item.category}: ${item.tool}`)
    .join("\n");
}

function deriveThirtyDayGoal(business: Business) {
  const benchmark = business.phaseBenchmarks[1] ?? business.phaseBenchmarks[0];
  if (!benchmark) {
    return "";
  }

  return `Generate ${benchmark.leads[0]}-${benchmark.leads[1]} leads, send ${benchmark.quotes[0]}-${benchmark.quotes[1]} quotes, and close ${benchmark.jobs[0]}-${benchmark.jobs[1]} jobs.`;
}

function deriveCurrentExecutionFocus(business: Business, taskProgress: boolean[][]) {
  const currentStageIndex = business.executionPlan.findIndex((stage, index) =>
    stage.checklist.some((_, taskIndex) => !taskProgress[index]?.[taskIndex])
  );

  const stage = business.executionPlan[currentStageIndex >= 0 ? currentStageIndex : business.executionPlan.length - 1];
  return stage?.nextAction ?? "";
}

function getDerivedBusinessPanelData(
  business: Business,
  progress: boolean[],
  taskProgress: boolean[][],
  kpis: KPIData
): BusinessPanelData {
  const railsReady = hasCompletedTask(taskProgress, business.executionPlan, "Set the commercial rails");
  const completedTasks = taskProgress.reduce((sum, stage) => sum + stage.filter(Boolean).length, 0);
  const currentPhase = business.blueprintPhases[Math.min(getPhaseIndexByProgress(progress), business.blueprintPhases.length - 1)];

  return {
    businessName: "",
    serviceType: business.name,
    businessDescription: business.summary,
    ownerName: "",
    serviceModel: deriveServiceModel(business),
    serviceArea: "",
    starterOffer: business.offerPricing.starterOffer,
    secondaryOffer: deriveSecondaryOffer(business),
    priceFloor: extractSuggestedPriceFloor(business.offerPricing.minimumPriceGuidance),
    keyInclusions: deriveKeyInclusions(business.offerPricing.starterOffer),
    pricingNotes: business.offerPricing.pricingNotes.slice(0, 3).join("\n"),
    packageIdeas: [business.offerPricing.standardOffer, business.offerPricing.premiumOffer].filter(Boolean).join("\n"),
    idealTicketSizeNotes: business.margin_range ? `Protect margin in the ${business.margin_range} range while keeping the entry offer easy to sell.` : "",
    targetCustomer: business.goodFor[0] ?? "",
    marketNotes: [business.demandLevel, business.seasonality].filter(Boolean).join("\n"),
    territoryNotes: business.acquisitionPlan.neighborhoodMarketingIdeas.slice(0, 2).join("\n"),
    competitionNotes: business.bestFitOperatorType,
    leadSourcePlan: business.acquisitionPlan.bestFirstLeadSources.slice(0, 4).join("\n"),
    phone: railsReady ? "Business phone live" : "",
    bookingMethod: railsReady ? "Phone + text intake" : "",
    paymentMethod: railsReady ? "Invoice link or card on completion" : "",
    salesProcessNotes: business.operationsSetup.quotingProcess.slice(0, 2).join("\n"),
    followUpNotes: business.operationsSetup.followUpProcess.slice(0, 2).join("\n"),
    objectionHandlingNotes: business.scripts[1]?.body ?? business.scripts[0]?.body ?? "",
    crmTools: deriveCrmTools(business),
    websiteFunnelNotes: business.softwareStack.find((item) => item.category === "Website")?.notes ?? "",
    automationNotes: business.advancedSystems.slice(0, 3).join("\n"),
    setupNotes: business.startupRequirements.requiredItems.slice(0, 4).join("\n"),
    schedulingNotes: business.operationsSetup.schedulingProcess.slice(0, 2).join("\n"),
    fulfillmentNotes: business.operationsSetup.jobPrep.slice(0, 2).join("\n"),
    equipmentNotes: business.startupRequirements.equipment.slice(0, 4).join("\n"),
    hiringNotes: business.teamModel,
    operationsNotes: business.operationsSetup.completionChecklist.slice(0, 2).join("\n"),
    brandPositioningNotes: business.whyAttractive,
    headlineOfferNotes: business.recommended_first_offer,
    toneMessagingNotes: "Premium, clear, trustworthy, and direct. Avoid discount language and vague claims.",
    trustBuildersNotes: business.acquisitionPlan.socialProofIdeas.slice(0, 3).join("\n"),
    brandNotes: business.acquisitionPlan.googleBusinessProfileGuidance.slice(0, 2).join("\n"),
    goal30Day: deriveThirtyDayGoal(business),
    goal90Day: `Push toward ${business.revenue_90_range} in gross revenue while tightening quote speed and delivery.`,
    revenueGoal: business.revenue_90_range,
    milestoneNotes: currentPhase?.successLooksLike ?? "",
    focusThisWeek: deriveCurrentExecutionFocus(business, taskProgress),
    focusSupportNote: "",
    generalNotes: "",
    currentPhase: currentPhase?.title ?? business.blueprintPhases[0]?.title ?? "Phase 1",
    completedTasks,
    leads: kpis.leads,
    quoted: kpis.quotes,
    booked: kpis.jobs,
    completed: kpis.completed
  };
}

function mergeBusinessPanelData(
  derived: BusinessPanelData,
  overrides: StoredBusinessPanel
): BusinessPanelData {
  const merged = { ...derived };

  (Object.keys(overrides).filter((field) => field !== "updatedAt" && field !== "serviceType" && field !== "serviceModel") as BusinessPanelEditableField[]).forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(overrides, field)) {
      merged[field] = overrides[field] ?? "";
    }
  });

  return merged;
}

export function useBusinessPanel(business: Business, progress: boolean[], taskProgress: boolean[][], kpis: KPIData) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, StoredBusinessPanel>>(
    STORAGE_KEYS.businessPanelMap,
    {}
  );

  const overrides = value[business.id] ?? {};
  const derived = getDerivedBusinessPanelData(business, progress, taskProgress, kpis);
  const panel = mergeBusinessPanelData(derived, overrides);
  const updatedAt = overrides.updatedAt ?? null;

  function setField(field: BusinessPanelEditableField, nextValue: string) {
    setValue((previous) => ({
      ...previous,
      [business.id]: {
        ...(previous[business.id] ?? {}),
        [field]: nextValue,
        updatedAt: new Date().toISOString()
      }
    }));
  }

  return {
    hydrated,
    panel,
    updatedAt,
    setField
  };
}

export function useBlueprintTaskOutputState(businessId: string) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, StoredBlueprintTaskOutputMap>>(
    STORAGE_KEYS.blueprintTaskOutputMap,
    {}
  );

  const outputMap = value[businessId] ?? {};

  function setTaskHasOutput(taskId: string, hasOutput = true) {
    setValue((previous) => ({
      ...previous,
      [businessId]: {
        ...(previous[businessId] ?? {}),
        [taskId]: hasOutput
      }
    }));
  }

  return {
    hydrated,
    outputMap,
    setTaskHasOutput
  };
}

export function useKpiState(businessId: string, fallback: KPIData) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, KPIData>>(STORAGE_KEYS.kpiMap, {});
  const kpis = {
    ...fallback,
    ...(value[businessId] ?? {})
  };

  function updateKpis(next: KPIData) {
    setValue((previous) => ({
      ...previous,
      [businessId]: next
    }));
  }

  return { hydrated, kpis, setKpis: updateKpis };
}

export function useChatHistory(businessId: string, initialMessage: ChatMessage) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, ChatMessage[]>>(STORAGE_KEYS.chatMap, {});

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const existing = value[businessId];
    if (Array.isArray(existing) && existing.length > 0) {
      return;
    }

    setValue((previous) => ({
      ...previous,
      [businessId]: [initialMessage]
    }));
  }, [businessId, hydrated, initialMessage, setValue, value]);

  const history = value[businessId] ?? [initialMessage];

  function replaceHistory(messages: ChatMessage[]) {
    setValue((previous) => ({
      ...previous,
      [businessId]: messages
    }));
  }

  return { hydrated, history, replaceHistory };
}

export function useCoachSummary(businessId: string) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, string>>(
    STORAGE_KEYS.coachSummaryMap,
    {}
  );

  const summary = value[businessId] ?? "";

  function setSummary(nextSummary: string) {
    setValue((previous) => ({
      ...previous,
      [businessId]: nextSummary
    }));
  }

  return { hydrated, summary, setSummary };
}

function mapLegacyChatMessage(message: ChatMessage, businessId: string, index: number): CoachConversationMessage {
  return {
    id: `${businessId}-legacy-${index}`,
    role: message.role,
    content: message.text,
    createdAt: new Date(0).toISOString()
  };
}

function sanitizeCoachImageForStorage(image?: CoachConversationMessage["image"]) {
  if (!image) {
    return undefined;
  }

  return {
    ...image,
    b64_json: undefined,
    urls: image.urls?.slice(0, 2)
  };
}

function sanitizeCoachMessageForStorage(
  message: CoachConversationMessage
): CoachConversationMessage {
  return {
    ...message,
    image: sanitizeCoachImageForStorage(message.image)
  };
}

function sanitizeSavedOutputForStorage(output: SavedCoachOutput): SavedCoachOutput {
  return {
    ...output,
    image: sanitizeCoachImageForStorage(output.image)
  };
}

export function useCoachConversation(
  businessId: string,
  initialMessage: CoachConversationMessage
) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, CoachConversationMessage[]>>(
    STORAGE_KEYS.coachConversationMap,
    {}
  );

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const existing = value[businessId];
    if (Array.isArray(existing) && existing.length > 0) {
      return;
    }

    const legacyChatMap = readStorage<Record<string, ChatMessage[]>>(STORAGE_KEYS.chatMap, {});
    const legacyMessages = legacyChatMap[businessId];

    setValue((previous) => ({
      ...previous,
      [businessId]:
        Array.isArray(legacyMessages) && legacyMessages.length > 0
          ? legacyMessages.map((message, index) => mapLegacyChatMessage(message, businessId, index))
          : [initialMessage]
    }));
  }, [businessId, hydrated, initialMessage, setValue, value]);

  const messages = value[businessId] ?? [initialMessage];

  function replaceMessages(nextMessages: CoachConversationMessage[]) {
    const sanitizedMessages = nextMessages.map(sanitizeCoachMessageForStorage);
    setValue((previous) => ({
      ...previous,
      [businessId]: sanitizedMessages
    }));
  }

  function appendMessage(message: CoachConversationMessage) {
    replaceMessages([...messages, message]);
  }

  return { hydrated, messages, replaceMessages, appendMessage };
}

export function getRecentCoachMessages(
  messages: CoachConversationMessage[],
  limit = 6
): CoachConversationMessageInput[] {
  return messages
    .slice(-limit)
    .map((message) => ({
      role: message.role,
      content: message.content
    }));
}

export function useSavedCoachOutputs(businessId: string) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, SavedCoachOutput[]>>(
    STORAGE_KEYS.coachSavedOutputMap,
    {}
  );

  const savedOutputs = value[businessId] ?? [];

  function saveOutput(output: SavedCoachOutput) {
    const sanitizedOutput = sanitizeSavedOutputForStorage(output);
    setValue((previous) => ({
      ...previous,
      [businessId]: [sanitizedOutput, ...(previous[businessId] ?? [])]
    }));
  }

  function deleteOutput(outputId: string) {
    setValue((previous) => ({
      ...previous,
      [businessId]: (previous[businessId] ?? []).filter((item) => item.id !== outputId)
    }));
  }

  return { hydrated, savedOutputs, saveOutput, deleteOutput };
}

export function createCoachMessage(params: {
  role: CoachConversationMessage["role"];
  content: string;
  buildStage?: CoachConversationMessage["buildStage"];
  mode?: CoachMode;
  title?: string;
  structured?: CoachConversationMessage["structured"];
  image?: CoachConversationMessage["image"];
  suggestions?: string[];
  primaryAction?: CoachConversationMessage["primaryAction"];
  actions?: CoachConversationMessage["actions"];
  nextStep?: CoachConversationMessage["nextStep"];
  secondaryNextSteps?: CoachConversationMessage["secondaryNextSteps"];
  anchorBridge?: string;
}): CoachConversationMessage {
  return {
    id: crypto.randomUUID(),
    role: params.role,
    content: params.content,
    createdAt: new Date().toISOString(),
    buildStage: params.buildStage,
    mode: params.mode,
    title: params.title,
    structured: params.structured,
    image: params.image,
    suggestions: params.suggestions,
    primaryAction: params.primaryAction,
    actions: params.actions,
    nextStep: params.nextStep,
    secondaryNextSteps: params.secondaryNextSteps,
    anchorBridge: params.anchorBridge
  };
}

export function createSavedCoachOutput(params: {
  businessId: string;
  businessContext: CoachContext;
  mode: CoachMode;
  buildStage?: SavedCoachOutput["buildStage"];
  title: string;
  prompt: string;
  text?: string;
  structured?: SavedCoachOutput["structured"];
  image?: SavedCoachOutput["image"];
  userId?: string | null;
  primaryAction?: SavedCoachOutput["primaryAction"];
  actions?: SavedCoachOutput["actions"];
  nextStep?: SavedCoachOutput["nextStep"];
  secondaryNextSteps?: SavedCoachOutput["secondaryNextSteps"];
  anchorBridge?: SavedCoachOutput["anchorBridge"];
}): SavedCoachOutput {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    userId: params.userId ?? null,
    businessId: params.businessId,
    businessContext: params.businessContext,
    mode: params.mode,
    buildStage: params.buildStage,
    title: params.title,
    prompt: params.prompt,
    text: params.text,
    structured: params.structured,
    image: params.image,
    primaryAction: params.primaryAction,
    actions: params.actions,
    nextStep: params.nextStep,
    secondaryNextSteps: params.secondaryNextSteps,
    anchorBridge: params.anchorBridge
  };
}
