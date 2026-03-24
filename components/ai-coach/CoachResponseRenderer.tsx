"use client";

import {
  CoachAction,
  CoachChecklistStructured,
  CoachConversationMessage,
  CoachFollowupStructured,
  CoachMarketingStructured,
  CoachNextStep,
  CoachPricingStructured,
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
  > | SavedCoachOutput;
  onActionClick?: (action: CoachAction) => void;
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

export function CoachResponseRenderer({ response, onActionClick }: CoachResponseRendererProps) {
  const mode = response.mode;
  const title = response.title;
  const text = "content" in response ? response.content : response.text;
  const suggestions = "suggestions" in response ? response.suggestions : undefined;
  const primaryAction = response.primaryAction;
  const actions = response.actions;
  const nextStep = response.nextStep as CoachNextStep | undefined;
  const secondaryNextSteps = response.secondaryNextSteps;
  const anchorBridge = response.anchorBridge;
  const buildStage = response.buildStage;

  return (
    <div className="grid gap-4">
      <article className="rounded-[28px] border border-white/10 bg-panel-gradient p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {title ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{title}</p> : null}
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {mode === "general" ? "Tactical Response" : title || "Coach Output"}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-200">
              {mode}
            </span>
            {buildStage ? (
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                {buildStage}
              </span>
            ) : null}
          </div>
        </div>

        {text ? <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted">{text}</p> : null}
      </article>

      {mode === "pricing" && isPricingStructured(response.structured) ? <PricingRenderer data={response.structured} /> : null}
      {mode === "checklist" && isChecklistStructured(response.structured) ? <ChecklistRenderer data={response.structured} /> : null}
      {mode === "script" && isScriptStructured(response.structured) ? <ScriptRenderer data={response.structured} /> : null}
      {mode === "followup" && isFollowupStructured(response.structured) ? <FollowupRenderer data={response.structured} /> : null}
      {mode === "marketing" && isMarketingStructured(response.structured) ? <MarketingRenderer data={response.structured} /> : null}
      {mode === "sop" && isSopStructured(response.structured) ? <SopRenderer data={response.structured} /> : null}
      {mode === "image" && response.image ? <ImageRenderer data={response.image} /> : null}

      {primaryAction && onActionClick ? (
        <article className="rounded-[28px] border border-accent/30 bg-accent/10 p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Primary action</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">{primaryAction.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-100">
                {nextStep?.why || "This is the strongest next move from the current output."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onActionClick(primaryAction)}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/15"
            >
              {primaryAction.label}
            </button>
          </div>
        </article>
      ) : null}

      {nextStep && onActionClick ? (
        <article className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Guided flow</p>
          <h3 className="mt-3 text-lg font-semibold text-white">{nextStep.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-200">{nextStep.why}</p>
        </article>
      ) : null}

      {actions?.length && onActionClick ? (
        <article className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Action layer</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {actions.filter((action) => action.id !== primaryAction?.id).map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onActionClick(action)}
                className={`rounded-full border px-3 py-2 text-left text-xs font-medium transition ${
                  action.style === "primary"
                    ? "border-accent/40 bg-accent/10 text-white hover:border-accent/80 hover:bg-accent/15"
                    : "border-white/10 bg-white/5 text-slate-100 hover:border-accent/40 hover:bg-accent/10"
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </article>
      ) : null}

      {secondaryNextSteps?.length && onActionClick ? (
        <article className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Useful follow-ons</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {secondaryNextSteps.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onActionClick(action)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-medium text-slate-100 transition hover:border-accent/40 hover:bg-accent/10"
              >
                {action.label}
              </button>
            ))}
          </div>
        </article>
      ) : null}

      {anchorBridge ? (
        <article className="rounded-[24px] border border-cyan-400/20 bg-cyan-500/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">Anchor bridge</p>
          <p className="mt-3 text-sm leading-6 text-slate-100">{anchorBridge}</p>
        </article>
      ) : null}

      {suggestions?.length && onActionClick ? (
        <article className="rounded-[24px] border border-white/10 bg-black/20 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Quick prompts</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((item: string) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  onActionClick({
                    id: item.toLowerCase().replace(/[^a-z0-9]+/g, "_"),
                    label: item,
                    prompt: item,
                    mode,
                    kind: "follow_up"
                  })
                }
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-medium text-slate-100 transition hover:border-accent/40 hover:bg-accent/10"
              >
                {item}
              </button>
            ))}
          </div>
        </article>
      ) : null}
    </div>
  );
}
