"use client";

import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { WorkspaceSelectionEmptyState } from "@/components/WorkspaceSelectionEmptyState";
import { BusinessWorkspace } from "@/components/BusinessWorkspace";
import { SubscriptionTier } from "@/types/business";
import { hasTierAccess } from "@/utils/access";
import { defaultKpiData, getBusinessById } from "@/utils/benchmarks";
import { useAccessProfile, useBlueprintProgress, useBusinessPanel, useKpiState } from "@/utils/storage";

function BusinessWorkspacePage({ businessId, tier }: { businessId: string; tier: SubscriptionTier }) {
  const business = getBusinessById(businessId);

  if (!business) {
    return null;
  }

  const { progress, taskProgress } = useBlueprintProgress(business.id, business.executionPlan);
  const { kpis } = useKpiState(business.id, defaultKpiData);
  const { panel, updatedAt, setField } = useBusinessPanel(business, progress, taskProgress, kpis);

  return (
    <BusinessWorkspace
      panel={panel}
      currentTier={tier}
      updatedAt={updatedAt}
      onFieldChange={setField}
    />
  );
}

export default function BusinessPage() {
  const { profile } = useAccessProfile();
  const hasCoreAccess = hasTierAccess(profile.tier, "core");
  const business = getBusinessById(profile.selectedBusinessId);

  if (!hasCoreAccess) {
    return (
      <div className="mx-auto max-w-5xl animate-fade-up">
        <LockedFeatureCard
          title="Business workspace unlocks with Core"
          requiredTier="core"
          description="Preview is for exploring service opportunities. Core unlocks the editable business workspace so your offer, notes, pricing, and operating decisions live in one place."
          bullets={[
            "A dedicated business workspace for offers, pricing, market notes, and setup",
            "Editable operating context that stays aligned with Blueprint and AI Coach",
            "A cleaner planning hub without turning the app into a CRM"
          ]}
        />
      </div>
    );
  }

  if (!business) {
    return (
      <WorkspaceSelectionEmptyState
        eyebrow="Business"
        title="Choose a business before opening the workspace"
        description="Your Business workspace is now fully account-scoped. Pick a service from Dashboard first so this page loads your own offer, pricing, setup, and notes instead of shared fallback data."
      />
    );
  }

  return <BusinessWorkspacePage businessId={business.id} tier={profile.tier} />;
}
