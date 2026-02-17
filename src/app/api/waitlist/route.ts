import { NextRequest, NextResponse } from "next/server";

const SHEET_ID = "1h8ThYbkRvSagZatk9H99CGkryEz9RvoistyjEabAuZM";
const API_BASE = "https://google-api-proxy-production.up.railway.app";
const API_KEY = "123123123";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    await fetch(
      `${API_BASE}/sheets/${SHEET_ID}/values/Waitlist!A:C/append?account=levity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          values: [[email.trim(), timestamp, "website"]],
        }),
      }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
