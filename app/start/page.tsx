"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { businesses, businessTagLabels } from "@/data/businesses";
import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { BusinessCard } from "@/components/BusinessCard";
import { getFallbackBusiness } from "@/utils/benchmarks";
import { getFirstAvailableAppPath, tierDescriptions, tierLabels } from "@/utils/access";
import { useAccessProfile, useActiveBlueprint } from "@/utils/storage";

export default function StartPage() {
  const router = useRouter();
  const { profile, setOnboardingComplete, setSelectedBusinessId } = useAccessProfile();
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
            New members should not drop into a fully open dashboard. Choose the service business you are launching, review
            the account tier already assigned to the user profile, and then continue into the gated workspace.
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

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {businesses.map((business) => {
              const selected = profile.selectedBusinessId === business.id;
              return (
                <div
                  key={business.id}
                  className={`rounded-[28px] border p-1 transition ${
                    selected ? "border-accent/60 bg-accent/10 shadow-card" : "border-transparent"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between px-3 pt-3">
                    <div className="flex flex-wrap gap-2">
                      {business.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="glass-chip">
                          {businessTagLabels[tag]}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedBusinessId(business.id)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
                        selected
                          ? "border border-accent/50 bg-accent/20 text-white"
                          : "border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {selected ? "Selected" : "Select"}
                    </button>
                  </div>
                  <BusinessCard business={business} tagLabels={businessTagLabels} onSelect={setSelectedBusinessId} tier="preview" />
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel-surface p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Step 2</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Review account access</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            New accounts default to Preview. Tier access is controlled by stored account access data, not by a front-end picker.
          </p>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-white">{tierLabels[profile.tier]}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{tierDescriptions[profile.tier]}</p>
              </div>
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                Read only
              </span>
            </div>
            <ul className="mt-4 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
              <li>Preview: browse service opportunities, compare economics, and inspect teaser content.</li>
              <li>Core: full blueprint, setup, software stack, pricing, licensing, insurance, and operations.</li>
              <li>Pro: everything in Core plus AI Coach and prompt guidance.</li>
              <li>Elite: everything in Pro plus advanced systems and Anchor integration previews.</li>
            </ul>
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

          <div className="mt-6">
            <LockedFeatureCard
              title="Upgrades are managed outside the onboarding flow"
              requiredTier="core"
              description="Preview accounts can complete setup and explore service opportunities, but full operating guidance and AI access stay gated."
              bullets={[
                "Use Preview to shortlist the business model that fits best.",
                "Unlock Core for the full launch playbook and operating setup.",
                "Unlock Pro for guided AI execution help."
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
