"use client";

import Link from "next/link";

import { ExecutionChecklistItem } from "@/types/business";
import { BlueprintAnchorStage, getBlueprintOperationalNote } from "@/utils/benchmarks";

interface BlueprintTaskSupportPanelProps {
  item: ExecutionChecklistItem;
  aiHref: string;
  hasAiAccess: boolean;
  aiUpgradeHref: string;
  stageIndex?: number;
  anchorStage?: BlueprintAnchorStage;
  canAccessAnchor?: boolean;
  anchorUpgradeHref?: string;
  onAnchorAction?: () => void;
  highlightPrimary?: boolean;
  onPrimaryAction?: () => void;
  compact?: boolean;
}

export function BlueprintTaskSupportPanel({
  item,
  aiHref,
  hasAiAccess,
  aiUpgradeHref,
  stageIndex = 0,
  anchorStage = 0,
  canAccessAnchor = false,
  anchorUpgradeHref,
  onAnchorAction,
  highlightPrimary = false,
  onPrimaryAction,
  compact = false
}: BlueprintTaskSupportPanelProps) {
  const ctaLabel = hasAiAccess ? "Generate with AI" : "Unlock AI Coach";
  const scopedAnchorStage = !item.trackThis?.length
    ? 0
    : anchorStage >= 4 && stageIndex >= 5
      ? 4
      : anchorStage >= 3 && stageIndex >= 4
        ? 3
        : anchorStage >= 2 && stageIndex >= 2
          ? 2
          : 0;
  const operationalNote = item.trackThis?.length ? getBlueprintOperationalNote(scopedAnchorStage) : null;
  const showAnchorCta = Boolean(item.trackThis?.length) && scopedAnchorStage === 4;

  return (
    <div className={`grid w-full max-w-full ${compact ? "gap-2" : "gap-3"}`}>
      <div className="grid w-full max-w-full gap-2">
        {highlightPrimary ? (
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Next step</p>
        ) : null}
        {hasAiAccess ? (
          <Link
            href={aiHref}
            onClick={onPrimaryAction}
            className={`inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/15 ${
              highlightPrimary ? "glow-next" : ""
            }`}
          >
            {ctaLabel}
          </Link>
        ) : (
          <a
            href={aiUpgradeHref}
            onClick={onPrimaryAction}
            className={`inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 ${
              highlightPrimary ? "glow-next" : ""
            }`}
          >
            {ctaLabel}
          </a>
        )}
        <p className="text-center text-xs text-muted">or write it manually</p>
      </div>

      {item.trackThis?.length ? (
        <div className="w-full max-w-full overflow-hidden rounded-[18px] border border-white/10 bg-black/20 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Track this</p>
          <ul className="mt-3 grid gap-2 pl-5 text-sm leading-6 text-slate-100">
            {item.trackThis.map((entry) => (
              <li key={entry} className="break-words">
                {entry}
              </li>
            ))}
          </ul>
          <p className="mt-3 break-words text-xs leading-5 text-muted">
            {item.trackingToolHint || "Use Notes or a simple spreadsheet until the workflow is worth systemizing."}
          </p>
          {operationalNote ? (
            <p className="mt-3 break-words text-xs leading-5 text-slate-300">{operationalNote}</p>
          ) : null}
          {showAnchorCta ? (
            <div className="mt-4 rounded-[16px] border border-accent/20 bg-accent/5 p-3">
              <p className="break-words text-sm leading-6 text-slate-100">
                Once this workflow is live every week, Anchor Systems can run lead tracking, quote follow-up, scheduling,
                and reminders in one place.
              </p>
              {canAccessAnchor ? (
                <button
                  type="button"
                  onClick={onAnchorAction}
                  className="mt-3 inline-flex w-full max-w-full items-center justify-center rounded-[16px] border border-accent/40 bg-accent/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-accent/70 hover:bg-accent/15"
                >
                  See how this runs automatically
                </button>
              ) : anchorUpgradeHref ? (
                <a
                  href={anchorUpgradeHref}
                  className="mt-3 inline-flex w-full max-w-full items-center justify-center rounded-[16px] border border-accent/40 bg-accent/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:border-accent/70 hover:bg-accent/15"
                >
                  See how this runs automatically
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

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
