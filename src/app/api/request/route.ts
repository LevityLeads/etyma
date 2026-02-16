import { NextRequest, NextResponse } from "next/server";

const SHEET_ID = "1hbKOF1nSaJbA_dV2e90JPeR9lrMBHQx29bbBJQ8vV8Q";
const API_BASE = "https://google-api-proxy-production.up.railway.app";
const API_KEY = process.env.GOOGLE_API_KEY || "123123123";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const date = new Date().toISOString();
    const res = await fetch(
      `${API_BASE}/sheets/${SHEET_ID}/values/Sheet1!A:D/append?account=levity&key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          values: [[email || "", name.trim(), "custom_request", date]],
        }),
      }
    );

    if (!res.ok) {
      console.error("Sheet append failed:", await res.text());
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Request error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
