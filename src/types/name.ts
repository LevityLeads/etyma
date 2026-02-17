export interface NameAnalysis {
  name: string;
  etymology: {
    originLanguage: string;
    rootWord: string;
    rootMeaning?: string;
    meaning: string;
    age?: string;
    languageFamilyTree: string[];
    culturalSignificance: string;
    historicalNotes: string;
  };
  phonetics: {
    ipa: string;
    sounds: { symbol: string; type?: string; description: string }[];
    stressPattern: string;
    stressType?: string;
    stressDescription?: string;
    rhythm: string;
    mouthJourney?: string;
    phonosemantic: string;
  };
  morphology: {
    morphemes: { part: string; type: string; meaning: string }[];
    wordClass: string;
    grammaticalJourney: string;
    relatedForms: string[];
  };
  phonaesthesia?: { symbol: string; line1: string; line2: string }[];
  semanticWeb?: {
    associations: string[];
    coreValues: string;
  };
  emotionalRegister?: {
    weather: string;
    personality: string;
    asName: string;
  };
  summaryQuote?: string;
  crossLinguistic: {
    cognates: { language: string; word: string }[];
    famousBearers: string[];
  };
}

export type ColourPalette =
  | "warm-gold"
  | "cool-midnight"
  | "earth-tones"
  | "ocean"
  | "botanical"
  | "monochrome";

export type ImageryStyle =
  | "abstract"
  | "botanical"
  | "celestial"
  | "geometric"
  | "minimalist";

export interface PosterConfig {
  name: string;
  analysis: NameAnalysis;
  palette: ColourPalette;
  imagery: ImageryStyle;
}

export const PALETTES: Record<ColourPalette, { name: string; colors: string[]; bg: string; text: string; accent: string }> = {
  "warm-gold": {
    name: "Warm Gold",
    colors: ["#D4930D", "#E8B94A", "#F5D78E", "#8B6914", "#FDF6EC"],
    bg: "#1A1612",
    text: "#FDF6EC",
    accent: "#D4930D",
  },
  "cool-midnight": {
    name: "Cool Midnight",
    colors: ["#4A6FA5", "#6B8FC4", "#9BB5D9", "#2C4A7C", "#E8EFF7"],
    bg: "#0F1624",
    text: "#E8EFF7",
    accent: "#6B8FC4",
  },
  "earth-tones": {
    name: "Earth Tones",
    colors: ["#8B6F47", "#A68B5B", "#C4A882", "#5C4A2E", "#F5EDE0"],
    bg: "#1C1610",
    text: "#F5EDE0",
    accent: "#A68B5B",
  },
  "ocean": {
    name: "Ocean",
    colors: ["#0D7377", "#14919B", "#45C4B0", "#065A5C", "#E0F5F3"],
    bg: "#0A1A1C",
    text: "#E0F5F3",
    accent: "#14919B",
  },
  "botanical": {
    name: "Botanical",
    colors: ["#4A7C59", "#6B9E7A", "#9BC4A8", "#2E5C3A", "#EAF5ED"],
    bg: "#0F1A12",
    text: "#EAF5ED",
    accent: "#6B9E7A",
  },
  "monochrome": {
    name: "Monochrome",
    colors: ["#888888", "#AAAAAA", "#CCCCCC", "#555555", "#F0F0F0"],
    bg: "#111111",
    text: "#F0F0F0",
    accent: "#AAAAAA",
  },
};

export const IMAGERY_STYLES: Record<ImageryStyle, { name: string; description: string }> = {
  abstract: { name: "Abstract", description: "Flowing forms and expressive colour" },
  botanical: { name: "Botanical", description: "Organic, nature-inspired illustrations" },
  celestial: { name: "Celestial", description: "Stars, cosmos, and cosmic wonder" },
  geometric: { name: "Geometric", description: "Clean lines and sacred geometry" },
  minimalist: { name: "Minimalist", description: "Simple, refined, essential" },
};
