import Link from "next/link";

import { BrandBlock } from "@/components/BrandBlock";
import { PricingCard } from "@/components/PricingCard";
import { businesses } from "@/data/businesses";
import { SubscriptionTier } from "@/types/business";
import { getCheckoutHref, getPricingHref, isExternalHref, tierDescriptions, tierLabels } from "@/utils/access";

const planContent: Array<{
  plan: SubscriptionTier;
  audience: string;
  description: string;
  features: string[];
  callout?: string;
}> = [
  {
    plan: "preview",
    audience: "Explore the opportunity",
    description: "Built for founders who are still deciding which service business fits their market, skills, and economics.",
    features: [
      `Browse all ${businesses.length} service opportunities`,
      "Compare startup cost, margins, demand, and recurring potential",
      "Read teaser summaries and operator-fit guidance",
      "Use Preview as the conversion layer before committing to execution"
    ]
  },
  {
    plan: "core",
    audience: "Launch with a real operating system",
    description: "For operators ready to move beyond browsing and build the business with full manual execution guidance.",
    features: [
      "Full blueprint and weekly execution roadmap",
      "Setup guidance, app stack, pricing, offers, and operations",
      "Licensing and insurance guidance with practical checklists",
      "Detailed lead gen, quoting, scheduling, invoicing, and follow-up flows"
    ]
  },
  {
    plan: "pro",
    audience: "Unlock AI-guided execution",
    description: "For operators who want the full blueprint plus integrated AI help for pricing, marketing, sales, and operations.",
    features: [
      "Everything in Core",
      "AI Coach for guided execution help",
      "Service-specific prompt starters by category",
      "Faster drafting for scripts, follow-up, pricing, and marketing",
      "Less guesswork and faster execution"
    ],
    callout: "Best for most users who want AI support and faster execution"
  },
  {
    plan: "elite",
    audience: "Systemize and scale",
    description: "For advanced operators who want premium systemization content and visibility into Anchor Systems integrations.",
    features: [
      "Everything in Pro",
      "Advanced systems and automation content",
      "Anchor Systems integration previews",
      "A stronger operating layer for scale-minded teams"
    ]
  }
];

interface PricingPageContentProps {
  focusedPlan: SubscriptionTier;
  currentTier: SubscriptionTier;
}

export function PricingPageContent({ focusedPlan, currentTier }: PricingPageContentProps) {
  const focusedPlanHref = getPricingHref(focusedPlan);

  return (
    <div className="mx-auto max-w-7xl animate-fade-up">
      <section className="panel-surface relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(83,180,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(58,212,166,0.12),transparent_24%)]" />
        <div className="relative">
          <BrandBlock href="/pricing" size="shell" currentLabel="Choose the operating layer that matches where you are in the launch cycle" />
          <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Pricing</p>
              <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A clear path from exploration to execution.</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
                Preview helps users explore service opportunities. Core unlocks the full launch operating system. Pro unlocks AI-guided execution and is the best fit for most users. Elite adds advanced systems and Anchor Systems integration previews.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Current account access</p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold text-white">{tierLabels[currentTier]}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{tierDescriptions[currentTier]}</p>
                </div>
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  Active
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  Back to Workspace
                </Link>
                <Link
                  href={focusedPlanHref}
                  className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
                >
                  Focus {tierLabels[focusedPlan]}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-4">
        {planContent.map((item) => {
          const current = currentTier === item.plan;
          const highlighted = focusedPlan === item.plan || item.plan === "pro";
          const recommended = item.plan === "pro";
          const ctaLabel =
            item.plan === "preview"
              ? current
                ? "Current plan"
                : "Explore with Preview"
              : current
                ? "Current plan"
                : item.plan === "core"
                  ? "Upgrade to Core"
                  : item.plan === "pro"
                    ? "Upgrade to Pro"
                    : "Upgrade to Elite";

          return (
            <PricingCard
              key={item.plan}
              plan={item.plan}
              audience={item.audience}
              description={item.description}
              features={item.features}
              callout={item.callout}
              ctaLabel={ctaLabel}
              ctaHref={current ? "/dashboard" : getCheckoutHref(item.plan)}
              current={current}
              highlighted={highlighted}
              recommended={recommended}
            />
          );
        })}
      </section>

      <section id="upgrade-request" className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="panel-surface p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">What changes by tier</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Make the value ladder obvious.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Preview: opportunity discovery and fit only",
              "Core: full launch blueprint and operating setup",
              "Pro: AI Coach and guided execution support",
              "Elite: advanced systems and Anchor integration previews"
            ].map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="panel-surface p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Upgrade actions</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Stripe-ready CTA structure.</h2>
          <p className="mt-4 text-sm leading-6 text-muted">
            These buttons currently route to placeholder upgrade actions so the monetization flow is visible now. They can be
            replaced with Stripe Checkout URLs or upgrade endpoints without changing the pricing UI.
          </p>
          <div className="mt-6 grid gap-3">
            {(["core", "pro", "elite"] as SubscriptionTier[]).map((plan) => (
              isExternalHref(getCheckoutHref(plan)) ? (
                <a
                  key={plan}
                  href={getCheckoutHref(plan)}
                  className="inline-flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:border-accent/40 hover:bg-white/10"
                >
                  <span>Upgrade to {tierLabels[plan]}</span>
                  <span className="text-muted">Stripe Checkout</span>
                </a>
              ) : (
                <Link
                  key={plan}
                  href={getCheckoutHref(plan)}
                  className="inline-flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:border-accent/40 hover:bg-white/10"
                >
                  <span>Upgrade to {tierLabels[plan]}</span>
                  <span className="text-muted">Select Plan</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
