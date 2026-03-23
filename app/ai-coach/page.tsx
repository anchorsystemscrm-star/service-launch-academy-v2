"use client";

import { useState } from "react";

import { ChatWindow } from "@/components/ChatWindow";
import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { getCheckoutHref, hasTierAccess, tierLabels } from "@/utils/access";
import {
  buildBlueprint,
  defaultChatIntro,
  getFallbackBusiness,
  getPhaseIndexByProgress,
} from "@/utils/benchmarks";
import {
  useAccessProfile,
  useBlueprintProgress,
  useChatHistory,
} from "@/utils/storage";

export default function AICoachPage() {
  const { profile } = useAccessProfile();
  const business = getFallbackBusiness(profile.selectedBusinessId);
  const { progress } = useBlueprintProgress(business.id, business.executionPlan);
  const initialMessage = defaultChatIntro(business);
  const { history, replaceHistory } = useChatHistory(business.id, initialMessage);
  const [isLoading, setIsLoading] = useState(false);

  const hasProAccess = hasTierAccess(profile.tier, "pro");

  const phases = buildBlueprint(business);
  const currentPhase = phases[getPhaseIndexByProgress(progress)];

  const promptGroups = [
    { title: "Setup", prompts: business.promptSuggestions.setup },
    { title: "Pricing", prompts: business.promptSuggestions.pricing },
    { title: "Marketing", prompts: business.promptSuggestions.marketing },
    { title: "Operations", prompts: business.promptSuggestions.operations },
    { title: "Sales", prompts: business.promptSuggestions.sales },
  ];

  async function handleSendMessage(message: string) {
    const trimmed = message.trim();

    if (!trimmed || isLoading) return;

    const optimisticHistory = [
      ...history,
      { role: "user" as const, text: trimmed },
    ];

    replaceHistory(optimisticHistory);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          business: {
            id: business.id,
            name: business.name,
            summary: business.summary,
          },
          currentPhase: {
            title: currentPhase.title,
            tasks: currentPhase.tasks,
          },
          progress,
          tier: profile.tier,
          history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "AI coach request failed.");
      }

      replaceHistory([
        ...optimisticHistory,
        {
          role: "assistant" as const,
          text: data.reply || data.text || "I couldn't generate a useful answer.",
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "The AI coach ran into an error.";

      replaceHistory([
        ...optimisticHistory,
        {
          role: "assistant" as const,
          text: `I hit an error while generating a response: ${errorMessage}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  if (!hasProAccess) {
    return (
      <div className="mx-auto max-w-5xl animate-fade-up">
        <LockedFeatureCard
          title="AI Coach unlocks with Pro"
          requiredTier="pro"
          description="Core gives you the full playbook. Pro adds guided AI help so pricing, marketing, operations, and follow-up stop feeling blank."
          bullets={[
            business.promptSuggestions.setup[0],
            business.promptSuggestions.pricing[0],
            business.promptSuggestions.sales[0],
          ]}
          ctaHref={getCheckoutHref("pro")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl animate-fade-up">
      <section className="panel-surface p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          AI Coach
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          Tactical guidance for the current phase.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          Ask anything about pricing, setup, marketing, operations, scripts, objections,
          lead handling, fulfillment, or growth. Responses are tailored to the selected
          business and current phase.
        </p>
        {isLoading && (
          <p className="mt-4 text-sm text-accent">Generating response...</p>
        )}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <ChatWindow
          history={history}
          onSendMessage={handleSendMessage}
          promptGroups={promptGroups}
        />

        <aside className="panel-surface p-6">
          <h2 className="text-xl font-semibold text-white">Context</h2>

          <div className="mt-5 grid gap-4">
            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Access Tier
              </p>
              <p className="mt-2 text-sm text-white">{tierLabels[profile.tier]}</p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Selected Business
              </p>
              <p className="mt-2 text-sm text-white">{business.name}</p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Current Phase
              </p>
              <p className="mt-2 text-sm text-white">{currentPhase.title}</p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Prompt categories
              </p>
              <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                {Object.keys(business.promptSuggestions).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Next 3 Recommended Actions
              </p>
              <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                {currentPhase.tasks.slice(0, 3).map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
