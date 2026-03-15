import Link from "next/link";

import { SubscriptionTier } from "@/types/business";
import { getUpgradeMessage, tierLabels } from "@/utils/access";

interface LockedFeatureCardProps {
  title: string;
  requiredTier: SubscriptionTier;
  description: string;
  bullets: string[];
  ctaHref?: string;
  ctaLabel?: string;
}

export function LockedFeatureCard({
  title,
  requiredTier,
  description,
  bullets,
  ctaHref = "/start",
  ctaLabel = "View access details"
}: LockedFeatureCardProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(19,29,47,0.95),rgba(11,18,31,0.98))] p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100">
          Locked
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
          {tierLabels[requiredTier]}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      <p className="mt-3 text-sm leading-6 text-slate-200">{getUpgradeMessage(requiredTier)}</p>

      <ul className="mt-5 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className="mt-6 inline-flex rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/15"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
