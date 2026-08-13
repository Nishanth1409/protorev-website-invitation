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
    name: "Custom invitation card",
    kind: "custom",
    format: "invitation-card",
    priceInr: 699,
    compareAtInr: 1499,
    badge: "Most ordered",
    highlighted: true,
    blurb:
      "Pick a theme from our gallery. We customise names, photos, blessings & language — then deliver your finished card files.",
    features: [
      "Choose any theme from our studio",
      "Your names, date, venue & photos",
      "Faith & language customisation",
      "Finished files delivered by WhatsApp",
      "Revisions included",
    ],
    unlocksPng: false,
    unlocksPdf: false,
    unlocksWebsite: false,
  },
  {
    id: "custom-website",
    name: "Custom invite website",
    kind: "custom",
    format: "event-page",
    priceInr: 1299,
    compareAtInr: 2499,
    blurb:
      "A guest invitation website — story, music, countdown & map — crafted for your ceremony.",
    features: [
      "Theme-based custom design",
      "Your photos & story",
      "Shareable guest link",
      "Faith-respectful copy",
      "WhatsApp support",
    ],
    unlocksPng: false,
    unlocksPdf: false,
    unlocksWebsite: false,
  },
  {
    id: "complete-custom",
    name: "Card + website bundle",
    kind: "custom",
    format: "both",
    priceInr: 1799,
    compareAtInr: 2498,
    badge: "Best value",
    blurb: "Matching invitation card and guest website — one package.",
    features: [
      "Custom invitation card files",
      "Custom guest website",
      "Matched look & feel",
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
