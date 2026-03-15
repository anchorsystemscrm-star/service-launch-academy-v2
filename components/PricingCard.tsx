"use client";

import Link from "next/link";

import { SubscriptionTier } from "@/types/business";
import { tierLabels } from "@/utils/access";

interface PricingCardProps {
  plan: SubscriptionTier;
  audience: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref?: string;
  current?: boolean;
  highlighted?: boolean;
}

export function PricingCard({
  plan,
  audience,
  description,
  features,
  ctaLabel,
  ctaHref,
  current = false,
  highlighted = false
}: PricingCardProps) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[30px] border p-6 shadow-card transition ${
        highlighted
          ? "border-accent/40 bg-[linear-gradient(180deg,rgba(19,34,58,0.98),rgba(10,18,32,0.98))] shadow-premium"
          : "border-white/10 bg-[linear-gradient(180deg,rgba(18,26,42,0.94),rgba(10,16,28,0.98))]"
      }`}
    >
      {highlighted && (
        <span className="absolute right-5 top-5 rounded-full border border-accentSecondary/40 bg-accentSecondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
          Recommended
        </span>
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{tierLabels[plan]}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{audience}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      </div>

      <ul className="mt-6 grid gap-3 pl-5 text-sm leading-6 text-slate-200">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {ctaHref ? (
          <Link
            href={ctaHref}
            className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              current
                ? "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
                : "border border-accent/40 bg-accent/10 text-white hover:border-accent/80 hover:bg-accent/20"
            }`}
          >
            {ctaLabel}
          </Link>
        ) : (
          <div className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
            {ctaLabel}
          </div>
        )}
      </div>
    </article>
  );
}
