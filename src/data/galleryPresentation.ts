import type { CreateTheme } from "./themes";
import { lookFromDesignStyle, type LookFamily } from "./lookFamilies";

/**
 * Original Protorev gallery copy — ceremony-inspired, not third-party names.
 */
export type GalleryPresentation = {
  title: string;
  tagline: string;
  featured?: boolean;
  look: LookFamily;
};

const overrides: Record<string, GalleryPresentation> = {
  "heritage-arch": {
    title: "Sandstone Courtyard",
    tagline: "Soft pastels and courtyard arches for elegant day weddings",
    featured: true,
    look: "royal",
  },
  "velvet-soiree": {
    title: "Velvet Midnight",
    tagline: "A grand night celebration with deep tones and regal detail",
    featured: true,
    look: "royal",
  },
  "ivory-edit": {
    title: "Ivory Atelier",
    tagline: "Minimal, refined, and quietly luxurious",
    featured: true,
    look: "minimal",
  },
  "mehendi-mandala-card": {
    title: "Mehendi Garden",
    tagline: "Warm florals and festive details for joyful ceremonies",
    featured: true,
    look: "festive",
  },
  "temple-dawn": {
    title: "Sacred Morning",
    tagline: "Inspired by traditions, rituals, and sacred spaces",
    featured: true,
    look: "royal",
  },
  "island-sunset": {
    title: "Coastal Sundown",
    tagline: "Intimate celebrations with nature, water, and sunset hues",
    look: "minimal",
  },
  "aurora-sky": {
    title: "Golden Waters",
    tagline: "Royal waterfront vibes in warm golden light",
    look: "luxe",
  },
  "lotus-garden": {
    title: "Lotus Bloom",
    tagline: "Soft blooms and blush light for gentle ceremonies",
    look: "festive",
  },
  "peacock-palace-card": {
    title: "Peacock Durbar",
    tagline: "Palace grandeur with jewel tones and ceremonial grace",
    look: "luxe",
  },
  "diya-vivah-card": {
    title: "Marigold Diya",
    tagline: "Festival warmth, diyas, and celebration colour",
    look: "festive",
  },
  "palace-envelope": {
    title: "Rosewood Envelope",
    tagline: "Royal opening ritual with warm gold and jewel tones",
    look: "royal",
  },
  "classic-ornate": {
    title: "Celestial Grace",
    tagline: "Cinematic light, devotion, and cathedral calm",
    look: "luxe",
  },
  "glass-float": {
    title: "Azure Courtyard",
    tagline: "Living gold accents with palace-blue evening light",
    look: "luxe",
  },
  "mandala-orbit": {
    title: "Mandala Orbit",
    tagline: "Sacred geometry in motion for modern Indian weddings",
    look: "festive",
  },
};

export function galleryPresentation(theme: CreateTheme): GalleryPresentation {
  const custom = overrides[theme.id];
  if (custom) return custom;
  return {
    title: theme.name,
    tagline: theme.blurb,
    look: lookFromDesignStyle(theme.designStyle),
    featured: theme.badge === "Premium" || theme.badge === "Flagship",
  };
}

export const featuredGalleryIds = [
  "heritage-arch",
  "velvet-soiree",
  "ivory-edit",
  "mehendi-mandala-card",
  "temple-dawn",
  "island-sunset",
  "aurora-sky",
  "lotus-garden",
  "peacock-palace-card",
  "diya-vivah-card",
  "palace-envelope",
  "classic-ornate",
];
