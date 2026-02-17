import { NextRequest, NextResponse } from "next/server";
import { analyzeName } from "../../../lib/analyze-name";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();
    if (!name || typeof name !== "string" || name.length > 50) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    const analysis = await analyzeName(name.trim());
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze name" }, { status: 500 });
  }
}
