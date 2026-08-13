/**
 * Affordable studio packages — enquire via WhatsApp / email.
 * Delivered as finished files or a live link; no self-serve checkout.
 */

export type PlanId =
  | "pdf-image"
  | "custom-website"
  | "animated-video";

export type PlanKind = "custom";

export type PlanFormat =
  | "pdf-image"
  | "website"
  | "animated-video"
  /** Legacy aliases used by older gallery flows */
  | "invitation-card"
  | "event-page"
  | "both";

export type PricingPlan = {
  id: PlanId;
  name: string;
  kind: PlanKind;
  format: PlanFormat;
  priceInr: number;
  compareAtInr?: number;
  badge?: string;
  blurb: string;
  features: string[];
  highlighted?: boolean;
};

/**
 * Three clear deliverables at accessible price points:
 * 1) Shareable PDF + image card
 * 2) Guest invitation website
 * 3) Short handcrafted animated invite video
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "pdf-image",
    name: "PDF & Image",
    kind: "custom",
    format: "pdf-image",
    priceInr: 499,
    compareAtInr: 999,
    badge: "Best starter",
    blurb:
      "A custom invitation card delivered as print-ready PDF and high-quality images — perfect for WhatsApp and print.",
    features: [
      "Custom design for your ceremony",
      "PDF (print-ready) + PNG / JPG",
      "Names, date, venue & blessings",
      "Faith & language options",
      "Revisions via WhatsApp",
    ],
  },
  {
    id: "custom-website",
    name: "Invitation website",
    kind: "custom",
    format: "website",
    priceInr: 999,
    compareAtInr: 1999,
    badge: "Most loved",
    highlighted: true,
    blurb:
      "A shareable wedding invitation website — story, events, venue and blessings — designed uniquely for your celebration.",
    features: [
      "Original website design",
      "Mobile-friendly guest link",
      "Events, venue & your story",
      "Multi-language friendly",
      "WhatsApp concierge support",
    ],
  },
  {
    id: "animated-video",
    name: "Animated invite video",
    kind: "custom",
    format: "animated-video",
    priceInr: 799,
    compareAtInr: 1499,
    badge: "Handcrafted motion",
    blurb:
      "A short handcrafted animated invitation video — ideal for WhatsApp status, Instagram reels and family shares.",
    features: [
      "Custom motion invite (15–30s)",
      "Your names, date & theme art",
      "MP4 ready for status & reels",
      "Music-friendly export",
      "Quick revisions included",
    ],
  },
];

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getPlan(id: PlanId | string) {
  return pricingPlans.find((p) => p.id === id);
}

export function lowestTemplatePriceInr() {
  return Math.min(...pricingPlans.map((p) => p.priceInr));
}

/** Map older format filters to current packages. */
export function plansForFormat(format: "invitation-card" | "event-page") {
  if (format === "invitation-card") {
    return pricingPlans.filter(
      (p) => p.format === "pdf-image" || p.format === "animated-video",
    );
  }
  return pricingPlans.filter((p) => p.format === "website");
}
