"use client";

import { useState } from "react";

interface BusinessFlowPreviewCardProps {
  businessName: string;
  coreOffer: string;
  leadSourcePlan: string;
  compact?: boolean;
}

export function BusinessFlowPreviewCard({
  businessName,
  coreOffer,
  leadSourcePlan,
  compact = false
}: BusinessFlowPreviewCardProps) {
  const [view, setView] = useState<"simulation" | null>(null);
  const trimmedOffer = coreOffer.trim() || "your core offer";
  const trimmedLeadSource = leadSourcePlan.trim().split("\n")[0] || "your first lead source";

  return (
    <section className={`w-full max-w-full overflow-hidden rounded-[24px] border border-white/10 bg-panel-gradient ${compact ? "p-5" : "p-6 sm:p-7"}`}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">Execution layer</p>
          <h3 className="mt-2 text-xl font-semibold text-white">
            Test how {businessName || "this business"} should run when a real lead comes in
          </h3>
          <p className="mt-3 break-words text-sm leading-6 text-muted">
            Once the offer, pricing, and lead flow are defined, the next step is seeing the business move from inquiry
            to booking without relying on memory.
          </p>
        </div>

        <div className="grid w-full max-w-full gap-3 sm:w-auto sm:min-w-[240px]">
          <button
            type="button"
            onClick={() => setView((current) => (current === "simulation" ? null : "simulation"))}
            className="w-full rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/70 hover:bg-accent/15"
          >
            Test Your Business
          </button>
          <a
            href="https://anchorsystemscrm.com"
            target="_blank"
            rel="noreferrer"
            className="anchor-inline-cta w-full rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white transition"
          >
            Run This Business on Anchor
          </a>
        </div>
      </div>

      {view === "simulation" ? (
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {[
            {
              title: "Lead comes in",
              text: `A prospect finds ${businessName || "the business"} through ${trimmedLeadSource.toLowerCase()}. The goal is a fast response and a clean intake.`
            },
            {
              title: "Offer gets framed",
              text: `They hear a clear version of ${trimmedOffer.toLowerCase()}, get the right pricing path, and know the next decision.`
            },
            {
              title: "Booking gets locked",
              text: "The job gets booked, reminders go out, the payment path is clear, and the follow-up does not depend on remembering later."
            }
          ].map((step) => (
            <div key={step.title} className="rounded-[20px] border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accentSecondary">{step.title}</p>
              <p className="mt-2 break-words text-sm leading-6 text-slate-100">{step.text}</p>
            </div>
          ))}
        </div>
      ) : null}

    </section>
  );
}
