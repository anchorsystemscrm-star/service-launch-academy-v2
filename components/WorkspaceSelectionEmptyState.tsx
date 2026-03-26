"use client";

import Link from "next/link";

interface WorkspaceSelectionEmptyStateProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function WorkspaceSelectionEmptyState({
  eyebrow,
  title,
  description,
  ctaLabel = "Choose a business from Dashboard",
  ctaHref = "/dashboard"
}: WorkspaceSelectionEmptyStateProps) {
  return (
    <div className="mx-auto w-full max-w-4xl animate-fade-up">
      <section className="panel-surface w-full max-w-full overflow-hidden p-6 text-center sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl break-words text-base leading-7 text-muted">{description}</p>
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
        >
          {ctaLabel}
        </Link>
      </section>
    </div>
  );
}
