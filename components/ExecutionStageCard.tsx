import { BlueprintTaskSupportPanel } from "@/components/BlueprintTaskSupportPanel";
import { ExecutionStage } from "@/types/business";
import { getCheckoutHref } from "@/utils/access";
import { getBlueprintTaskCoachHref } from "@/utils/benchmarks";
import { ExecutionStageStatus } from "@/utils/benchmarks";

interface ExecutionStageCardProps {
  stage: ExecutionStage;
  stageIndex: number;
  taskProgress: boolean[];
  status: ExecutionStageStatus;
  milestoneText: string;
  hasAiAccess: boolean;
  onToggleTask: (stageIndex: number, taskIndex: number, checked: boolean) => void;
}

const statusClasses: Record<ExecutionStageStatus, string> = {
  not_started: "border-white/10 bg-white/5 text-slate-300",
  in_progress: "border-accent/40 bg-accent/10 text-white",
  completed: "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
};

const statusLabels: Record<ExecutionStageStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  completed: "Completed"
};

export function ExecutionStageCard({
  stage,
  stageIndex,
  taskProgress,
  status,
  milestoneText,
  hasAiAccess,
  onToggleTask
}: ExecutionStageCardProps) {
  const completedTasks = taskProgress.filter(Boolean).length;
  const totalTasks = stage.checklist.length;
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const nearComplete = totalTasks > 0 && completedTasks === totalTasks - 1;
  const momentum =
    status === "completed"
      ? stage.momentumMessages.complete
      : nearComplete
        ? stage.momentumMessages.nearComplete
        : completedTasks > 0
          ? stage.momentumMessages.inProgress
          : stage.momentumMessages.notStarted;

  return (
    <article className="w-full max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-card">
      <div className="border-b border-white/10 bg-panel-gradient px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                {stage.title}
              </span>
              <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusClasses[status]}`}>
                {statusLabels[status]}
              </span>
            </div>
            <p className="mt-3 max-w-3xl break-words text-sm leading-6 text-slate-200">{stage.summary}</p>
          </div>

          <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-black/20 p-4 lg:max-w-[220px]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Stage progress</p>
                <p className="mt-2 text-2xl font-semibold text-white">{completedTasks}/{totalTasks}</p>
              </div>
              <p className="text-sm font-semibold text-slate-100">{percentage}%</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-950">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent to-accentSecondary transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-muted">{milestoneText}</p>
          </div>
        </div>

        <div className="mt-4 grid w-full max-w-full gap-3 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Rule for this stage</p>
            <p className="mt-2 break-words text-sm leading-6 text-slate-100">{stage.rule}</p>
          </div>
          <div className="w-full max-w-full rounded-[20px] border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Done means</p>
            <p className="mt-2 break-words text-sm leading-6 text-slate-100">{stage.successLooksLike}</p>
          </div>
        </div>

        <div className="mt-4 w-full max-w-full rounded-[20px] border border-accent/20 bg-accent/5 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Momentum</p>
          <p className="mt-2 break-words text-sm leading-6 text-slate-100">{momentum}</p>
          <p className="mt-3 break-words text-xs font-semibold uppercase tracking-[0.16em] text-muted">Next action: {stage.nextAction}</p>
        </div>
      </div>

      <div className="grid w-full max-w-full gap-4 p-5 sm:p-6">
        {stage.checklist.map((item, taskIndex) => {
          const checked = taskProgress[taskIndex] ?? false;

          return (
            <div
              key={item.id}
              className={`w-full max-w-full overflow-hidden rounded-[24px] border p-4 transition ${
                checked ? "border-emerald-400/30 bg-emerald-500/10" : "border-white/10 bg-slate-950/35"
              }`}
            >
              <div className="flex w-full max-w-full gap-4">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(event) => onToggleTask(stageIndex, taskIndex, event.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-white/20 bg-slate-950 text-accent focus:ring-accent"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="break-words text-sm font-semibold text-white">{item.title}</p>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {checked ? "Checked off" : "Open task"}
                    </span>
                  </div>

                  <p className="mt-3 break-words text-sm leading-6 text-slate-100">{item.instruction}</p>

                  <div className="mt-4">
                    <BlueprintTaskSupportPanel
                      item={item}
                      aiHref={getBlueprintTaskCoachHref(item.aiPrompt)}
                      hasAiAccess={hasAiAccess}
                      aiUpgradeHref={getCheckoutHref("pro")}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
