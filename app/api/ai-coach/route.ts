import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, business, phase } = body;

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing in Vercel environment variables." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are a tactical business coach helping someone launch a ${business?.name || business || "service business"}.

Current phase: ${phase?.title || phase || "early stage"}.

Give clear, direct, actionable advice.
No fluff. No long essays.
Focus on execution, pricing, marketing, operations, or sales.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content || "No response returned.",
    });
  } catch (err) {
    console.error("AI coach route error:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Unknown AI request error";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
