import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, business, phase } = body;

    if (!message) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const systemPrompt = `
You are a tactical business coach helping someone launch a ${business || "service business"}.

Current phase: ${phase || "early stage"}.

Give clear, direct, actionable advice.
No fluff. No long essays.
Focus on execution, pricing, marketing, operations, or sales.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    return NextResponse.json({
      reply: response.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}
