import { NextRequest, NextResponse } from "next/server";

const KIE_KEY = process.env.KIE_API_KEY || "";

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("taskId");
  if (!taskId) {
    return NextResponse.json({ error: "taskId required" }, { status: 400 });
  }

  try {
    // Use the unified jobs status endpoint (works with Nano Banana Pro)
    const response = await fetch(
      `https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`,
      { headers: { Authorization: `Bearer ${KIE_KEY}` } }
    );

    const data = await response.json();
    const record = data?.data;

    if (!record) {
      return NextResponse.json({ status: "pending" });
    }

    // Nano Banana Pro uses state: "success" / "fail" / "waiting" / "processing"
    if (record.state === "success" && record.resultJson) {
      try {
        const result = typeof record.resultJson === "string" ? JSON.parse(record.resultJson) : record.resultJson;
        // Result format varies: could be {output: [url]} or {images: [{url}]} or direct URL
        const imageUrl = result?.resultUrls?.[0] || result?.output?.[0] || result?.images?.[0]?.url || result?.image_url || result?.url;
        if (imageUrl) {
          return NextResponse.json({ status: "complete", imageUrl });
        }
      } catch {
        console.error("Failed to parse resultJson:", record.resultJson);
      }
      return NextResponse.json({ status: "pending" });
    }

    if (record.state === "fail") {
      console.error("Art generation failed:", record.failMsg);
      return NextResponse.json({ status: "failed", error: record.failMsg });
    }

    // Also support legacy FLUX format as fallback
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
