"use client";

import { CoachSopStructured } from "@/lib/ai/coachTypes";

interface SopRendererProps {
  data: CoachSopStructured;
}

export function SopRenderer({ data }: SopRendererProps) {
  return (
    <div className="grid w-full max-w-full gap-4">
      <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">SOP</p>
        <h3 className="mt-3 break-words text-xl font-semibold text-white">{data.title}</h3>
      </article>

      <div className="grid w-full max-w-full gap-4">
        {data.steps.map((item, index) => (
          <article key={`${item.step}-${index}`} className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5">
            <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-3">
              <p className="break-words text-sm font-semibold text-white">
                Step {index + 1}: {item.step}
              </p>
              {item.owner ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                  {item.owner}
                </span>
              ) : null}
            </div>
            {item.notes ? <p className="mt-3 break-words whitespace-normal text-sm leading-6 text-muted">{item.notes}</p> : null}
          </article>
        ))}
      </div>
    </div>
  );
}
