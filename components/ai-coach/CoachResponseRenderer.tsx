"use client";

import {
  CoachAction,
  CoachChecklistStructured,
  CoachConversationMessage,
  CoachFollowupStructured,
  CoachMarketingStructured,
  CoachNextStep,
  CoachPricingStructured,
  CoachResponse,
  CoachScriptStructured,
  CoachSopStructured,
  SavedCoachOutput
} from "@/lib/ai/coachTypes";

import { ChecklistRenderer } from "@/components/ai-coach/renderers/ChecklistRenderer";
import { FollowupRenderer } from "@/components/ai-coach/renderers/FollowupRenderer";
import { ImageRenderer } from "@/components/ai-coach/renderers/ImageRenderer";
import { MarketingRenderer } from "@/components/ai-coach/renderers/MarketingRenderer";
import { PricingRenderer } from "@/components/ai-coach/renderers/PricingRenderer";
import { ScriptRenderer } from "@/components/ai-coach/renderers/ScriptRenderer";
import { SopRenderer } from "@/components/ai-coach/renderers/SopRenderer";

interface CoachResponseRendererProps {
  response: Pick<
    CoachConversationMessage,
    "mode" | "title" | "content" | "structured" | "image" | "suggestions" | "primaryAction" | "actions" | "nextStep" | "secondaryNextSteps" | "anchorBridge" | "buildStage"
  > | SavedCoachOutput | CoachResponse;
  onActionClick?: (action: CoachAction) => void;
  onSave?: () => void;
  saveLabel?: string;
}

