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
}

const tierRank: Record<SubscriptionTier, number> = {
  preview: 0,
  core: 1,
  pro: 2,
  elite: 3
};

export const navItems: NavItem[] = [
  { href: "/dashboard", label: "Businesses", minTier: "preview" },
  { href: "/blueprint", label: "My Blueprint", minTier: "preview" },
  { href: "/benchmarks", label: "Benchmarks", minTier: "core" },
  { href: "/ai-coach", label: "AI Coach", minTier: "pro" }
];

export const tierLabels: Record<SubscriptionTier, string> = {
  preview: "Preview",
  core: "Core",
  pro: "Pro",
  elite: "Elite"
};

export function hasTierAccess(currentTier: SubscriptionTier, requiredTier: SubscriptionTier) {
  return tierRank[currentTier] >= tierRank[requiredTier];
}

export function isSetupComplete(profile: AccessProfile) {
  return profile.onboardingComplete && Boolean(profile.selectedBusinessId);
}

export function getRouteRequirement(pathname: string): SubscriptionTier {
  if (pathname.startsWith("/benchmarks")) {
    return "core";
  }

  if (pathname.startsWith("/ai-coach")) {
    return "pro";
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

  if (!isSetupComplete(profile)) {
    return false;
  }

  return hasTierAccess(profile.tier, getRouteRequirement(pathname));
}

export function getFirstAvailableAppPath(profile: AccessProfile) {
  if (!isSetupComplete(profile)) {
    return "/start";
  }

  if (hasTierAccess(profile.tier, "preview")) {
    return "/dashboard";
  }

  return "/start";
}

export function getLockedCopy(requiredTier: SubscriptionTier) {
  return `${tierLabels[requiredTier]} tier required`;
}
