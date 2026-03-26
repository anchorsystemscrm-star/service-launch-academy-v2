"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import { BusinessFlowPreviewCard } from "@/components/BusinessFlowPreviewCard";
import { Business, BusinessPanelData, SubscriptionTier } from "@/types/business";
import { tierLabels } from "@/utils/access";
import { getBusinessSetupStrength, shouldShowAnchorSystemsCard } from "@/utils/benchmarks";
import { BusinessPanelEditableField } from "@/utils/storage";

interface BusinessWorkspaceProps {
  business: Business;
  panel: BusinessPanelData;
  currentTier: SubscriptionTier;
  updatedAt: string | null;
  onFieldChange: (field: BusinessPanelEditableField, value: string) => void;
  onFieldsChange: (fields: Partial<Record<BusinessPanelEditableField, string>>) => void;
}

function formatUpdatedAt(updatedAt: string | null) {
  if (!updatedAt) {
    return "Auto-saves locally";
  }

  const date = new Date(updatedAt);

  if (Number.isNaN(date.getTime())) {
    return "Auto-saves locally";
  }

  return `Updated ${date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric"
  })} at ${date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  })}`;
}

function getCoachHref(prompt: string, mode: "general" | "pricing" | "checklist" | "marketing" | "sop" | "followup" = "general") {
  const params = new URLSearchParams({
    autoprompt: prompt,
    mode
  });

  return `/ai-coach?${params.toString()}`;
}

