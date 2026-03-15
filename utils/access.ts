import { SubscriptionTier } from "@/types/business";

export interface AccessProfile {
  onboardingComplete: boolean;
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
    label: "Explore Services",
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

export function isSetupComplete(profile: AccessProfile) {
  return profile.onboardingComplete && Boolean(profile.selectedBusinessId);
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

  if (pathname.startsWith("/start")) {
    return true;
  }

  return isSetupComplete(profile);
}

export function getFirstAvailableAppPath(profile: AccessProfile) {
  if (!isSetupComplete(profile)) {
    return "/start";
  }

  return "/dashboard";
}

export function getLockedCopy(requiredTier: SubscriptionTier) {
  return `${tierLabels[requiredTier]} tier required`;
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
