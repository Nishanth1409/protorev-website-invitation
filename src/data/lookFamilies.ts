"use client";

import type { DesignStyleId } from "@/data/types";

/** ShaadiPath-style look families for gallery filters. */
export type LookFamily = "luxe" | "royal" | "festive" | "minimal";

export const lookMeta: Record<
  LookFamily,
  { label: string; blurb: string }
> = {
  luxe: {
    label: "Luxe",
    blurb: "Quiet luxury, marble light, editorial polish",
  },
  royal: {
    label: "Royal",
    blurb: "Deep tones, gold detail, grand night energy",
  },
  festive: {
    label: "Festive",
    blurb: "Warm florals, celebration colour, joyful rituals",
  },
  minimal: {
    label: "Minimal",
    blurb: "Clean lines, soft space, modern calm",
  },
};

export function lookFromDesignStyle(style: DesignStyleId): LookFamily {
  switch (style) {
    case "luxe-marble":
      return "luxe";
    case "royal-night":
      return "royal";
    case "festival-bright":
    case "garden-bloom":
      return "festive";
    case "modern-clean":
    case "coastal-mist":
    default:
      return "minimal";
  }
}

export const allLookFamilies: LookFamily[] = [
  "luxe",
  "royal",
  "festive",
  "minimal",
];
