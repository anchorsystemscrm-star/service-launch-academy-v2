import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-02-24.acacia",
});

const PRICE_IDS = {
  core: process.env.STRIPE_CORE_PRICE_ID,
  pro: process.env.STRIPE_PRO_PRICE_ID,
  elite: process.env.STRIPE_ELITE_PRICE_ID,
} as const;

type PlanKey = keyof typeof PRICE_IDS;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const plan = searchParams.get("plan") as PlanKey | null;

    if (!plan || !(plan in PRICE_IDS)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const priceId = PRICE_IDS[plan];

    if (!priceId) {
      return NextResponse.json({ error: `Missing Stripe price ID for ${plan}.` }, { status: 500 });
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      new URL(request.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/pricing?upgraded=${plan}&success=true`,
      cancel_url: `${appUrl}/pricing?plan=${plan}&canceled=true`,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Unable to create checkout session." }, { status: 500 });
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Checkout session failed." }, { status: 500 });
  }
}
