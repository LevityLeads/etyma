import { NextRequest, NextResponse } from "next/server";

const SHEET_ID = "1h8ThYbkRvSagZatk9H99CGkryEz9RvoistyjEabAuZM";
const API_BASE = "https://google-api-proxy-production.up.railway.app";
const API_KEY = "123123123";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }

    const timestamp = new Date().toISOString();

    await fetch(
      `${API_BASE}/sheets/${SHEET_ID}/values/Name%20Requests!A:D/append?account=levity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          values: [[name.trim(), email?.trim() || "", timestamp, "website"]],
        }),
      }
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
