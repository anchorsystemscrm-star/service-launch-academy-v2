"use client";

import { BusinessPanelData } from "@/types/business";

type BusinessPanelField = keyof Pick<
  BusinessPanelData,
  "businessName" | "serviceType" | "serviceArea" | "starterOffer" | "priceFloor" | "phone" | "bookingMethod" | "paymentMethod"
>;

interface BusinessPanelProps {
  panel: BusinessPanelData;
  onFieldChange: (field: BusinessPanelField, value: string) => void;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const editableFields: Array<{
  field: BusinessPanelField;
  label: string;
  placeholder: string;
}> = [
  { field: "businessName", label: "Business Name", placeholder: "Set a business name" },
  { field: "serviceType", label: "Service Type", placeholder: "Service type" },
  { field: "serviceArea", label: "Service Area", placeholder: "City, ZIPs, or radius" },
  { field: "starterOffer", label: "Starter Offer", placeholder: "Your first clear offer" },
  { field: "priceFloor", label: "Price Floor", placeholder: "Minimum job price or pricing rule" },
  { field: "phone", label: "Phone", placeholder: "Business phone" },
  { field: "bookingMethod", label: "Booking Method", placeholder: "Call, text, form, calendar" },
  { field: "paymentMethod", label: "Payment Method", placeholder: "Invoice, card, ACH" }
];

function BusinessPanelContent({ panel, onFieldChange }: Omit<BusinessPanelProps, "collapsible" | "defaultOpen">) {
  return (
    <div className="grid w-full max-w-full gap-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-[18px] border border-white/10 bg-black/20 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Current Phase</p>
          <p className="mt-2 break-words text-sm font-semibold text-white">{panel.currentPhase}</p>
        </div>
        <div className="rounded-[18px] border border-white/10 bg-black/20 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Completed Tasks</p>
          <p className="mt-2 text-sm font-semibold text-white">{panel.completedTasks}</p>
        </div>
      </div>

      <div className="grid gap-3">
        {editableFields.map(({ field, label, placeholder }) => (
          <label key={field} className="grid gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{label}</span>
            <input
              value={panel[field]}
              onChange={(event) => onFieldChange(field, event.target.value)}
              placeholder={placeholder}
              className="w-full max-w-full rounded-[18px] border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export function BusinessPanel({
  panel,
  onFieldChange,
  collapsible = false,
  defaultOpen = false
}: BusinessPanelProps) {
  if (!collapsible) {
    return (
      <section className="panel-surface w-full max-w-full overflow-hidden p-5">
        <div className="flex w-full max-w-full items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">View Your Business</p>
            <p className="mt-2 break-words text-sm leading-6 text-muted">
              Your offer, pricing, and setup in one place.
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">→</span>
        </div>
        <div className="mt-4">
          <BusinessPanelContent panel={panel} onFieldChange={onFieldChange} />
        </div>
      </section>
    );
  }

  return (
    <details className="panel-surface w-full max-w-full overflow-hidden p-5" open={defaultOpen}>
      <summary className="list-none">
        <div className="flex w-full max-w-full cursor-pointer flex-wrap items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 transition hover:border-accent/30 hover:bg-white/10 active:scale-[0.99]">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">View Your Business</p>
            <p className="mt-1 break-words text-sm leading-6 text-muted">Your offer, pricing, and setup in one place</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
              {panel.currentPhase}
            </span>
            <span className="text-lg text-slate-300">→</span>
          </div>
        </div>
      </summary>
      <div className="mt-4">
        <BusinessPanelContent panel={panel} onFieldChange={onFieldChange} />
      </div>
    </details>
  );
}
