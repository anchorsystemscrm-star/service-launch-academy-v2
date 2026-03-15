"use client";

import { useEffect, useMemo, useState } from "react";

import { PhaseCard } from "@/components/PhaseCard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ScriptCard } from "@/components/ScriptCard";
import { businesses } from "@/data/businesses";
import { getLockedCopy, hasTierAccess, tierLabels } from "@/utils/access";
import { getFallbackBusiness, buildBlueprint, buildScripts } from "@/utils/benchmarks";
import { useAccessProfile, useActiveBlueprint, useBlueprintProgress } from "@/utils/storage";

const tabs = [
  { id: "plan", label: "90-Day Plan", minTier: "preview" },
  { id: "costs", label: "Costs & Tools", minTier: "preview" },
  { id: "scripts", label: "Scripts", minTier: "preview" },
  { id: "anchor", label: "Anchor Setup", minTier: "elite" }
] as const;

export default function BlueprintPage() {
  const { profile } = useAccessProfile();
  const { activeBlueprintId, setActiveBlueprintId } = useActiveBlueprint();
  const business = useMemo(() => getFallbackBusiness(profile.selectedBusinessId), [profile.selectedBusinessId]);
  const { progress, setWeekComplete } = useBlueprintProgress(business.id);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("plan");

  const phases = useMemo(() => buildBlueprint(business), [business]);
  const scripts = useMemo(() => buildScripts(business), [business]);
  const costs = [
    ["Equipment", business.costs.equipment],
    ["Insurance", business.costs.insurance],
    ["Marketing", business.costs.marketing],
    ["Software", business.costs.software],
    ["Misc", business.costs.misc]
  ];
  const isActive = activeBlueprintId === business.id;
  const canAccessAnchor = hasTierAccess(profile.tier, "elite");

  useEffect(() => {
    if (activeTab === "anchor" && !canAccessAnchor) {
      setActiveTab("plan");
    }
  }, [activeTab, canAccessAnchor]);

  return (
    <div className="mx-auto max-w-7xl animate-fade-up">
      <section className="panel-surface p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Blueprint</p>
        <div className="mt-3 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">90-day blueprint</h1>
            <p className="mt-3 text-base leading-7 text-muted">Selected: {business.name}</p>
          </div>

          <label className="flex items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-white/5 px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-white">Set as my active blueprint</p>
              <p className="mt-1 text-sm text-muted">Pin this launch so it stays at the center of the workspace.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={isActive}
              onClick={() => setActiveBlueprintId(isActive ? null : business.id)}
              className={`relative h-8 w-14 rounded-full border transition ${
                isActive ? "border-accentSecondary/60 bg-accentSecondary/25" : "border-white/10 bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                  isActive ? "left-7" : "left-1"
                }`}
              />
            </button>
          </label>
        </div>
        <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
          Current tier: {tierLabels[profile.tier]}
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="grid gap-6">
          <section className="panel-surface p-6">
            <h2 className="text-lg font-semibold text-white">{business.name}</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Startup Cost:</span> {business.startup_cost_range}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">90 Days (Gross):</span> {business.revenue_90_range}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">1 Year (Gross):</span> {business.revenue_1yr_range}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Margin Range:</span> {business.margin_range}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Difficulty:</span> {business.difficulty}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Recommended First Offer:</span> {business.recommended_first_offer}
              </div>
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">Typical ranges; results vary.</p>
          </section>

          <ProgressTracker progress={progress} onToggleWeek={setWeekComplete} />
        </div>

        <section className="panel-surface p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              hasTierAccess(profile.tier, tab.minTier) ? (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "border border-accent/60 bg-accent/10 text-white"
                      : "border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ) : (
                <button
                  key={tab.id}
                  type="button"
                  disabled
                  title={getLockedCopy(tab.minTier)}
                  className="cursor-not-allowed rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-500"
                >
                  {tab.label}
                </button>
              )
            ))}
          </div>

          {activeTab === "plan" && (
            <div className="mt-6 grid gap-4">
              {phases.map((phase) => (
                <PhaseCard key={phase.title} phase={phase} />
              ))}
            </div>
          )}

          {activeTab === "costs" && (
            <div className="mt-6 grid gap-6">
              <div className="overflow-hidden rounded-[24px] border border-white/10">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted">Estimated Range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 bg-slate-950/40">
                    {costs.map(([label, value]) => (
                      <tr key={label}>
                        <td className="px-4 py-3 text-sm text-white">{label}</td>
                        <td className="px-4 py-3 text-sm text-slate-200">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">Tools / equipment checklist</h3>
                <ul className="mt-4 grid gap-3 pl-5 text-sm leading-6 text-slate-200">
                  {business.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "scripts" && (
            <div className="mt-6 grid gap-4">
              {scripts.map((script) => (
                <ScriptCard key={script.title} script={script} />
              ))}
            </div>
          )}

          {activeTab === "anchor" && canAccessAnchor && (
            <div className="mt-6 grid gap-6">
              <p className="section-copy">
                Anchor Systems keeps your launch simple: track leads in a pipeline, send missed-call text-back, automate
                follow-ups, handle scheduling, and collect invoices from one place.
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                {[
                  {
                    title: "Pipeline",
                    body: "New Lead → Contacted → Quote Sent → Won/Lost. Keep every opportunity visible."
                  },
                  {
                    title: "Missed Call Text-Back",
                    body: 'If you miss a call, send an instant "Sorry I missed you" message with booking link.'
                  },
                  {
                    title: "Follow-Up Automation",
                    body: "Trigger Day 2 / Day 7 reminders for open quotes so leads do not go cold."
                  },
                  {
                    title: "Scheduling + Invoices",
                    body: "Book jobs, send confirmation reminders, and issue invoices after completion."
                  }
                ].map((item) => (
                  <article key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-200">{item.body}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-3">
                {[
                  {
                    title: "Automation 1: New Lead Nurture",
                    body: "Immediately sends a thank-you text, requests service details, and creates a task to call within 15 minutes during business hours."
                  },
                  {
                    title: "Automation 2: Missed Call Recovery",
                    body: "Triggers a polite text with service menu and call-back button whenever an inbound call is missed."
                  },
                  {
                    title: "Automation 3: Quote Follow-Up",
                    body: "If quote remains open after 48 hours, sends a check-in text. If still open after 7 days, sends final reminder and limited-slot note."
                  },
                  {
                    title: "Automation 4: Review Request",
                    body: "One day after paid invoice, sends review request with direct review link and a short thank-you message."
                  }
                ].map((automation) => (
                  <details key={automation.title} className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4">
                    <summary className="cursor-pointer text-sm font-semibold text-white">{automation.title}</summary>
                    <p className="mt-3 text-sm leading-6 text-slate-200">{automation.body}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {!canAccessAnchor && (
            <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-semibold text-white">Elite access unlocks advanced Anchor setup.</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                The launch plan, cost model, and scripts remain available at your current tier. Upgrade to Elite to unlock
                advanced automation previews and system setup details.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
