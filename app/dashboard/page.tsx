"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { BusinessCard } from "@/components/BusinessCard";
import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { businessTagLabels, businesses } from "@/data/businesses";
import { getCheckoutHref, getPricingHref, hasTierAccess, tierLabels } from "@/utils/access";
import { filterBusinesses } from "@/utils/benchmarks";
import { useAccessProfile, useActiveBlueprint } from "@/utils/storage";

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

export default function DashboardPage() {
  const router = useRouter();
  const { profile, setSelectedBusinessId } = useAccessProfile();
  const { activeBlueprintId } = useActiveBlueprint();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  const filteredBusinesses = filterBusinesses(businesses, query, filters);

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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Launch Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Choose your 90-day service launch.</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
              Beginner-friendly step-by-step blueprints to launch a real service business, then run it on Anchor Systems with
              clean follow-up, scheduling, and KPI visibility.
            </p>
            <p className="mt-3 text-sm text-slate-300">
              Typical ranges; results vary. Revenue shown is conservative-to-likely gross revenue for new operators.
            </p>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold text-white">{businesses.length}</p>
              <p className="mt-2 text-sm text-muted">Launch-ready business models</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">13</p>
              <p className="mt-2 text-sm text-muted">Weeks of guided execution</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">{tierLabels[profile.tier]}</p>
              <p className="mt-2 text-sm text-muted">Current access tier</p>
            </div>
          </div>
        </div>
      </section>

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
              href="/start"
              className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            >
              Adjust setup
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Service Exploration", unlocked: hasTierAccess(profile.tier, "preview"), detail: "Compare opportunities, fit, and economics" },
            { label: "Blueprint", unlocked: hasTierAccess(profile.tier, "core"), detail: "Full launch roadmap, setup, pricing, and operations" },
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

      <section className="mt-6 panel-surface p-6 sm:p-8">
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
            {filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                tagLabels={businessTagLabels}
                onSelect={handleSelectBusiness}
                tier={profile.tier}
                isActiveBlueprint={activeBlueprintId === business.id}
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

      {!hasTierAccess(profile.tier, "core") && (
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
