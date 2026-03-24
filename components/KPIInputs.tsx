"use client";

import { KPIData } from "@/types/business";

interface KPIInputsProps {
  value: KPIData;
  onChange: (value: KPIData) => void;
}

const fieldConfig: Array<{ key: keyof KPIData; label: string; step: number }> = [
  { key: "leads", label: "Leads This Week", step: 1 },
  { key: "quotes", label: "Quotes This Week", step: 1 },
  { key: "jobs", label: "Jobs Won", step: 1 },
  { key: "completed", label: "Jobs Completed", step: 1 },
  { key: "revenue", label: "Revenue ($)", step: 50 },
  { key: "reviews", label: "Reviews", step: 1 }
];

export function KPIInputs({ value, onChange }: KPIInputsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      {fieldConfig.map((field) => (
        <label key={field.key} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted">{field.label}</span>
          <input
            type="number"
            min={0}
            step={field.step}
            value={value[field.key]}
            onChange={(event) =>
              onChange({
                ...value,
                [field.key]: Number(event.target.value || 0)
              })
            }
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/20"
          />
        </label>
      ))}
    </div>
  );
}
