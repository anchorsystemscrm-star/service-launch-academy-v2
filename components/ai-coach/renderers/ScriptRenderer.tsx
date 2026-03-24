"use client";

import { CoachScriptStructured } from "@/lib/ai/coachTypes";

interface ScriptRendererProps {
  data: CoachScriptStructured;
}

export function ScriptRenderer({ data }: ScriptRendererProps) {
  return (
    <div className="grid w-full max-w-full gap-4">
      <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{data.scriptType}</p>
        <pre className="mt-4 max-w-full overflow-x-auto whitespace-pre-wrap break-words text-sm leading-7 text-slate-100">{data.primaryScript}</pre>
      </article>

      {data.variations?.length ? (
        <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Variations</p>
          <div className="mt-4 grid gap-3">
            {data.variations.map((variation) => (
              <div key={variation} className="w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-100">
                {variation}
              </div>
            ))}
          </div>
        </article>
      ) : null}

      {data.objectionResponses?.length ? (
        <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Objection Handling</p>
          <div className="mt-4 grid gap-3">
            {data.objectionResponses.map((item) => (
              <div key={item.objection} className="w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="break-words text-sm font-semibold text-white">{item.objection}</p>
                <p className="mt-2 break-words whitespace-normal text-sm leading-6 text-muted">{item.response}</p>
              </div>
            ))}
          </div>
        </article>
      ) : null}
    </div>
  );
}
