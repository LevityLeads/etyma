import { NextRequest, NextResponse } from "next/server";

const KIE_KEY = process.env.KIE_API_KEY || "";

export async function GET(req: NextRequest) {
  const taskId = req.nextUrl.searchParams.get("taskId");
  if (!taskId) {
    return NextResponse.json({ error: "taskId required" }, { status: 400 });
  }

  try {
    // Try FLUX endpoint first (for flux-kontext tasks)
    const fluxRes = await fetch(
      `https://api.kie.ai/api/v1/flux/kontext/record-info?taskId=${taskId}`,
      { headers: { Authorization: `Bearer ${KIE_KEY}` } }
    );
    const fluxData = await fluxRes.json();
    const record = fluxData?.data;

    if (record) {
      if (record.successFlag === 1 && record.response?.resultImageUrl) {
        return NextResponse.json({
          status: "complete",
          imageUrl: record.response.resultImageUrl,
        });
      }
      if (record.successFlag === 2 || record.successFlag === 3) {
        return NextResponse.json({ status: "failed" });
      }
    }

    // Fallback: try unified jobs endpoint (for nano-banana-pro tasks)
    const jobsRes = await fetch(
      `https://api.kie.ai/api/v1/jobs/recordInfo?taskId=${taskId}`,
      { headers: { Authorization: `Bearer ${KIE_KEY}` } }
    );
    const jobsData = await jobsRes.json();
    const jobRecord = jobsData?.data;

    if (jobRecord) {
      if (jobRecord.state === "success" && jobRecord.resultJson) {
        try {
          const result = typeof jobRecord.resultJson === "string" ? JSON.parse(jobRecord.resultJson) : jobRecord.resultJson;
          const imageUrl = result?.resultUrls?.[0] || result?.output?.[0];
          if (imageUrl) {
            return NextResponse.json({ status: "complete", imageUrl });
          }
        } catch {
          console.error("Failed to parse resultJson:", jobRecord.resultJson);
        }
      }
      if (jobRecord.state === "fail") {
        return NextResponse.json({ status: "failed", error: jobRecord.failMsg });
      }
    }

    return NextResponse.json({ status: "pending" });
  } catch {
    return NextResponse.json({ status: "pending" });
  }
}
