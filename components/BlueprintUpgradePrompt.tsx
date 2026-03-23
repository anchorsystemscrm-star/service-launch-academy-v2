import { SubscriptionTier } from "@/types/business";
import { getCheckoutHref, getProgressUpgradePrompt, tierLabels } from "@/utils/access";

interface BlueprintUpgradePromptProps {
  tier: SubscriptionTier;
  progressPercentage: number;
}

export function BlueprintUpgradePrompt({ tier, progressPercentage }: BlueprintUpgradePromptProps) {
  const prompt = getProgressUpgradePrompt(tier, progressPercentage);

  if (!prompt) {
    return null;
  }

  return (
    <section className="rounded-[26px] border border-white/10 bg-white/5 p-5 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accentSecondary">{prompt.eyebrow}</p>
      <h3 className="mt-3 text-lg font-semibold text-white">{prompt.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-200">{prompt.body}</p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={getCheckoutHref(prompt.targetTier)}
          className="inline-flex items-center justify-center rounded-[20px] border border-accent/50 bg-accent/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-accent/80 hover:bg-accent/20"
        >
          Upgrade to {tierLabels[prompt.targetTier]}
        </a>
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {progressPercentage}% complete
        </span>
      </div>
    </section>
  );
}
