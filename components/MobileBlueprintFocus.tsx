import { useEffect, useMemo, useRef, useState } from "react";

import { BlueprintCelebrationOverlay } from "@/components/BlueprintCelebrationOverlay";
import { BlueprintTaskSupportPanel } from "@/components/BlueprintTaskSupportPanel";
import { ExecutionStageCard } from "@/components/ExecutionStageCard";
import { PhaseCard } from "@/components/PhaseCard";
import { ExecutionStage, Phase } from "@/types/business";
import { getCheckoutHref } from "@/utils/access";
import {
  ExecutionStageStatus,
  blueprintMilestones,
  executionStageWeekMap,
  getBlueprintAnchorStage,
  getBlueprintGuidedAction,
  getBlueprintTaskCoachHref,
  getChecklistCompletion,
  getExecutionStageStatus,
  getMilestoneState,
  getNextActionSuggestion,
  milestoneTemplate
} from "@/utils/benchmarks";
import { useBlueprintMilestones } from "@/utils/storage";

type MobileView = "focus" | "checklist" | "full";

type TaskPosition = {
  stageIndex: number;
  taskIndex: number;
};

type CelebrationState = {
  variant: "week" | "blueprint";
  eyebrow: string;
  title: string;
  message: string;
  stats: Array<{ label: string; value: string }>;
  advanceTarget: TaskPosition;
};

interface MobileBlueprintFocusProps {
  businessId: string;
  executionPlan: ExecutionStage[];
  phases: Phase[];
  progress: boolean[];
  taskProgress: boolean[][];
  taskOutputMap: Record<string, boolean>;
  onToggleTask: (stageIndex: number, taskIndex: number, checked: boolean) => void;
  onToggleWeek: (weekIndex: number, checked: boolean) => void;
  onTaskOutputGenerated: (taskId: string) => void;
  hasProAccess: boolean;
  canAccessAnchor?: boolean;
  onOpenAnchor?: () => void;
}

const stepRewardCopy = [
  "Task complete",
  "Progress saved",
  "Momentum building",
  "Nice — keep moving",
  "Locked in"
] as const;

const sparkleOffsets = [
  { top: "24%", left: "33%" },
  { top: "30%", left: "68%" },
  { top: "42%", left: "22%" },
  { top: "44%", left: "77%" },
  { top: "60%", left: "28%" },
  { top: "66%", left: "72%" },
  { top: "72%", left: "40%" },
  { top: "74%", left: "58%" }
] as const;

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

