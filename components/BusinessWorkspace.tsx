"use client";

import type { ReactNode } from "react";

import { BusinessPanelData, SubscriptionTier } from "@/types/business";
import { tierLabels } from "@/utils/access";
import { BusinessPanelEditableField } from "@/utils/storage";

interface BusinessWorkspaceProps {
  panel: BusinessPanelData;
  currentTier: SubscriptionTier;
  updatedAt: string | null;
  onFieldChange: (field: BusinessPanelEditableField, value: string) => void;
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

function Section({
  title,
  description,
  children,
  className = ""
}: {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel-surface w-full max-w-full overflow-hidden p-5 sm:p-6 ${className}`}>
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">{title}</p>
        <p className="mt-2 break-words text-sm leading-6 text-muted">{description}</p>
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
        <p className="break-words text-sm text-white">{value || "Not set yet"}</p>
        {helper ? <p className="mt-2 break-words text-xs leading-5 text-muted">{helper}</p> : null}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[18px] border border-white/10 bg-black/20 px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
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

export function BusinessWorkspace({
  panel,
  currentTier,
  updatedAt,
  onFieldChange
}: BusinessWorkspaceProps) {
  const missingCritical = [
    !panel.phone ? "Phone" : null,
    !panel.bookingMethod ? "Booking method" : null,
    !panel.paymentMethod ? "Payments" : null
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto w-full max-w-7xl animate-fade-up">
      <section className="panel-surface w-full max-w-full overflow-hidden p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Business</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Your Business</h1>
            <p className="mt-3 break-words text-base leading-7 text-muted">
              This is the central workspace for the business you are building. Keep the offer, pricing, market notes,
              setup, and operating decisions here so Blueprint, Benchmarks, and AI Coach stay aligned.
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
            </div>
            <p className="text-xs leading-5 text-muted">{formatUpdatedAt(updatedAt)}</p>
          </div>
        </div>
      </section>

      {missingCritical.length ? (
        <section className="mt-6 w-full max-w-full overflow-hidden rounded-[22px] border border-accent/20 bg-accent/5 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Missing now</p>
              <p className="mt-1 break-words text-sm text-slate-100">Lock in the business basics so the workspace stays accurate.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingCritical.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <div className="mt-6 grid w-full max-w-full gap-6">
        <Section
          title="Business Overview"
          description="Anchor the basics first. This should make it obvious what business is being built, where it operates, and how it is positioned."
        >
          <div className="grid gap-4 lg:grid-cols-2">
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
            <ReadOnlyValue
              label="Selected Service"
              value={panel.serviceType}
              helper="This comes from the service model selected in your dashboard."
            />
            <ReadOnlyValue
              label="Service Model"
              value={panel.serviceModel}
              helper="Use this as the operating shape for pricing, staffing, and delivery."
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
          title="Offer + Pricing"
          description="Keep the sellable offer tight. This is where the core package, upsells, price floor, and pricing logic stay visible."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <TextAreaField
              label="Core Offer"
              value={panel.starterOffer}
              placeholder="What is the main offer you want to sell first?"
              rows={4}
              onChange={(value) => onFieldChange("starterOffer", value)}
            />
            <TextAreaField
              label="Secondary Offer / Upsells"
              value={panel.secondaryOffer}
              placeholder="List the next package and upsells."
              rows={4}
              onChange={(value) => onFieldChange("secondaryOffer", value)}
            />
            <TextField
              label="Starting Price / Entry Price"
              value={panel.priceFloor}
              placeholder="Set the minimum price or entry range"
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
              placeholder="Document floor rules, travel rules, exclusions, or margin guardrails."
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
          title="Service Area + Market Notes"
          description="Keep the market view practical. Document who you serve, where to focus, and why customers should choose this business."
        >
          <div className="grid gap-4 xl:grid-cols-2">
            <TextField
              label="Target Customer"
              value={panel.targetCustomer}
              placeholder="Who is the best-fit customer?"
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
          title="Lead Flow + Sales Process"
          description="Keep the pipeline simple. Track lead sources, how people book, and how you move them from inquiry to sold work."
        >
          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Leads" value={panel.leads} />
              <StatCard label="Quoted" value={panel.quoted} />
              <StatCard label="Booked" value={panel.booked} />
              <StatCard label="Completed" value={panel.completed} />
            </div>
            <p className="text-xs leading-5 text-muted">Pipeline counts pull from Benchmarks so this workspace reflects real operating activity.</p>
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
                placeholder="Phone, text, form, calendar link, or dispatch flow"
                onChange={(value) => onFieldChange("bookingMethod", value)}
              />
              <TextField
                label="Payment Method"
                value={panel.paymentMethod}
                placeholder="Invoice link, card reader, deposit + balance, etc."
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
          title="Setup + Stack"
          description="Keep the launch stack visible so the business can answer leads, book jobs, and collect payment without improvising."
        >
          <div className="grid gap-4">
            <div className="grid gap-3 lg:grid-cols-3">
              <StatusBadge label="Phone" active={Boolean(panel.phone)} />
              <StatusBadge label="Booking" active={Boolean(panel.bookingMethod)} />
              <StatusBadge label="Payments" active={Boolean(panel.paymentMethod)} />
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
              <TextField
                label="Phone"
                value={panel.phone}
                placeholder="Business phone number or phone system notes"
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
          title="Operations"
          description="Document how the work gets delivered so the business becomes easier to repeat, quote, schedule, and improve."
        >
          <div className="grid gap-4 xl:grid-cols-2">
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
          title="Brand + Messaging"
          description="Keep the positioning tight. This is the place for the promise, tone, proof, and message direction that should shape everything customer-facing."
        >
          <div className="grid gap-4 xl:grid-cols-2">
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
              placeholder="What builds trust fast? Reviews, proof photos, guarantees, process clarity?"
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
          title="Goals + Milestones"
          description="Keep the targets visible so the business always has a short-term focus and a measured next milestone."
        >
          <div className="grid gap-4 xl:grid-cols-2">
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
              placeholder="Target gross revenue, monthly target, or launch target"
              onChange={(value) => onFieldChange("revenueGoal", value)}
            />
            <TextAreaField
              label="Focus This Week"
              value={panel.focusThisWeek}
              placeholder="What is the one most important focus right now?"
              rows={4}
              onChange={(value) => onFieldChange("focusThisWeek", value)}
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

        <Section
          title="General Notes"
          description="Use this as the catch-all workspace for anything that matters but does not fit neatly elsewhere."
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
