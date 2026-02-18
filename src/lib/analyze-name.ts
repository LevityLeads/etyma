import OpenAI from "openai";
import type { NameAnalysis } from "../types/name";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeName(name: string): Promise<NameAnalysis> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You are a world-class linguist, etymologist, and phonetician. Given a name, produce a comprehensive linguistic analysis in JSON. Be accurate, scholarly, but also poetic and engaging. Never use em dashes. Use commas or full stops instead.

IMPORTANT: The "meaning" field should be the most positive, aspirational interpretation of the name's etymology. Every name has beauty in its roots. Frame meanings warmly. For example, "to follow" becomes "one who walks their own path", "battle" becomes "strength and resilience". Find the gift in every name.

Return this exact JSON structure:
{
  "name": "the name as given",
  "etymology": {
    "originLanguage": "primary language of origin",
    "rootWord": "the proto or root form (e.g. *sh₂wen-)",
    "rootMeaning": "what the root meant (e.g. to shine)",
    "meaning": "core meaning as a name (5-10 words)",
    "age": "approximate age (e.g. 5,000+ years old)",
    "languageFamilyTree": ["Proto-Indo-European *root", "Proto-Germanic *form", "Old English form", "Middle English form", "modern form"],
    "culturalSignificance": "2-3 sentences, scholarly but accessible",
    "historicalNotes": "1-2 sentences about stability or evolution of this word"
  },
  "phonetics": {
    "ipa": "/IPA transcription/",
    "sounds": [
      {"symbol": "/phoneme/", "type": "articulatory type (e.g. voiceless alveolar fricative)", "description": "One poetic sentence about what this sound feels like"}
    ],
    "stressPattern": "e.g. STRONG-weak or da-DA",
    "stressType": "e.g. Trochee or Iamb",
    "stressDescription": "1-2 sentences about what this rhythm feels like",
    "rhythm": "how the name flows when spoken",
    "mouthJourney": "describe the mouth's journey as a chain (e.g. hiss → open warmth → hum → bright release)",
    "phonosemantic": "what the overall sound profile suggests emotionally"
  },
  "morphology": {
    "morphemes": [{"part": "morpheme", "type": "root/prefix/suffix", "meaning": "brief meaning in quotes"}],
    "wordClass": "original word class",
    "grammaticalJourney": "2 poetic sentences about what the morphemes together say",
    "relatedForms": ["variant1", "variant2", "variant3", "variant4"]
  },
  "phonaesthesia": [
    {"symbol": "/phoneme/", "line1": "2-3 word concept", "line2": "2-3 word poetic expansion"}
  ],
  "semanticWeb": {
    "associations": ["word1", "word2", "word3", "word4", "word5", "word6"],
    "coreValues": "3-5 words separated by middots (e.g. life · growth · hope)"
  },
  "emotionalRegister": {
    "weather": "What this name feels like as weather. One sentence.",
    "personality": "What this name feels like as a personality. One sentence.",
    "asName": "What this name means when you give it to a child. One sentence."
  },
  "summaryQuote": "A beautiful 1-2 sentence poetic summary. No em dashes.",
  "crossLinguistic": {
    "cognates": [{"language": "lang", "word": "cognate word"}],
    "famousBearers": ["Name1 (brief)", "Name2 (brief)"]
  }
}

The phonaesthesia array must have one entry per phoneme matching the sounds array.`,
      },
      {
        role: "user",
        content: `Analyze the name: "${name}"`,
      },
    ],
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No response from OpenAI");

  return JSON.parse(content) as NameAnalysis;
}
