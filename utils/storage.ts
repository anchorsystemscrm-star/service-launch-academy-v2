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
import { SubscriptionTier, ChatMessage, KPIData, ExecutionStage, BlueprintMilestoneKey } from "@/types/business";
import { AccessProfile, normalizeSubscriptionTier } from "@/utils/access";

export const STORAGE_KEYS = {
  selectedBusiness: "sla_selected_business",
  activeBlueprint: "sla_active_blueprint",
  progressMap: "sla_progress_map",
  milestoneMap: "sla_milestone_map",
  kpiMap: "sla_kpi_map",
  chatMap: "sla_chat_map",
  coachConversationMap: "sla_coach_conversation_map",
  coachSummaryMap: "sla_coach_summary_map",
  coachSavedOutputMap: "sla_coach_saved_output_map",
  onboardingComplete: "sla_onboarding_complete",
  subscriptionTier: "sla_subscription_tier"
} as const;

const COOKIE_KEYS = {
  accessToken: "sla-access-token",
  selectedBusiness: "sla-selected-business",
  onboardingComplete: "sla-onboarding",
  subscriptionTier: "sla-tier"
} as const;

const STORAGE_EVENT = "sla:storage-change";

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

export function setSelectedBusinessCookie(value: string | null) {
  if (value) {
    setCookie(COOKIE_KEYS.selectedBusiness, value);
    return;
  }

  clearCookie(COOKIE_KEYS.selectedBusiness);
}

export function setOnboardingCookie(value: boolean) {
  setCookie(COOKIE_KEYS.onboardingComplete, value ? "1" : "0");
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
  const tier = extractTierFromSession(session);
  writeStorage(STORAGE_KEYS.subscriptionTier, tier);
  setTierCookie(tier);
  return tier;
}

export function readClientAccessProfile(): AccessProfile {
  return {
    onboardingComplete: readStorage<boolean>(STORAGE_KEYS.onboardingComplete, false),
    selectedBusinessId: readStorage<string | null>(STORAGE_KEYS.selectedBusiness, null),
    tier: normalizeSubscriptionTier(readStorage<SubscriptionTier>(STORAGE_KEYS.subscriptionTier, "preview"))
  };
}

export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const syncFromStorage = () => {
      setValue(readStorage(key, fallback));
      setHydrated(true);
    };

    const handleStorage = (event: StorageEvent) => {
      if (!event.key || event.key === key) {
        syncFromStorage();
      }
    };

    const handleCustomStorage = (event: Event) => {
      const customEvent = event as CustomEvent<{ key?: string }>;
      if (!customEvent.detail?.key || customEvent.detail.key === key) {
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
      writeStorage(key, resolved);
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

export function useOnboardingState() {
  const state = usePersistentState<boolean>(STORAGE_KEYS.onboardingComplete, false);

  useEffect(() => {
    if (state.hydrated) {
      setOnboardingCookie(state.value);
    }
  }, [state.hydrated, state.value]);

  return {
    hydrated: state.hydrated,
    onboardingComplete: state.value,
    setOnboardingComplete: state.setValue
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
  const onboardingState = useOnboardingState();
  const tierState = useSubscriptionTier();
  const businessState = useSelectedBusiness();

  return {
    hydrated: onboardingState.hydrated && tierState.hydrated && businessState.hydrated,
    profile: {
      onboardingComplete: onboardingState.onboardingComplete,
      selectedBusinessId: businessState.selectedBusinessId,
      tier: tierState.tier
    },
    setOnboardingComplete: onboardingState.setOnboardingComplete,
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

export function useKpiState(businessId: string, fallback: KPIData) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, KPIData>>(STORAGE_KEYS.kpiMap, {});
  const kpis = value[businessId] ?? fallback;

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
