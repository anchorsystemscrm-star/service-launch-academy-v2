"use client";

import { getCompletedWeeks, weekGroups } from "@/utils/benchmarks";

interface ProgressTrackerProps {
  progress: boolean[];
  onToggleWeek: (weekIndex: number, checked: boolean) => void;
}

export function ProgressTracker({ progress, onToggleWeek }: ProgressTrackerProps) {
  const completedWeeks = getCompletedWeeks(progress);
  const percentage = Math.round((completedWeeks / 13) * 100);

  return (
    <div className="rounded-[24px] border border-white/10 bg-panel-gradient p-5 shadow-card">
      <div className="mb-5">
        <div className="h-3 overflow-hidden rounded-full border border-white/10 bg-slate-950">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent to-accentSecondary transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-slate-200">
          {completedWeeks} of 13 weeks completed ({percentage}%).
        </p>
      </div>

      <div className="grid gap-5">
        {weekGroups.map((group) => (
          <div key={group.title} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
            <h3 className="text-sm font-semibold text-white">{group.title}</h3>
            <div className="mt-3 grid gap-3">
              {group.weeks.map((week) => {
                const weekIndex = week - 1;
                return (
                  <label
                    key={week}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-accent/30 hover:bg-white/10"
                  >
                    <input
                      type="checkbox"
                      checked={progress[weekIndex]}
                      onChange={(event) => onToggleWeek(weekIndex, event.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-slate-950 text-accent focus:ring-accent"
                    />
                    Week {week} complete
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
