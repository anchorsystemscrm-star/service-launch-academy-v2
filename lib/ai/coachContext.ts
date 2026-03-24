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
    context?.phase ? `Current phase: ${context.phase}` : null,
    context?.entryOffer ? `Entry offer: ${context.entryOffer}` : null,
    context?.serviceArea ? `Service area: ${context.serviceArea}` : null,
    context?.priceFloor ? `Price floor: ${context.priceFloor}` : null,
    context?.phone ? `Phone: ${context.phone}` : null,
    context?.bookingMethod ? `Booking method: ${context.bookingMethod}` : null,
    context?.paymentMethod ? `Payment method: ${context.paymentMethod}` : null,
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
