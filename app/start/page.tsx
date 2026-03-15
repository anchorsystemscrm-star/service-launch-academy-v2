"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { businesses, businessTagLabels } from "@/data/businesses";
import { getFallbackBusiness } from "@/utils/benchmarks";
import { getFirstAvailableAppPath, tierLabels } from "@/utils/access";
import { SubscriptionTier } from "@/types/business";
import { useAccessProfile, useActiveBlueprint } from "@/utils/storage";

const tierOptions: Array<{
  id: SubscriptionTier;
  label: string;
  description: string;
  features: string[];
}> = [
  {
    id: "preview",
    label: "Preview",
    description: "Starter access for evaluating business models and the launch workflow.",
    features: ["Dashboard", "Business selection", "Blueprint access"]
  },
  {
    id: "core",
    label: "Core",
    description: "Adds KPI tracking and progress visibility on top of launch planning.",
    features: ["Everything in Preview", "Benchmarks dashboard", "Progress-based KPI review"]
  },
  {
    id: "pro",
    label: "Pro",
    description: "Unlocks the AI coach for tactical pricing, lead gen, and script guidance.",
    features: ["Everything in Core", "AI Coach", "Context-aware coaching"]
  },
  {
    id: "elite",
    label: "Elite",
    description: "Full internal preview tier with advanced Anchor setup visibility.",
    features: ["Everything in Pro", "Elite access", "Advanced automation previews"]
  }
];

export default function StartPage() {
  const router = useRouter();
  const { profile, setOnboardingComplete, setSelectedBusinessId, setTier } = useAccessProfile();
  const { setActiveBlueprintId } = useActiveBlueprint();
  const [pending, setPending] = useState(false);

  const selectedBusiness = useMemo(
    () => getFallbackBusiness(profile.selectedBusinessId),
    [profile.selectedBusinessId]
  );

  function completeSetup() {
    if (!profile.selectedBusinessId) {
      return;
    }

    setPending(true);
    setOnboardingComplete(true);
    setActiveBlueprintId(profile.selectedBusinessId);
    router.replace(
      getFirstAvailableAppPath({
        onboardingComplete: true,
        selectedBusinessId: profile.selectedBusinessId,
        tier: profile.tier
      })
    );
    setPending(false);
  }

  return (
    <div className="mx-auto max-w-7xl animate-fade-up">
      <section className="panel-surface relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(83,180,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(58,212,166,0.12),transparent_28%)]" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Get Started</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Set up the workspace before unlocking the app.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
            New members should not drop into a fully open dashboard. Choose the service business you are launching, confirm
            the temporary access tier, and then continue into the gated workspace.
          </p>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="panel-surface p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Step 1</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Choose your launch business</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              {profile.selectedBusinessId ? "Selected" : "Required"}
            </span>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {businesses.slice(0, 10).map((business) => {
              const selected = profile.selectedBusinessId === business.id;
              return (
                <button
                  key={business.id}
                  type="button"
                  onClick={() => setSelectedBusinessId(business.id)}
                  className={`rounded-[24px] border p-5 text-left transition ${
                    selected
                      ? "border-accent/60 bg-accent/10 shadow-card"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <p className="text-base font-semibold text-white">{business.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{business.recommended_first_offer}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {business.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="glass-chip">
                        {businessTagLabels[tag]}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel-surface p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Step 2</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Set the temporary access tier</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            This gating model is temporary, but it ensures new accounts do not receive every page and feature by default.
          </p>

          <div className="mt-6 grid gap-3">
            {tierOptions.map((option) => {
              const selected = profile.tier === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setTier(option.id)}
                  className={`rounded-[24px] border p-5 text-left transition ${
                    selected
                      ? "border-accentSecondary/60 bg-accentSecondary/10 shadow-card"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-white">{option.label}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{option.description}</p>
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-100">
                      {tierLabels[option.id]}
                    </span>
                  </div>
                  <ul className="mt-4 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                    {option.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Current selection</p>
            <p className="mt-3 text-sm text-slate-200">Business: {profile.selectedBusinessId ? selectedBusiness.name : "Not selected yet"}</p>
            <p className="mt-2 text-sm text-slate-200">Tier: {tierLabels[profile.tier]}</p>
            <button
              type="button"
              onClick={completeSetup}
              disabled={!profile.selectedBusinessId || pending}
              className="mt-5 w-full rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Preparing workspace..." : "Enter workspace"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
