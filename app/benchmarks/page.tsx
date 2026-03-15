"use client";

import { useMemo } from "react";

import { KPIInputs } from "@/components/KPIInputs";
import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { businesses } from "@/data/businesses";
import { getPricingHref, hasTierAccess, tierLabels } from "@/utils/access";
import { defaultKpiData, getFallbackBusiness, getTrackStatus, milestoneTemplate, buildBlueprint } from "@/utils/benchmarks";
import { getCompletedWeeks } from "@/utils/benchmarks";
import { useAccessProfile, useBlueprintProgress, useKpiState } from "@/utils/storage";

export default function BenchmarksPage() {
  const { profile } = useAccessProfile();
  const business = useMemo(() => getFallbackBusiness(profile.selectedBusinessId), [profile.selectedBusinessId]);
  const { progress } = useBlueprintProgress(business.id);
  const { kpis, setKpis } = useKpiState(business.id, defaultKpiData);
  const hasCoreAccess = hasTierAccess(profile.tier, "core");

  const completedWeeks = getCompletedWeeks(progress);
  const trackStatus = getTrackStatus(business, progress, kpis);
  const currentPhase = buildBlueprint(business).find((phase) => phase.title === trackStatus.phaseTitle);

  if (!hasCoreAccess) {
    return (
      <div className="mx-auto max-w-5xl animate-fade-up">
        <LockedFeatureCard
          title="Benchmarks unlock with Core"
          requiredTier="core"
          description="Preview is for exploring service opportunities. KPI tracking, on-track indicators, and weekly scorecards unlock in Core."
          bullets={[
            "Weekly lead, quote, jobs won, revenue, and review tracking",
            "Phase-aware benchmark targets and on-track status",
            "Timeline visibility to keep launch execution disciplined"
          ]}
          ctaHref={getPricingHref("core")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl animate-fade-up">
      <section className="panel-surface p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Benchmarks</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Weekly KPI dashboard</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          Track lead flow, quote speed, jobs won, revenue, and reviews against the current phase of your selected blueprint.
        </p>
      </section>

      <section className="mt-6 panel-surface p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted">Selected business: {business.name}</p>
          <p className="text-sm text-slate-200">Current phase: {trackStatus.phaseTitle}</p>
          <p className="text-sm text-slate-200">Access tier: {tierLabels[profile.tier]}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Typical ranges; results vary.</p>
        </div>

        <div className="mt-6">
          <KPIInputs value={kpis} onChange={setKpis} />
        </div>

        <div
          className={`mt-6 rounded-[24px] border px-5 py-4 ${
            trackStatus.onTrack ? "border-accentSecondary/40 bg-accentSecondary/10" : "border-warning/40 bg-warning/10"
          }`}
        >
          <p className="text-lg font-semibold text-white">
            {trackStatus.onTrack ? "You're on track." : "You're behind target."}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{trackStatus.summary}</p>
          {currentPhase && (
            <ul className="mt-4 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
              {currentPhase.tasks.slice(0, 3).map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="mt-6 panel-surface p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Weekly timeline (Weeks 1-13)</h2>
            <p className="mt-2 text-sm text-muted">Completed weeks are highlighted based on your progress tracker.</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            {completedWeeks}/13 complete
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {milestoneTemplate.map((milestone, index) => {
            const week = index + 1;
            const done = week <= completedWeeks;

            return (
              <article
                key={milestone}
                className={`rounded-[20px] border p-4 ${
                  done ? "border-accentSecondary/40 bg-accentSecondary/10" : "border-white/10 bg-white/5"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Week {week}</p>
                <p className="mt-2 text-sm leading-6 text-white">{milestone}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
