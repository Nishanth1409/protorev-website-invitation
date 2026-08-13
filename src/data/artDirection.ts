/**
 * Flagship art direction tokens — one distinct visual family per storefront design.
 * Cards and websites share palette, typography, and artwork keys.
 */

export type ArtFamily =
  | "temple-gold"
  | "kanakam-heritage"
  | "lotus-heritage"
  | "palace-evening"
  | "pichwai-courtyard"
  | "mughal-garden"
  | "noor"
  | "anand"
  | "cathedral-garden"
  | "kerala-monsoon"
  | "tamil-temple"
  | "telugu-pellikuthuru"
  | "floral-editorial"
  | "ivory-atelier"
  | "coastal-sunset"
  | "mehendi-garden"
  | "modern-monogram"
  | "heritage-archive";

export type ArtPalette = {
  paper: string;
  ink: string;
  inkSoft: string;
  gold: string;
  goldSoft: string;
  accent: string;
  accentDeep: string;
  /** Website shell background */
  shell: string;
  shellDeep: string;
  glow: string;
};

export type ArtDirection = {
  family: ArtFamily;
  /** Card + website background artwork */
  cardArt: string;
  websiteHero: string;
  palette: ArtPalette;
  /** Cultural category label for gallery */
  category: string;
  /** Composition: names dominate, blessing refined */
  nameScale: "grand" | "editorial" | "formal";
  /** Panel opacity over artwork (0–1) */
  panelOpacity: number;
  motif?: string;
  websiteCover: "temple-gate" | "palace-corridor" | "garden" | "noor-arch" | "cathedral-light" | "coastal-sunset" | "heritage-paper" | "editorial-minimal";
};

