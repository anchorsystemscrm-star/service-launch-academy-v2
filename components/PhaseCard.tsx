import { Phase } from "@/types/business";
import { formatCurrencyRange, formatNumberRange } from "@/utils/benchmarks";

interface PhaseCardProps {
  phase: Phase;
}

export function PhaseCard({ phase }: PhaseCardProps) {
  return (
    <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="break-words text-lg font-semibold text-white">{phase.title}</h3>
        <span className="rounded-full border border-white/10 bg-black/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
          KPI-aligned
        </span>
      </div>
      <p className="mt-3 break-words text-sm leading-6 text-muted">
        <span className="font-semibold text-slate-100">Goal:</span> {phase.goal}
      </p>

      <div className="mt-4 grid w-full max-w-full gap-3 lg:grid-cols-2">
        <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Rule</p>
          <p className="mt-2 break-words text-sm leading-6 text-slate-100">{phase.rule}</p>
        </div>
        <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Success looks like</p>
          <p className="mt-2 break-words text-sm leading-6 text-slate-100">{phase.successLooksLike}</p>
        </div>
      </div>

      <ul className="mt-4 grid gap-2 pl-5 text-sm leading-6 text-slate-200">
        {phase.tasks.map((task) => (
          <li key={task} className="break-words">{task}</li>
        ))}
      </ul>

      <div className="mt-5 grid w-full max-w-full gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="w-full max-w-full rounded-2xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Lead Targets</p>
          <p className="mt-2 text-sm text-white">{formatNumberRange(phase.benchmarks.leads)}</p>
        </div>
        <div className="w-full max-w-full rounded-2xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Quote Targets</p>
          <p className="mt-2 text-sm text-white">{formatNumberRange(phase.benchmarks.quotes)}</p>
        </div>
        <div className="w-full max-w-full rounded-2xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Customer Targets</p>
          <p className="mt-2 text-sm text-white">{formatNumberRange(phase.benchmarks.jobs)}</p>
        </div>
        <div className="w-full max-w-full rounded-2xl border border-white/10 bg-slate-950/60 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Revenue Targets</p>
          <p className="mt-2 text-sm text-white">{formatCurrencyRange(phase.benchmarks.revenue)}</p>
        </div>
      </div>
    </article>
  );
}
