import { CoachContext, CoachConversationMessageInput } from "@/lib/ai/coachTypes";

function formatLocation(context: CoachContext) {
  const locationParts = [context.city, context.state, context.zip].filter(Boolean);
  return locationParts.length ? locationParts.join(", ") : "";
}

export function buildCoachContextBlock(context?: CoachContext, summary?: string) {
  if (!context && !summary) {
    return "";
  }

  const lines = [
    context?.businessName ? `Business name: ${context.businessName}` : null,
    context?.businessType ? `Business type: ${context.businessType}` : null,
    context?.businessDescription ? `Business description: ${context.businessDescription}` : null,
    context?.serviceModel ? `Service model: ${context.serviceModel}` : null,
    context?.phase ? `Current phase: ${context.phase}` : null,
    context?.entryOffer ? `Entry offer: ${context.entryOffer}` : null,
    context?.secondaryOffer ? `Secondary offer: ${context.secondaryOffer}` : null,
    context?.keyInclusions ? `Key inclusions:\n${context.keyInclusions}` : null,
    context?.serviceArea ? `Service area: ${context.serviceArea}` : null,
    context?.targetCustomer ? `Target customer: ${context.targetCustomer}` : null,
    context?.priceFloor ? `Price floor: ${context.priceFloor}` : null,
    context?.pricingNotes ? `Pricing notes:\n${context.pricingNotes}` : null,
    context?.packageIdeas ? `Package ideas:\n${context.packageIdeas}` : null,
    context?.marketNotes ? `Market notes:\n${context.marketNotes}` : null,
    context?.phone ? `Phone: ${context.phone}` : null,
    context?.bookingMethod ? `Booking method: ${context.bookingMethod}` : null,
    context?.paymentMethod ? `Payment method: ${context.paymentMethod}` : null,
    context?.leadSourcePlan ? `Lead source plan:\n${context.leadSourcePlan}` : null,
    context?.salesProcessNotes ? `Sales process notes:\n${context.salesProcessNotes}` : null,
    context?.objectionHandlingNotes ? `Objection handling notes:\n${context.objectionHandlingNotes}` : null,
    context?.automationNotes ? `Automation notes:\n${context.automationNotes}` : null,
    context?.focusThisWeek ? `Focus this week: ${context.focusThisWeek}` : null,
    context?.focusSupportNote ? `Focus support note:\n${context.focusSupportNote}` : null,
    context?.toneMessagingNotes ? `Messaging notes:\n${context.toneMessagingNotes}` : null,
    context?.goal30Day ? `30-day goal: ${context.goal30Day}` : null,
    context?.goal90Day ? `90-day goal: ${context.goal90Day}` : null,
    context?.revenueGoal ? `Revenue goal: ${context.revenueGoal}` : null,
    context?.milestoneNotes ? `Milestone notes:\n${context.milestoneNotes}` : null,
    context?.benchmarkSummary ? `Benchmark summary: ${context.benchmarkSummary}` : null,
    typeof context?.leadCount === "number" ? `Pipeline leads: ${context.leadCount}` : null,
    typeof context?.quotedCount === "number" ? `Pipeline quoted: ${context.quotedCount}` : null,
    typeof context?.bookedCount === "number" ? `Pipeline booked: ${context.bookedCount}` : null,
    typeof context?.completedCount === "number" ? `Pipeline completed: ${context.completedCount}` : null,
    context?.budgetRange ? `Budget range: ${context.budgetRange}` : null,
    formatLocation(context ?? {}) ? `Market: ${formatLocation(context ?? {})}` : null,
    context?.accessTier ? `Access tier: ${context.accessTier}` : null,
    context?.selectedCategory ? `Requested category: ${context.selectedCategory}` : null,
    context?.completedTasks?.length
      ? `Completed blueprint tasks: ${context.completedTasks.slice(0, 8).join(" | ")}`
      : null,
    summary ? `Working memory:\n${summary}` : null
  ].filter(Boolean);

  if (!lines.length) {
    return "";
  }

  return `Business context:\n${lines.join("\n")}`;
}

export function buildConversationTranscript(
  recentMessages: CoachConversationMessageInput[] = [],
  latestMessage: string
) {
  const transcript = recentMessages
    .filter((item) => item.content.trim().length > 0)
    .map((item) => `${item.role === "user" ? "User" : "Coach"}: ${item.content.trim()}`);

  transcript.push(`User: ${latestMessage.trim()}`);

  return transcript.join("\n\n");
}
