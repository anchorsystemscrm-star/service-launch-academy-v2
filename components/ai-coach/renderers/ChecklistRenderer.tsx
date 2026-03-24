"use client";

import { CoachChecklistStructured } from "@/lib/ai/coachTypes";

interface ChecklistRendererProps {
  data: CoachChecklistStructured;
}

export function ChecklistRenderer({ data }: ChecklistRendererProps) {
  return (
    <div className="grid gap-4">
      <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Checklist</p>
        <h3 className="mt-3 text-xl font-semibold text-white">{data.title}</h3>
      </div>

      {data.items.map((item, index) => (
        <article key={`${item.task}-${index}`} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">{item.task}</p>
              {item.notes ? <p className="mt-2 text-sm leading-6 text-muted">{item.notes}</p> : null}
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
              {item.priority}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
