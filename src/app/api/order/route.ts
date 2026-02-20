import { NextRequest, NextResponse } from "next/server";
import { storeOrder } from "../../../lib/order-store";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { name, analysis, palette, artUrl, imageryStyle } = await req.json();

    if (!name || !analysis || !palette) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = crypto.randomUUID();
    storeOrder(orderId, { name, analysis, palette, artUrl, imageryStyle });

    return NextResponse.json({ orderId });
  } catch (err: unknown) {
    console.error("Order store error:", err);
    return NextResponse.json({ error: "Failed to store order" }, { status: 500 });
  }
}
