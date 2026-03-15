"use client";

import { Business } from "@/types/business";

interface BusinessCardProps {
  business: Business;
  tagLabels: Record<string, string>;
  onSelect: (businessId: string) => void;
  isActiveBlueprint?: boolean;
}

export function BusinessCard({ business, tagLabels, onSelect, isActiveBlueprint = false }: BusinessCardProps) {
  return (
    <article className="group flex min-h-[300px] flex-col rounded-[24px] border border-white/10 bg-panel-gradient p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-premium">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{business.name}</h3>
          <p className="mt-2 text-sm text-muted">Recommended first offer: {business.recommended_first_offer}</p>
        </div>
        {isActiveBlueprint && (
          <span className="rounded-full border border-accentSecondary/40 bg-accentSecondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            Active
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {business.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-slate-100">
            {tagLabels[tag] ?? tag}
          </span>
        ))}
      </div>

      <dl className="mt-5 grid gap-3 text-sm text-slate-200">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/10 px-3 py-2">
          <dt className="text-muted">Startup</dt>
          <dd>{business.startup_cost_range}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/10 px-3 py-2">
          <dt className="text-muted">90 Days</dt>
          <dd>{business.revenue_90_range}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/10 px-3 py-2">
          <dt className="text-muted">1 Year</dt>
          <dd>{business.revenue_1yr_range}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/10 px-3 py-2">
          <dt className="text-muted">Margin</dt>
          <dd>{business.margin_range}</dd>
        </div>
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/10 px-3 py-2">
          <dt className="text-muted">Difficulty</dt>
          <dd>{business.difficulty}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={() => onSelect(business.id)}
          className="w-full rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/15"
        >
          View Blueprint
        </button>
      </div>
    </article>
  );
}