function dedupeActions(actions: CoachAction[] = []) {
  const seen = new Set<string>();
  return actions.filter((action) => {
    const key = `${action.label}::${action.prompt}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function isPricingStructured(value: unknown): value is CoachPricingStructured {
  return typeof value === "object" && value !== null && "starter" in value && "standard" in value && "premium" in value;
}

function isChecklistStructured(value: unknown): value is CoachChecklistStructured {
  return typeof value === "object" && value !== null && "items" in value && "title" in value;
}

function isScriptStructured(value: unknown): value is CoachScriptStructured {
  return typeof value === "object" && value !== null && "scriptType" in value && "primaryScript" in value;
}

function isFollowupStructured(value: unknown): value is CoachFollowupStructured {
  return typeof value === "object" && value !== null && "goal" in value && "sequence" in value;
}

function isMarketingStructured(value: unknown): value is CoachMarketingStructured {
  return typeof value === "object" && value !== null && "ideas" in value && "title" in value;
}

function isSopStructured(value: unknown): value is CoachSopStructured {
  return typeof value === "object" && value !== null && "steps" in value && "title" in value;
}

function toActionFromNextStep(nextStep?: CoachNextStep): CoachAction | null {
  if (!nextStep) {
    return null;
  }

  return {
    id: `next-step:${nextStep.title}:${nextStep.prompt}`,
    label: nextStep.title,
    prompt: nextStep.prompt,
    mode: nextStep.mode,
    style: "primary",
    kind: "follow_up"
  };
}

export function CoachResponseRenderer({ response, onActionClick, onSave, saveLabel = "Save Output" }: CoachResponseRendererProps) {
  const mode = response.mode;
  const title = response.title;
  const text = "content" in response ? response.content : response.text;
  const primaryAction = response.primaryAction ?? toActionFromNextStep(response.nextStep);
  const actions = response.actions ?? [];
  const secondaryNextSteps = response.secondaryNextSteps ?? [];
  const anchorBridge = response.anchorBridge;
  const hasStructuredRenderer =
    (mode === "pricing" && isPricingStructured(response.structured)) ||
    (mode === "checklist" && isChecklistStructured(response.structured)) ||
    (mode === "script" && isScriptStructured(response.structured)) ||
    (mode === "followup" && isFollowupStructured(response.structured)) ||
    (mode === "marketing" && isMarketingStructured(response.structured)) ||
    (mode === "sop" && isSopStructured(response.structured)) ||
    (mode === "image" && Boolean(response.image));
  const secondaryActions = dedupeActions(
    [...actions, ...secondaryNextSteps].filter((action) => {
      if (!primaryAction) {
        return true;
      }

      return action.id !== primaryAction.id && `${action.label}::${action.prompt}` !== `${primaryAction.label}::${primaryAction.prompt}`;
    })
  ).slice(0, 3);

  return (
    <article className="w-full max-w-full overflow-hidden rounded-[28px] border border-white/10 bg-panel-gradient p-4 shadow-card sm:p-6">
      <div className="flex w-full max-w-full flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 max-w-full space-y-3">
          <div className="flex max-w-full flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
              {mode}
            </span>
          </div>
          {title ? <h2 className="break-words text-xl font-semibold text-white sm:text-2xl">{title}</h2> : null}
          {!hasStructuredRenderer && text ? <p className="break-words whitespace-normal text-sm leading-6 text-muted">{text}</p> : null}
        </div>
      </div>

      <div className="mt-4 grid w-full max-w-full gap-4">
        {mode === "pricing" && isPricingStructured(response.structured) ? <PricingRenderer data={response.structured} /> : null}
        {mode === "checklist" && isChecklistStructured(response.structured) ? <ChecklistRenderer data={response.structured} /> : null}
        {mode === "script" && isScriptStructured(response.structured) ? <ScriptRenderer data={response.structured} /> : null}
        {mode === "followup" && isFollowupStructured(response.structured) ? <FollowupRenderer data={response.structured} /> : null}
        {mode === "marketing" && isMarketingStructured(response.structured) ? <MarketingRenderer data={response.structured} /> : null}
        {mode === "sop" && isSopStructured(response.structured) ? <SopRenderer data={response.structured} /> : null}
        {mode === "image" && response.image ? <ImageRenderer data={response.image} /> : null}

        {mode === "general" && text ? (
          <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-4 sm:p-5">
            <p className="break-words whitespace-pre-wrap text-sm leading-7 text-slate-100">{text}</p>
          </article>
        ) : null}

        {(primaryAction || onSave) && (onActionClick || onSave) ? (
          <article className="w-full max-w-full overflow-hidden rounded-[24px] border border-accent/30 bg-accent/10 p-4 sm:p-5">
            <div className="flex w-full max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
              <div className="max-w-full space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Next best step</p>
                {primaryAction ? <h3 className="break-words text-lg font-semibold text-white">{primaryAction.label}</h3> : null}
              </div>
              {onSave ? (
                <button
                  type="button"
                  onClick={onSave}
                  className="inline-flex w-full max-w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10 sm:w-auto"
                >
                  {saveLabel}
                </button>
              ) : null}
            </div>
            {primaryAction && onActionClick ? (
              <button
                type="button"
                onClick={() => onActionClick(primaryAction)}
                className="mt-4 inline-flex w-full max-w-full items-center justify-center rounded-2xl border border-accent/40 bg-white px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:border-white hover:bg-slate-100"
              >
                {primaryAction.label}
              </button>
            ) : null}
          </article>
        ) : null}

        {secondaryActions.length > 0 && onActionClick ? (
          <article className="w-full max-w-full overflow-hidden rounded-[22px] border border-white/10 bg-black/20 p-4">
            <div className="flex w-full max-w-full flex-wrap gap-2">
                {secondaryActions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => onActionClick(action)}
                    className="max-w-full break-words rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-medium text-slate-100 transition hover:border-accent/40 hover:bg-accent/10"
                  >
                    {action.label}
                  </button>
                ))}
            </div>
          </article>
        ) : null}

        {anchorBridge ? (
          <article className="w-full max-w-full overflow-hidden rounded-[22px] border border-cyan-400/20 bg-cyan-500/5 p-4">
            <p className="break-words whitespace-normal text-sm leading-6 text-slate-100">{anchorBridge}</p>
          </article>
        ) : null}
      </div>
    </article>
  );
}
