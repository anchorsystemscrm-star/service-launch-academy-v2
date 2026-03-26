"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { BusinessCard } from "@/components/BusinessCard";
import { BusinessFlowPreviewCard } from "@/components/BusinessFlowPreviewCard";
import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { businessTagLabels, businesses } from "@/data/businesses";
import { AccessProfile, getCheckoutHref, getPricingHref, hasTierAccess, tierLabels } from "@/utils/access";
import {
  defaultKpiData,
  filterBusinesses,
  getBenchmarkSummary,
  getBusinessById,
  getBusinessSetupStrength,
  getDashboardAIRecommendations,
  getDashboardNextBestAction,
  shouldShowAnchorSystemsCard
} from "@/utils/benchmarks";
import {
  useAccessProfile,
  useActiveBlueprint,
  useBlueprintProgress,
  useBusinessPanel,
  useKpiState
} from "@/utils/storage";

const filterOptions = [
  { id: "low2k", label: "Low Startup (<$2k)" },
  { id: "low5k", label: "Low Startup (<$5k)" },
  { id: "low10k", label: "Low Startup (<$10k)" },
  { id: "solo", label: "Solo-friendly" },
  { id: "crew", label: "Crew-based" },
  { id: "high", label: "High Demand" },
  { id: "indoor", label: "Indoor" },
  { id: "outdoor", label: "Outdoor" },
  { id: "mobile", label: "Mobile" },
  { id: "beginner", label: "Beginner-friendly" },
  { id: "recurring", label: "Recurring" },
  { id: "seasonal", label: "Seasonal" }
];

function SnapshotRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 rounded-[18px] border border-white/10 bg-black/20 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="max-w-[70%] break-words text-right text-sm text-white">{value || "Not set yet"}</p>
    </div>
  );
}

function KpiStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function DashboardWorkspaceCards({
  profile,
  businessId
}: {
  profile: AccessProfile;
  businessId: string;
}) {
  const business = getBusinessById(businessId);

  if (!business) {
    return null;
  }

  const { progress, taskProgress } = useBlueprintProgress(business.id, business.executionPlan);
  const { kpis } = useKpiState(business.id, defaultKpiData);
  const { panel } = useBusinessPanel(business, progress, taskProgress, kpis);
  const hasCoreAccess = hasTierAccess(profile.tier, "core");
  const hasProAccess = hasTierAccess(profile.tier, "pro");
  const businessStrength = getBusinessSetupStrength(panel);
  const nextAction = getDashboardNextBestAction(panel, kpis, profile.tier);
  const aiRecommendations = getDashboardAIRecommendations(panel, kpis);
  const hasBenchmarkData =
    kpis.leads > 0 ||
    kpis.quotes > 0 ||
    kpis.jobs > 0 ||
    kpis.completed > 0 ||
    Number(kpis.revenue) > 0 ||
    kpis.reviews > 0;

  return (
    <>
      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="panel-surface overflow-hidden p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Next best action</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{nextAction.title}</h2>
          <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-muted">{nextAction.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={nextAction.href}
              className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
            >
              {nextAction.ctaLabel}
            </Link>
            <Link
              href="/blueprint"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Open blueprint
            </Link>
          </div>
        </div>

        <div className="panel-surface overflow-hidden p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">AI recommendation</p>
              <h2 className="mt-2 text-xl font-semibold text-white">What needs attention now</h2>
            </div>
            <Link
              href={hasProAccess ? "/ai-coach" : getPricingHref("pro")}
              className="text-sm font-semibold text-slate-200 transition hover:text-white"
            >
              {hasProAccess ? "Open AI Coach" : "Unlock AI Coach"}
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {aiRecommendations.map((item) => (
              <div key={item.title} className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 break-words text-sm leading-6 text-muted">{item.body}</p>
                {item.href ? (
                  <Link
                    href={!hasProAccess && item.href === "/ai-coach" ? getPricingHref("pro") : item.href}
                    className="mt-3 inline-flex text-sm font-semibold text-accent transition hover:text-white"
                  >
                    Open next move
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="panel-surface overflow-hidden p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Business snapshot</p>
              <h2 className="mt-2 text-xl font-semibold text-white">The business at a glance</h2>
            </div>
            <Link
              href={hasCoreAccess ? "/business" : getPricingHref("core")}
              className="text-sm font-semibold text-slate-200 transition hover:text-white"
            >
              {hasCoreAccess ? "Open business" : "Unlock business"}
            </Link>
          </div>

          <div className="mt-4 grid gap-3">
            <SnapshotRow label="Selected service" value={panel.serviceType} />
            <SnapshotRow label="Core offer" value={panel.starterOffer} />
            <SnapshotRow label="Starting price" value={panel.priceFloor} />
            <SnapshotRow label="Target customer" value={panel.targetCustomer} />
            <SnapshotRow label="Current focus" value={panel.focusThisWeek} />
          </div>

          <div className="mt-5 rounded-[18px] border border-white/10 bg-black/20 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Workspace strength</p>
              <span className="text-sm font-semibold text-white">{businessStrength.percentage}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-950">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accentSecondary transition-all duration-500"
                style={{ width: `${businessStrength.percentage}%` }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{businessStrength.summary}</p>
          </div>
        </div>

        <div className="panel-surface overflow-hidden p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Benchmark snapshot</p>
              <h2 className="mt-2 text-xl font-semibold text-white">This week's live numbers</h2>
            </div>
            <Link
              href={hasCoreAccess ? "/benchmarks" : getPricingHref("core")}
              className="text-sm font-semibold text-slate-200 transition hover:text-white"
            >
              {hasCoreAccess ? "Open benchmarks" : "Unlock benchmarks"}
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <KpiStat label="Leads" value={String(kpis.leads)} />
            <KpiStat label="Estimates" value={String(kpis.quotes)} />
            <KpiStat label="Jobs booked" value={String(kpis.jobs)} />
            <KpiStat label="Completed" value={String(kpis.completed)} />
            <KpiStat label="Revenue" value={`$${Number(kpis.revenue || 0).toLocaleString()}`} />
            <KpiStat label="Reviews" value={String(kpis.reviews)} />
          </div>

          <div className="mt-5 rounded-[18px] border border-white/10 bg-black/20 px-4 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Benchmark read</p>
            <p className="mt-2 break-words text-sm leading-6 text-slate-100">
              {hasBenchmarkData
                ? getBenchmarkSummary(kpis)
                : "No benchmark entries yet. Add this week's activity so the dashboard can show where the business is actually moving."}
            </p>
          </div>
        </div>
      </section>

      {hasCoreAccess && shouldShowAnchorSystemsCard(panel, kpis) ? (
        <div className="mt-6">
          <BusinessFlowPreviewCard
            businessName={panel.businessName || panel.serviceType}
            coreOffer={panel.starterOffer}
            leadSourcePlan={panel.leadSourcePlan}
          />
        </div>
      ) : null}
    </>
  );
}

function DashboardEmptyWorkspace({ tier }: { tier: AccessProfile["tier"] }) {
  return (
    <section className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="panel-surface overflow-hidden p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Next best action</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Choose the business you want to build</h2>
        <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-muted">
          Your dashboard is user-scoped now, so it only shows workspace data for the service you actively choose. Pick one below to start a fresh business workspace.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#business-catalog"
            className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
          >
            Pick a service
          </a>
          <Link
            href={getPricingHref()}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            Compare plans
          </Link>
        </div>
      </div>

      <div className="panel-surface overflow-hidden p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Workspace state</p>
        <h2 className="mt-2 text-xl font-semibold text-white">No business selected yet</h2>
        <div className="mt-4 grid gap-3">
          <SnapshotRow label="Selected service" value="" />
          <SnapshotRow label="Core offer" value="" />
          <SnapshotRow label="Starting price" value="" />
          <SnapshotRow label="Target customer" value="" />
          <SnapshotRow label="Current focus" value="" />
        </div>
        <p className="mt-4 text-sm leading-6 text-muted">
          Access tier: {tierLabels[tier]}. The dashboard will start filling with your own workspace data after you select a business.
        </p>
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { profile, setSelectedBusinessId } = useAccessProfile();
  const { activeBlueprintId } = useActiveBlueprint();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  const selectedBusiness = getBusinessById(profile.selectedBusinessId);
  const filteredBusinesses = filterBusinesses(businesses, query, filters);
  const hasCoreAccess = hasTierAccess(profile.tier, "core");

  function toggleFilter(filterId: string) {
    setFilters((current) =>
      current.includes(filterId) ? current.filter((item) => item !== filterId) : [...current, filterId]
    );
  }

  function handleSelectBusiness(businessId: string) {
    setSelectedBusinessId(businessId);
    router.push("/blueprint");
  }

  return (
    <div className="mx-auto max-w-7xl animate-fade-up">
      <section className="panel-surface overflow-hidden p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Command Center</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Run the launch like an operating system.</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              Dashboard is the command center. Blueprint tells you how to execute, Business captures what you are
              building, Benchmarks shows whether the work is moving, and AI Coach helps tighten the next decision.
            </p>
            <p className="mt-3 text-sm text-slate-300">
              {selectedBusiness
                ? `Selected business: ${selectedBusiness.name}. Typical ranges vary by operator, market, and execution quality.`
                : "No service is selected yet. Pick a business below to start a user-scoped workspace with clean, account-specific data."}
            </p>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold text-white">{businesses.length}</p>
              <p className="mt-2 text-sm text-muted">Launch-ready business models</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">{selectedBusiness ? "Live" : "Empty"}</p>
              <p className="mt-2 text-sm text-muted">Workspace state</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">{tierLabels[profile.tier]}</p>
              <p className="mt-2 text-sm text-muted">Current access tier</p>
            </div>
          </div>
        </div>
      </section>

      {selectedBusiness ? (
        <DashboardWorkspaceCards profile={profile} businessId={selectedBusiness.id} />
      ) : (
        <DashboardEmptyWorkspace tier={profile.tier} />
      )}

      <section className="mt-6 panel-surface p-6 sm:p-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Workspace Access</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Modules unlock by tier.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={getPricingHref()}
              className="inline-flex rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
            >
              Compare Plans
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Refresh dashboard
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Service Exploration", unlocked: hasTierAccess(profile.tier, "preview"), detail: "Compare opportunities, fit, and economics" },
            { label: "Blueprint", unlocked: hasTierAccess(profile.tier, "core"), detail: "Full launch roadmap, setup, pricing, and operations" },
            { label: "Business", unlocked: hasTierAccess(profile.tier, "core"), detail: "Central workspace for offers, notes, setup, and operating context" },
            { label: "Benchmarks", unlocked: hasTierAccess(profile.tier, "core"), detail: "Weekly KPI tracking and scorecards" },
            { label: "AI Coach", unlocked: hasTierAccess(profile.tier, "pro"), detail: "Phase-aware coaching and guidance" }
          ].map((item) => (
            <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg font-semibold text-white">{item.label}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
                    item.unlocked
                      ? "border border-accentSecondary/40 bg-accentSecondary/10 text-white"
                      : "border border-white/10 bg-black/10 text-slate-400"
                  }`}
                >
                  {item.unlocked ? "Unlocked" : "Locked"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="business-catalog" className="mt-6 panel-surface p-6 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="grid gap-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Search Businesses</span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search businesses by name..."
              className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/20"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => {
              const active = filters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => toggleFilter(filter.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border border-accent/60 bg-accent/10 text-white"
                      : "border border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6">
        {filteredBusinesses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {filteredBusinesses.map((candidate) => (
              <BusinessCard
                key={candidate.id}
                business={candidate}
                tagLabels={businessTagLabels}
                onSelect={handleSelectBusiness}
                tier={profile.tier}
                isActiveBlueprint={activeBlueprintId === candidate.id}
              />
            ))}
          </div>
        ) : (
          <div className="panel-surface p-12 text-center">
            <p className="text-lg font-semibold text-white">No businesses match your search.</p>
            <p className="mt-3 text-sm text-muted">Clear one or two filters and try again.</p>
          </div>
        )}
      </section>

      {!hasCoreAccess && (
        <section className="mt-6 grid gap-4 xl:grid-cols-2">
          <LockedFeatureCard
            title="Core unlocks the full blueprint"
            requiredTier="core"
            description="Preview is intentionally limited to service discovery and fit. Core unlocks the real operating system."
            bullets={[
              "Detailed startup requirements and tool stack",
              "Licensing, insurance, pricing, and operating guidance",
              "Weekly launch execution and process design"
            ]}
            ctaHref={getCheckoutHref("core")}
          />
          <LockedFeatureCard
            title="Pro unlocks AI-guided execution"
            requiredTier="pro"
            description="Once the service model is selected, Pro adds guided prompts and tactical AI support."
            bullets={[
              "Setup, pricing, marketing, operations, and sales prompt starters",
              "Service-specific responses based on the selected business",
              "Execution help for objections, follow-up, and lead handling"
            ]}
            ctaHref={getCheckoutHref("pro")}
          />
        </section>
      )}
    </div>
  );
}