export function MobileBlueprintFocus({
  businessId,
  executionPlan,
  phases,
  progress,
  taskProgress,
  taskOutputMap,
  onToggleTask,
  onToggleWeek,
  onTaskOutputGenerated,
  hasProAccess,
  canAccessAnchor = false,
  onOpenAnchor
}: MobileBlueprintFocusProps) {
  const [view, setView] = useState<MobileView>("focus");
  const [activeTask, setActiveTask] = useState<TaskPosition>(() => getFirstIncompletePosition(executionPlan, taskProgress));
  const [expandedStageIndex, setExpandedStageIndex] = useState(activeTask.stageIndex);
  const [rewardCopy, setRewardCopy] = useState<string | null>(null);
  const [isAnimatingComplete, setIsAnimatingComplete] = useState(false);
  const [celebration, setCelebration] = useState<CelebrationState | null>(null);
  const [completedOpen, setCompletedOpen] = useState(false);
  const [rewardNonce, setRewardNonce] = useState(0);
  const [milestoneToast, setMilestoneToast] = useState<{ title: string; description: string } | null>(null);
  const timeoutRefs = useRef<number[]>([]);
  const { milestones, setMilestoneAchieved } = useBlueprintMilestones(businessId);

  if (!executionPlan.length) {
    return null;
  }

  const checklistStats = getChecklistCompletion(taskProgress);
  const nextAction = getNextActionSuggestion(executionPlan, taskProgress);
  const anchorStage = getBlueprintAnchorStage(taskProgress, taskOutputMap);
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

  if (!activeTaskItem) {
    return null;
  }

  const activeTaskComplete = activeStageTasks[activeTask.taskIndex] ?? false;
  const activeTaskHasOutput = Boolean(taskOutputMap[activeTaskItem.id]);
  const guidedAction = getBlueprintGuidedAction(activeTaskHasOutput, activeTaskComplete);
  const stageCompletedCount = activeStageTasks.filter(Boolean).length;
  const stageTaskTotal = activeStage.checklist.length;
  const stageProgressPercent = stageTaskTotal === 0 ? 0 : Math.round((stageCompletedCount / stageTaskTotal) * 100);
  const remainingTasks = Math.max(stageTaskTotal - stageCompletedCount, 0);
  const completedTasks = executionPlan.flatMap((stage, stageIndex) =>
    stage.checklist.flatMap((item, taskIndex) =>
      taskProgress[stageIndex]?.[taskIndex]
        ? [
            {
              stageIndex,
              taskIndex,
              stageTitle: stage.title,
              item
            }
          ]
        : []
    )
  );

  useEffect(() => {
    if (isAnimatingComplete || celebration) {
      return;
    }

    const currentTaskDone = taskProgress[activeTask.stageIndex]?.[activeTask.taskIndex] ?? false;

    if (!currentTaskDone) {
      return;
    }

    const nextPosition = getFirstIncompletePosition(executionPlan, taskProgress);
    setActiveTask(nextPosition);
    setExpandedStageIndex(nextPosition.stageIndex);
  }, [activeTask, celebration, executionPlan, isAnimatingComplete, taskProgress]);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  function queueTimeout(callback: () => void, delay: number) {
    const timeoutId = window.setTimeout(callback, delay);
    timeoutRefs.current.push(timeoutId);
  }

  function setFocusedTask(position: TaskPosition) {
    setActiveTask(position);
    setExpandedStageIndex(position.stageIndex);
    setView("focus");
  }

  function dismissCelebration(nextView: MobileView = "focus") {
    if (!celebration) {
      return;
    }

    setActiveTask(celebration.advanceTarget);
    setExpandedStageIndex(celebration.advanceTarget.stageIndex);
    setView(nextView);
    setCelebration(null);
  }

  function handleReopenTask(stageIndex: number, taskIndex: number) {
    onToggleTask(stageIndex, taskIndex, false);
    (executionStageWeekMap[stageIndex] ?? []).forEach((week) => onToggleWeek(week - 1, false));
    setCelebration(null);
    setRewardCopy("Task reopened");
    setRewardNonce((previous) => previous + 1);
    setFocusedTask({ stageIndex, taskIndex });
    queueTimeout(() => setRewardCopy(null), 1400);
  }

  function handleCompleteTask() {
    if (activeTaskComplete || isAnimatingComplete) {
      return;
    }

    const nextTaskProgress = taskProgress.map((stageTasks, stageIndex) => {
      const targetLength = executionPlan[stageIndex]?.checklist.length ?? stageTasks.length;
      const copy = Array.isArray(stageTasks) ? [...stageTasks] : new Array(targetLength).fill(false);

      while (copy.length < targetLength) {
        copy.push(false);
      }

      return copy;
    });

    if (!nextTaskProgress[activeTask.stageIndex]) {
      nextTaskProgress[activeTask.stageIndex] = new Array(activeStage.checklist.length).fill(false);
    }

    nextTaskProgress[activeTask.stageIndex][activeTask.taskIndex] = true;

    const nextChecklistStats = getChecklistCompletion(nextTaskProgress);
    const weekComplete = nextTaskProgress[activeTask.stageIndex].every(Boolean);
    const nextWeeks = [...progress];
    const fullBlueprintComplete = nextChecklistStats.total > 0 && nextChecklistStats.completed === nextChecklistStats.total;
    const nextPosition = fullBlueprintComplete
      ? getFallbackPosition(executionPlan)
      : getFirstIncompletePosition(executionPlan, nextTaskProgress);
    const rewardIndex = (nextChecklistStats.completed - 1) % stepRewardCopy.length;
    const orderedMilestones = [
      "full_blueprint_completed",
      "first_phase_completed",
      "first_five_tasks_completed",
      "first_week_completed",
      "first_task_completed"
    ] as const;

    setRewardCopy(stepRewardCopy[Math.max(rewardIndex, 0)]);
    setRewardNonce((previous) => previous + 1);
    setIsAnimatingComplete(true);
    onToggleTask(activeTask.stageIndex, activeTask.taskIndex, true);

    if (weekComplete) {
      (executionStageWeekMap[activeTask.stageIndex] ?? []).forEach((week) => {
        nextWeeks[week - 1] = true;
        onToggleWeek(week - 1, true);
      });
    }

    const nextMilestoneState = getMilestoneState(nextWeeks, nextTaskProgress);
    const unlockedMilestones = orderedMilestones.filter((key) => nextMilestoneState[key] && !milestones[key]);
    unlockedMilestones.forEach((key) => setMilestoneAchieved(key, true));
    const subtleMilestone = unlockedMilestones.find(
      (key) => key !== "first_week_completed" && key !== "full_blueprint_completed"
    );

    if (subtleMilestone) {
      setMilestoneToast({
        title: blueprintMilestones[subtleMilestone].title,
        description: blueprintMilestones[subtleMilestone].description
      });
      queueTimeout(() => setMilestoneToast(null), 2600);
    }

    if (fullBlueprintComplete) {
      queueTimeout(() => {
        setIsAnimatingComplete(false);
        setCelebration({
          variant: "blueprint",
          eyebrow: "Blueprint Complete",
          title: "Execution Locked In",
          message: "You completed every tracked step in the blueprint. Review the full operating system or move straight into execution support.",
          stats: [
            { label: "Tasks complete", value: `${nextChecklistStats.completed}/${nextChecklistStats.total}` },
            { label: "Stages cleared", value: `${executionPlan.length}` }
          ],
          advanceTarget: nextPosition
        });
      }, 700);

      queueTimeout(() => setRewardCopy(null), 2200);
      return;
    }

    if (weekComplete) {
      queueTimeout(() => {
        setIsAnimatingComplete(false);
        setCelebration({
          variant: "week",
          eyebrow: "Week Complete",
          title: "Momentum Unlocked",
          message: `You finished ${activeStage.title}. Lock the result in, then move into the next stage with clean momentum.`,
          stats: [
            { label: "Stage progress", value: `${activeStage.checklist.length}/${activeStage.checklist.length}` },
            { label: "Overall progress", value: `${nextChecklistStats.percentage}%` }
          ],
          advanceTarget: nextPosition
        });
      }, 700);

      queueTimeout(() => setRewardCopy(null), 2200);
      return;
    }

    queueTimeout(() => {
      setActiveTask(nextPosition);
      setExpandedStageIndex(nextPosition.stageIndex);
      setIsAnimatingComplete(false);
    }, 700);

    queueTimeout(() => setRewardCopy(null), 1800);
  }

  return (
    <>
      <div className="grid w-full max-w-full gap-4 overflow-x-hidden lg:hidden">
        <div className="sticky top-3 z-20 grid gap-3">
          <div className="w-full max-w-full overflow-hidden rounded-[26px] border border-white/10 bg-panel-gradient px-4 py-4 shadow-card backdrop-blur">
            <div className="flex w-full max-w-full flex-wrap items-start justify-between gap-3">
              <div className="min-w-0 max-w-full">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Focused mode</p>
                <h2 className="mt-2 break-words text-lg font-semibold text-white">{activeStage.title}</h2>
                <p className="mt-1 break-words text-xs uppercase tracking-[0.16em] text-muted">
                  Task {activeTask.taskIndex + 1} of {stageTaskTotal}
                </p>
              </div>
              <div className="w-full max-w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left sm:w-auto sm:text-right">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Overall</p>
                <p className="mt-1 text-lg font-semibold text-white">{checklistStats.percentage}%</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  <span>Blueprint progress</span>
                  <span>
                    {checklistStats.completed}/{checklistStats.total}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-950">
                  <div
                    key={rewardNonce}
                    className={`h-full rounded-full bg-gradient-to-r from-accent via-white/90 to-accentSecondary transition-all duration-700 ${
                      rewardCopy ? "animate-blueprint-progress-pulse-strong" : ""
                    }`}
                    style={{ width: `${checklistStats.percentage}%` }}
                  />
                </div>
              </div>

              {nextAction ? (
                <div className="w-full max-w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-3">
                  <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Next action queued</p>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{nextAction.effortLabel}</span>
                  </div>
                  <p className="mt-2 break-words text-sm font-semibold text-white">{nextAction.title}</p>
                  <p className="mt-1 break-words text-sm leading-6 text-slate-300">{nextAction.description}</p>
                </div>
              ) : null}

              <div className="grid w-full max-w-full grid-cols-1 gap-2 sm:grid-cols-3">
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
                key={`${rewardCopy}-${rewardNonce}`}
                className="mt-3 rounded-2xl border border-accent/30 bg-accent/10 px-3 py-3 text-sm text-white animate-blueprint-toast-in"
              >
                <p className="font-semibold">{rewardCopy}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-200">Momentum building</p>
              </div>
            ) : null}

            {milestoneToast ? (
              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white animate-blueprint-toast-in">
                <p className="font-semibold">{milestoneToast.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-200">{milestoneToast.description}</p>
              </div>
            ) : null}
          </div>
        </div>

        {view === "focus" && (
          <div
            key={`${activeTask.stageIndex}-${activeTask.taskIndex}`}
            className={`relative w-full max-w-full overflow-hidden rounded-[30px] border border-white/10 bg-panel-gradient p-5 shadow-card ${
              isAnimatingComplete ? "animate-blueprint-task-complete-strong" : "animate-blueprint-task-in-strong"
            }`}
          >
            {isAnimatingComplete ? (
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl animate-blueprint-check-glow-strong" />
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 animate-blueprint-success-ring" />
                {sparkleOffsets.map((sparkle, index) => (
                  <span
                    key={`${sparkle.top}-${sparkle.left}-${rewardNonce}`}
                    className="absolute h-2 w-2 rounded-full bg-white/90 animate-blueprint-task-sparkle"
                    style={{ top: sparkle.top, left: sparkle.left, animationDelay: `${index * 50}ms` }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/20 text-2xl text-emerald-100 animate-blueprint-check-pop-strong">
                    ✓
                  </div>
                </div>
              </div>
            ) : null}

            <div className={isAnimatingComplete ? "opacity-10 transition-opacity duration-300" : "transition-opacity"}>
              <div className="flex w-full max-w-full flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 max-w-full">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Current step</p>
                  <h3 className="mt-2 break-words text-xl font-semibold text-white">{activeTaskItem.title}</h3>
                </div>
                <div className="w-full max-w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-left sm:w-auto sm:text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Week progress</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {stageCompletedCount}/{stageTaskTotal}
                  </p>
                </div>
              </div>

              <p className="mt-4 break-words text-sm leading-6 text-slate-100">{activeTaskItem.instruction}</p>

              <div className="mt-4">
                <BlueprintTaskSupportPanel
                  item={activeTaskItem}
                  aiHref={getBlueprintTaskCoachHref(activeTaskItem.aiPrompt)}
                  hasAiAccess={hasProAccess}
                  aiUpgradeHref={getCheckoutHref("pro")}
                  stageIndex={activeTask.stageIndex}
                  anchorStage={anchorStage}
                  canAccessAnchor={canAccessAnchor}
                  anchorUpgradeHref={getCheckoutHref("elite")}
                  highlightPrimary={guidedAction === "generate_ai"}
                  onAnchorAction={onOpenAnchor}
                  onPrimaryAction={() => onTaskOutputGenerated(activeTaskItem.id)}
                  compact
                />
              </div>

              <div className="mt-5 grid gap-3">
                <div className="grid gap-2">
                  {guidedAction === "mark_complete" ? (
                    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Next step</p>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleCompleteTask}
                    disabled={activeTaskComplete || isAnimatingComplete}
                    className={`inline-flex w-full max-w-full items-center justify-center rounded-[22px] border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-300/50 hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                      guidedAction === "mark_complete" ? "glow-next" : ""
                    }`}
                  >
                    {activeTaskComplete ? "Completed" : "Mark Complete"}
                  </button>
                </div>
                <div className="grid w-full max-w-full grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setView("checklist")}
                    className="w-full max-w-full rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                  >
                    View Week Checklist
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("full")}
                    className="w-full max-w-full rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                  >
                    See Full Blueprint
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-[22px] border border-accent/20 bg-accent/5 p-4">
                <div className="flex w-full max-w-full flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Momentum</p>
                  <p className="text-xs font-semibold text-slate-100">{stageProgressPercent}%</p>
                </div>
                <p className="mt-2 break-words text-sm leading-6 text-slate-100">
                  {remainingTasks <= 1
                    ? activeStage.momentumMessages.nearComplete
                    : currentStageData.status === "not_started"
                      ? activeStage.momentumMessages.notStarted
                      : activeStage.momentumMessages.inProgress}
                </p>
              </div>

              {completedTasks.length > 0 ? (
                <div className="mt-5 w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20">
                  <button
                    type="button"
                    onClick={() => setCompletedOpen((previous) => !previous)}
                    className="flex w-full max-w-full flex-wrap items-center justify-between gap-3 px-4 py-4 text-left"
                  >
                    <div className="min-w-0 max-w-full">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">Completed tasks</p>
                      <p className="mt-1 break-words text-sm text-slate-200">
                        Review completed work or reopen anything that was marked done by mistake.
                      </p>
                    </div>
                    <div className="w-full max-w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white sm:w-auto">
                      {completedTasks.length}
                    </div>
                  </button>

                  {completedOpen ? (
                    <div className="border-t border-white/10 px-4 py-4 animate-blueprint-task-in">
                      <div className="grid gap-3">
                        {completedTasks.map(({ stageIndex, taskIndex, stageTitle, item }) => (
                          <details key={`${item.id}-${taskIndex}`} className="w-full max-w-full overflow-hidden rounded-[20px] border border-white/10 bg-white/5 px-4 py-3">
                            <summary className="cursor-pointer list-none">
                              <div className="flex w-full max-w-full items-start gap-3">
                                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300/40 bg-emerald-500/20 text-[11px] font-semibold text-emerald-100">
                                  ✓
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accentSecondary">{stageTitle}</p>
                                  <p className="mt-1 break-words text-sm font-semibold text-white">{item.title}</p>
                                </div>
                              </div>
                            </summary>

                            <div className="mt-4 grid gap-3">
                              <ul className="grid gap-2 pl-5 text-sm leading-6 text-slate-200">
                                {item.instructions.map((instruction) => (
                                  <li key={instruction} className="break-words">{instruction}</li>
                                ))}
                              </ul>
                              <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Done means</p>
                                <p className="mt-2 break-words text-sm leading-6 text-slate-100">{item.doneDefinition}</p>
                              </div>
                              {item.documentation ? (
                                <div className="rounded-[18px] border border-white/10 bg-black/20 p-3">
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">What to document</p>
                                  <p className="mt-2 break-words text-sm leading-6 text-slate-100">{item.documentation}</p>
                                </div>
                              ) : null}
                              <button
                                type="button"
                                onClick={() => handleReopenTask(stageIndex, taskIndex)}
                                className="inline-flex w-full max-w-full items-center justify-center rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white"
                              >
                                Reopen Task
                              </button>
                            </div>
                          </details>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        )}

        {view === "checklist" && (
          <div className="grid gap-3">
            {stageStatuses.map(({ stage, stageIndex, status }) => {
              const stageTasks = taskProgress[stageIndex] ?? [];
              const completedCount = stageTasks.filter(Boolean).length;
              const isExpanded = expandedStageIndex === stageIndex;
              const stageStatusClasses: Record<ExecutionStageStatus, string> = {
                not_started: "border-white/10 bg-white/5",
                in_progress: "border-accent/30 bg-accent/10",
                completed: "border-emerald-400/30 bg-emerald-500/10"
              };

              return (
                <div key={stage.title} className={`w-full max-w-full overflow-hidden rounded-[24px] border ${stageStatusClasses[status]}`}>
                  <button
                    type="button"
                    onClick={() => setExpandedStageIndex(isExpanded ? -1 : stageIndex)}
                    className="flex w-full max-w-full flex-wrap items-center justify-between gap-3 px-4 py-4 text-left"
                  >
                    <div className="min-w-0 max-w-full">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accentSecondary">{stage.title}</p>
                      <p className="mt-1 break-words text-sm text-slate-100">{stage.rule}</p>
                    </div>
                    <div className="w-full max-w-full text-left sm:w-auto sm:text-right">
                      <p className="text-sm font-semibold text-white">
                        {completedCount}/{stage.checklist.length}
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
                            <div
                              key={item.id}
                              className={`w-full max-w-full overflow-hidden rounded-[20px] border px-4 py-3 transition ${
                                checked
                                  ? "border-emerald-400/30 bg-emerald-500/10"
                                  : activeTask.stageIndex === stageIndex && activeTask.taskIndex === taskIndex
                                    ? "border-accent/40 bg-accent/10"
                                    : "border-white/10 bg-black/20"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => setFocusedTask({ stageIndex, taskIndex })}
                                className="flex w-full max-w-full items-start gap-3 text-left"
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
                                  <p className="break-words text-sm font-semibold text-white">{item.title}</p>
                                  <p className="mt-1 break-words text-sm leading-6 text-slate-300">{item.instructions[0]}</p>
                                </div>
                              </button>

                              {checked ? (
                                <button
                                  type="button"
                                  onClick={() => handleReopenTask(stageIndex, taskIndex)}
                                  className="mt-3 inline-flex rounded-[16px] border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white"
                                >
                                  Mark Incomplete
                                </button>
                              ) : null}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 grid w-full max-w-full grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                          type="button"
                          onClick={() => {
                            setView("focus");
                            setExpandedStageIndex(stageIndex);
                          }}
                          className="w-full max-w-full rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200"
                        >
                          Back to focus
                        </button>
                        <button
                          type="button"
                          onClick={() => setView("full")}
                          className="w-full max-w-full rounded-[20px] border border-white/10 bg-black/20 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200"
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
            <div className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-panel-gradient p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Full blueprint</p>
              <p className="mt-2 break-words text-sm leading-6 text-slate-200">
                Review the full roadmap when you need broader context, then jump back into Focus mode to execute the next step.
              </p>
              <button
                type="button"
                onClick={() => setView("focus")}
                className="mt-4 inline-flex w-full max-w-full items-center justify-center rounded-[20px] border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white sm:w-auto"
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
                hasAiAccess={hasProAccess}
                anchorStage={anchorStage}
                canAccessAnchor={canAccessAnchor}
                onOpenAnchor={onOpenAnchor}
                onTaskOutputGenerated={onTaskOutputGenerated}
                onToggleTask={onToggleTask}
              />
            ))}

            {phases.map((phase) => (
              <PhaseCard key={phase.title} phase={phase} />
            ))}
          </div>
        )}
      </div>

      <BlueprintCelebrationOverlay
        open={Boolean(celebration)}
        variant={celebration?.variant ?? "week"}
        eyebrow={celebration?.eyebrow ?? ""}
        title={celebration?.title ?? ""}
        message={celebration?.message ?? ""}
        stats={celebration?.stats ?? []}
        actions={
          celebration?.variant === "blueprint"
            ? [
                {
                  label: "Review Full Blueprint",
                  primary: true,
                  onClick: () => dismissCelebration("full")
                },
                {
                  label: "View Benchmarks",
                  href: "/benchmarks"
                },
                ...(hasProAccess
                  ? [
                      {
                        label: "Go to AI Coach",
                        href: "/ai-coach"
                      }
                    ]
                  : [])
              ]
            : [
                {
                  label: "Next stage",
                  primary: true,
                  onClick: () => dismissCelebration("focus")
                },
                {
                  label: "Review Full Blueprint",
                  onClick: () => dismissCelebration("full")
                }
              ]
        }
      />
    </>
  );
}
