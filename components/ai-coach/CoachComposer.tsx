"use client";

import { FormEvent, useState } from "react";

import { CoachMode } from "@/lib/ai/coachTypes";

interface CoachQuickAction {
  label: string;
  mode: CoachMode;
  prompt: string;
  locked?: boolean;
}

interface CoachComposerProps {
  loading: boolean;
  onSendMessage: (message: string, requestedMode?: CoachMode) => void;
  quickActions: CoachQuickAction[];
}

export function CoachComposer({ loading, onSendMessage, quickActions }: CoachComposerProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();

    if (!trimmed || loading) {
      return;
    }

    onSendMessage(trimmed);
    setMessage("");
  }

  return (
    <section className="panel-surface p-6 sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Prompt Builder</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">Ask for a real output, not a generic answer.</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
        Use a quick action to generate a structured asset, or type a custom request about pricing, scripts, fulfillment, local growth, or launch sequencing.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            disabled={loading || action.locked}
            onClick={() => onSendMessage(action.prompt, action.mode)}
            className={`rounded-[22px] border px-4 py-4 text-left transition ${
              action.locked
                ? "cursor-not-allowed border-white/10 bg-black/20 text-muted opacity-70"
                : "border-white/10 bg-black/20 text-white hover:border-accent/40 hover:bg-accent/10"
            }`}
          >
            <p className="text-sm font-semibold">{action.label}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted">
              {action.locked ? "Elite required" : action.mode}
            </p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-3">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Example: Build a 3-tier pricing plan for my starter offer and include upsells."
          rows={5}
          className="rounded-[24px] border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none transition focus:border-accent/70 focus:ring-2 focus:ring-accent/20"
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {loading ? "Generating coach output..." : "Context-aware outputs powered by your active blueprint"}
          </p>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Working..." : "Run Coach"}
          </button>
        </div>
      </form>
    </section>
  );
}
