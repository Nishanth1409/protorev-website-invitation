import type { CreateTheme } from "./themes";
import { getCreateTheme } from "./themes";
import type { FaithId } from "./types";
import type { CeremonyCategoryId } from "./ceremony";
import { getArtDirection } from "./artDirection";

/**
 * Final gallery — 18 flagship designs with distinct art direction.
 */

export type CollectionGroup =
  | "traditional-india"
  | "faith-ceremony"
  | "contemporary"
  | "other-celebrations";

export type FlagshipMeta = {
  id: string;
  title: string;
  tagline: string;
  group: CollectionGroup;
  heroSlot?: "south-indian" | "modern-luxury" | "islamic-luxury";
  defaultFaith: FaithId;
  ceremony?: CeremonyCategoryId;
};

export const collectionMeta: Record<
  CollectionGroup,
  { label: string; blurb: string }
> = {
  "traditional-india": {
    label: "Traditional India",
    blurb: "Temple, palace, and regional stationery traditions",
  },
  "faith-ceremony": {
    label: "Faith & Ceremony",
    blurb: "Respectful art direction for every sacred tradition",
  },
  contemporary: {
    label: "Contemporary",
    blurb: "Editorial, floral, luxury, and destination looks",
  },
  "other-celebrations": {
    label: "Celebration",
    blurb: "Mehendi, monogram, and milestone moments",
  },
};

export const flagshipMeta: FlagshipMeta[] = [
  {
    id: "temple-dawn",
    title: "Temple Gold",
    tagline:
      "Antique gold, temple architecture and traditional floral ornament, composed for a timeless ceremony.",
    group: "traditional-india",
    heroSlot: "south-indian",
    defaultFaith: "hindu",
  },
  {
    id: "vivah-glow",
    title: "Kanakam Heritage",
    tagline:
      "Mysuru heritage warmth — sandalwood cream, muted red and antique gold for Kannada ceremonies.",
    group: "traditional-india",
    defaultFaith: "hindu",
  },
  {
    id: "lotus-garden",
    title: "Lotus Heritage",
    tagline:
      "Lotus illustration, delicate botanical frame, ivory paper with rose-gold detail.",
    group: "traditional-india",
    defaultFaith: "hindu",
  },
  {
    id: "palace-envelope",
    title: "Palace Evening",
    tagline:
      "Palace arches, deep burgundy, antique gold and candlelight — names like engraved stationery.",
    group: "traditional-india",
    defaultFaith: "hindu",
  },
  {
    id: "marigold-baraat-card",
    title: "Pichwai Courtyard",
    tagline:
      "Hand-painted peacock and lotus, palace courtyard, deep teal, ochre and rich textile texture.",
    group: "traditional-india",
    defaultFaith: "hindu",
  },
  {
    id: "peacock-palace-card",
    title: "Mughal Garden",
    tagline:
      "Islamic geometry, Mughal botanical arches, emerald, ivory and muted gold.",
    group: "faith-ceremony",
    heroSlot: "islamic-luxury",
    defaultFaith: "muslim",
  },
  {
    id: "watercolour-shaadi-card",
    title: "Noor",
    tagline:
      "Midnight green, champagne and ivory — sophisticated geometric pattern with moonlight calm.",
    group: "faith-ceremony",
    defaultFaith: "muslim",
  },
  {
    id: "velvet-royal",
    title: "Anand",
    tagline:
      "Deep navy, saffron and ivory — Anand Karaj presence with architectural framing.",
    group: "faith-ceremony",
    defaultFaith: "sikh",
  },
  {
    id: "classic-ornate",
    title: "Cathedral Garden",
    tagline:
      "Ivory, champagne and soft sage — botanical garden borders with cathedral calm.",
    group: "faith-ceremony",
    defaultFaith: "christian",
  },
  {
    id: "lantern-gold",
    title: "Kerala Monsoon",
    tagline:
      "Ivory, muted green and brass gold — Kerala architecture with gentle monsoon atmosphere.",
    group: "traditional-india",
    defaultFaith: "hindu",
  },
  {
    id: "mandala-orbit",
    title: "Tamil Temple",
    tagline:
      "Temple gopuram, kolam geometry, jasmine, deep red and gold — Tamil typography as design.",
    group: "traditional-india",
    defaultFaith: "hindu",
  },
  {
    id: "petal-story",
    title: "Telugu Pellikuthuru",
    tagline:
      "Mango leaves, turmeric, vermillion and gold — temple ornament for Telugu celebrations.",
    group: "traditional-india",
    defaultFaith: "hindu",
  },
  {
    id: "ivory-edit",
    title: "Floral Editorial",
    tagline:
      "Soft cream, muted blush, editorial botanical illustration and restrained gold.",
    group: "contemporary",
    heroSlot: "modern-luxury",
    defaultFaith: "hindu",
  },
  {
    id: "soft-bloom",
    title: "Ivory Atelier",
    tagline:
      "Warm ivory, champagne, architectural line art and very restrained decoration.",
    group: "contemporary",
    defaultFaith: "hindu",
  },
  {
    id: "island-sunset",
    title: "Coastal Sunset",
    tagline:
      "Warm sand, muted coral and ocean blue — sunset lighting with tropical botanical artwork.",
    group: "contemporary",
    defaultFaith: "hindu",
  },
  {
    id: "mehendi-mandala-card",
    title: "Mehendi Garden",
    tagline:
      "Mehendi patterns, marigold and soft green — joyful but sophisticated celebration.",
    group: "other-celebrations",
    defaultFaith: "hindu",
  },
  {
    id: "gilded-cinema",
    title: "Modern Monogram",
    tagline:
      "Large couple monogram, textured paper, restrained typography and subtle foil.",
    group: "other-celebrations",
    defaultFaith: "hindu",
  },
  {
    id: "heritage-arch",
    title: "Heritage Archive",
    tagline:
      "Archival paper, engraved ornament, deep wine and antique gold — formal heritage suite.",
    group: "contemporary",
    defaultFaith: "hindu",
  },
];

export const flagshipIds = flagshipMeta.map((f) => f.id);

export function getFlagshipMeta(id: string) {
  return flagshipMeta.find((f) => f.id === id);
}

export function getFlagshipCategory(id: string) {
  return getArtDirection(id)?.category ?? "";
}

export function flagshipThemes(): CreateTheme[] {
  return flagshipMeta
    .map((f) => getCreateTheme(f.id))
    .filter((t): t is CreateTheme => Boolean(t));
}

export function flagshipsByGroup(group: CollectionGroup) {
  return flagshipMeta.filter((f) => f.group === group);
}

export function heroFlagships() {
  const slots = ["south-indian", "modern-luxury", "islamic-luxury"] as const;
  return slots
    .map((slot) => flagshipMeta.find((f) => f.heroSlot === slot))
    .filter(Boolean) as FlagshipMeta[];
}

export const collectionOrder: CollectionGroup[] = [
  "traditional-india",
  "faith-ceremony",
  "contemporary",
  "other-celebrations",
];
