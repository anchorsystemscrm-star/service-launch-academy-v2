"use client";

import { LockedFeatureCard } from "@/components/LockedFeatureCard";
import { BusinessWorkspace } from "@/components/BusinessWorkspace";
import { hasTierAccess } from "@/utils/access";
import { defaultKpiData, getFallbackBusiness } from "@/utils/benchmarks";
import { useAccessProfile, useBlueprintProgress, useBusinessPanel, useKpiState } from "@/utils/storage";

export default function BusinessPage() {
  const { profile } = useAccessProfile();
  const business = getFallbackBusiness(profile.selectedBusinessId);
  const { progress, taskProgress } = useBlueprintProgress(business.id, business.executionPlan);
  const { kpis } = useKpiState(business.id, defaultKpiData);
  const { panel, updatedAt, setField } = useBusinessPanel(business, progress, taskProgress, kpis);
  const hasCoreAccess = hasTierAccess(profile.tier, "core");

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

  return (
    <BusinessWorkspace
      panel={panel}
      currentTier={profile.tier}
      updatedAt={updatedAt}
      onFieldChange={setField}
    />
  );
}
