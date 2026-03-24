"use client";

import { ExecutionStage } from "@/types/business";
import { getChecklistCompletion, getCompletedWeeks, getExecutionStageStatus, weekGroups } from "@/utils/benchmarks";

interface ProgressTrackerProps {
  progress: boolean[];
  taskProgress?: boolean[][];
  executionPlan?: ExecutionStage[];
  onToggleWeek: (weekIndex: number, checked: boolean) => void;
}

export function ProgressTracker({ progress, taskProgress = [], executionPlan, onToggleWeek }: ProgressTrackerProps) {
  const completedWeeks = getCompletedWeeks(progress);
  const weekPercentage = Math.round((completedWeeks / 13) * 100);
  const checklistStats = getChecklistCompletion(taskProgress);

  const stageStatuses =
    executionPlan?.map((stage, stageIndex) => ({
      stage,
      status: getExecutionStageStatus(progress, taskProgress, stageIndex),
      completedTasks: (taskProgress[stageIndex] ?? []).filter(Boolean).length,
      totalTasks: stage.checklist.length
    })) ?? [];

  const currentStage =
    stageStatuses.find((item) => item.status !== "completed") ?? stageStatuses[stageStatuses.length - 1];

  const currentMomentumMessage =
    currentStage?.status === "completed"
      ? currentStage.stage.momentumMessages.complete
      : currentStage && currentStage.totalTasks > 0 && currentStage.completedTasks === currentStage.totalTasks - 1
        ? currentStage.stage.momentumMessages.nearComplete
        : currentStage?.status === "in_progress"
          ? currentStage.stage.momentumMessages.inProgress
          : currentStage?.stage.momentumMessages.notStarted;

  return (
    <div className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-panel-gradient p-5 shadow-card">
      <div className="grid w-full max-w-full gap-5">
        <div className="w-full max-w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Momentum panel</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Execution completion</p>
              <p className="mt-2 text-3xl font-semibold text-white">{checklistStats.percentage}%</p>
              <p className="mt-2 break-words text-sm text-slate-200">
                {checklistStats.completed} of {checklistStats.total || 0} checklist items complete
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Milestone completion</p>
              <p className="mt-2 text-3xl font-semibold text-white">{completedWeeks}/13</p>
              <p className="mt-2 break-words text-sm text-slate-200">Weeks marked complete across the full blueprint</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                <span>Checklist progress</span>
                <span>{checklistStats.percentage}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-slate-950">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accentSecondary transition-all"
                  style={{ width: `${checklistStats.percentage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                <span>Week progress</span>
                <span>{weekPercentage}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-slate-950">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all"
                  style={{ width: `${weekPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {currentStage && (
          <div className="w-full max-w-full overflow-hidden rounded-[22px] border border-accent/20 bg-accent/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Current focus</p>
            <p className="mt-2 text-lg font-semibold text-white">{currentStage.stage.title}</p>
            <p className="mt-2 break-words text-sm leading-6 text-slate-200">{currentStage.stage.summary}</p>
            <div className="mt-4 grid w-full max-w-full gap-3">
              <div className="w-full max-w-full rounded-2xl border border-white/10 bg-black/20 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Next action</p>
                <p className="mt-2 break-words text-sm leading-6 text-slate-100">{currentStage.stage.nextAction}</p>
              </div>
              {currentMomentumMessage ? (
                <div className="w-full max-w-full rounded-2xl border border-white/10 bg-black/20 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Momentum</p>
                  <p className="mt-2 break-words text-sm leading-6 text-slate-100">{currentMomentumMessage}</p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {executionPlan && (
          <div className="grid w-full max-w-full gap-3">
            {stageStatuses.map(({ stage, status, completedTasks, totalTasks }) => (
              <div key={stage.title} className="w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <div className="flex w-full max-w-full flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 max-w-full">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{stage.title}</p>
                    <p className="mt-1 break-words text-sm text-slate-200">{stage.rule}</p>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                      status === "completed"
                        ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                        : status === "in_progress"
                          ? "border-accent/40 bg-accent/10 text-white"
                          : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                  >
                    {status === "completed" ? "Completed" : status === "in_progress" ? "In progress" : "Not started"}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-950">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accentSecondary transition-all"
                    style={{ width: `${totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)}%` }}
                  />
                </div>
                <p className="mt-2 break-words text-xs text-muted">
                  {completedTasks}/{totalTasks} checklist items complete
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="w-full max-w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-4">
          <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-white">Weekly milestone tracker</h3>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{completedWeeks}/13 weeks complete</p>
          </div>
          <p className="mt-2 break-words text-sm leading-6 text-muted">
            Mark a week complete once the main work for that window is actually done. Use this as the milestone layer above the stage checklists.
          </p>
        </div>

        <div className="grid w-full max-w-full gap-5">
          {weekGroups.map((group) => (
            <div key={group.title} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
              <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">{group.title}</h3>
                <span className="text-xs text-muted">
                  {group.weeks.filter((week) => progress[week - 1]).length}/{group.weeks.length}
                </span>
              </div>
              <div className="mt-3 grid w-full max-w-full gap-3">
                {group.weeks.map((week) => {
                  const weekIndex = week - 1;
                  const checked = progress[weekIndex];

                  return (
                    <label
                      key={week}
                      className={`flex w-full max-w-full cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                        checked
                          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-50"
                          : "border-white/10 bg-white/5 text-slate-200 hover:border-accent/30 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => onToggleWeek(weekIndex, event.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-slate-950 text-accent focus:ring-accent"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white">Week {week}</p>
                        <p className="break-words text-xs text-muted">{checked ? "Milestone marked complete" : "Mark complete when the week's core work is finished"}</p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
