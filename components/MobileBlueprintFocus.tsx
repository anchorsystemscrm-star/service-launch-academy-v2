import { useEffect, useMemo, useRef, useState } from "react";

import { ExecutionStageCard } from "@/components/ExecutionStageCard";
import { PhaseCard } from "@/components/PhaseCard";
import { ExecutionStage, Phase } from "@/types/business";
import {
  ExecutionStageStatus,
  executionStageWeekMap,
  getChecklistCompletion,
  getExecutionStageStatus,
  milestoneTemplate
} from "@/utils/benchmarks";

type MobileView = "focus" | "checklist" | "full";

type TaskPosition = {
  stageIndex: number;
  taskIndex: number;
};

interface MobileBlueprintFocusProps {
  executionPlan: ExecutionStage[];
  phases: Phase[];
  progress: boolean[];
  taskProgress: boolean[][];
  onToggleTask: (stageIndex: number, taskIndex: number, checked: boolean) => void;
  onToggleWeek: (weekIndex: number, checked: boolean) => void;
}

const stepRewardCopy = [
  "Step completed",
  "Progress saved",
  "Momentum building",
  "Nice — keep going",
  "1 step closer",
  "Locked in"
] as const;

function flattenTasks(executionPlan: ExecutionStage[]) {
  return executionPlan.flatMap((stage, stageIndex) =>
    stage.checklist.map((_, taskIndex) => ({
      stageIndex,
      taskIndex
    }))
  );
}

function getFallbackPosition(executionPlan: ExecutionStage[]): TaskPosition {
  const lastStageIndex = Math.max(executionPlan.length - 1, 0);
  const lastTaskIndex = Math.max((executionPlan[lastStageIndex]?.checklist.length ?? 1) - 1, 0);

  return { stageIndex: lastStageIndex, taskIndex: lastTaskIndex };
}

function getFirstIncompletePosition(executionPlan: ExecutionStage[], taskProgress: boolean[][]): TaskPosition {
  for (let stageIndex = 0; stageIndex < executionPlan.length; stageIndex += 1) {
    const stageTasks = taskProgress[stageIndex] ?? [];

    for (let taskIndex = 0; taskIndex < executionPlan[stageIndex].checklist.length; taskIndex += 1) {
      if (!stageTasks[taskIndex]) {
        return { stageIndex, taskIndex };
      }
    }
  }

  return getFallbackPosition(executionPlan);
}

function getNextPosition(current: TaskPosition, executionPlan: ExecutionStage[]): TaskPosition {
  const allTasks = flattenTasks(executionPlan);
  const flatIndex = allTasks.findIndex(
    (item) => item.stageIndex === current.stageIndex && item.taskIndex === current.taskIndex
  );

  if (flatIndex === -1 || flatIndex === allTasks.length - 1) {
    return current;
  }

  return allTasks[flatIndex + 1];
}

