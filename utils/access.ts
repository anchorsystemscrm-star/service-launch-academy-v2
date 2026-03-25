import { SubscriptionTier } from "@/types/business";
import { CoachMode } from "@/lib/ai/coachTypes";

export interface AccessProfile {
  selectedBusinessId: string | null;
  tier: SubscriptionTier;
}

export interface NavItem {
  href: string;
  label: string;
  minTier: SubscriptionTier;
  description: string;
}

const tierRank: Record<SubscriptionTier, number> = {
  preview: 0,
  core: 1,
  pro: 2,
  elite: 3
};

export function normalizeSubscriptionTier(value: unknown): SubscriptionTier {
  if (value === "core" || value === "pro" || value === "elite" || value === "preview") {
    return value;
  }

  return "preview";
}

export const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    minTier: "preview",
    description: "Browse, compare, and shortlist service opportunities."
  },
  {
    href: "/blueprint",
    label: "Blueprint",
    minTier: "core",
    description: "Full operating guidance, pricing, tools, and execution plan."
  },
  {
    href: "/benchmarks",
    label: "Benchmarks",
    minTier: "core",
    description: "Track KPI targets and weekly operating cadence."
  },
  {
    href: "/ai-coach",
    label: "AI Coach",
    minTier: "pro",
    description: "Guided prompt starters and tactical help."
  }
];

export const tierLabels: Record<SubscriptionTier, string> = {
  preview: "Preview",
  core: "Core",
  pro: "Pro",
  elite: "Elite"
};

export const tierDescriptions: Record<SubscriptionTier, string> = {
  preview: "Explore service categories and compare launch opportunities before upgrading.",
  core: "Unlock the full launch blueprint, setup guidance, tools, pricing, operations, licensing, and insurance content.",
  pro: "Everything in Core plus AI Coach, guided prompts, and execution support.",
  elite: "Everything in Pro plus advanced systems and Anchor Systems integration previews."
};

export function hasTierAccess(currentTier: SubscriptionTier, requiredTier: SubscriptionTier) {
  return tierRank[currentTier] >= tierRank[requiredTier];
}

export function getRequiredTierForPath(pathname: string): SubscriptionTier {
  if (pathname.startsWith("/ai-coach")) {
    return "pro";
  }

  if (pathname.startsWith("/benchmarks")) {
    return "core";
  }

  if (pathname.startsWith("/blueprint")) {
    return "core";
  }

  return "preview";
}

export function canAccessPath(pathname: string, profile: AccessProfile) {
  if (pathname === "/login") {
    return true;
  }

  return true;
}

export function getFirstAvailableAppPath(profile: AccessProfile) {
  return "/dashboard";
}

export function getLockedCopy(requiredTier: SubscriptionTier) {
  return `${tierLabels[requiredTier]} tier required`;
}

export function getPricingHref(plan?: SubscriptionTier) {
  return plan ? `/pricing?plan=${plan}` : "/pricing";
}

export function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function getCheckoutHref(plan: SubscriptionTier) {
  if (plan === "preview") {
    return "/dashboard";
  }

  return `/api/checkout?plan=${plan}`;
}

export function getNextUpgradeTier(currentTier: SubscriptionTier): SubscriptionTier | null {
  if (currentTier === "preview") {
    return "core";
  }

  if (currentTier === "core") {
    return "pro";
  }

  if (currentTier === "pro") {
    return "elite";
  }

  return null;
}

export function getProgressUpgradePrompt(currentTier: SubscriptionTier, progressPercentage: number) {
  const targetTier = getNextUpgradeTier(currentTier);

  if (!targetTier || progressPercentage < 30) {
    return null;
  }

  if (progressPercentage >= 80) {
    return {
      targetTier,
      eyebrow: "High-intent upgrade",
      title: `You are close. ${tierLabels[targetTier]} helps you turn progress into execution speed.`,
      body:
        currentTier === "core"
          ? "Unlock AI guidance and tactical prompts so the final stretch moves faster and with less hesitation."
          : "Unlock advanced systems and Anchor setup so this blueprint turns into a tighter operating machine."
    };
  }

  if (progressPercentage >= 60) {
    return {
      targetTier,
      eyebrow: "Upgrade available",
      title: `You are halfway through. ${tierLabels[targetTier]} adds the next layer of execution support.`,
      body:
        currentTier === "core"
          ? "Bring AI guidance into pricing, objections, marketing, and operations while your momentum is high."
          : "Add advanced systems and operator-grade setup guidance to tighten what happens after the blueprint."
    };
  }

  return {
    targetTier,
    eyebrow: "Momentum is building",
    title: `You are making real progress. ${tierLabels[targetTier]} can help you move faster.`,
    body:
      currentTier === "core"
        ? "Unlock AI guidance to sharpen decisions while you are still building the operating rhythm."
        : "Unlock Elite systems and Anchor setup when you are ready to systemize what is starting to work."
  };
}

export function getUpgradeMessage(requiredTier: SubscriptionTier) {
  if (requiredTier === "core") {
    return "Upgrade to Core to unlock the full launch operating system.";
  }

  if (requiredTier === "pro") {
    return "Upgrade to Pro to unlock guided AI execution support.";
  }

  return "Upgrade to Elite to unlock advanced systems and Anchor integration previews.";
}

export function getRequiredTierForCoachMode(mode: CoachMode): SubscriptionTier {
  if (mode === "marketing" || mode === "sop" || mode === "image") {
    return "elite";
  }

  return "pro";
}

export function canUseCoachMode(currentTier: SubscriptionTier, mode: CoachMode) {
  return hasTierAccess(currentTier, getRequiredTierForCoachMode(mode));
}

export function getCoachSaveLimit(currentTier: SubscriptionTier) {
  if (currentTier === "elite") {
    return 50;
  }

  if (currentTier === "pro") {
    return 12;
  }

  return 0;
}

export function canSaveCoachOutput(currentTier: SubscriptionTier, mode: CoachMode) {
  if (!hasTierAccess(currentTier, "pro")) {
    return false;
  }

  if (mode === "image") {
    return hasTierAccess(currentTier, "elite");
  }

  return true;
}
