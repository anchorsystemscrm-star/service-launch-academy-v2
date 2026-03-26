"use client";

interface AnchorInlineCtaProps {
  body: string;
  ctaLabel: string;
  compact?: boolean;
}

export function AnchorInlineCta({ body, ctaLabel, compact = false }: AnchorInlineCtaProps) {
  return (
    <div
      className={`anchor-inline-glow w-full max-w-full overflow-hidden rounded-[18px] border border-accent/25 bg-[linear-gradient(180deg,rgba(83,180,255,0.08),rgba(7,13,23,0.42))] ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Execution layer</p>
      <p className="mt-2 break-words text-sm leading-6 text-slate-100">{body}</p>
      <a
        href="https://anchorsystemscrm.com"
        target="_blank"
        rel="noreferrer"
        className="anchor-inline-cta mt-3 inline-flex w-full max-w-full items-center justify-center rounded-[16px] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition"
      >
        {ctaLabel}
      </a>
    </div>
  );
}
