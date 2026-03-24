"use client";

import { CoachFollowupStructured } from "@/lib/ai/coachTypes";

interface FollowupRendererProps {
  data: CoachFollowupStructured;
}

export function FollowupRenderer({ data }: FollowupRendererProps) {
  return (
    <div className="grid w-full max-w-full gap-4">
      <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Follow-Up Goal</p>
        <h3 className="mt-3 break-words text-xl font-semibold text-white">{data.goal}</h3>
      </article>

      <div className="grid w-full max-w-full gap-4">
        {data.sequence.map((item) => (
          <article key={`${item.day}-${item.channel}-${item.message}`} className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5">
            <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-3">
              <p className="break-words text-sm font-semibold text-white">{item.day}</p>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                {item.channel}
              </span>
            </div>
            <p className="mt-3 break-words whitespace-pre-wrap text-sm leading-6 text-slate-100">{item.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