export function MobileBlueprintFocus({
  executionPlan,
  phases,
  progress,
  taskProgress,
  onToggleTask,
  onToggleWeek
}: MobileBlueprintFocusProps) {
  const [view, setView] = useState<MobileView>("focus");
  const [activeTask, setActiveTask] = useState<TaskPosition>(() => getFirstIncompletePosition(executionPlan, taskProgress));
  const [expandedStageIndex, setExpandedStageIndex] = useState(activeTask.stageIndex);
  const [rewardCopy, setRewardCopy] = useState<string | null>(null);
  const [rewardTone, setRewardTone] = useState<"step" | "week">("step");
  const [isAnimatingComplete, setIsAnimatingComplete] = useState(false);
  const timeoutRefs = useRef<number[]>([]);

  if (!executionPlan.length) {
    return null;
  }

  const checklistStats = getChecklistCompletion(taskProgress);
  const stageStatuses = useMemo(
    () =>
      executionPlan.map((stage, stageIndex) => ({
        stage,
        stageIndex,
        status: getExecutionStageStatus(progress, taskProgress, stageIndex)
      })),
    [executionPlan, progress, taskProgress]
  );

  const currentStageData = stageStatuses[activeTask.stageIndex] ?? stageStatuses[0];

  if (!currentStageData) {
    return null;
  }

  const activeStage = currentStageData.stage;
  const activeStageTasks = taskProgress[activeTask.stageIndex] ?? [];
  const activeTaskItem = activeStage.checklist[activeTask.taskIndex];
  const activeTaskComplete = activeStageTasks[activeTask.taskIndex] ?? false;
  const stageCompletedCount = activeStageTasks.filter(Boolean).length;
  const stageTaskTotal = activeStage.checklist.length;
  const stageProgressPercent = stageTaskTotal === 0 ? 0 : Math.round((stageCompletedCount / stageTaskTotal) * 100);
  const remainingTasks = Math.max(stageTaskTotal - stageCompletedCount, 0);

  useEffect(() => {
    if (isAnimatingComplete) {
      return;
    }

    const currentTaskDone = taskProgress[activeTask.stageIndex]?.[activeTask.taskIndex] ?? false;

    if (!currentTaskDone) {
      return;
    }

    const nextPosition = getFirstIncompletePosition(executionPlan, taskProgress);
    setActiveTask(nextPosition);
    setExpandedStageIndex(nextPosition.stageIndex);
  }, [activeTask, executionPlan, isAnimatingComplete, taskProgress]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  if (!activeTaskItem) {
    return null;
  }

  function queueTimeout(callback: () => void, delay: number) {
    const timeoutId = window.setTimeout(callback, delay);
    timeoutRefs.current.push(timeoutId);
  }

  function handleSelectTask(position: TaskPosition) {
    setActiveTask(position);
    setExpandedStageIndex(position.stageIndex);
    setView("focus");
  }

  function handleNextStep() {
    const nextPosition = getNextPosition(activeTask, executionPlan);
    setActiveTask(nextPosition);
    setExpandedStageIndex(nextPosition.stageIndex);
    setView("focus");
  }

  function handleCompleteTask() {
    if (activeTaskComplete || isAnimatingComplete) {
      return;
    }

    const nextTaskProgress = taskProgress.map((stageTasks) => [...stageTasks]);

    if (!nextTaskProgress[activeTask.stageIndex]) {
      nextTaskProgress[activeTask.stageIndex] = new Array(activeStage.checklist.length).fill(false);
    }

    nextTaskProgress[activeTask.stageIndex][activeTask.taskIndex] = true;

    const weekComplete = nextTaskProgress[activeTask.stageIndex].every(Boolean);
    const rewardIndex = (activeTask.stageIndex + activeTask.taskIndex) % stepRewardCopy.length;
    const nextPosition = getFirstIncompletePosition(executionPlan, nextTaskProgress);

    setRewardTone(weekComplete ? "week" : "step");
    setRewardCopy(weekComplete ? "Week complete" : stepRewardCopy[rewardIndex]);
    setIsAnimatingComplete(true);
    onToggleTask(activeTask.stageIndex, activeTask.taskIndex, true);

    if (weekComplete) {
      (executionStageWeekMap[activeTask.stageIndex] ?? []).forEach((week) => onToggleWeek(week - 1, true));
    }

    queueTimeout(() => {
      setActiveTask(nextPosition);
      setExpandedStageIndex(nextPosition.stageIndex);
      setIsAnimatingComplete(false);
    }, 650);

    queueTimeout(() => {
      setRewardCopy(null);
    }, 1800);
  }

  return (
    <div className="grid gap-4 lg:hidden">
      <div className="sticky top-3 z-20 grid gap-3">
        <div className="overflow-hidden rounded-[26px] border border-white/10 bg-panel-gradient px-4 py-4 shadow-card backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Focused mode</p>
              <h2 className="mt-2 text-lg font-semibold text-white">{activeStage.title}</h2>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                Task {activeTask.taskIndex + 1} of {stageTaskTotal}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Overall</p>
              <p className="mt-1 text-lg font-semibold text-white">{checklistStats.percentage}%</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                <span>Blueprint progress</span>
                <span>
                  {checklistStats.completed}/{checklistStats.total}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-950">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-accent to-accentSecondary transition-all duration-500 ${
                    rewardCopy ? "animate-blueprint-progress-pulse" : ""
                  }`}
                  style={{ width: `${checklistStats.percentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(["focus", "checklist", "full"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  className={`rounded-2xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
                    view === mode
                      ? "border-accent/50 bg-accent/10 text-white"
                      : "border-white/10 bg-white/5 text-slate-300"
                  }`}
                >
                  {mode === "focus" ? "Focus" : mode === "checklist" ? "Checklist" : "Full view"}
                </button>
              ))}
            </div>
          </div>

          {rewardCopy ? (
            <div
              className={`mt-3 rounded-2xl border px-3 py-3 text-sm text-white ${
                rewardTone === "week"
                  ? "border-emerald-400/30 bg-emerald-500/12 animate-blueprint-toast-in"
                  : "border-accent/30 bg-accent/10 animate-blueprint-toast-in"
              }`}
            >
              <p className="font-semibold">{rewardCopy}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-200">
                {rewardTone === "week" ? "Momentum unlocked" : "Progress saved"}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {view === "focus" && (
        <div
          key={`${activeTask.stageIndex}-${activeTask.taskIndex}`}
          className={`relative overflow-hidden rounded-[30px] border border-white/10 bg-panel-gradient p-5 shadow-card ${
            isAnimatingComplete ? "animate-blueprint-task-complete" : "animate-blueprint-task-in"
          }`}
        >
          {isAnimatingComplete ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="absolute h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl animate-blueprint-check-glow" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/20 text-2xl text-emerald-100 animate-blueprint-check-pop">
                ✓
              </div>
            </div>
          ) : null}

          <div className={isAnimatingComplete ? "opacity-15 transition-opacity" : "transition-opacity"}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Current step</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{activeTaskItem.title}</h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Week progress</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {stageCompletedCount}/{stageTaskTotal}
                </p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-200">{activeTaskItem.instructions[0]}</p>

            {activeTaskItem.instructions.length > 1 ? (
              <ul className="mt-4 grid gap-2 pl-5 text-sm leading-6 text-slate-300">
                {activeTaskItem.instructions.slice(1, 3).map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ul>
            ) : null}

            <div className="mt-4 grid gap-3">
              <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Why it matters</p>
                <p className="mt-2 text-sm leading-6 text-slate-100">{activeTaskItem.doneDefinition}</p>
              </div>

              {activeTaskItem.documentation ? (
                <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Document this</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">{activeTaskItem.documentation}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={handleCompleteTask}
                disabled={activeTaskComplete || isAnimatingComplete}
                className="inline-flex items-center justify-center rounded-[22px] border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {activeTaskComplete ? "Completed" : "Mark Complete"}
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center justify-center rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
              >
                Next Step
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setView("checklist")}
                  className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                >
                  View Week Checklist
                </button>
                <button
                  type="button"
                  onClick={() => setView("full")}
                  className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                >
                  See Full Blueprint
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-[22px] border border-accent/20 bg-accent/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Momentum</p>
                <p className="text-xs font-semibold text-slate-100">{stageProgressPercent}%</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                {remainingTasks <= 1
                  ? activeStage.momentumMessages.nearComplete
                  : currentStageData.status === "not_started"
                    ? activeStage.momentumMessages.notStarted
                    : activeStage.momentumMessages.inProgress}
              </p>
            </div>
          </div>
        </div>
      )}

      {view === "checklist" && (
        <div className="grid gap-3">
          {stageStatuses.map(({ stage, stageIndex, status }) => {
            const stageTasks = taskProgress[stageIndex] ?? [];
            const completedTasks = stageTasks.filter(Boolean).length;
            const isExpanded = expandedStageIndex === stageIndex;
            const stageStatusClasses: Record<ExecutionStageStatus, string> = {
              not_started: "border-white/10 bg-white/5",
              in_progress: "border-accent/30 bg-accent/10",
              completed: "border-emerald-400/30 bg-emerald-500/10"
            };

            return (
              <div
                key={stage.title}
                className={`overflow-hidden rounded-[24px] border ${stageStatusClasses[status]}`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedStageIndex(isExpanded ? -1 : stageIndex)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accentSecondary">{stage.title}</p>
                    <p className="mt-1 text-sm text-slate-100">{stage.rule}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {completedTasks}/{stage.checklist.length}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">
                      {status === "completed" ? "Completed" : status === "in_progress" ? "In progress" : "Open"}
                    </p>
                  </div>
                </button>

                {isExpanded ? (
                  <div className="border-t border-white/10 px-4 py-4 animate-blueprint-task-in">
                    <div className="grid gap-3">
                      {stage.checklist.map((item, taskIndex) => {
                        const checked = stageTasks[taskIndex] ?? false;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectTask({ stageIndex, taskIndex })}
                            className={`flex items-start gap-3 rounded-[20px] border px-4 py-3 text-left transition ${
                              checked
                                ? "border-emerald-400/30 bg-emerald-500/10"
                                : activeTask.stageIndex === stageIndex && activeTask.taskIndex === taskIndex
                                  ? "border-accent/40 bg-accent/10"
                                  : "border-white/10 bg-black/20"
                            }`}
                          >
                            <span
                              className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-semibold ${
                                checked
                                  ? "border-emerald-300/40 bg-emerald-500/20 text-emerald-100"
                                  : "border-white/20 bg-slate-950 text-slate-200"
                              }`}
                            >
                              {checked ? "✓" : taskIndex + 1}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-white">{item.title}</p>
                              <p className="mt-1 text-sm leading-6 text-slate-300">{item.instructions[0]}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setView("focus");
                          setExpandedStageIndex(stageIndex);
                        }}
                        className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200"
                      >
                        Back to focus
                      </button>
                      <button
                        type="button"
                        onClick={() => setView("full")}
                        className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200"
                      >
                        Full blueprint
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {view === "full" && (
        <div className="grid gap-4">
          <div className="rounded-[24px] border border-white/10 bg-panel-gradient p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Full blueprint</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Review the full roadmap when you need broader context, then jump back into Focus mode to execute the next step.
            </p>
            <button
              type="button"
              onClick={() => setView("focus")}
              className="mt-4 inline-flex rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              Return to focus
            </button>
          </div>

          {stageStatuses.map(({ stage, stageIndex, status }) => (
            <ExecutionStageCard
              key={stage.title}
              stage={stage}
              stageIndex={stageIndex}
              taskProgress={taskProgress[stageIndex] ?? []}
              status={status}
              milestoneText={milestoneTemplate[Math.min(stageIndex, milestoneTemplate.length - 1)]}
              onToggleTask={onToggleTask}
            />
          ))}

          {phases.map((phase) => (
            <PhaseCard key={phase.title} phase={phase} />
          ))}
        </div>
      )}
    </div>
  );
}
