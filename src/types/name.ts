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
  | "monochrome"
  | "rose"
  | "lavender"
  | "sunset"
  | "slate"
  | "copper"
  | "arctic";

export type ImageryStyle =
  | "watercolour"
  | "oil-painting"
  | "line-art"
  | "geometric"
  | "minimal"
  | "botanical"
  | "impressionist"
  | "art-nouveau"
  | "ink-wash"
  | "stained-glass";

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
  "rose": {
    name: "Rose",
    colors: ["#C46B8A", "#D4899E", "#E8B0C4", "#8E3A5C", "#FDF0F4"],
    bg: "#1A1014",
    text: "#FDF0F4",
    accent: "#C46B8A",
  },
  "lavender": {
    name: "Lavender",
    colors: ["#7B68AE", "#9A8AC4", "#BEB0DA", "#5C4A8E", "#F0ECF7"],
    bg: "#12101A",
    text: "#F0ECF7",
    accent: "#9A8AC4",
  },
  "sunset": {
    name: "Sunset",
    colors: ["#D4602A", "#E8844A", "#F5A870", "#8B3D14", "#FDF2EC"],
    bg: "#1A1210",
    text: "#FDF2EC",
    accent: "#D4602A",
  },
  "slate": {
    name: "Slate",
    colors: ["#5A6B7A", "#7A8D9E", "#9EB0C0", "#3A4B5A", "#EDF1F4"],
    bg: "#101418",
    text: "#EDF1F4",
    accent: "#7A8D9E",
  },
  "copper": {
    name: "Copper",
    colors: ["#B87333", "#CC8844", "#E0A86B", "#8A5520", "#F7EDE0"],
    bg: "#1A1410",
    text: "#F7EDE0",
    accent: "#B87333",
  },
  "arctic": {
    name: "Arctic",
    colors: ["#5BB5D5", "#7CC8E4", "#A8DDF0", "#3A8DAA", "#E8F5FA"],
    bg: "#0C1820",
    text: "#E8F5FA",
    accent: "#5BB5D5",
  },
};

export const IMAGERY_STYLES: Record<ImageryStyle, { name: string; description: string }> = {
  watercolour: { name: "Watercolour", description: "Soft washes, delicate and organic" },
  "oil-painting": { name: "Oil Painting", description: "Rich brushstrokes, classical depth" },
  "line-art": { name: "Line Art", description: "Fine linework, etching, illustration" },
  geometric: { name: "Geometric", description: "Sacred geometry, mathematical" },
  minimal: { name: "Minimal", description: "Single element, negative space" },
  botanical: { name: "Botanical", description: "Scientific art, living forms" },
  impressionist: { name: "Impressionist", description: "Dappled light, soft brushwork" },
  "art-nouveau": { name: "Art Nouveau", description: "Ornamental curves, Mucha-style" },
  "ink-wash": { name: "Ink Wash", description: "East Asian brush painting" },
  "stained-glass": { name: "Stained Glass", description: "Bold outlines, jewel tones" },
};
