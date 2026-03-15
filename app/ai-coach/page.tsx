"use client";

import { useMemo } from "react";

import { ChatWindow } from "@/components/ChatWindow";
import { businesses } from "@/data/businesses";
import { tierLabels } from "@/utils/access";
import { buildBlueprint, defaultChatIntro, getCoachResponse, getFallbackBusiness, getPhaseIndexByProgress } from "@/utils/benchmarks";
import { useAccessProfile, useBlueprintProgress, useChatHistory } from "@/utils/storage";

export default function AICoachPage() {
  const { profile } = useAccessProfile();
  const business = useMemo(() => getFallbackBusiness(profile.selectedBusinessId), [profile.selectedBusinessId]);
  const { progress } = useBlueprintProgress(business.id);
  const initialMessage = useMemo(() => defaultChatIntro(business), [business]);
  const { history, replaceHistory } = useChatHistory(business.id, initialMessage);

  const phases = useMemo(() => buildBlueprint(business), [business]);
  const currentPhase = phases[getPhaseIndexByProgress(progress)];

  function handleSendMessage(message: string) {
    const nextHistory = [
      ...history,
      { role: "user" as const, text: message },
      { role: "assistant" as const, text: getCoachResponse(message, business, progress) }
    ];

    replaceHistory(nextHistory);
  }

  return (
    <div className="mx-auto max-w-7xl animate-fade-up">
      <section className="panel-surface p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">AI Coach</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Tactical guidance for the current phase.</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          Demo assistant with keyword-based guidance. No external API calls. Use it to tighten pricing, lead generation,
          scripts, tools, or operating fundamentals.
        </p>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <ChatWindow history={history} onSendMessage={handleSendMessage} />

        <aside className="panel-surface p-6">
          <h2 className="text-xl font-semibold text-white">Context</h2>

          <div className="mt-5 grid gap-4">
            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Access Tier</p>
              <p className="mt-2 text-sm text-white">{tierLabels[profile.tier]}</p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Selected Business</p>
              <p className="mt-2 text-sm text-white">{business.name}</p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Current Phase</p>
              <p className="mt-2 text-sm text-white">{currentPhase.title}</p>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Next 3 Recommended Actions</p>
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
