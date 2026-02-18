import { NextRequest, NextResponse } from "next/server";

const KIE_KEY = process.env.KIE_API_KEY || "";

// Visual Direction: HOW the image is rendered (not what it depicts)
const STYLE_RENDERS: Record<string, string> = {
  watercolour: "rendered as a delicate watercolour painting with soft washes of colour, bleeding edges, translucent layers, and the organic imperfection of pigment on wet paper",
  "oil-painting": "rendered as a rich oil painting with visible textured brushstrokes, deep colour saturation, classical fine art technique, and the luminous depth of layered oils",
  "line-art": "rendered as detailed fine line art illustration, precise pen-and-ink linework, crosshatching, reminiscent of vintage engraving or etching prints",
  geometric: "rendered with sacred geometry, tessellated patterns, mathematical precision, clean lines, golden ratio composition, and crystalline structure",
  minimal: "rendered in ultra-minimalist style with a single powerful focal element, vast negative space, refined simplicity, and restrained elegance",
  botanical: "rendered as a detailed botanical illustration in the tradition of scientific art, with precise organic forms, leaves, petals, and living natural elements",
  impressionist: "rendered in impressionist style with soft dappled light, loose visible brushwork, atmospheric colour, and the dreamy quality of a Monet or Renoir painting",
  "art-nouveau": "rendered in Art Nouveau style with flowing organic curves, ornamental decorative elements, sinuous lines, and the elegant beauty of Alphonse Mucha",
  "ink-wash": "rendered as an ink wash painting in the tradition of East Asian brush art (sumi-e), with bold expressive brushstrokes, gradients of black ink, and meditative negative space",
  "stained-glass": "rendered in the style of stained glass art with bold dark outlines, jewel-toned colour segments, luminous translucent light, and cathedral window grandeur",
};

// Palette influences the colour world
const PALETTE_WORLDS: Record<string, string> = {
  "warm-gold": "in a warm world of amber, gold, and honeyed light",
  "cool-midnight": "in a cool nocturnal world of deep blues, silvers, and moonlight",
  "earth-tones": "in rich earthy tones of umber, sienna, warm browns, and aged parchment",
  "ocean": "in deep oceanic teals, turquoise, and the shimmer of water",
  "botanical": "in lush greens, sage, moss, and forest tones",
  "monochrome": "in dramatic black, white, and silver with no colour",
  "rose": "in soft pinks, dusty rose, blush, and gentle warmth",
  "lavender": "in dreamy purples, soft violet, and twilight hues",
  "sunset": "in warm sunset oranges, burnt sienna, and the glow of golden hour",
  "slate": "in cool greys, steel blue, and the quiet tone of stone",
  "copper": "in rich copper, warm bronze, and burnished metallic warmth",
  "arctic": "in icy blues, frost white, and the crystalline cold of winter",
};

export async function POST(req: NextRequest) {
  try {
    const { name, meaning, palette, imagery, etymology, morphology, emotionalRegister } = await req.json();

    if (!name || !meaning || !imagery) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const styleRender = STYLE_RENDERS[imagery] || STYLE_RENDERS.abstract;
    const paletteWorld = PALETTE_WORLDS[palette] || PALETTE_WORLDS["warm-gold"];

    const isDark = ["cool-midnight", "ocean", "monochrome", "lavender", "slate", "arctic"].includes(palette);
    const bgInstruction = isDark
      ? "The background must be very dark, near-black. All elements fade into darkness at the edges."
      : "The background must be pure white or very light cream. All elements fade into white at the edges.";

    // Build a contextual prompt from the full analysis
    const etymologyContext = etymology?.origin
      ? `The name comes from ${etymology.origin} meaning "${etymology.rootMeaning || meaning}".`
      : "";
    const morphologyContext = morphology?.root
      ? `Its root "${morphology.root}" carries the essence of ${morphology.rootMeaning || meaning}.`
      : "";
    const emotionalContext = emotionalRegister?.weather
      ? `It evokes the feeling of ${emotionalRegister.weather.toLowerCase()}.`
      : "";

    const prompt = `Create a breathtaking piece of art for the name "${name}".

This name means "${meaning}". ${etymologyContext} ${morphologyContext} ${emotionalContext}

The artwork must visually represent what "${name}" means and feels like. Not the letters of the name, but its soul and essence. What would "${meaning}" look like if you could paint it?

${styleRender}, ${paletteWorld}.

Composition: A single powerful central motif in the upper-centre of the frame. The imagery naturally dissolves and fades toward the edges, especially the bottom half. Museum-quality fine art print. Emotional, evocative, deeply meaningful.

${bgInstruction}

CRITICAL: Absolutely NO text, NO words, NO letters, NO numbers, NO typography of any kind anywhere in the image.`;

    // Use FLUX Kontext Pro (fast, reliable)
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
    console.log("KIE FLUX response code:", data?.code, "taskId:", data?.data?.taskId);
    const taskId = data?.data?.taskId;

    if (!taskId) {
      console.error("No taskId in response:", data);
      return NextResponse.json({ error: "Generation failed", detail: data?.msg }, { status: 500 });
    }

    return NextResponse.json({ taskId, provider: "flux" });
  } catch (error) {
    console.error("Art generation error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
