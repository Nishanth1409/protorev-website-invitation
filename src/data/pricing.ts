/**
 * Service pricing — enquire via WhatsApp / email.
 * No self-serve download or website checkout.
 */

export type PlanId =
  | "custom-card"
  | "custom-website"
  | "complete-custom";

export type PlanKind = "custom";

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
  unlocksPng: boolean;
  unlocksPdf: boolean;
  unlocksWebsite: boolean;
  highlighted?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "custom-card",
    name: "Invitation card",
    kind: "custom",
    format: "invitation-card",
    priceInr: 699,
    compareAtInr: 1499,
    badge: "Most commissioned",
    highlighted: true,
    blurb:
      "A finished ceremonial card from your chosen theme — names, photos, blessings and language refined by our studio.",
    features: [
      "Any theme from the gallery",
      "Names, date, venue & photos",
      "Faith & language customisation",
      "Print-ready files via WhatsApp",
      "Revisions included",
    ],
    unlocksPng: false,
    unlocksPdf: false,
    unlocksWebsite: false,
  },
  {
    id: "custom-website",
    name: "Guest website",
    kind: "custom",
    format: "event-page",
    priceInr: 1299,
    compareAtInr: 2499,
    blurb:
      "A mobile invitation website — story, music, countdown, events and map — crafted for your ceremony.",
    features: [
      "Theme-based custom design",
      "Your photos & story",
      "Shareable guest link",
      "Faith-respectful copy",
      "WhatsApp concierge support",
    ],
    unlocksPng: false,
    unlocksPdf: false,
    unlocksWebsite: false,
  },
  {
    id: "complete-custom",
    name: "Card + website",
    kind: "custom",
    format: "both",
    priceInr: 1799,
    compareAtInr: 2498,
    badge: "Complete suite",
    blurb: "Matching invitation card and guest website — one coherent celebration identity.",
    features: [
      "Custom invitation card files",
      "Custom guest website",
      "Matched visual language",
      "Priority WhatsApp support",
      "Ideal for full celebrations",
    ],
    unlocksPng: false,
    unlocksPdf: false,
    unlocksWebsite: false,
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
  return Math.min(...pricingPlans.map((p) => p.priceInr));
}

export function plansForFormat(format: "invitation-card" | "event-page") {
  return pricingPlans.filter(
    (p) => p.format === format || p.format === "both",
  );
}
