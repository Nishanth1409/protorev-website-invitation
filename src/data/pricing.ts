/**
 * Protorev invitation pricing — aligned to India digital wedding invite market (2025–26):
 * template e-cards ~₹500–1,500 · custom static ~₹1,500–4,000 · websites/custom higher.
 * Custom tiers intentionally earn more than ready templates.
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
    priceInr: 799,
    compareAtInr: 999,
    blurb: "One invitation card theme — clean PNG for WhatsApp & Instagram.",
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
    priceInr: 1299,
    compareAtInr: 1799,
    badge: "Most chosen",
    highlighted: true,
    blurb: "Print-ready PDF (5×7) plus PNG — best for family & print shops.",
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
    priceInr: 2499,
    compareAtInr: 3499,
    blurb: "Full guest invitation website — music, countdown, map & share link.",
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
    priceInr: 4999,
    badge: "Higher earning",
    blurb: "We design your ceremonial card with photos, blessing cover & family details.",
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
    priceInr: 9999,
    blurb: "Fully customised invitation website — story, gallery cues, music & RSVP flow.",
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
    priceInr: 12999,
    compareAtInr: 14998,
    badge: "Best value custom",
    highlighted: true,
    blurb: "Custom card + custom website together — maximum polish, one package.",
    features: [
      "Custom card (PNG + PDF)",
      "Custom event website",
      "Matched visual language",
      "Priority support",
      "Ideal for grand celebrations",
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

export function plansForFormat(format: "invitation-card" | "event-page") {
  return pricingPlans.filter(
    (p) => p.format === format || p.format === "both",
  );
}
