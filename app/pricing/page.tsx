import { cookies } from "next/headers";

import { PricingPageContent } from "@/components/PricingPageContent";
import { normalizeSubscriptionTier } from "@/utils/access";
import { SubscriptionTier } from "@/types/business";

interface PricingPageProps {
  searchParams?: {
    plan?: string | string[];
  };
}

export default function PricingPage({ searchParams }: PricingPageProps) {
  const rawPlan = Array.isArray(searchParams?.plan) ? searchParams?.plan[0] : searchParams?.plan;
  const focusedPlan = normalizeSubscriptionTier(rawPlan);
  const tierCookie = cookies().get("sla-tier")?.value;
  const currentTier: SubscriptionTier = normalizeSubscriptionTier(tierCookie);

  return <PricingPageContent focusedPlan={focusedPlan} currentTier={currentTier} />;
}
