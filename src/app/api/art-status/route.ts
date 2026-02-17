import { NextRequest, NextResponse } from "next/server";

const KIE_KEY = process.env.KIE_API_KEY || "";

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("taskId");
  if (!taskId) {
    return NextResponse.json({ error: "taskId required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.kie.ai/api/v1/flux/kontext/record-info?taskId=${taskId}`,
      { headers: { Authorization: `Bearer ${KIE_KEY}` } }
    );

    const data = await response.json();
    const record = data?.data;

    if (!record) {
      return NextResponse.json({ status: "pending" });
    }

    if (record.successFlag === 1 && record.response?.resultImageUrl) {
      return NextResponse.json({
        status: "complete",
        imageUrl: record.response.resultImageUrl,
      });
    }

    if (record.successFlag === 2 || record.successFlag === 3) {
      return NextResponse.json({ status: "failed" });
    }

    return NextResponse.json({ status: "pending" });
  } catch {
    return NextResponse.json({ status: "pending" });
  }
}
