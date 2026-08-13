import type { CreateTheme } from "./themes";
import { lookFromDesignStyle, type LookFamily } from "./lookFamilies";
import { getFlagshipMeta } from "./flagship";

export type GalleryPresentation = {
  title: string;
  tagline: string;
  featured?: boolean;
  look: LookFamily;
};

/** Prefer flagship titles; fall back to theme catalog names. */
export function galleryPresentation(theme: CreateTheme): GalleryPresentation {
  const flag = getFlagshipMeta(theme.id);
  if (flag) {
    return {
      title: flag.title,
      tagline: flag.tagline,
      featured: Boolean(flag.heroSlot),
      look: lookFromDesignStyle(theme.designStyle),
    };
  }
  return {
    title: theme.name,
    tagline: theme.blurb,
    look: lookFromDesignStyle(theme.designStyle),
    featured: theme.badge === "Premium" || theme.badge === "Flagship",
  };
}

export const featuredGalleryIds = [
  "temple-dawn",
  "ivory-edit",
  "peacock-palace-card",
  "palace-envelope",
  "classic-ornate",
  "lotus-garden",
];
