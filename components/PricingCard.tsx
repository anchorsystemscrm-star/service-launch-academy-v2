"use client";

import Link from "next/link";

import { SubscriptionTier } from "@/types/business";
import { getCheckoutHref, isExternalHref, tierLabels } from "@/utils/access";

interface PricingCardProps {
  plan: SubscriptionTier;
  audience: string;
  description: string;
  features: string[];
  callout?: string;
  ctaLabel: string;
  ctaHref?: string;
  current?: boolean;
  highlighted?: boolean;
  recommended?: boolean;
}

export function PricingCard({
  plan,
  audience,
  description,
  features,
  callout,
  ctaLabel,
  ctaHref,
  current = false,
  highlighted = false,
  recommended = false
}: PricingCardProps) {
  const resolvedCtaHref = ctaHref ?? getCheckoutHref(plan);
  const isExternalCta = isExternalHref(resolvedCtaHref);
  const isPro = plan === "pro";
  const isElite = plan === "elite";
  const ctaClassName = `inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    current
      ? "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
      : isPro
        ? "border border-accent/60 bg-white text-slate-950 shadow-[0_10px_30px_rgba(255,255,255,0.12)] hover:bg-slate-100"
        : "border border-accent/40 bg-accent/10 text-white hover:border-accent/80 hover:bg-accent/20"
  }`;

  return (
    <article
      className={`relative flex h-full flex-col rounded-[30px] border p-6 shadow-card transition ${
        isPro
          ? "border-accent/60 bg-[linear-gradient(180deg,rgba(20,38,66,1),rgba(10,19,35,1))] shadow-[0_28px_80px_rgba(9,20,40,0.55)] ring-1 ring-accent/20 lg:scale-[1.03]"
          : isElite
            ? "border-white/14 bg-[linear-gradient(180deg,rgba(22,30,47,0.98),rgba(11,18,31,0.98))] shadow-premium"
            : highlighted
              ? "border-white/14 bg-[linear-gradient(180deg,rgba(20,30,47,0.96),rgba(10,16,28,0.98))] shadow-premium"
              : "border-white/10 bg-[linear-gradient(180deg,rgba(18,26,42,0.94),rgba(10,16,28,0.98))]"
      }`}
    >
      {recommended && (
        <span className="absolute right-5 top-5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
          Recommended
        </span>
      )}

      <div>
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isPro ? "text-accentSecondary" : "text-accent"}`}>
          {tierLabels[plan]}
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{audience}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
        {callout ? (
          <div className={`mt-4 rounded-[18px] border px-4 py-3 text-sm font-medium ${
            isPro
              ? "border-accentSecondary/30 bg-white/8 text-slate-100"
              : "border-white/10 bg-black/15 text-slate-200"
          }`}>
            {callout}
          </div>
        ) : null}
      </div>

      <ul className="mt-6 grid gap-3 pl-5 text-sm leading-6 text-slate-200">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {isExternalCta ? (
          <a href={resolvedCtaHref} className={ctaClassName}>
            {ctaLabel}
          </a>
        ) : (
          <Link href={resolvedCtaHref} className={ctaClassName}>
            {ctaLabel}
          </Link>
        )}
      </div>
    </article>
  );
}
