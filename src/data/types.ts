import type { CeremonyCategoryId } from "./ceremony";

export type { CeremonyCategoryId };

export type FaithId =
  | "hindu"
  | "muslim"
  | "christian"
  | "sikh"
  | "jain"
  | "interfaith";

export type LanguageId = "en" | "kn" | "ta" | "te" | "hi" | "ml";

/** Distinct visual template families — not one shared skin. */
export type DesignStyleId =
  | "royal-night"
  | "garden-bloom"
  | "modern-clean"
  | "coastal-mist"
  | "festival-bright"
  | "luxe-marble";

/** Product format on the Create Invitation hub. */
export type InviteFormatId = "invitation-card" | "event-page";

export type InviteEvent = {
  id: string;
  title: string;
  emoji?: string;
  dateLabel: string;
  dayLabel: string;
  time: string;
  venue: string;
  city: string;
};

export type InviteTheme = {
  bg: string;
  bgDeep: string;
  accent: string;
  accentSoft: string;
  text: string;
  muted: string;
  card: string;
  border: string;
  particle: string;
  glow: string;
  surface: string;
  ink: string;
  inkSoft: string;
};

export type InviteCopy = {
  weddingOf: string;
  saveTheDate: string;
  openInvite: string;
  togetherWith: string;
  counting: string;
  untilWedding: string;
  celebrate: string;
  eventsTitle: string;
  locationTitle: string;
  viewMap: string;
  thankYou: string;
  presence: string;
  crafted: string;
  withWord: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  scrollCelebrate: string;
  meetCouple: string;
  youAreInvited: string;
  openingTitle: string;
};

export type WeddingInvite = {
  slug: string;
  faith: FaithId;
  faithLabel: string;
  language: LanguageId;
  languageLabel: string;
  regionLabel: string;
  designStyle: DesignStyleId;
  styleLabel: string;
  /** invitation-card = printable Canva-like card; event-page = full website */
  inviteFormat?: InviteFormatId;
  tagline: string;
  monogram: string;
  bride: string;
  groom: string;
  weddingDate: string;
  weddingDateLabel: string;
  blessingNative: string;
  blessingEnglish: string;
  hosts: string;
  invitationCopy: string;
  closingCopy: string;
  location: {
    name: string;
    address: string;
    mapUrl: string;
  };
  events: InviteEvent[];
  audioSrc: string;
  /** Streaming music (YouTube primary, Spotify optional) */
  music?: {
    youtubeId: string;
    spotifyTrackId?: string;
    label: string;
  };
  /** Create-studio theme id for unique cinematic experiences */
  themeId?: string;
  /** Celebration category — wedding, naming, college, etc. */
  ceremony?: CeremonyCategoryId;
  /** Label for “of” line — Wedding of / Naming of / Farewell · */
  ofLabel?: string;
  socials: {
    instagram?: string;
    whatsapp?: string;
  };
  theme: InviteTheme;
  coverSubtitle: string;
  copy: InviteCopy;
  emblem: string;
};

export const languageMeta: Record<LanguageId, { label: string; native: string }> = {
  en: { label: "English", native: "English" },
  kn: { label: "Kannada", native: "ಕನ್ನಡ" },
  ta: { label: "Tamil", native: "தமிழ்" },
  te: { label: "Telugu", native: "తెలుగు" },
  hi: { label: "Hindi", native: "हिन्दी" },
  ml: { label: "Malayalam", native: "മലയാളം" },
};

export const designStyleMeta: Record<
  DesignStyleId,
  { label: string; blurb: string }
> = {
  "royal-night": {
    label: "Royal Night",
    blurb: "Deep jewel tones, glass cards, cinematic glow.",
  },
  "garden-bloom": {
    label: "Garden Bloom",
    blurb: "Soft florals, blush light, romantic garden air.",
  },
  "modern-clean": {
    label: "Modern Clean",
    blurb: "Editorial typography, white space, sharp contrast.",
  },
  "coastal-mist": {
    label: "Coastal Mist",
    blurb: "Sea-glass pastels, breezy calm, destination vibe.",
  },
  "festival-bright": {
    label: "Festival Bright",
    blurb: "Joyful colour blocks, playful celebration energy.",
  },
  "luxe-marble": {
    label: "Luxe Marble",
    blurb: "Ivory stone, champagne gold, boutique luxury.",
  },
};
