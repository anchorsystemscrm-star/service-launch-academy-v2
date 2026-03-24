"use client";

import { CoachPricingStructured } from "@/lib/ai/coachTypes";

interface PricingRendererProps {
  data: CoachPricingStructured;
}

export function PricingRenderer({ data }: PricingRendererProps) {
  const packages = [
    { label: "Starter", value: data.starter },
    { label: "Standard", value: data.standard, recommended: true },
    { label: "Premium", value: data.premium }
  ];

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {packages.map((item) => (
        <article key={item.label} className={`rounded-[24px] border p-5 ${item.recommended ? "border-accent/30 bg-accent/5" : "border-white/10 bg-black/20"}`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{item.label}</p>
            {item.recommended ? (
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                Recommended
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white">{item.value.name}</h3>
          <p className="mt-2 text-2xl font-semibold text-white">{item.value.price}</p>
          <p className="mt-3 text-sm leading-6 text-muted">{item.value.bestFor}</p>
          <ul className="mt-4 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
            {item.value.includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
      ))}

      {(data.upsells?.length || data.pricingNotes?.length) && (
        <article className="rounded-[24px] border border-white/10 bg-black/20 p-5 xl:col-span-3">
          {data.upsells?.length ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Upsells</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.upsells.map((item) => (
                  <span key={item} className="rounded-full border border-accent/20 bg-accent/10 px-3 py-2 text-xs font-medium text-white">
                    {item}
                  </span>
                ))}
              </div>
            </>
          ) : null}

          {data.pricingNotes?.length ? (
            <>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Pricing Notes</p>
              <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                {data.pricingNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </>
          ) : null}
        </article>
      )}
    </div>
  );
}