const art: Record<ArtFamily, Omit<ArtDirection, "family">> = {
  "temple-gold": {
    cardArt: "/art/cards/temple-gold.png",
    websiteHero: "/art/cards/temple-gold.png",
    category: "South Indian Heritage",
    nameScale: "grand",
    panelOpacity: 0.88,
    motif: "/motifs/diyas.jpg",
    websiteCover: "temple-gate",
    palette: {
      paper: "#F7F0E4",
      ink: "#3D2415",
      inkSoft: "#6B4E3D",
      gold: "#B8860B",
      goldSoft: "#D4AF6A",
      accent: "#6B1E2A",
      accentDeep: "#4A0E18",
      shell: "#F7F0E4",
      shellDeep: "#2A1810",
      glow: "rgba(184,134,11,0.22)",
    },
  },
  "kanakam-heritage": {
    cardArt: "/art/cards/kanakam-heritage.png",
    websiteHero: "/art/cards/kanakam-heritage.png",
    category: "Kannada Heritage",
    nameScale: "grand",
    panelOpacity: 0.9,
    motif: "/motifs/diyas.jpg",
    websiteCover: "temple-gate",
    palette: {
      paper: "#F5EDE0",
      ink: "#3A2018",
      inkSoft: "#6A5040",
      gold: "#C9A227",
      goldSoft: "#E8D5A0",
      accent: "#8B3A3A",
      accentDeep: "#5C2020",
      shell: "#F5EDE0",
      shellDeep: "#2A1810",
      glow: "rgba(201,162,39,0.2)",
    },
  },
  "lotus-heritage": {
    cardArt: "/art/cards/lotus-heritage.png",
    websiteHero: "/art/cards/lotus-heritage.png",
    category: "Indian Floral",
    nameScale: "grand",
    panelOpacity: 0.86,
    websiteCover: "garden",
    palette: {
      paper: "#FAF6F0",
      ink: "#4A3028",
      inkSoft: "#7A6058",
      gold: "#C4A882",
      goldSoft: "#E8D8C8",
      accent: "#9E6B7A",
      accentDeep: "#6B4048",
      shell: "#FAF6F0",
      shellDeep: "#3A2820",
      glow: "rgba(196,168,130,0.25)",
    },
  },
  "palace-evening": {
    cardArt: "/art/cards/palace-evening.png",
    websiteHero: "/art/cards/palace-evening.png",
    category: "Royal Indian",
    nameScale: "formal",
    panelOpacity: 0.82,
    websiteCover: "palace-corridor",
    palette: {
      paper: "#F0E6DC",
      ink: "#2A1018",
      inkSoft: "#5C4048",
      gold: "#C9A227",
      goldSoft: "#E8D090",
      accent: "#6B1020",
      accentDeep: "#3A0810",
      shell: "#1A0810",
      shellDeep: "#0A0408",
      glow: "rgba(201,162,39,0.28)",
    },
  },
  "pichwai-courtyard": {
    cardArt: "/art/cards/pichwai-courtyard.png",
    websiteHero: "/art/cards/pichwai-courtyard.png",
    category: "Rajasthani",
    nameScale: "grand",
    panelOpacity: 0.85,
    websiteCover: "palace-corridor",
    palette: {
      paper: "#F2E8D8",
      ink: "#2A2018",
      inkSoft: "#5C5040",
      gold: "#D4A840",
      goldSoft: "#E8C878",
      accent: "#1A5858",
      accentDeep: "#0A3838",
      shell: "#1A4848",
      shellDeep: "#0A2828",
      glow: "rgba(212,168,64,0.22)",
    },
  },
  "mughal-garden": {
    cardArt: "/art/cards/mughal-garden.png",
    websiteHero: "/art/cards/mughal-garden.png",
    category: "Muslim Ceremony",
    nameScale: "formal",
    panelOpacity: 0.84,
    websiteCover: "noor-arch",
    palette: {
      paper: "#F5F2EA",
      ink: "#1A3028",
      inkSoft: "#4A6058",
      gold: "#C9A227",
      goldSoft: "#E8D5A0",
      accent: "#1A5848",
      accentDeep: "#0A3828",
      shell: "#0A2820",
      shellDeep: "#051810",
      glow: "rgba(26,88,72,0.35)",
    },
  },
  noor: {
    cardArt: "/art/cards/noor.png",
    websiteHero: "/art/cards/noor.png",
    category: "Muslim Luxury",
    nameScale: "editorial",
    panelOpacity: 0.8,
    websiteCover: "noor-arch",
    palette: {
      paper: "#F8F4EC",
      ink: "#1A2820",
      inkSoft: "#4A5850",
      gold: "#D4C4A0",
      goldSoft: "#E8DCC0",
      accent: "#1A3830",
      accentDeep: "#0A2018",
      shell: "#0A2018",
      shellDeep: "#051008",
      glow: "rgba(212,196,160,0.2)",
    },
  },
  anand: {
    cardArt: "/art/cards/anand.png",
    websiteHero: "/art/cards/anand.png",
    category: "Anand Karaj",
    nameScale: "formal",
    panelOpacity: 0.86,
    websiteCover: "temple-gate",
    palette: {
      paper: "#F5F0E8",
      ink: "#1A2030",
      inkSoft: "#4A5060",
      gold: "#C9A227",
      goldSoft: "#E8D090",
      accent: "#E87820",
      accentDeep: "#1A2848",
      shell: "#1A2848",
      shellDeep: "#0A1830",
      glow: "rgba(232,120,32,0.18)",
    },
  },
  "cathedral-garden": {
    cardArt: "/art/cards/cathedral-garden.png",
    websiteHero: "/art/cards/cathedral-garden.png",
    category: "Christian Ceremony",
    nameScale: "editorial",
    panelOpacity: 0.88,
    motif: "/motifs/naming.jpg",
    websiteCover: "cathedral-light",
    palette: {
      paper: "#FAF6F0",
      ink: "#3A3028",
      inkSoft: "#6A6058",
      gold: "#C4B090",
      goldSoft: "#E8DCC8",
      accent: "#6A8870",
      accentDeep: "#4A6850",
      shell: "#F8F4EC",
      shellDeep: "#2A2820",
      glow: "rgba(196,176,144,0.22)",
    },
  },
  "kerala-monsoon": {
    cardArt: "/art/cards/kerala-monsoon.png",
    websiteHero: "/art/cards/kerala-monsoon.png",
    category: "Kerala",
    nameScale: "grand",
    panelOpacity: 0.87,
    websiteCover: "garden",
    palette: {
      paper: "#F5F2EA",
      ink: "#2A3020",
      inkSoft: "#5A6050",
      gold: "#B8960B",
      goldSoft: "#D4C080",
      accent: "#4A6850",
      accentDeep: "#2A4838",
      shell: "#F0EDE4",
      shellDeep: "#1A2820",
      glow: "rgba(74,104,80,0.2)",
    },
  },
  "tamil-temple": {
    cardArt: "/art/cards/tamil-temple.png",
    websiteHero: "/art/cards/tamil-temple.png",
    category: "Tamil Heritage",
    nameScale: "grand",
    panelOpacity: 0.88,
    websiteCover: "temple-gate",
    palette: {
      paper: "#F7F0E4",
      ink: "#3A1818",
      inkSoft: "#6A4040",
      gold: "#C9A227",
      goldSoft: "#E8D090",
      accent: "#8B2020",
      accentDeep: "#5C1010",
      shell: "#2A1010",
      shellDeep: "#1A0808",
      glow: "rgba(201,162,39,0.22)",
    },
  },
  "telugu-pellikuthuru": {
    cardArt: "/art/cards/telugu-pellikuthuru.png",
    websiteHero: "/art/cards/telugu-pellikuthuru.png",
    category: "Telugu Ceremony",
    nameScale: "grand",
    panelOpacity: 0.86,
    websiteCover: "temple-gate",
    palette: {
      paper: "#FAF4E8",
      ink: "#3A2010",
      inkSoft: "#6A5040",
      gold: "#D4A840",
      goldSoft: "#E8C878",
      accent: "#C87820",
      accentDeep: "#8B3810",
      shell: "#FAF4E8",
      shellDeep: "#3A2010",
      glow: "rgba(212,168,64,0.22)",
    },
  },
  "floral-editorial": {
    cardArt: "/art/cards/floral-editorial.png",
    websiteHero: "/art/cards/floral-editorial.png",
    category: "Contemporary",
    nameScale: "editorial",
    panelOpacity: 0.9,
    websiteCover: "editorial-minimal",
    palette: {
      paper: "#FAF6F2",
      ink: "#3A3028",
      inkSoft: "#7A7068",
      gold: "#C4A882",
      goldSoft: "#E8D8C8",
      accent: "#B09090",
      accentDeep: "#806060",
      shell: "#FAF6F2",
      shellDeep: "#3A3028",
      glow: "rgba(196,168,130,0.18)",
    },
  },
  "ivory-atelier": {
    cardArt: "/art/cards/floral-editorial.png",
    websiteHero: "/art/cards/lotus-heritage.png",
    category: "Luxury Fusion",
    nameScale: "editorial",
    panelOpacity: 0.92,
    websiteCover: "editorial-minimal",
    palette: {
      paper: "#FAF8F4",
      ink: "#2A2820",
      inkSoft: "#6A6860",
      gold: "#C4B090",
      goldSoft: "#E8E0D0",
      accent: "#8A8070",
      accentDeep: "#5A5040",
      shell: "#FAF8F4",
      shellDeep: "#2A2820",
      glow: "rgba(196,176,144,0.15)",
    },
  },
  "coastal-sunset": {
    cardArt: "/art/cards/coastal-sunset.png",
    websiteHero: "/art/cards/coastal-sunset.png",
    category: "Destination",
    nameScale: "editorial",
    panelOpacity: 0.82,
    websiteCover: "coastal-sunset",
    palette: {
      paper: "#FAF4EC",
      ink: "#3A3028",
      inkSoft: "#6A6058",
      gold: "#D4A878",
      goldSoft: "#E8C8A0",
      accent: "#6A8898",
      accentDeep: "#4A6878",
      shell: "#2A3848",
      shellDeep: "#1A2838",
      glow: "rgba(212,168,120,0.25)",
    },
  },
  "mehendi-garden": {
    cardArt: "/art/cards/mehendi-garden.png",
    websiteHero: "/art/cards/mehendi-garden.png",
    category: "Celebration",
    nameScale: "grand",
    panelOpacity: 0.85,
    motif: "/motifs/mehendi.jpg",
    websiteCover: "garden",
    palette: {
      paper: "#F5F0E4",
      ink: "#2A3820",
      inkSoft: "#5A6850",
      gold: "#C9A840",
      goldSoft: "#E8D878",
      accent: "#6A8850",
      accentDeep: "#4A6830",
      shell: "#F0EDE4",
      shellDeep: "#2A3820",
      glow: "rgba(201,168,64,0.2)",
    },
  },
  "modern-monogram": {
    cardArt: "/art/cards/modern-monogram.png",
    websiteHero: "/art/cards/modern-monogram.png",
    category: "Contemporary Premium",
    nameScale: "editorial",
    panelOpacity: 0.92,
    websiteCover: "editorial-minimal",
    palette: {
      paper: "#F8F4EE",
      ink: "#2A2820",
      inkSoft: "#6A6860",
      gold: "#B8960B",
      goldSoft: "#D4C090",
      accent: "#4A4840",
      accentDeep: "#2A2820",
      shell: "#F8F4EE",
      shellDeep: "#2A2820",
      glow: "rgba(184,150,11,0.15)",
    },
  },
  "heritage-archive": {
    cardArt: "/art/cards/heritage-archive.png",
    websiteHero: "/art/cards/heritage-archive.png",
    category: "Heritage Formal",
    nameScale: "formal",
    panelOpacity: 0.88,
    websiteCover: "heritage-paper",
    palette: {
      paper: "#F0E8DC",
      ink: "#2A1018",
      inkSoft: "#5C4048",
      gold: "#B8860B",
      goldSoft: "#D4AF6A",
      accent: "#6B1020",
      accentDeep: "#3A0810",
      shell: "#2A1018",
      shellDeep: "#1A0810",
      glow: "rgba(184,134,11,0.2)",
    },
  },
};

