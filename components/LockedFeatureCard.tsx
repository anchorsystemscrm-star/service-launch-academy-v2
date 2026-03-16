import Link from "next/link";

import { SubscriptionTier } from "@/types/business";
import { getCheckoutHref, getPricingHref, getUpgradeMessage, isExternalHref, tierLabels } from "@/utils/access";

interface LockedFeatureCardProps {
  title: string;
  requiredTier: SubscriptionTier;
  description: string;
  bullets: string[];
  ctaHref?: string;
  ctaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
}

export function LockedFeatureCard({
  title,
  requiredTier,
  description,
  bullets,
  ctaHref = getCheckoutHref(requiredTier),
  ctaLabel = requiredTier === "core" ? "Upgrade to Core" : requiredTier === "pro" ? "Upgrade to Pro" : "Upgrade to Elite",
  secondaryCtaHref = getPricingHref(),
  secondaryCtaLabel = "Compare Plans"
}: LockedFeatureCardProps) {
  const isExternalPrimaryCta = isExternalHref(ctaHref);
  const isExternalSecondaryCta = isExternalHref(secondaryCtaHref);

  return (
    <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(19,29,47,0.98),rgba(9,16,28,0.98))] p-6 shadow-premium">
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

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {isExternalPrimaryCta ? (
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
          >
            {ctaLabel}
          </a>
        ) : (
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
          >
            {ctaLabel}
          </Link>
        )}
        {isExternalSecondaryCta ? (
          <a
            href={secondaryCtaHref}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            {secondaryCtaLabel}
          </a>
        ) : (
          <Link
            href={secondaryCtaHref}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            {secondaryCtaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
