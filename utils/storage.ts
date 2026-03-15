"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { SubscriptionTier, ChatMessage, KPIData } from "@/types/business";
import { AccessProfile, normalizeSubscriptionTier } from "@/utils/access";

export const STORAGE_KEYS = {
  selectedBusiness: "sla_selected_business",
  activeBlueprint: "sla_active_blueprint",
  progressMap: "sla_progress_map",
  kpiMap: "sla_kpi_map",
  chatMap: "sla_chat_map",
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

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
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

  const updateValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      setValue((previous) => {
        const resolved = next instanceof Function ? next(previous) : next;
        writeStorage(key, resolved);
        return resolved;
      });
    },
    [key]
  );

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

  return useMemo(
    () => ({
      hydrated: onboardingState.hydrated && tierState.hydrated && businessState.hydrated,
      profile: {
        onboardingComplete: onboardingState.onboardingComplete,
        selectedBusinessId: businessState.selectedBusinessId,
        tier: tierState.tier
      },
      setOnboardingComplete: onboardingState.setOnboardingComplete,
      setSelectedBusinessId: businessState.setSelectedBusinessId
    }),
    [
      businessState.hydrated,
      businessState.selectedBusinessId,
      businessState.setSelectedBusinessId,
      onboardingState.hydrated,
      onboardingState.onboardingComplete,
      onboardingState.setOnboardingComplete,
      tierState.hydrated,
      tierState.tier
    ]
  );
}

export function useActiveBlueprint() {
  const state = usePersistentState<string | null>(STORAGE_KEYS.activeBlueprint, null);

  return {
    hydrated: state.hydrated,
    activeBlueprintId: state.value,
    setActiveBlueprintId: state.setValue
  };
}

export function useBlueprintProgress(businessId: string) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, boolean[]>>(
    STORAGE_KEYS.progressMap,
    {}
  );

  const progress = useMemo(() => {
    const existing = value[businessId];
    return Array.isArray(existing) && existing.length === 13 ? existing : new Array(13).fill(false);
  }, [businessId, value]);

  const setWeekComplete = useCallback(
    (weekIndex: number, checked: boolean) => {
      setValue((previous) => {
        const next = { ...previous };
        const current =
          Array.isArray(next[businessId]) && next[businessId].length === 13
            ? [...next[businessId]]
            : new Array(13).fill(false);
        current[weekIndex] = checked;
        next[businessId] = current;
        return next;
      });
    },
    [businessId, setValue]
  );

  return { hydrated, progress, setWeekComplete };
}

export function useKpiState(businessId: string, fallback: KPIData) {
  const { hydrated, value, setValue } = usePersistentState<Record<string, KPIData>>(STORAGE_KEYS.kpiMap, {});
  const kpis = value[businessId] ?? fallback;

  const updateKpis = useCallback(
    (next: KPIData) => {
      setValue((previous) => ({
        ...previous,
        [businessId]: next
      }));
    },
    [businessId, setValue]
  );

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

  const replaceHistory = useCallback(
    (messages: ChatMessage[]) => {
      setValue((previous) => ({
        ...previous,
        [businessId]: messages
      }));
    },
    [businessId, setValue]
  );

  return { hydrated, history, replaceHistory };
}
