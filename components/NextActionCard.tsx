interface NextActionCardProps {
  weekLabel: string;
  stageTitle: string;
  title: string;
  description: string;
  effortLabel: string;
  completed?: boolean;
  buttonLabel?: string;
  onStart?: () => void;
}

export function NextActionCard({
  weekLabel,
  stageTitle,
  title,
  description,
  effortLabel,
  completed = false,
  buttonLabel,
  onStart
}: NextActionCardProps) {
  return (
    <section className="w-full max-w-full overflow-hidden rounded-[26px] border border-white/10 bg-panel-gradient p-5 shadow-card">
      <div className="flex w-full max-w-full flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 max-w-full">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Your next step</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-100">
              {weekLabel}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {stageTitle}
            </span>
          </div>
        </div>
        <div className="w-full max-w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left sm:w-auto sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Estimated effort</p>
          <p className="mt-1 text-sm font-semibold text-white">{effortLabel}</p>
        </div>
      </div>

      <h3 className="mt-4 break-words text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 break-words text-sm leading-6 text-slate-200">{description}</p>

      {onStart ? (
        <button
          type="button"
          onClick={onStart}
          className="mt-5 inline-flex w-full max-w-full items-center justify-center rounded-[20px] border border-accent/50 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20 sm:w-auto"
        >
          {buttonLabel ?? (completed ? "Review Blueprint" : "Start Task")}
        </button>
      ) : null}
    </section>
  );
}
