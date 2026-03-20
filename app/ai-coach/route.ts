import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

type CoachMessage = {
  role: "user" | "assistant";
  text: string;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      message,
      business,
      currentPhase,
      progress,
      tier,
      history,
    }: {
      message?: string;
      business?: {
        id?: string;
        name?: string;
        summary?: string;
        startupCost?: string;
        ninetyDayRevenue?: string;
        oneYearRevenue?: string;
        marginRange?: string;
        difficulty?: string;
        firstOffer?: string;
      };
      currentPhase?: {
        title?: string;
        tasks?: string[];
      };
      progress?: {
        completedWeeks?: number[];
      };
      tier?: string;
      history?: CoachMessage[];
    } = body ?? {};

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY." },
        { status: 500 }
      );
    }

    if (!message || !business) {
      return NextResponse.json(
        { error: "Missing required AI coach payload." },
        { status: 400 }
      );
    }

    const completedWeeks = Array.isArray(progress?.completedWeeks)
      ? progress.completedWeeks
      : [];

    const recentHistory = Array.isArray(history)
      ? history.slice(-8).map((item) => ({
          role: item.role,
          content: item.text,
        }))
      : [];

    const systemPrompt = `
You are the Service Launch Academy AI Coach for Anchor Systems.

Your role:
- Help users launch and grow real service businesses.
- Act like an operator and execution coach, not a generic chatbot.
- Give direct, tactical, practical answers.
- Prioritize revenue, customer acquisition, pricing, fulfillment, systems, follow-up, and operational clarity.
- Avoid vague motivational fluff.
- If the user asks for a script, write the exact script.
- If the user asks for pricing, give a real number or range with reasoning.
- If the user asks for a process, give step-by-step instructions.
- If the user asks something broad, turn it into the most useful concrete answer.
- Default to concise but useful responses.
- Use the user's selected business and current phase as the main context.
- If a question is unrelated to the business, still answer helpfully, but keep the tone practical.

Response style:
- Clear
- Tactical
- Direct
- Sales-aware
- Execution-first

Preferred structure when useful:
1. What to do
2. Why
3. Exact example
`.trim();

    const contextBlock = `
Business Context:
- Selected business: ${business.name ?? "Unknown"}
- Access tier: ${tier ?? "unknown"}
- Current phase: ${currentPhase?.title ?? "Unknown"}
- Completed weeks: ${completedWeeks.length ? completedWeeks.join(", ") : "None"}

Business Details:
- Summary: ${business.summary ?? "N/A"}
- Startup cost: ${business.startupCost ?? "N/A"}
- 90-day revenue: ${business.ninetyDayRevenue ?? "N/A"}
- 1-year revenue: ${business.oneYearRevenue ?? "N/A"}
- Margin range: ${business.marginRange ?? "N/A"}
- Difficulty: ${business.difficulty ?? "N/A"}
- Recommended first offer: ${business.firstOffer ?? "N/A"}

Current Phase Tasks:
${(currentPhase?.tasks ?? []).map((task, index) => `${index + 1}. ${task}`).join("\n") || "None provided"}

Instruction:
Answer in the context of this business and current phase unless the user clearly asks something broader.
`.trim();

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      temperature: 0.5,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: contextBlock },
        ...recentHistory,
        { role: "user", content: message },
      ],
    });

    const text =
      response.choices[0]?.message?.content?.trim() ||
      "I couldn't generate a useful answer. Please try again.";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI coach route error:", error);
    return NextResponse.json(
      { error: "AI coach request failed." },
      { status: 500 }
    );
  }
}
