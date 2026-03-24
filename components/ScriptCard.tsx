import { Script } from "@/types/business";

interface ScriptCardProps {
  script: Script;
}

export function ScriptCard({ script }: ScriptCardProps) {
  return (
    <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-white/5">
      <div className="border-b border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white break-words">{script.title}</div>
      <div className="grid w-full max-w-full gap-4 px-5 py-4">
        <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words font-sans text-sm leading-6 text-slate-200">{script.body}</pre>

        {(script.whenToUse || script.whyItWorks) && (
          <div className="grid w-full max-w-full gap-3 lg:grid-cols-2">
            {script.whenToUse ? (
              <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Use when</p>
                <p className="mt-2 break-words text-sm leading-6 text-slate-100">{script.whenToUse}</p>
              </div>
            ) : null}
            {script.whyItWorks ? (
              <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-slate-950/40 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Why it works</p>
                <p className="mt-2 break-words text-sm leading-6 text-slate-100">{script.whyItWorks}</p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
