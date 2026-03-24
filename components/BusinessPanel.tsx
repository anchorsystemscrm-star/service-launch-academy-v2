"use client";

import { useState } from "react";

import { BusinessPanelData } from "@/types/business";

type BusinessPanelField = keyof Pick<
  BusinessPanelData,
  | "businessName"
  | "serviceType"
  | "serviceArea"
  | "starterOffer"
  | "priceFloor"
  | "keyInclusions"
  | "phone"
  | "bookingMethod"
  | "paymentMethod"
>;

interface BusinessPanelProps {
  panel: BusinessPanelData;
  onFieldChange: (field: BusinessPanelField, value: string) => void;
  onCompleteSetup?: () => void;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

function Field({
  label,
  value,
  placeholder,
  onChange,
  multiline = false
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full max-w-full resize-none rounded-[16px] border border-white/10 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full max-w-full rounded-[16px] border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
        />
      )}
    </label>
  );
}

function StatusPill({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[16px] bg-black/20 px-4 py-3">
      <span className="text-sm text-slate-200">{label}</span>
      <span
        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${
          active ? "bg-emerald-500/15 text-emerald-100" : "bg-white/5 text-slate-400"
        }`}
      >
        {active ? "Set" : "Not set"}
      </span>
    </div>
  );
}

function PipelineStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[16px] bg-black/20 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function BusinessPanelContent({
  panel,
  onFieldChange,
  onCompleteSetup
}: Omit<BusinessPanelProps, "collapsible" | "defaultOpen">) {
  const missing = [
    !panel.phone ? "Phone" : null,
    !panel.bookingMethod ? "Booking" : null,
    !panel.paymentMethod ? "Payments" : null
  ].filter(Boolean) as string[];

  return (
    <div className="grid w-full max-w-full gap-5">
      {missing.length ? (
        <div className="grid gap-2 rounded-[18px] bg-black/20 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Missing</p>
          <div className="flex flex-wrap gap-2">
            {missing.map((item) => (
              <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-3 border-t border-white/10 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Business Identity</p>
        <div className="grid gap-3">
          <Field label="Business Name" value={panel.businessName} placeholder="Set a business name" onChange={(value) => onFieldChange("businessName", value)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Service Type" value={panel.serviceType} placeholder="Service type" onChange={(value) => onFieldChange("serviceType", value)} />
            <Field label="Location" value={panel.serviceArea} placeholder="City, ZIPs, or radius" onChange={(value) => onFieldChange("serviceArea", value)} />
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/10 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Offer</p>
        <div className="grid gap-3">
          <Field label="Starter Offer" value={panel.starterOffer} placeholder="Your first clear offer" onChange={(value) => onFieldChange("starterOffer", value)} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Price Floor" value={panel.priceFloor} placeholder="Minimum job price or rule" onChange={(value) => onFieldChange("priceFloor", value)} />
            <Field label="Key Inclusions" value={panel.keyInclusions} placeholder={"List the core deliverables\nOne per line"} onChange={(value) => onFieldChange("keyInclusions", value)} multiline />
          </div>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/10 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Pipeline</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <PipelineStat label="Leads" value={panel.leads} />
          <PipelineStat label="Quoted" value={panel.quoted} />
          <PipelineStat label="Booked" value={panel.booked} />
          <PipelineStat label="Completed" value={panel.completed} />
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/10 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Setup Status</p>
        <div className="grid gap-3">
          <StatusPill label="Phone" active={Boolean(panel.phone)} />
          <StatusPill label="Booking" active={Boolean(panel.bookingMethod)} />
          <StatusPill label="Payments" active={Boolean(panel.paymentMethod)} />
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Phone" value={panel.phone} placeholder="Business phone" onChange={(value) => onFieldChange("phone", value)} />
          <Field label="Booking Method" value={panel.bookingMethod} placeholder="Call, text, form, calendar" onChange={(value) => onFieldChange("bookingMethod", value)} />
          <Field label="Payment Method" value={panel.paymentMethod} placeholder="Invoice, card, ACH" onChange={(value) => onFieldChange("paymentMethod", value)} />
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={onCompleteSetup}
          className="inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/15"
        >
          Complete your setup
        </button>
      </div>
    </div>
  );
}

export function BusinessPanel({
  panel,
  onFieldChange,
  onCompleteSetup,
  collapsible = false,
  defaultOpen = false
}: BusinessPanelProps) {
  const [open, setOpen] = useState(defaultOpen || !collapsible);

  return (
    <section className="panel-surface w-full max-w-full overflow-hidden p-4 sm:p-5">
      <p className="mb-3 break-words text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {panel.currentPhase}
      </p>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        className="flex w-full max-w-full cursor-pointer items-center justify-between gap-4 rounded-[20px] border border-white/10 bg-white/5 px-4 py-3.5 text-left transition hover:border-accent/30 hover:bg-white/10 active:scale-[0.99] active:brightness-110"
      >
        <div className="min-w-0 flex-1">
          <p className="break-words text-base font-semibold text-white sm:text-lg">View Your Business</p>
          <p className="mt-1 break-words text-sm leading-6 text-muted">Your offer, pricing, and setup in one place</p>
        </div>
        <span
          aria-hidden="true"
          className={`shrink-0 text-lg text-slate-300 transition-transform duration-200 ${open ? "translate-x-0.5" : ""}`}
        >
          →
        </span>
      </button>
      {open ? (
        <div className="mt-4">
          <BusinessPanelContent panel={panel} onFieldChange={onFieldChange} onCompleteSetup={onCompleteSetup} />
        </div>
      ) : null}
    </section>
  );
}
