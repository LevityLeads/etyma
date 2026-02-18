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
    const prompt = `A breathtaking fine art illustration that visually embodies the concept of "${meaning}". The imagery should evoke the feeling and spirit of ${meaning} through symbolic, metaphorical visual language. Style: ${styleDesc}. Colour palette: ${paletteTone}. The artwork should be centered in the frame with a single powerful focal motif, ${bgDesc}. Painterly, editorial quality, soft vignette edges, like a museum-quality print. The image should feel emotional and meaningful, not literal. Premium gallery art. Absolutely no text, no words, no letters, no numbers, no typography of any kind.`;

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
