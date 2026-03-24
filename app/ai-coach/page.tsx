"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { CoachComposer } from "@/components/ai-coach/CoachComposer";
import { CoachResponseRenderer } from "@/components/ai-coach/CoachResponseRenderer";
import { CoachAction, CoachMode } from "@/lib/ai/coachTypes";
import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { defaultKpiData, getFallbackBusiness, getPhaseIndexByProgress } from "@/utils/benchmarks";
import {
  canSaveCoachOutput,
  canUseCoachMode,
  getCheckoutHref,
  getCoachSaveLimit,
  hasTierAccess,
  tierLabels
} from "@/utils/access";
import {
  createCoachMessage,
  createSavedCoachOutput,
  getRecentCoachMessages,
  useAccessProfile,
  useBusinessPanel,
  useKpiState,
  useBlueprintProgress,
  useCoachConversation,
  useCoachSummary,
  useSavedCoachOutputs
} from "@/utils/storage";
import { CoachResponse } from "@/lib/ai/coachTypes";

export default function AICoachPage() {
  const isDev = process.env.NODE_ENV !== "production";
  const searchParams = useSearchParams();
  const { profile } = useAccessProfile();
  const business = getFallbackBusiness(profile.selectedBusinessId);
  const { progress, taskProgress } = useBlueprintProgress(business.id, business.executionPlan);
  const { kpis } = useKpiState(business.id, defaultKpiData);
  const { panel: businessPanel } = useBusinessPanel(business, progress, taskProgress, kpis);
  const currentPhase = business.blueprintPhases[getPhaseIndexByProgress(progress)];
  const initialMessage = createCoachMessage({
    role: "assistant",
    buildStage: "pricing",
    content:
      `You're coaching for ${business.name}. Ask for pricing, scripts, checklists, SOPs, follow-up plans, or creative assets.\n` +
      "The coach will use your current business and blueprint phase as context."
  });
  const { messages, replaceMessages } = useCoachConversation(business.id, initialMessage);
  const { summary, setSummary } = useCoachSummary(business.id);
  const { savedOutputs, saveOutput, deleteOutput } = useSavedCoachOutputs(business.id);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<CoachMode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedSavedOutputId, setSelectedSavedOutputId] = useState<string | null>(null);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const [liveResponse, setLiveResponse] = useState<CoachResponse | null>(null);
  const requestInFlightRef = useRef(false);
  const autoRunKeyRef = useRef<string | null>(null);

  const hasProAccess = hasTierAccess(profile.tier, "pro");
  const hasEliteAccess = hasTierAccess(profile.tier, "elite");

  const completedTasks = business.executionPlan.flatMap((stage, stageIndex) =>
    stage.checklist
      .filter((_, taskIndex) => taskProgress[stageIndex]?.[taskIndex])
      .map((item) => item.title)
  );

  const quickActions = [
    {
      label: "Build Pricing",
      mode: "pricing" as const,
      prompt: `Build a premium 3-tier pricing plan for ${business.name} around "${business.recommended_first_offer}".`
    },
    {
      label: "Write Script",
      mode: "script" as const,
      prompt: `Write a sales script for ${business.name} that sells "${business.recommended_first_offer}" without sounding generic.`
    },
    {
      label: "Generate Checklist",
      mode: "checklist" as const,
      prompt: `Create a tactical launch checklist for my current ${business.name} phase.`
    },
    {
      label: "Follow-Up Plan",
      mode: "followup" as const,
      prompt: `Create a quote follow-up sequence for ${business.name} leads that did not book right away.`
    },
    {
      label: "Marketing Plan",
      mode: "marketing" as const,
      prompt: `Build a 14-day local marketing plan for ${business.name} using realistic lead channels.`,
      locked: !canUseCoachMode(profile.tier, "marketing")
    },
    {
      label: "SOP Builder",
      mode: "sop" as const,
      prompt: `Build an intake-to-invoice SOP for my ${business.name} business.`,
      locked: !canUseCoachMode(profile.tier, "sop")
    },
    {
      label: "Generate Logo",
      mode: "image" as const,
      prompt: `Generate a premium logo concept for my ${business.name} business.`,
      locked: !canUseCoachMode(profile.tier, "image")
    }
  ];

  const latestAssistantMessage = [...messages]
    .reverse()
    .find((message) => message.role === "assistant");
  const selectedSavedOutput = savedOutputs.find((item) => item.id === selectedSavedOutputId) ?? null;
  const persistedLatestResponse = useMemo(() => {
    if (!latestAssistantMessage?.mode) {
      return null;
    }

    return {
      mode: latestAssistantMessage.mode,
      buildStage: latestAssistantMessage.buildStage,
      title: latestAssistantMessage.title,
      text: latestAssistantMessage.content,
      structured: latestAssistantMessage.structured,
      image: latestAssistantMessage.image,
      suggestions: latestAssistantMessage.suggestions,
      primaryAction: latestAssistantMessage.primaryAction,
      actions: latestAssistantMessage.actions,
      nextStep: latestAssistantMessage.nextStep,
      secondaryNextSteps: latestAssistantMessage.secondaryNextSteps,
      anchorBridge: latestAssistantMessage.anchorBridge
    } satisfies CoachResponse;
  }, [latestAssistantMessage]);
  const activeResponse = selectedSavedOutput ?? liveResponse ?? persistedLatestResponse ?? null;
  const recentConversation = messages.slice(-6);
  const isImageLoading = isLoading && loadingMode === "image";
  const autoPrompt = searchParams.get("autoprompt");
  const autoPromptMode = searchParams.get("mode");

  async function handleSendMessage(
    message: string,
    requestedMode?: CoachMode,
    action?: CoachAction
  ): Promise<boolean> {
    const trimmed = message.trim();

    if (!trimmed || isLoading || requestInFlightRef.current) {
      return false;
    }

    requestInFlightRef.current = true;
    setError(null);
    setSaveNotice(null);
    setSelectedSavedOutputId(null);
    setLoadingMode(requestedMode ?? null);

    const optimisticMessages = [
      ...messages,
      createCoachMessage({
        role: "user",
        content: trimmed,
        mode: requestedMode
      })
    ];

    replaceMessages(optimisticMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: trimmed,
          requestedMode,
          context: {
            businessId: business.id,
            businessName: businessPanel.businessName || undefined,
            businessType: businessPanel.serviceType || business.name,
            phase: currentPhase.title,
            entryOffer: businessPanel.starterOffer || business.recommended_first_offer,
            keyInclusions: businessPanel.keyInclusions || undefined,
            serviceArea: businessPanel.serviceArea || undefined,
            priceFloor: businessPanel.priceFloor || undefined,
            phone: businessPanel.phone || undefined,
            bookingMethod: businessPanel.bookingMethod || undefined,
            paymentMethod: businessPanel.paymentMethod || undefined,
            leadCount: businessPanel.leads,
            quotedCount: businessPanel.quoted,
            bookedCount: businessPanel.booked,
            completedCount: businessPanel.completed,
            budgetRange: business.startup_cost_range,
            accessTier: profile.tier,
            completedTasks,
            selectedCategory: requestedMode,
            preferredPositioning: "premium, fast-response, trustworthy, professionally run"
          },
          conversation: {
            summary,
            recentMessages: getRecentCoachMessages(messages, 6)
          },
          imageRefinement: action?.imageRefinement
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "AI coach request failed.");
      }

      if (typeof data.updatedSummary === "string") {
        setSummary(data.updatedSummary);
      }

      replaceMessages([
        ...optimisticMessages,
        createCoachMessage({
          role: "assistant",
          content: data.text || "The coach returned an empty response.",
          buildStage: data.buildStage,
          mode: data.mode,
          title: data.title,
          structured: data.structured,
          image: data.image,
          suggestions: data.suggestions,
          primaryAction: data.primaryAction,
          actions: data.actions,
          nextStep: data.nextStep,
          secondaryNextSteps: data.secondaryNextSteps,
          anchorBridge: data.anchorBridge
        })
      ]);

      setLiveResponse({
        mode: data.mode,
        buildStage: data.buildStage,
        title: data.title,
        text: data.text || "The coach returned an empty response.",
        structured: data.structured,
        image: data.image,
        suggestions: data.suggestions,
        primaryAction: data.primaryAction,
        actions: data.actions,
        nextStep: data.nextStep,
        secondaryNextSteps: data.secondaryNextSteps,
        anchorBridge: data.anchorBridge
      });
      return true;
    } catch (requestError) {
      const errorMessage =
        requestError instanceof Error ? requestError.message : "The AI coach ran into an error.";

      setError(errorMessage);
      setLiveResponse(null);
      replaceMessages([
        ...optimisticMessages,
        createCoachMessage({
          role: "assistant",
          content: `I hit an error while generating this output: ${errorMessage}`
        })
      ]);
      return false;
    } finally {
      setIsLoading(false);
      setLoadingMode(null);
      requestInFlightRef.current = false;
    }
  }

  function handleSaveCurrent() {
    if (!activeResponse || !("mode" in activeResponse) || !activeResponse.mode) {
      return;
    }

    const activeResponseText =
      typeof activeResponse === "object" && activeResponse !== null && "content" in activeResponse
        ? typeof activeResponse.content === "string"
          ? activeResponse.content
          : undefined
        : activeResponse.text;

    if (!canSaveCoachOutput(profile.tier, activeResponse.mode)) {
      setSaveNotice(
        activeResponse.mode === "image"
          ? "Image assets save with Elite."
          : "Saving coach outputs unlocks with Pro."
      );
      return;
    }

    const saveLimit = getCoachSaveLimit(profile.tier);

    if (savedOutputs.length >= saveLimit) {
      setSaveNotice(`Saved output limit reached for ${tierLabels[profile.tier]}.`);
      return;
    }

    const saved = createSavedCoachOutput({
      businessId: business.id,
      businessContext: {
        businessId: business.id,
        businessName: businessPanel.businessName || undefined,
        businessType: businessPanel.serviceType || business.name,
        phase: currentPhase.title,
        entryOffer: business.recommended_first_offer,
        serviceArea: businessPanel.serviceArea || undefined,
        priceFloor: businessPanel.priceFloor || undefined,
        phone: businessPanel.phone || undefined,
        bookingMethod: businessPanel.bookingMethod || undefined,
        paymentMethod: businessPanel.paymentMethod || undefined,
        budgetRange: business.startup_cost_range,
        accessTier: profile.tier,
        completedTasks
      },
      mode: activeResponse.mode,
      buildStage: activeResponse.buildStage,
      title:
        activeResponse.title ||
        `${business.name} ${activeResponse.mode ? activeResponse.mode.charAt(0).toUpperCase() + activeResponse.mode.slice(1) : "Coach"} Output`,
      prompt:
        "prompt" in activeResponse
          ? activeResponse.prompt
          : messages[messages.length - 1]?.role === "user"
            ? messages[messages.length - 1].content
            : "Saved from AI Coach",
      text: activeResponseText,
      structured: activeResponse.structured,
      image: activeResponse.image,
      primaryAction: activeResponse.primaryAction,
      actions: activeResponse.actions,
      nextStep: activeResponse.nextStep,
      secondaryNextSteps: activeResponse.secondaryNextSteps,
      anchorBridge: activeResponse.anchorBridge
    });

    saveOutput(saved);
    setSelectedSavedOutputId(saved.id);
    setSaveNotice("Saved to your coach workspace.");
  }

  function handleActionClick(action: CoachAction) {
    void handleSendMessage(action.prompt, action.mode, action);
  }

  useEffect(() => {
    if (!hasProAccess || !autoPrompt) {
      return;
    }

    const autoRunKey = `${autoPromptMode ?? "general"}:${autoPrompt}`;

    if (autoRunKeyRef.current === autoRunKey) {
      return;
    }

    autoRunKeyRef.current = autoRunKey;

    const requestedMode =
      autoPromptMode &&
      ["general", "pricing", "checklist", "script", "marketing", "sop", "followup", "image"].includes(autoPromptMode)
        ? (autoPromptMode as CoachMode)
        : undefined;

    void handleSendMessage(autoPrompt, requestedMode).finally(() => {
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", "/ai-coach");
      }
    });
  }, [autoPrompt, autoPromptMode, hasProAccess]);

  if (!hasProAccess) {
    return (
      <div className="mx-auto max-w-5xl animate-fade-up">
        <LockedFeatureCard
          title="AI Coach unlocks with Pro"
          requiredTier="pro"
          description="Core gives you the full playbook. Pro adds tactical AI help so pricing, scripts, follow-up, and launch decisions stop feeling blank."
          bullets={[
            `Build structured pricing for ${business.name}`,
            `Generate scripts and checklists for ${business.recommended_first_offer}`,
            "Use Elite to unlock SOP planning, marketing strategy, and image generation"
          ]}
          ctaHref={getCheckoutHref("pro")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl overflow-x-hidden animate-fade-up">
      <section className="panel-surface w-full max-w-full overflow-hidden p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">AI Coach</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Premium in-app business assistant
        </h1>
        <p className="mt-4 max-w-4xl break-words text-base leading-7 text-muted">
          Generate operator-grade outputs for the business you selected. The coach uses your current blueprint phase, offer, and progress so the guidance stays specific instead of generic.
        </p>
      </section>

      <div className="mt-6 grid w-full max-w-full grid-cols-1 gap-6 overflow-x-hidden xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid w-full min-w-0 max-w-full gap-5 sm:gap-6">
          <CoachComposer
            loading={isLoading}
            loadingMode={loadingMode}
            onSendMessage={handleSendMessage}
            quickActions={quickActions}
          />

          {error ? (
            <div className="rounded-[24px] border border-warning/40 bg-warning/10 px-5 py-4 text-sm text-white">
              {error}
            </div>
          ) : null}

          {isImageLoading ? (
            <div className="rounded-[24px] border border-accent/20 bg-accent/5 px-5 py-4 text-sm text-white">
              Generating logo concept. Stay on this page while the image request completes.
            </div>
          ) : null}

          {activeResponse ? (
            <section className="grid gap-4">
              <div className="flex w-full max-w-full flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-slate-200">
                  {selectedSavedOutput ? "Saved output" : "Latest output"}
                </span>
                <span className="break-words text-muted">
                  {selectedSavedOutput
                    ? `Saved ${new Date(selectedSavedOutput.createdAt).toLocaleDateString()}`
                    : "Generated from your current business context"}
                </span>
                {selectedSavedOutput ? (
                  <button
                    type="button"
                    onClick={() => setSelectedSavedOutputId(null)}
                    className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white/20 hover:bg-white/10"
                  >
                    Return to latest
                  </button>
                ) : null}
              </div>

              {saveNotice ? (
                <div className="rounded-[22px] border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-slate-100">
                  {saveNotice}
                </div>
              ) : null}

              <CoachResponseRenderer
                response={activeResponse}
                onActionClick={handleActionClick}
                onSave={!selectedSavedOutput ? handleSaveCurrent : undefined}
              />
            </section>
          ) : null}
        </div>

        <aside className="grid w-full min-w-0 max-w-full gap-6">
          <details className="panel-surface w-full max-w-full overflow-hidden p-5 sm:p-6" open={false}>
            <summary className="flex w-full max-w-full cursor-pointer list-none flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Saved outputs</p>
                <p className="mt-2 break-words text-sm text-muted">
                  Reopen strong work without keeping it in the main flow.
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                {savedOutputs.length}
              </span>
            </summary>

            {savedOutputs.length ? (
              <div className="mt-5 grid w-full max-w-full gap-3">
                {savedOutputs.map((item) => (
                  <article
                    key={item.id}
                    className={`w-full max-w-full overflow-hidden rounded-[22px] border p-4 ${
                      selectedSavedOutputId === item.id
                        ? "border-accent/40 bg-accent/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
                          {item.mode} • {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteOutput(item.id)}
                        className="text-xs font-semibold uppercase tracking-[0.14em] text-muted transition hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                    <p className="mt-3 max-h-[4.5rem] overflow-hidden break-words text-sm leading-6 text-slate-200">{item.prompt}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedSavedOutputId(item.id)}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white/20 hover:bg-white/10"
                    >
                      Open
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm leading-6 text-muted">
                Save pricing, scripts, and creative assets here when you want them reusable later.
              </p>
            )}
          </details>

          <details className="panel-surface w-full max-w-full overflow-hidden p-5 sm:p-6" open={false}>
            <summary className="flex w-full max-w-full cursor-pointer list-none flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Coach details</p>
                <p className="mt-2 break-words text-sm text-muted">
                  Context, memory, and recent messages stay here when you need them.
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                Hidden by default
              </span>
            </summary>

            <div className="mt-5 grid w-full max-w-full gap-4">
              <div className="grid w-full max-w-full grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Selected business</p>
                  <p className="mt-2 break-words text-sm text-white">{business.name}</p>
                </div>
                <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Current phase</p>
                  <p className="mt-2 break-words text-sm text-white">{currentPhase.title}</p>
                </div>
                <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Entry offer</p>
                  <p className="mt-2 break-words text-sm text-white">{business.recommended_first_offer}</p>
                </div>
                <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Access tier</p>
                  <p className="mt-2 break-words text-sm text-white">{tierLabels[profile.tier]}</p>
                </div>
                <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Completed tasks tracked</p>
                  <p className="mt-2 text-sm text-white">{completedTasks.length}</p>
                </div>
                <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Build stage</p>
                  <p className="mt-2 break-words text-sm capitalize text-white">{activeResponse?.buildStage || "pricing"}</p>
                </div>
              </div>

              <div className="w-full max-w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Working memory</p>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-100">
                  {summary || "The coach will start building lightweight memory after your first request."}
                </p>
              </div>

              <div className="w-full max-w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-4">
                <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Recent conversation</p>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                    {recentConversation.length}
                  </span>
                </div>
                <div className="mt-4 grid w-full max-w-full gap-3">
                  {recentConversation.map((message) => (
                    <article
                      key={message.id}
                      className={`w-full max-w-full overflow-hidden rounded-[18px] border px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "border-accent/30 bg-accent/10 text-white"
                          : "border-white/10 bg-white/5 text-slate-100"
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {message.role === "user" ? "You" : message.title || "Coach"}
                      </p>
                      <p className="mt-2 whitespace-pre-wrap break-words">{message.content}</p>
                    </article>
                  ))}
                </div>
              </div>

              {isDev ? (
                <div className="rounded-[22px] border border-dashed border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Dev diagnostics</p>
                  <p className="mt-3 text-sm leading-6 text-slate-100">
                    Save capacity: {savedOutputs.length}/{getCoachSaveLimit(profile.tier)}
                  </p>
                </div>
              ) : null}

              {!hasEliteAccess ? (
                <div className="rounded-[22px] border border-accent/20 bg-accent/5 p-4">
                  <p className="text-sm font-semibold text-white">Elite unlocks advanced planning + image generation</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Use Elite for marketing plans, SOP builders, logo concepts, flyer directions, truck wraps, and other higher-leverage assets.
                  </p>
                </div>
              ) : null}
            </div>
          </details>
        </aside>
      </div>
    </div>
  );
}