/** Theme ID → art family (flagship storefront only) */
export const themeArtFamily: Record<string, ArtFamily> = {
  "temple-dawn": "temple-gold",
  "vivah-glow": "kanakam-heritage",
  "lotus-garden": "lotus-heritage",
  "palace-envelope": "palace-evening",
  "marigold-baraat-card": "pichwai-courtyard",
  "peacock-palace-card": "mughal-garden",
  "watercolour-shaadi-card": "noor",
  "velvet-royal": "anand",
  "classic-ornate": "cathedral-garden",
  "lantern-gold": "kerala-monsoon",
  "mandala-orbit": "tamil-temple",
  "petal-story": "telugu-pellikuthuru",
  "ivory-edit": "floral-editorial",
  "soft-bloom": "ivory-atelier",
  "island-sunset": "coastal-sunset",
  "mehendi-mandala-card": "mehendi-garden",
  "gilded-cinema": "modern-monogram",
  "heritage-arch": "heritage-archive",
};

export function getArtDirection(themeId?: string): ArtDirection | null {
  if (!themeId) return null;
  const family = themeArtFamily[themeId];
  if (!family) return null;
  return { family, ...art[family] };
}

export function isArtDirectedTheme(themeId?: string): boolean {
  return Boolean(themeId && themeArtFamily[themeId]);
}

export function artFamilies(): ArtFamily[] {
  return Object.keys(art) as ArtFamily[];
}
