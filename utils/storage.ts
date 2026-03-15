"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { ChatMessage, KPIData } from "@/types/business";

export const STORAGE_KEYS = {
  selectedBusiness: "sla_selected_business",
  activeBlueprint: "sla_active_blueprint",
  progressMap: "sla_progress_map",
  kpiMap: "sla_kpi_map",
  chatMap: "sla_chat_map"
} as const;

const AUTH_COOKIE = "sla-access-token";

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
}

export function setAccessCookie(token: string, expiresAt?: number | null) {
  if (typeof document === "undefined") {
    return;
  }

  const expires = expiresAt ? `; expires=${new Date(expiresAt * 1000).toUTCString()}` : "";
  document.cookie = `${AUTH_COOKIE}=${token}; path=/; SameSite=Lax${expires}`;
}

export function clearAccessCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
}

export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(readStorage(key, fallback));
    setHydrated(true);
  }, [fallback, key]);

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

export function useSelectedBusiness(defaultBusinessId: string) {
  const { hydrated, value, setValue } = usePersistentState<string>(
    STORAGE_KEYS.selectedBusiness,
    defaultBusinessId
  );

  useEffect(() => {
    if (!hydrated || value) {
      return;
    }
    setValue(defaultBusinessId);
  }, [defaultBusinessId, hydrated, setValue, value]);

  return {
    hydrated,
    selectedBusinessId: value || defaultBusinessId,
    setSelectedBusinessId: setValue
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
        const current = Array.isArray(next[businessId]) && next[businessId].length === 13
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

  const appendMessage = useCallback(
    (message: ChatMessage) => {
      setValue((previous) => ({
        ...previous,
        [businessId]: [...(previous[businessId] ?? [initialMessage]), message]
      }));
    },
    [businessId, initialMessage, setValue]
  );

  const replaceHistory = useCallback(
    (messages: ChatMessage[]) => {
      setValue((previous) => ({
        ...previous,
        [businessId]: messages
      }));
    },
    [businessId, setValue]
  );

  return { hydrated, history, appendMessage, replaceHistory };
}
