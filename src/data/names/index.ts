import type { NameAnalysis } from "../../types/name";

import sunny from "./sunny.json";
import auri from "./auri.json";
import luna from "./luna.json";
import oliver from "./oliver.json";
import alexander from "./alexander.json";
import iris from "./iris.json";
import felix from "./felix.json";
import willow from "./willow.json";

export const GALLERY_NAMES: NameAnalysis[] = [
  sunny as NameAnalysis,
  auri as NameAnalysis,
  luna as NameAnalysis,
  oliver as NameAnalysis,
  alexander as NameAnalysis,
  iris as NameAnalysis,
  felix as NameAnalysis,
  willow as NameAnalysis,
];

export const GALLERY_PALETTES: Record<string, string> = {
  Sunny: "warm-gold",
  Auri: "warm-gold",
  Luna: "cool-midnight",
  Oliver: "earth-tones",
  Alexander: "monochrome",
  Iris: "botanical",
  Felix: "ocean",
  Willow: "earth-tones",
};
