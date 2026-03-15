"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { BusinessCard } from "@/components/BusinessCard";
import { businessTagLabels, businesses } from "@/data/businesses";
import { filterBusinesses } from "@/utils/benchmarks";
import { useActiveBlueprint, useSelectedBusiness } from "@/utils/storage";

const filterOptions = [
  { id: "low2k", label: "Low Startup (<$2k)" },
  { id: "low5k", label: "Low Startup (<$5k)" },
  { id: "solo", label: "Solo-friendly" },
  { id: "high", label: "High Demand" },
  { id: "indoor", label: "Indoor" },
  { id: "outdoor", label: "Outdoor" }
];

export default function DashboardPage() {
  const router = useRouter();
  const { selectedBusinessId, setSelectedBusinessId } = useSelectedBusiness(businesses[0].id);
  const { activeBlueprintId } = useActiveBlueprint();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  const filteredBusinesses = useMemo(
    () => filterBusinesses(businesses, query, filters),
    [filters, query]
  );

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
              <p className="text-3xl font-semibold text-white">{activeBlueprintId ? "1" : "0"}</p>
              <p className="mt-2 text-sm text-muted">Active blueprint selected</p>
            </div>
          </div>
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
                isActiveBlueprint={activeBlueprintId === business.id || selectedBusinessId === business.id}
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
    </div>
  );
}