function Section({
  id,
  title,
  description,
  helper,
  children
}: {
  id: string;
  title: string;
  description: string;
  helper?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="panel-surface scroll-mt-36 w-full max-w-full overflow-hidden p-5 sm:p-6">
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">{title}</p>
        <p className="mt-2 break-words text-sm leading-6 text-muted">{description}</p>
        {helper ? <p className="mt-3 break-words text-xs leading-5 text-slate-300">{helper}</p> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function TextField({
  label,
  value,
  placeholder,
  onChange
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full max-w-full rounded-[16px] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  placeholder,
  onChange,
  rows = 4
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full max-w-full resize-y rounded-[16px] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}

function ReadOnlyValue({
  label,
  value,
  helper
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      <div className="rounded-[16px] border border-white/10 bg-black/20 px-4 py-3">
        <p className="break-words text-sm leading-6 text-white">{value || "Not set yet"}</p>
        {helper ? <p className="mt-2 break-words text-xs leading-5 text-muted">{helper}</p> : null}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-2 text-xs leading-5 text-muted">{hint}</p> : null}
    </div>
  );
}

function StatusBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-white/10 bg-black/20 px-4 py-3">
      <span className="text-sm text-slate-200">{label}</span>
      <span
        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
          active ? "bg-emerald-500/15 text-emerald-100" : "bg-white/5 text-slate-400"
        }`}
      >
        {active ? "Set" : "Not set"}
      </span>
    </div>
  );
}

function QuickActionButton({
  label,
  onClick
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
    >
      {label}
    </button>
  );
}

function SuggestionBlock({
  title,
  preview,
  onUse,
  coachHref
}: {
  title: string;
  preview: string[];
  onUse: () => void;
  coachHref: string;
}) {
  return (
    <div className="rounded-[20px] border border-accent/20 bg-accent/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Blueprint suggestion</p>
          <p className="mt-2 text-sm font-semibold text-white">{title}</p>
          <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-100">
            {preview.map((item) => (
              <p key={item} className="break-words">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <button
            type="button"
            onClick={onUse}
            className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
          >
            Use Blueprint Suggestion
          </button>
          <Link
            href={coachHref}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            Draft with AI Coach
          </Link>
        </div>
      </div>
    </div>
  );
}

export function BusinessWorkspace({
  business,
  panel,
  currentTier,
  updatedAt,
  onFieldChange,
  onFieldsChange
}: BusinessWorkspaceProps) {
  const strength = getBusinessSetupStrength(panel);
  const shouldShowAnchorCard = shouldShowAnchorSystemsCard(panel, {
    leads: panel.leads,
    quotes: panel.quoted,
    jobs: panel.booked,
    completed: panel.completed,
    revenue: 0,
    reviews: 0
  });
  const missingCritical = [
    !panel.phone ? "Phone" : null,
    !panel.bookingMethod ? "Booking" : null,
    !panel.paymentMethod ? "Payments" : null
  ].filter(Boolean) as string[];

  function jumpTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl animate-fade-up">
      <section className="panel-surface w-full max-w-full overflow-hidden p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Business</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Your Business</h1>
            <p className="mt-3 break-words text-base leading-7 text-muted">
              Build this workspace as the business gets more real. Blueprint gives the reference material, AI Coach helps draft it, and this page becomes the version you actually want to run.
            </p>
          </div>
          <div className="grid gap-2 rounded-[22px] border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {panel.serviceType}
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {tierLabels[currentTier]}
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {panel.currentPhase}
              </span>
            </div>
            <p className="text-xs leading-5 text-muted">{formatUpdatedAt(updatedAt)}</p>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <section id="current-focus" className="panel-surface scroll-mt-36 w-full max-w-full overflow-hidden p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Current focus</p>
          <h2 className="mt-2 text-xl font-semibold text-white">What matters right now</h2>
          <p className="mt-2 break-words text-sm leading-6 text-muted">
            Keep one priority visible here so the rest of the workspace supports the same move.
          </p>
          <div className="mt-5 grid gap-4">
            <TextField
              label="Focus This Week"
              value={panel.focusThisWeek}
              placeholder="Example: Finalize pressure washing pricing"
              onChange={(value) => onFieldChange("focusThisWeek", value)}
            />
            <TextAreaField
              label="Supporting Note"
              value={panel.focusSupportNote}
              placeholder="Why this matters, what needs to be decided, or what should be true when it is done."
              rows={4}
              onChange={(value) => onFieldChange("focusSupportNote", value)}
            />
          </div>
        </section>

        <section className="panel-surface w-full max-w-full overflow-hidden p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Business setup</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Business Setup: {strength.percentage}% complete</h2>
          <p className="mt-2 break-words text-sm leading-6 text-muted">{strength.summary}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-950">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accentSecondary transition-all duration-500"
              style={{ width: `${strength.percentage}%` }}
            />
          </div>
          <div className="mt-4 grid gap-3">
            <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Workspace status</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                {strength.completed}/{strength.total} foundational fields are documented from your actual workspace, not template values.
              </p>
            </div>
            {strength.missing.length ? (
              <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Still needs attention</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {strength.missing.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {missingCritical.length ? (
              <div className="rounded-[18px] border border-accent/20 bg-accent/5 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Missing</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {missingCritical.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <section className="panel-surface mt-6 w-full max-w-full overflow-hidden p-5 sm:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Quick actions</p>
            <p className="mt-2 break-words text-sm leading-6 text-muted">
              Jump straight to the part of the workspace that needs attention instead of scrolling through everything.
            </p>
          </div>
          <div className="flex w-full max-w-full flex-wrap gap-2 lg:w-auto">
            <QuickActionButton label="Edit Pricing" onClick={() => jumpTo("offer-pricing")} />
            <QuickActionButton label="Update Offer" onClick={() => jumpTo("offer-pricing")} />
            <QuickActionButton label="Add Lead Source" onClick={() => jumpTo("lead-flow")} />
            <QuickActionButton label="Update Target Customer" onClick={() => jumpTo("market-notes")} />
            <QuickActionButton label="Add Sales Notes" onClick={() => jumpTo("lead-flow")} />
            <Link
              href="/ai-coach"
              className="inline-flex w-full items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/15 sm:w-auto"
            >
              Open AI Coach
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-6 grid w-full max-w-full gap-6">
        <Section
          id="business-overview"
          title="Business Overview"
          description="Start with the basics. This should make it clear what service is being built, where it operates, and how you want to describe it."
          helper="Use Blueprint guidance or AI Coach to draft this section. The reference context below is not saved until you type or accept a suggestion."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <ReadOnlyValue
              label="Selected Service"
              value={panel.serviceType}
              helper="This comes from the service selected in your dashboard."
            />
            <ReadOnlyValue
              label="Suggested Service Model"
              value={panel.serviceModel}
              helper="Reference only. Use this operating shape when you define offers, staffing, and delivery."
            />
            <ReadOnlyValue
              label="Current Phase"
              value={panel.currentPhase}
              helper="Derived from your Blueprint progress."
            />
            <ReadOnlyValue
              label="Reference Description"
              value={business.summary}
              helper="This is the service summary from the selected blueprint. It is not saved into your workspace."
            />
            <TextField
              label="Business Name"
              value={panel.businessName}
              placeholder="Name the business"
              onChange={(value) => onFieldChange("businessName", value)}
            />
            <TextField
              label="Owner / Operator Name"
              value={panel.ownerName}
              placeholder="Who is running this?"
              onChange={(value) => onFieldChange("ownerName", value)}
            />
            <TextField
              label="Location"
              value={panel.serviceArea}
              placeholder="City, ZIPs, neighborhoods, or radius"
              onChange={(value) => onFieldChange("serviceArea", value)}
            />
            <TextAreaField
              label="Short Business Description"
              value={panel.businessDescription}
              placeholder="Summarize what the business does and why customers should care."
              rows={4}
              onChange={(value) => onFieldChange("businessDescription", value)}
            />
          </div>
        </Section>

        <Section
          id="offer-pricing"
          title="Offer + Pricing"
          description="Keep the sellable offer tight. This is where the core package, upsells, price floor, and pricing logic stay visible."
          helper="Use Blueprint guidance or AI Coach to draft this section. Nothing here counts as complete until you create it or explicitly accept a suggestion."
        >
          <SuggestionBlock
            title="Reference offer direction"
            preview={[
              `Starter offer: ${business.offerPricing.starterOffer}`,
              `Reference floor: ${business.offerPricing.minimumPriceGuidance}`,
              `Reference upsells: ${business.offerPricing.addOns.slice(0, 3).join(", ")}`
            ]}
            onUse={() =>
              onFieldsChange({
                starterOffer: business.offerPricing.starterOffer,
                secondaryOffer: [business.offerPricing.standardOffer, `Upsells: ${business.offerPricing.addOns.slice(0, 3).join(", ")}`]
                  .filter(Boolean)
                  .join("\n"),
                priceFloor: business.offerPricing.minimumPriceGuidance.match(/\$[\d,]+(?:-\$?[\d,]+)?/)?.[0] ?? business.offerPricing.minimumPriceGuidance,
                keyInclusions: business.offerPricing.starterOffer,
                pricingNotes: business.offerPricing.pricingNotes.slice(0, 3).join("\n"),
                packageIdeas: [business.offerPricing.standardOffer, business.offerPricing.premiumOffer].filter(Boolean).join("\n"),
                idealTicketSizeNotes: business.margin_range ? `Protect margin in the ${business.margin_range} range while keeping the entry offer easy to sell.` : ""
              })
            }
            coachHref={getCoachHref(`Draft a premium core offer, upsells, and starting price for my ${business.name} business using the current blueprint as reference.`, "pricing")}
          />

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <TextAreaField
              label="Core Offer"
              value={panel.starterOffer}
              placeholder={`Blueprint reference: ${business.offerPricing.starterOffer}`}
              rows={4}
              onChange={(value) => onFieldChange("starterOffer", value)}
            />
            <TextAreaField
              label="Secondary Offer / Upsells"
              value={panel.secondaryOffer}
              placeholder={`Reference upsells: ${business.offerPricing.addOns.slice(0, 3).join(", ")}`}
              rows={4}
              onChange={(value) => onFieldChange("secondaryOffer", value)}
            />
            <TextField
              label="Starting Price / Entry Price"
              value={panel.priceFloor}
              placeholder={`Reference: ${business.offerPricing.minimumPriceGuidance}`}
              onChange={(value) => onFieldChange("priceFloor", value)}
            />
            <TextAreaField
              label="Key Inclusions"
              value={panel.keyInclusions}
              placeholder="List the core deliverables. One per line works well."
              rows={4}
              onChange={(value) => onFieldChange("keyInclusions", value)}
            />
            <TextAreaField
              label="Pricing Notes"
              value={panel.pricingNotes}
              placeholder="Use Blueprint guidance or AI Coach to draft floor rules, exclusions, and margin guardrails."
              rows={5}
              onChange={(value) => onFieldChange("pricingNotes", value)}
            />
            <TextAreaField
              label="Package Ideas"
              value={panel.packageIdeas}
              placeholder="Map out future package structures or add-on bundles."
              rows={5}
              onChange={(value) => onFieldChange("packageIdeas", value)}
            />
            <div className="xl:col-span-2">
              <TextAreaField
                label="Ideal Ticket Size Notes"
                value={panel.idealTicketSizeNotes}
                placeholder="What does a healthy ticket look like for this business?"
                rows={4}
                onChange={(value) => onFieldChange("idealTicketSizeNotes", value)}
              />
            </div>
          </div>
        </Section>

        <Section
          id="market-notes"
          title="Service Area + Market Notes"
          description="Keep the market view practical. Document who you serve, where to focus, and why customers should choose this business."
          helper="Use Blueprint guidance or AI Coach to draft this section. Keep the saved version specific to your own market, not just the service template."
        >
          <SuggestionBlock
            title="Reference market direction"
            preview={[
              `Reference customer: ${business.goodFor[0] ?? "Best-fit customer still needs to be defined"}`,
              `Demand context: ${[business.demandLevel, business.seasonality].filter(Boolean).join(" | ")}`,
              `Operator fit: ${business.bestFitOperatorType}`
            ]}
            onUse={() =>
              onFieldsChange({
                targetCustomer: business.goodFor[0] ?? "",
                marketNotes: [business.demandLevel, business.seasonality].filter(Boolean).join("\n"),
                territoryNotes: business.acquisitionPlan.neighborhoodMarketingIdeas.slice(0, 2).join("\n"),
                competitionNotes: business.bestFitOperatorType
              })
            }
            coachHref={getCoachHref(`Draft a target customer profile, market notes, and local differentiation plan for my ${business.name} business.`, "marketing")}
          />

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <TextField
              label="Target Customer"
              value={panel.targetCustomer}
              placeholder={`Reference: ${business.goodFor[0] ?? "Best-fit customer"}`}
              onChange={(value) => onFieldChange("targetCustomer", value)}
            />
            <TextAreaField
              label="Market Notes"
              value={panel.marketNotes}
              placeholder="Demand, seasonality, and local market notes."
              rows={5}
              onChange={(value) => onFieldChange("marketNotes", value)}
            />
            <TextAreaField
              label="Neighborhood / Territory Notes"
              value={panel.territoryNotes}
              placeholder="Document local clusters, routes, target neighborhoods, or account types."
              rows={5}
              onChange={(value) => onFieldChange("territoryNotes", value)}
            />
            <div className="xl:col-span-2">
              <TextAreaField
                label="Competition / Differentiation Notes"
                value={panel.competitionNotes}
                placeholder="Why should this business win locally?"
                rows={4}
                onChange={(value) => onFieldChange("competitionNotes", value)}
              />
            </div>
          </div>
        </Section>

        <Section
          id="lead-flow"
          title="Lead Flow + Sales Process"
          description="Keep the pipeline simple. Track lead sources, how people book, and how you move them from inquiry to sold work."
          helper="Use Blueprint guidance or AI Coach to draft this section. The stats below come from Benchmarks, but the actual sales process notes are yours to build."
        >
          <SuggestionBlock
            title="Reference lead and sales direction"
            preview={[
              `Lead sources: ${business.acquisitionPlan.bestFirstLeadSources.slice(0, 3).join(", ")}`,
              `Quote process: ${business.operationsSetup.quotingProcess[0] ?? "Build this process"}`,
              `Follow-up: ${business.operationsSetup.followUpProcess[0] ?? "Build this process"}`
            ]}
            onUse={() =>
              onFieldsChange({
                leadSourcePlan: business.acquisitionPlan.bestFirstLeadSources.slice(0, 4).join("\n"),
                salesProcessNotes: business.operationsSetup.quotingProcess.slice(0, 2).join("\n"),
                followUpNotes: business.operationsSetup.followUpProcess.slice(0, 2).join("\n"),
                objectionHandlingNotes: business.scripts[1]?.body ?? business.scripts[0]?.body ?? ""
              })
            }
            coachHref={getCoachHref(`Draft a lead source plan, sales process, and follow-up flow for my ${business.name} business using the current blueprint as reference.`, "followup")}
          />

          <div className="mt-4 grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Leads" value={panel.leads} hint="From Benchmarks" />
              <StatCard label="Quoted" value={panel.quoted} hint="From Benchmarks" />
              <StatCard label="Booked" value={panel.booked} hint="From Benchmarks" />
              <StatCard label="Completed" value={panel.completed} hint="From Benchmarks" />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <TextAreaField
                label="Lead Source Plan"
                value={panel.leadSourcePlan}
                placeholder="List the first channels that should produce real leads."
                rows={4}
                onChange={(value) => onFieldChange("leadSourcePlan", value)}
              />
              <TextField
                label="Booking Method"
                value={panel.bookingMethod}
                placeholder="Example: phone + text intake, form + call back, online scheduler"
                onChange={(value) => onFieldChange("bookingMethod", value)}
              />
              <TextField
                label="Payment Method"
                value={panel.paymentMethod}
                placeholder="Example: invoice link, card on file, deposit invoice"
                onChange={(value) => onFieldChange("paymentMethod", value)}
              />
              <TextAreaField
                label="Sales Process Notes"
                value={panel.salesProcessNotes}
                placeholder="Capture the intake, quote, follow-up, and close process."
                rows={5}
                onChange={(value) => onFieldChange("salesProcessNotes", value)}
              />
              <TextAreaField
                label="Follow-Up Notes"
                value={panel.followUpNotes}
                placeholder="Write the reminder rhythm, no-response follow-up, and reactivation ideas."
                rows={5}
                onChange={(value) => onFieldChange("followUpNotes", value)}
              />
              <TextAreaField
                label="Objection Handling Notes"
                value={panel.objectionHandlingNotes}
                placeholder="Document the strongest responses to price, timing, trust, and scope objections."
                rows={5}
                onChange={(value) => onFieldChange("objectionHandlingNotes", value)}
              />
            </div>
          </div>
        </Section>

        <Section
          id="setup-stack"
          title="Setup + Stack"
          description="Keep the launch stack visible so the business can answer leads, book jobs, and collect payment without improvising."
          helper="Use Blueprint guidance or AI Coach to draft this section. Setup status can grow over time instead of appearing prebuilt on day one."
        >
          <SuggestionBlock
            title="Reference setup direction"
            preview={[
              `Suggested tools: ${business.softwareStack.slice(0, 3).map((item) => `${item.category}: ${item.tool}`).join(" | ")}`,
              `Reference website note: ${business.softwareStack.find((item) => item.category === "Website")?.notes ?? "No website note yet"}`,
              `Reference automation ideas: ${business.advancedSystems.slice(0, 2).join(" | ")}`
            ]}
            onUse={() =>
              onFieldsChange({
                crmTools: business.softwareStack
                  .slice(0, 4)
                  .map((item) => `${item.category}: ${item.tool}`)
                  .join("\n"),
                websiteFunnelNotes: business.softwareStack.find((item) => item.category === "Website")?.notes ?? "",
                automationNotes: business.advancedSystems.slice(0, 3).join("\n"),
                setupNotes: business.startupRequirements.requiredItems.slice(0, 4).join("\n")
              })
            }
            coachHref={getCoachHref(`Draft a lean setup stack, tooling plan, and admin checklist for my ${business.name} business.`, "sop")}
          />

          <div className="mt-4 grid gap-4">
            <div className="grid gap-3 lg:grid-cols-3">
              <StatusBadge label="Phone" active={Boolean(panel.phone)} />
              <StatusBadge label="Booking" active={Boolean(panel.bookingMethod)} />
              <StatusBadge label="Payments" active={Boolean(panel.paymentMethod)} />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <TextField
                label="Phone"
                value={panel.phone}
                placeholder="Business phone number or setup note"
                onChange={(value) => onFieldChange("phone", value)}
              />
              <TextAreaField
                label="CRM / Tools"
                value={panel.crmTools}
                placeholder="List the core CRM, phone, scheduling, invoicing, and operational tools."
                rows={4}
                onChange={(value) => onFieldChange("crmTools", value)}
              />
              <TextAreaField
                label="Website / Funnel Notes"
                value={panel.websiteFunnelNotes}
                placeholder="Document the site, landing page, offer page, or form setup."
                rows={4}
                onChange={(value) => onFieldChange("websiteFunnelNotes", value)}
              />
              <TextAreaField
                label="Automation Notes"
                value={panel.automationNotes}
                placeholder="What should eventually be automated as the business gets busier?"
                rows={4}
                onChange={(value) => onFieldChange("automationNotes", value)}
              />
              <div className="xl:col-span-2">
                <TextAreaField
                  label="Setup Notes"
                  value={panel.setupNotes}
                  placeholder="Capture the remaining stack, admin, and operating setup notes."
                  rows={5}
                  onChange={(value) => onFieldChange("setupNotes", value)}
                />
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="operations"
          title="Operations"
          description="Document how the work gets delivered so the business becomes easier to repeat, quote, schedule, and improve."
          helper="Use Blueprint guidance or AI Coach to draft this section. Keep it practical enough that another person could understand the work without a long explanation."
        >
          <SuggestionBlock
            title="Reference operating direction"
            preview={[
              `Scheduling: ${business.operationsSetup.schedulingProcess[0] ?? "Build this process"}`,
              `Fulfillment: ${business.operationsSetup.jobPrep[0] ?? "Build this process"}`,
              `Equipment reference: ${business.startupRequirements.equipment.slice(0, 3).join(", ")}`
            ]}
            onUse={() =>
              onFieldsChange({
                schedulingNotes: business.operationsSetup.schedulingProcess.slice(0, 2).join("\n"),
                fulfillmentNotes: business.operationsSetup.jobPrep.slice(0, 2).join("\n"),
                equipmentNotes: business.startupRequirements.equipment.slice(0, 4).join("\n"),
                hiringNotes: business.teamModel,
                operationsNotes: business.operationsSetup.completionChecklist.slice(0, 2).join("\n")
              })
            }
            coachHref={getCoachHref(`Draft a lean operating process, scheduling standard, and fulfillment checklist for my ${business.name} business.`, "sop")}
          />

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <TextAreaField
              label="Scheduling Notes"
              value={panel.schedulingNotes}
              placeholder="What rules should shape dispatch, routing, or project timing?"
              rows={4}
              onChange={(value) => onFieldChange("schedulingNotes", value)}
            />
            <TextAreaField
              label="Fulfillment Notes"
              value={panel.fulfillmentNotes}
              placeholder="How should the work be prepped, delivered, and closed out?"
              rows={4}
              onChange={(value) => onFieldChange("fulfillmentNotes", value)}
            />
            <TextAreaField
              label="Equipment / Supplies Notes"
              value={panel.equipmentNotes}
              placeholder="Document the tool, equipment, and consumable setup."
              rows={4}
              onChange={(value) => onFieldChange("equipmentNotes", value)}
            />
            <TextAreaField
              label="Hiring / Help Notes"
              value={panel.hiringNotes}
              placeholder="When will this need a helper, tech, subcontractor, or crew support?"
              rows={4}
              onChange={(value) => onFieldChange("hiringNotes", value)}
            />
            <div className="xl:col-span-2">
              <TextAreaField
                label="Operations Notes"
                value={panel.operationsNotes}
                placeholder="Capture the SOPs, checklists, and repeatable operating rules that matter."
                rows={5}
                onChange={(value) => onFieldChange("operationsNotes", value)}
              />
            </div>
          </div>
        </Section>

        <Section
          id="brand-messaging"
          title="Brand + Messaging"
          description="Keep the positioning tight. This is the place for the promise, tone, proof, and message direction that should shape everything customer-facing."
          helper="Use Blueprint guidance or AI Coach to draft this section. Treat the service notes as reference material until you adapt them into your actual brand."
        >
          <SuggestionBlock
            title="Reference brand direction"
            preview={[
              `Positioning: ${business.whyAttractive}`,
              `Reference headline: ${business.recommended_first_offer}`,
              `Trust builders: ${business.acquisitionPlan.socialProofIdeas.slice(0, 2).join(" | ")}`
            ]}
            onUse={() =>
              onFieldsChange({
                brandPositioningNotes: business.whyAttractive,
                headlineOfferNotes: business.recommended_first_offer,
                toneMessagingNotes: "Premium, clear, trustworthy, and direct. Avoid discount language and vague claims.",
                trustBuildersNotes: business.acquisitionPlan.socialProofIdeas.slice(0, 3).join("\n"),
                brandNotes: business.acquisitionPlan.googleBusinessProfileGuidance.slice(0, 2).join("\n")
              })
            }
            coachHref={getCoachHref(`Draft brand positioning, trust builders, and messaging direction for my ${business.name} business.`, "marketing")}
          />

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <TextAreaField
              label="Brand Positioning Notes"
              value={panel.brandPositioningNotes}
              placeholder="What should the business stand for in the market?"
              rows={4}
              onChange={(value) => onFieldChange("brandPositioningNotes", value)}
            />
            <TextAreaField
              label="Headline / Offer Notes"
              value={panel.headlineOfferNotes}
              placeholder="Capture the strongest headline, hook, or first-offer framing."
              rows={4}
              onChange={(value) => onFieldChange("headlineOfferNotes", value)}
            />
            <TextAreaField
              label="Tone / Messaging Notes"
              value={panel.toneMessagingNotes}
              placeholder="Document voice, tone, and language rules."
              rows={4}
              onChange={(value) => onFieldChange("toneMessagingNotes", value)}
            />
            <TextAreaField
              label="Trust Builders / Proof Notes"
              value={panel.trustBuildersNotes}
              placeholder="What builds trust fast? Reviews, proof photos, guarantees, or process clarity?"
              rows={4}
              onChange={(value) => onFieldChange("trustBuildersNotes", value)}
            />
            <div className="xl:col-span-2">
              <TextAreaField
                label="Brand Notes"
                value={panel.brandNotes}
                placeholder="Store supporting brand direction, visual notes, or positioning reminders."
                rows={5}
                onChange={(value) => onFieldChange("brandNotes", value)}
              />
            </div>
          </div>
        </Section>

        <Section
          id="goals-milestones"
          title="Goals + Milestones"
          description="Keep the targets visible so the business always has a short-term focus and a measured next milestone."
          helper="Use Blueprint guidance or AI Coach to draft this section. The benchmark ranges below are reference context, not saved goals until you choose them."
        >
          <SuggestionBlock
            title="Reference goal direction"
            preview={[
              `30-day benchmark reference: ${business.phaseBenchmarks[1] ? `${business.phaseBenchmarks[1].leads[0]}-${business.phaseBenchmarks[1].leads[1]} leads and ${business.phaseBenchmarks[1].jobs[0]}-${business.phaseBenchmarks[1].jobs[1]} jobs` : "Define the first 30-day target"}`,
              `90-day revenue reference: ${business.revenue_90_range}`,
              `Current milestone reference: ${business.blueprintPhases[0]?.successLooksLike ?? "Define the next milestone"}`
            ]}
            onUse={() =>
              onFieldsChange({
                goal30Day: business.phaseBenchmarks[1]
                  ? `Generate ${business.phaseBenchmarks[1].leads[0]}-${business.phaseBenchmarks[1].leads[1]} leads, send ${business.phaseBenchmarks[1].quotes[0]}-${business.phaseBenchmarks[1].quotes[1]} quotes, and close ${business.phaseBenchmarks[1].jobs[0]}-${business.phaseBenchmarks[1].jobs[1]} jobs.`
                  : "",
                goal90Day: `Push toward ${business.revenue_90_range} in gross revenue while tightening quote speed and delivery.`,
                revenueGoal: business.revenue_90_range,
                milestoneNotes: business.blueprintPhases[0]?.successLooksLike ?? ""
              })
            }
            coachHref={getCoachHref(`Draft 30-day goals, 90-day goals, and milestone targets for my ${business.name} business based on the selected blueprint.`, "checklist")}
          />

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <TextAreaField
              label="30-Day Goal"
              value={panel.goal30Day}
              placeholder="What should be true in the next 30 days?"
              rows={4}
              onChange={(value) => onFieldChange("goal30Day", value)}
            />
            <TextAreaField
              label="90-Day Goal"
              value={panel.goal90Day}
              placeholder="What should be true by day 90?"
              rows={4}
              onChange={(value) => onFieldChange("goal90Day", value)}
            />
            <TextField
              label="Revenue Goal"
              value={panel.revenueGoal}
              placeholder={`Reference range: ${business.revenue_90_range}`}
              onChange={(value) => onFieldChange("revenueGoal", value)}
            />
            <ReadOnlyValue
              label="Current Phase"
              value={panel.currentPhase}
              helper="This tracks the current blueprint phase based on your execution progress."
            />
            <div className="xl:col-span-2">
              <TextAreaField
                label="Milestone Notes"
                value={panel.milestoneNotes}
                placeholder="Document what completion should look like for the next milestone."
                rows={5}
                onChange={(value) => onFieldChange("milestoneNotes", value)}
              />
            </div>
          </div>
        </Section>

        {shouldShowAnchorCard ? (
          <BusinessFlowPreviewCard
            businessName={panel.businessName || panel.serviceType}
            coreOffer={panel.starterOffer || business.recommended_first_offer}
            leadSourcePlan={panel.leadSourcePlan}
            compact
          />
        ) : null}

        <Section
          id="general-notes"
          title="General Notes"
          description="Use this as the catch-all workspace for anything that matters but does not fit neatly elsewhere."
          helper="Loose ideas, reminders, customer language, and strategy notes all belong here if they help the business move faster."
        >
          <TextAreaField
            label="Open Notes"
            value={panel.generalNotes}
            placeholder="Capture decisions, reminders, loose ideas, next questions, and important context."
            rows={10}
            onChange={(value) => onFieldChange("generalNotes", value)}
          />
        </Section>
      </div>
    </div>
  );
}
