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
    const paletteTones: Record<string, string> = {
      "warm-gold": "warm amber and gold tones",
      "cool-midnight": "cool blue and silver tones",
      "earth-tones": "warm earthy brown and amber tones",
      "ocean": "deep teal and turquoise tones",
      "botanical": "rich green and sage tones",
      "monochrome": "black white and silver monochrome",
      "rose": "soft pink and dusty rose tones",
      "lavender": "gentle purple and violet tones",
      "sunset": "warm orange and burnt sienna tones",
      "slate": "cool grey and steel blue tones",
      "copper": "rich copper and warm bronze tones",
      "arctic": "icy blue and frost white tones",
    };
    const paletteTone = paletteTones[palette] || "warm amber and gold tones";

    const isDark = ["cool-midnight", "ocean", "monochrome", "lavender", "slate", "arctic"].includes(palette);
    const bgDesc = isDark ? "on a very dark, near-black background, edges fading into pure darkness" : "on a pure white background, edges fading into pure white";
    const prompt = `Create a stunning piece of art that symbolises "${meaning}". The artwork should be a single powerful central motif that represents the essence and spirit of ${meaning}. Style: ${styleDesc}. Colour palette: ${paletteTone}. The composition should have the main subject prominent in the centre to upper area, with details naturally dissolving and fading toward the edges. Think vintage book illustration, editorial art, or museum-quality fine art print. Rich, evocative, emotional imagery. ${bgDesc}. The edges should fade completely into the background colour. Absolutely no text, no words, no letters, no numbers, no typography of any kind.`;

    // Use Nano Banana Pro (Gemini 3.0 Pro) via KIE jobs API
    const response = await fetch("https://api.kie.ai/api/v1/jobs/createTask", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${KIE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "nano-banana-pro",
        input: {
          prompt,
          aspect_ratio: "2:3",
          resolution: "1K",
          output_format: "png",
        },
      }),
    });

    const data = await response.json();
    console.log("KIE create task response:", JSON.stringify(data));
    const taskId = data?.data?.taskId;

    if (!taskId) {
      console.error("No taskId in response:", data);
      return NextResponse.json({ error: "Generation failed", detail: data?.msg }, { status: 500 });
    }

    return NextResponse.json({ taskId });
  } catch (error) {
    console.error("Art generation error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
