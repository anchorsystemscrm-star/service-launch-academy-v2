"use client";

import { CoachMarketingStructured } from "@/lib/ai/coachTypes";

interface MarketingRendererProps {
  data: CoachMarketingStructured;
}

export function MarketingRenderer({ data }: MarketingRendererProps) {
  return (
    <div className="grid gap-4">
      <article className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Marketing Plan</p>
        <h3 className="mt-3 text-xl font-semibold text-white">{data.title}</h3>
      </article>

      <div className="grid gap-4">
        {data.ideas.map((item) => (
          <article key={item.idea} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="text-base font-semibold text-white">{item.idea}</p>
            {item.whyItWorks ? <p className="mt-3 text-sm leading-6 text-muted">{item.whyItWorks}</p> : null}
            {item.execution ? <p className="mt-3 text-sm leading-6 text-slate-100">{item.execution}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
