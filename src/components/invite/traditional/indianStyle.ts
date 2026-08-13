import type { FaithId, LanguageId } from "@/data/types";

export type RegionalId = "south" | "north" | "coastal" | "universal";

export type IndianCardStyle = {
  regional: RegionalId;
  maroon: string;
  gold: string;
  cream: string;
  deep: string;
  accent: string;
  openingLine: string;
  subOpening: string;
  wedsWord: string;
  border: "paisley" | "kolam" | "geometry" | "khanda" | "cross" | "lotus" | "blend";
};

const SOUTH_LANGS: LanguageId[] = ["kn", "ta", "te", "ml"];

export function regionalFromLanguage(lang: LanguageId): RegionalId {
  if (SOUTH_LANGS.includes(lang)) return "south";
  if (lang === "hi") return "north";
  return "universal";
}

export function getIndianCardStyle(
  faith: FaithId,
  language: LanguageId,
): IndianCardStyle {
  const regional = regionalFromLanguage(language);

  const southOpen = {
    kn: { openingLine: "ಶುಭಮಸ್ತು", subOpening: "ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ" },
    ta: { openingLine: "சுபமங்கலம்", subOpening: "ஸ்ரீ கணேசாய நம:" },
    te: { openingLine: "శుభమస్తు", subOpening: "శ్రీ గణేశాయ నమ:" },
    ml: { openingLine: "ശുഭമംഗളം", subOpening: "ശ്രീ ഗണേശായ നമ:" },
    en: { openingLine: "Subhamastu", subOpening: "Shri Ganeshaya Namaha" },
    hi: { openingLine: "Subhamastu", subOpening: "Shri Ganeshaya Namaha" },
  }[language];

  const northOpen = {
    hi: { openingLine: "ॐ शुभ विवाह", subOpening: "श्री गणेशाय नमः" },
    en: { openingLine: "Om Shubh Vivah", subOpening: "Shri Ganeshaya Namaha" },
    kn: { openingLine: "Om Shubh Vivah", subOpening: "Shri Ganeshaya Namaha" },
    ta: { openingLine: "Om Shubh Vivah", subOpening: "Shri Ganeshaya Namaha" },
    te: { openingLine: "Om Shubh Vivah", subOpening: "Shri Ganeshaya Namaha" },
    ml: { openingLine: "Om Shubh Vivah", subOpening: "Shri Ganeshaya Namaha" },
  }[language];

  switch (faith) {
    case "muslim":
      return {
        regional: "universal",
        maroon: "#0B3D2E",
        gold: "#D4AF37",
        cream: "#F5F0E1",
        deep: "#062820",
        accent: "#1B7A5A",
        openingLine: "بِسْمِ ٱللَّٰهِ",
        subOpening: "Nikah Mubarak",
        wedsWord: "weds",
        border: "geometry",
      };
    case "sikh":
      return {
        regional: "north",
        maroon: "#1A237E",
        gold: "#FFB300",
        cream: "#FFF8E7",
        deep: "#0D1440",
        accent: "#FF9933",
        openingLine: "ੴ",
        subOpening: "Anand Karaj",
        wedsWord: "weds",
        border: "khanda",
      };
    case "christian":
      return {
        regional: "coastal",
        maroon: "#5C2430",
        gold: "#C9A227",
        cream: "#FAF7F2",
        deep: "#3A1520",
        accent: "#8B6914",
        openingLine: "In God's Grace",
        subOpening: "Holy Matrimony",
        wedsWord: "weds",
        border: "cross",
      };
    case "jain":
      return {
        regional: "universal",
        maroon: "#6B2D3C",
        gold: "#C9A227",
        cream: "#FFFBF5",
        deep: "#4A1A28",
        accent: "#B08900",
        openingLine: "णमो अरिहंताणं",
        subOpening: "Shubh Vivah",
        wedsWord: "weds",
        border: "lotus",
      };
    case "interfaith":
      return {
        regional,
        maroon: "#3D1F2B",
        gold: "#E8C56A",
        cream: "#F8F1E3",
        deep: "#1A0A12",
        accent: "#C9A227",
        openingLine: "With Love & Blessings",
        subOpening: "Together in Joy",
        wedsWord: "&",
        border: "blend",
      };
    default:
      if (regional === "south") {
        return {
          regional: "south",
          maroon: "#4A0E18",
          gold: "#E8C56A",
          cream: "#F8F1E3",
          deep: "#2A0810",
          accent: "#C9A227",
          openingLine: southOpen.openingLine,
          subOpening: southOpen.subOpening,
          wedsWord: "weds",
          border: "kolam",
        };
      }
      return {
        regional: regional === "north" ? "north" : "universal",
        maroon: "#4A0E18",
        gold: "#E8C56A",
        cream: "#F8F1E3",
        deep: "#2A0810",
        accent: "#C9A227",
        openingLine: northOpen.openingLine,
        subOpening: northOpen.subOpening,
        wedsWord: "weds",
        border: "paisley",
      };
  }
}

/** Wedding cards that stay modern/Western (explicitly edgy themes). */
export const MODERN_WESTERN_EXPERIENCES = new Set([
  "cyber-terminal",
  "neon-dual",
  "nova-glitch",
  "glass-bento",
  "noir-strip",
  "aurora-orbit",
  "cosmic-swipe",
  "island-sunset",
  "campus-farewell",
  "school-annual",
  "birthday-spark",
]);

export function shouldRenderTraditionalIndian(opts: {
  ceremony?: string;
  experience: string;
  isRichFestival: boolean;
}): boolean {
  if (opts.isRichFestival) return false;
  if (MODERN_WESTERN_EXPERIENCES.has(opts.experience)) return false;
  const c = opts.ceremony ?? "wedding";
  return c === "wedding" || c === "engagement" || c === "housewarming";
}
