"use client";

import Link from "next/link";

import { ExecutionChecklistItem } from "@/types/business";

interface BlueprintTaskSupportPanelProps {
  item: ExecutionChecklistItem;
  aiHref: string;
  hasAiAccess: boolean;
  aiUpgradeHref: string;
  compact?: boolean;
}

export function BlueprintTaskSupportPanel({
  item,
  aiHref,
  hasAiAccess,
  aiUpgradeHref,
  compact = false
}: BlueprintTaskSupportPanelProps) {
  const ctaLabel = hasAiAccess ? "Generate with AI" : "Unlock AI Coach";

  return (
    <div className={`grid w-full max-w-full ${compact ? "gap-2" : "gap-3"}`}>
      <div className="grid w-full max-w-full gap-2">
        {hasAiAccess ? (
          <Link
            href={aiHref}
            className="inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/15"
          >
            {ctaLabel}
          </Link>
        ) : (
          <a
            href={aiUpgradeHref}
            className="inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
          >
            {ctaLabel}
          </a>
        )}
        <p className="text-center text-xs text-muted">or write it manually</p>
      </div>

      <details className="w-full max-w-full overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
        <summary className="cursor-pointer list-none px-4 py-3">
          <p className="text-sm font-semibold text-white">View template</p>
        </summary>
        <div className="border-t border-white/10 px-4 py-4">
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-[18px] border border-white/10 bg-white/5 p-3 font-sans text-sm leading-6 text-slate-100">
            {item.template}
          </pre>
          <button
            type="button"
            onClick={() => {
              if (typeof navigator !== "undefined" && navigator.clipboard) {
                void navigator.clipboard.writeText(item.template);
              }
            }}
            className="mt-3 inline-flex w-full max-w-full items-center justify-center rounded-[16px] border border-white/10 bg-black/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-100 transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
          >
            Copy template
          </button>
        </div>
      </details>

      <details className="w-full max-w-full overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
        <summary className="cursor-pointer list-none px-4 py-3">
          <p className="text-sm font-semibold text-white">View example</p>
        </summary>
        <div className="border-t border-white/10 px-4 py-4">
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-[18px] border border-cyan-400/20 bg-cyan-500/5 p-3 font-sans text-sm leading-6 text-slate-100">
            {item.example}
          </pre>
        </div>
      </details>

      <details className="w-full max-w-full overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
        <summary className="cursor-pointer list-none px-4 py-3">
          <p className="text-sm font-semibold text-white">Need help?</p>
        </summary>
        <div className="grid gap-3 border-t border-white/10 px-4 py-4">
          <p className="break-words text-sm leading-6 text-slate-100">{item.ifStuck}</p>
          {item.documentation ? (
            <div className="rounded-[16px] border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">What to document</p>
              <p className="mt-2 break-words text-sm leading-6 text-slate-100">{item.documentation}</p>
            </div>
          ) : null}
          {item.avoid ? (
            <div className="rounded-[16px] border border-amber-400/20 bg-amber-500/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100">What to avoid</p>
              <p className="mt-2 break-words text-sm leading-6 text-slate-100">{item.avoid}</p>
            </div>
          ) : null}
        </div>
      </details>
    </div>
  );
}
