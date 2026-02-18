import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia" as Stripe.LatestApiVersion,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { name, analysis } = await req.json();

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "Etyma Digital Print",
              description: `Custom name analysis poster for "${name}"`,
            },
            unit_amount: 2500, // £25
          },
          quantity: 1,
        },
      ],
      metadata: {
        customerName: name,
        analysis: JSON.stringify(analysis).slice(0, 500), // Stripe metadata max 500 chars per value
      },
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/create`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
