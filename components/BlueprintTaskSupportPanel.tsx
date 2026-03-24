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
    <div className="grid w-full max-w-full gap-3">
      <div className="flex w-full max-w-full flex-wrap gap-3">
        {hasAiAccess ? (
          <Link
            href={aiHref}
            className="inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-accent/40 bg-accent/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-accent/70 hover:bg-accent/15 sm:w-auto"
          >
            {ctaLabel}
          </Link>
        ) : (
          <a
            href={aiUpgradeHref}
            className="inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
          >
            {ctaLabel}
          </a>
        )}

        <button
          type="button"
          onClick={() => {
            if (typeof navigator !== "undefined" && navigator.clipboard) {
              void navigator.clipboard.writeText(item.template);
            }
          }}
          className="inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-100 transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
        >
          Copy template
        </button>
      </div>

      <details className="w-full max-w-full overflow-hidden rounded-[20px] border border-white/10 bg-black/20" open={!compact}>
        <summary className="cursor-pointer list-none px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Template</p>
          <p className="mt-1 break-words text-sm text-slate-200">Fill this in instead of starting from a blank page.</p>
        </summary>
        <div className="border-t border-white/10 px-4 py-4">
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-[18px] border border-white/10 bg-white/5 p-3 font-sans text-sm leading-6 text-slate-100">
            {item.template}
          </pre>
        </div>
      </details>

      <details className="w-full max-w-full overflow-hidden rounded-[20px] border border-white/10 bg-black/20">
        <summary className="cursor-pointer list-none px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">Example</p>
          <p className="mt-1 break-words text-sm text-slate-200">Use this as a completed version to model your own output.</p>
        </summary>
        <div className="border-t border-white/10 px-4 py-4">
          <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words rounded-[18px] border border-cyan-400/20 bg-cyan-500/5 p-3 font-sans text-sm leading-6 text-slate-100">
            {item.example}
          </pre>
        </div>
      </details>

      <details className="w-full max-w-full overflow-hidden rounded-[20px] border border-white/10 bg-black/20">
        <summary className="cursor-pointer list-none px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100">If you're stuck</p>
          <p className="mt-1 break-words text-sm text-slate-200">Smallest move that still counts.</p>
        </summary>
        <div className="border-t border-white/10 px-4 py-4">
          <p className="break-words text-sm leading-6 text-slate-100">{item.ifStuck}</p>
        </div>
      </details>
    </div>
  );
}
