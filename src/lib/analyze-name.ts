import OpenAI from "openai";
import type { NameAnalysis } from "@/types/name";

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
        content: `You are a world-class linguist and etymologist. Given a name, produce a detailed linguistic analysis in JSON format. Be accurate, scholarly, but also engaging and accessible. Never use em dashes. Use commas or full stops instead.

Return this exact JSON structure:
{
  "name": "the name",
  "etymology": {
    "originLanguage": "the primary language of origin",
    "rootWord": "the root word or proto-form",
    "meaning": "core meaning (concise, 5-10 words)",
    "languageFamilyTree": ["Proto-Indo-European *root", "Proto-Germanic *form", "Old English form", "Modern English form"],
    "culturalSignificance": "2-3 sentences about cultural/historical weight",
    "historicalNotes": "2-3 sentences about how the name evolved and was used historically"
  },
  "phonetics": {
    "ipa": "/IPA transcription/",
    "sounds": [{"symbol": "phoneme", "description": "articulatory description (e.g. voiceless alveolar fricative)"}],
    "stressPattern": "e.g. trochee (DA-da) or iamb (da-DA)",
    "rhythm": "description of how the name feels rhythmically when spoken",
    "phonosemantic": "what the sound profile suggests emotionally/psychologically"
  },
  "morphology": {
    "morphemes": [{"part": "morpheme", "type": "root/prefix/suffix", "meaning": "meaning of this morpheme"}],
    "wordClass": "original word class before becoming a proper noun",
    "grammaticalJourney": "2-3 sentences about how it went from common word to name",
    "relatedForms": ["variant1", "variant2", "variant3", "variant4"]
  },
  "crossLinguistic": {
    "cognates": [{"language": "lang", "word": "cognate word"}],
    "famousBearers": ["Name1 (brief description)", "Name2 (brief description)"]
  }
}`,
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
