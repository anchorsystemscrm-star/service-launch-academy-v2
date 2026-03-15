"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { PhaseCard } from "@/components/PhaseCard";
import { ProgressTracker } from "@/components/ProgressTracker";
import { ScriptCard } from "@/components/ScriptCard";
import { getPricingHref, getUpgradeMessage, hasTierAccess, tierLabels } from "@/utils/access";
import { getFallbackBusiness, buildBlueprint, buildScripts } from "@/utils/benchmarks";
import { useAccessProfile, useActiveBlueprint, useBlueprintProgress } from "@/utils/storage";

const tabs = [
  { id: "plan", label: "Launch Blueprint", minTier: "core" },
  { id: "setup", label: "Setup + Stack", minTier: "core" },
  { id: "pricing", label: "Offers + Pricing", minTier: "core" },
  { id: "growth", label: "Lead Gen + Ops", minTier: "core" },
  { id: "compliance", label: "Licensing + Insurance", minTier: "core" },
  { id: "prompts", label: "AI Prompts", minTier: "pro" },
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
  const isActive = activeBlueprintId === business.id;
  const hasCoreAccess = hasTierAccess(profile.tier, "core");
  const hasProAccess = hasTierAccess(profile.tier, "pro");
  const canAccessAnchor = hasTierAccess(profile.tier, "elite");

  useEffect(() => {
    if (!hasCoreAccess) {
      setActiveTab("plan");
      return;
    }

    if (activeTab === "prompts" && !hasProAccess) {
      setActiveTab("plan");
    }

    if (activeTab === "anchor" && !canAccessAnchor) {
      setActiveTab(hasProAccess ? "prompts" : "plan");
    }
  }, [activeTab, canAccessAnchor, hasCoreAccess, hasProAccess]);

  function renderPreviewExperience() {
    return (
      <div className="mt-6 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="grid gap-6">
          <section className="panel-surface p-6">
            <h2 className="text-xl font-semibold text-white">At a glance</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Summary:</span> {business.teaser}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Best for:</span> {business.bestFitOperatorType}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Startup range:</span> {business.startup_cost_range}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">90-day revenue:</span> {business.revenue_90_range}
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Recurring potential:</span> {business.recurringRevenuePotential}
              </div>
            </div>
          </section>

          <section className="panel-surface p-6">
            <h2 className="text-xl font-semibold text-white">Why this business works</h2>
            <p className="mt-4 text-sm leading-6 text-muted">{business.whyAttractive}</p>
            <ul className="mt-4 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
              {business.pros.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-6">
          {business.previewTeasers.map((teaser) => (
            <LockedFeatureCard
              key={teaser.title}
              title={teaser.title}
              requiredTier={teaser.title.includes("Pro") ? "pro" : "core"}
              description={teaser.description}
              bullets={teaser.items}
              ctaHref={getPricingHref(teaser.title.includes("Pro") ? "pro" : "core")}
            />
          ))}

          <section className="panel-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white">Preview includes opportunity fit, not the full operating system.</h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              {getUpgradeMessage("core")} Upgrade to unlock startup requirements, software stack, licensing guidance, insurance guidance,
              pricing design, lead generation systems, and the weekly launch plan.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {business.goodFor.map((item) => (
                <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={getPricingHref("core")}
                className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
              >
                Upgrade to Core
              </Link>
              <Link
                href={getPricingHref()}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Compare Plans
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

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

      {!hasCoreAccess ? (
        renderPreviewExperience()
      ) : (
      <div className="mt-6 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="grid gap-6">
          <section className="panel-surface p-6">
            <h2 className="text-lg font-semibold text-white">{business.name}</h2>
            <div className="mt-4 grid gap-3 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-muted">Summary:</span> {business.summary}
              </div>
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

          <ProgressTracker progress={progress} executionPlan={business.executionPlan} onToggleWeek={setWeekComplete} />
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
                  title={getUpgradeMessage(tab.minTier)}
                  className="cursor-not-allowed rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-500"
                >
                  {tab.label}
                </button>
              )
            ))}
          </div>

          {activeTab === "plan" && (
            <div className="mt-6 grid gap-4">
              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Detailed execution roadmap</h3>
                <div className="mt-4 grid gap-4">
                  {business.executionPlan.map((stage) => (
                    <div key={stage.title} className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{stage.title}</p>
                      <p className="mt-2 text-sm text-white">{stage.summary}</p>
                      <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                        {stage.actions.map((action) => (
                          <li key={action}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
              {phases.map((phase) => (
                <PhaseCard key={phase.title} phase={phase} />
              ))}
            </div>
          )}

          {activeTab === "setup" && (
            <div className="mt-6 grid gap-6">
              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Startup requirements</h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Required items</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.startupRequirements.requiredItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Optional upgrades</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.startupRequirements.optionalItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Vehicle needs</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.startupRequirements.vehicleNeeds.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Core tools and equipment</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.startupRequirements.tools.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Software / apps / tools stack</h3>
                <div className="mt-4 grid gap-3">
                  {business.softwareStack.map((item) => (
                    <div key={`${item.category}-${item.tool}`} className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-white">{item.category}</p>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                          {item.requirement}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-100">{item.tool}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.notes}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Startup budget buckets</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {business.startupRequirements.budgetBuckets.map((bucket) => (
                    <div key={bucket.label} className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{bucket.label}</p>
                      <p className="mt-2 text-sm font-semibold text-white">{bucket.range}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{bucket.note}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="mt-6 grid gap-4">
              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Offer and pricing setup</h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-3">
                  <div className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Starter</p>
                    <p className="mt-2 text-sm text-white">{business.offerPricing.starterOffer}</p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Standard</p>
                    <p className="mt-2 text-sm text-white">{business.offerPricing.standardOffer}</p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Premium</p>
                    <p className="mt-2 text-sm text-white">{business.offerPricing.premiumOffer}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Add-ons and upsells</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {[...business.offerPricing.addOns, ...business.offerPricing.sampleUpsells].map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Pricing notes</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{business.offerPricing.minimumPriceGuidance}</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.offerPricing.pricingNotes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Sales scripts</h3>
                <div className="mt-4 grid gap-4">
                  {scripts.map((script) => (
                    <ScriptCard key={script.title} script={script} />
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "growth" && (
            <div className="mt-6 grid gap-6">
              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Customer acquisition</h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {[
                    { title: "Best first lead sources", items: business.acquisitionPlan.bestFirstLeadSources },
                    { title: "Online sources", items: business.acquisitionPlan.onlineSources },
                    { title: "Offline sources", items: business.acquisitionPlan.offlineSources },
                    { title: "Local outreach ideas", items: business.acquisitionPlan.localOutreachIdeas },
                    { title: "Referral ideas", items: business.acquisitionPlan.referralIdeas },
                    { title: "Neighborhood marketing", items: business.acquisitionPlan.neighborhoodMarketingIdeas },
                    { title: "Social proof ideas", items: business.acquisitionPlan.socialProofIdeas },
                    { title: "Before / after content", items: business.acquisitionPlan.beforeAfterContentIdeas }
                  ].map(({ title, items }) => (
                    <div key={title} className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Operations setup</h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {[
                    { title: "Lead response", items: business.operationsSetup.leadResponseProcess },
                    { title: "Quoting", items: business.operationsSetup.quotingProcess },
                    { title: "Scheduling", items: business.operationsSetup.schedulingProcess },
                    { title: "Job prep", items: business.operationsSetup.jobPrep },
                    { title: "Completion checklist", items: business.operationsSetup.completionChecklist },
                    { title: "Invoicing", items: business.operationsSetup.invoicing },
                    { title: "Review requests", items: business.operationsSetup.reviewRequestProcess },
                    { title: "Follow-up", items: business.operationsSetup.followUpProcess }
                  ].map(({ title, items }) => (
                    <div key={title} className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                        {items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "compliance" && (
            <div className="mt-6 grid gap-6">
              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Licensing guidance</h3>
                <p className="mt-4 text-sm leading-6 text-muted">{business.licensingGuidance.disclaimer}</p>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Where to check</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.licensingGuidance.whereToCheck.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Checklist</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.licensingGuidance.checklist.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Common categories</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.licensingGuidance.commonCategories.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Questions for local agencies</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.licensingGuidance.agencyPrompts.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Insurance guidance</h3>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {[
                    ["General liability", business.insuranceGuidance.generalLiability],
                    ["Commercial auto", business.insuranceGuidance.commercialAuto],
                    ["Workers comp", business.insuranceGuidance.workersComp],
                    ["Equipment coverage", business.insuranceGuidance.equipmentCoverage]
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Questions to ask your agent</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.insuranceGuidance.questionsToAsk.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Documents to keep on file</p>
                    <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                      {business.insuranceGuidance.documentsToKeep.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "prompts" && hasProAccess && (
            <div className="mt-6 grid gap-6">
              {(
                [
                  ["setup", business.promptSuggestions.setup],
                  ["pricing", business.promptSuggestions.pricing],
                  ["marketing", business.promptSuggestions.marketing],
                  ["operations", business.promptSuggestions.operations],
                  ["sales", business.promptSuggestions.sales]
                ] as const
              ).map(([category, prompts]) => (
                <section key={category} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-semibold capitalize text-white">{category} prompts</h3>
                  <ul className="mt-4 grid gap-3 pl-5 text-sm leading-6 text-slate-200">
                    {prompts.map((prompt) => (
                      <li key={prompt}>{prompt}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}

          {activeTab === "prompts" && !hasProAccess && (
            <div className="mt-6">
              <LockedFeatureCard
                title="Pro unlocks service-specific AI prompts"
                requiredTier="pro"
                description="Prompt categories are structured around setup, pricing, marketing, operations, and sales so the AI coach never feels blank."
                bullets={[
                  "Setup prompts for licensing, insurance, and software choices",
                  "Pricing prompts for package design and objection handling",
                  "Marketing and sales prompts for posts, scripts, and follow-up"
                ]}
                ctaHref={getPricingHref("pro")}
              />
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
            <div className="mt-6">
              <LockedFeatureCard
                title="Elite access unlocks advanced Anchor setup"
                requiredTier="elite"
                description="The launch plan, cost model, and scripts remain available at your current tier. Elite unlocks advanced automation previews and system setup details."
                bullets={[
                  "Advanced Anchor Systems integration previews",
                  "Automation and systemization content for scaling operators",
                  "Premium CRM and operating-system visibility"
                ]}
                ctaHref={getPricingHref("elite")}
              />
            </div>
          )}
        </section>
      </div>
      )}
    </div>
  );
}
