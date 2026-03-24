"use client";

import { CoachMarketingStructured } from "@/lib/ai/coachTypes";

interface MarketingRendererProps {
  data: CoachMarketingStructured;
}

export function MarketingRenderer({ data }: MarketingRendererProps) {
  return (
    <div className="grid w-full max-w-full gap-4">
      <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5">
        <h3 className="break-words text-lg font-semibold text-white sm:text-xl">{data.title}</h3>
      </article>

      <div className="grid w-full max-w-full gap-4">
        {data.ideas.map((item) => (
          <article key={item.idea} className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5">
            <p className="break-words text-base font-semibold text-white">{item.idea}</p>
            {item.whyItWorks ? <p className="mt-3 break-words whitespace-normal text-sm leading-6 text-muted">{item.whyItWorks}</p> : null}
            {item.execution ? <p className="mt-3 break-words whitespace-normal text-sm leading-6 text-slate-100">{item.execution}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
