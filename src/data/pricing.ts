/**
 * Startup-friendly India pricing — pocket-friendly for local families.
 * Templates stay very low so everyone can buy; custom is still reachable.
 */

export type PlanId =
  | "card-png"
  | "card-suite"
  | "website-template"
  | "custom-card"
  | "custom-website"
  | "complete-custom";

export type PlanKind = "template" | "custom";

export type PricingPlan = {
  id: PlanId;
  name: string;
  kind: PlanKind;
  format: "invitation-card" | "event-page" | "both";
  priceInr: number;
  compareAtInr?: number;
  badge?: string;
  blurb: string;
  features: string[];
  /** Unlocks clean PNG download for a theme */
  unlocksPng: boolean;
  /** Unlocks clean PDF download for a theme */
  unlocksPdf: boolean;
  /** Unlocks unwatermarked event-page publish */
  unlocksWebsite: boolean;
  highlighted?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "card-png",
    name: "Card · PNG",
    kind: "template",
    format: "invitation-card",
    priceInr: 99,
    compareAtInr: 249,
    blurb: "Clean PNG for WhatsApp & Instagram — priced for every family.",
    features: [
      "Sign in required",
      "1 theme unlock",
      "High-res PNG (no watermark)",
      "Faith & multi-language preview",
      "Instant download after payment",
    ],
    unlocksPng: true,
    unlocksPdf: false,
    unlocksWebsite: false,
  },
  {
    id: "card-suite",
    name: "Card · PNG + PDF",
    kind: "template",
    format: "invitation-card",
    priceInr: 199,
    compareAtInr: 399,
    badge: "Most chosen",
    highlighted: true,
    blurb: "Print-ready PDF (5×7) plus PNG — still under ₹200.",
    features: [
      "Everything in Card · PNG",
      "Print-ready PDF (5×7)",
      "1 theme unlock",
      "Re-download anytime on this device",
      "Share-ready files",
    ],
    unlocksPng: true,
    unlocksPdf: true,
    unlocksWebsite: false,
  },
  {
    id: "website-template",
    name: "Event website",
    kind: "template",
    format: "event-page",
    priceInr: 349,
    compareAtInr: 699,
    blurb: "Full guest invite site — music, countdown, map & share link.",
    features: [
      "1 event-page theme",
      "Unwatermarked guest experience",
      "Music · countdown · map",
      "Multi-language switch",
      "Shareable invite link",
    ],
    unlocksPng: false,
    unlocksPdf: false,
    unlocksWebsite: true,
  },
  {
    id: "custom-card",
    name: "Custom card design",
    kind: "custom",
    format: "invitation-card",
    priceInr: 699,
    compareAtInr: 1499,
    badge: "Personal touch",
    blurb: "We design your card with photos & family details — startup-friendly rate.",
    features: [
      "Personal designer attention",
      "Your photos & colours",
      "Blessing-first ceremonial style",
      "PNG + PDF delivery",
      "WhatsApp revisions included",
    ],
    unlocksPng: true,
    unlocksPdf: true,
    unlocksWebsite: false,
  },
  {
    id: "custom-website",
    name: "Custom invite website",
    kind: "custom",
    format: "event-page",
    priceInr: 1299,
    compareAtInr: 2499,
    blurb: "Custom guest website — your story, photos & music, still affordable.",
    features: [
      "Bespoke layout & motion",
      "Your photos & story chapters",
      "Faith-respectful copy",
      "Hosted guest link",
      "Concierge via WhatsApp / email",
    ],
    unlocksPng: false,
    unlocksPdf: false,
    unlocksWebsite: true,
  },
  {
    id: "complete-custom",
    name: "Complete custom bundle",
    kind: "custom",
    format: "both",
    priceInr: 1799,
    compareAtInr: 2498,
    badge: "Best value",
    highlighted: true,
    blurb: "Custom card + website together — one package, one low price.",
    features: [
      "Custom card (PNG + PDF)",
      "Custom event website",
      "Matched visual language",
      "Priority WhatsApp support",
      "Ideal for any celebration size",
    ],
    unlocksPng: true,
    unlocksPdf: true,
    unlocksWebsite: true,
  },
];

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPlan(id: PlanId) {
  return pricingPlans.find((p) => p.id === id);
}

export function lowestTemplatePriceInr() {
  return Math.min(
    ...pricingPlans.filter((p) => p.kind === "template").map((p) => p.priceInr),
  );
}

export function plansForFormat(format: "invitation-card" | "event-page") {
  return pricingPlans.filter(
    (p) => p.format === format || p.format === "both",
  );
}
