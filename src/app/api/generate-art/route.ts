import { NextRequest, NextResponse } from "next/server";

const KIE_KEY = process.env.KIE_API_KEY || "";

const STYLE_PROMPTS: Record<string, string> = {
  abstract: "abstract flowing forms, expressive brushstrokes, fluid organic shapes",
  botanical: "botanical illustration, detailed leaves and flowers, organic nature art",
  celestial: "cosmic stars and nebulae, celestial bodies, deep space wonder",
  geometric: "sacred geometry, clean precise lines, mathematical patterns, golden ratio",
  minimalist: "ultra minimalist, single focal element, negative space, refined simplicity",
};

export async function POST(req: NextRequest) {
  try {
    const { name, meaning, palette, imagery } = await req.json();

    if (!name || !meaning || !imagery) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const styleDesc = STYLE_PROMPTS[imagery] || STYLE_PROMPTS.abstract;
    const paletteTone = palette === "cool-midnight" ? "cool blue and silver tones" :
      palette === "earth-tones" ? "warm earthy brown and amber tones" :
      palette === "ocean" ? "deep teal and turquoise tones" :
      palette === "botanical" ? "rich green and sage tones" :
      palette === "monochrome" ? "black white and silver monochrome" :
      "warm amber and gold tones";

    const isDark = ["cool-midnight", "ocean", "monochrome"].includes(palette);
    const bgDesc = isDark ? "on a very dark, near-black background, fading into darkness" : "on a pure white background, fading into white";
    const prompt = `Single centered illustration of a "${meaning}" symbol, ${styleDesc}, watercolor wash style, faded and vintage, ${paletteTone}, ${bgDesc}, vignette, the symbol should be a single elegant motif centered in the frame, soft edges, like a vintage stamp or watermark, artistic and refined, no text, no words, no letters, no typography`;

    const response = await fetch("https://api.kie.ai/api/v1/flux/kontext/generate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KIE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        aspectRatio: "3:4",
        outputFormat: "png",
        model: "flux-kontext-pro",
      }),
    });

    const data = await response.json();
    const taskId = data?.data?.taskId;

    if (!taskId) {
      return NextResponse.json({ error: "Generation failed" }, { status: 500 });
    }

    return NextResponse.json({ taskId });
  } catch (error) {
    console.error("Art generation error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
