/** Protorev Digital — wedding invitation studio contact. */
export const COMPANY = {
  name: "Protorev Digital",
  site: "https://www.protorevdigital.com/",
  email: "hello@protorevdigital.com",
  /** Concierge — WhatsApp & calls */
  whatsapp: "919019726464",
  phoneDisplay: "+91 90197 26464",
  /** Product-facing line for the invitation studio */
  tagline: "Premium digital wedding invitations",
  productLine: "Multi-faith · Multi-language · Concierge customisation",
} as const;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${COMPANY.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function telUrl() {
  return `tel:+${COMPANY.whatsapp}`;
}

/**
 * Portfolio reference only — bespoke work we designed.
 * Not a ready template from the catalog.
 */
export const CUSTOM_SHOWCASE = {
  title: "Shubha Vivaha — Opening Blessing",
  subtitle: "Bespoke commission",
  blurb:
    "For families who want a fully original design — blessing-first cover, heirloom typography, and regional wording crafted around your story.",
  url: "https://sample-wedding-the-invitationweb.canva.link/",
  formatLabel: "Bespoke reference",
  credit: "Designed by Protorev Digital",
} as const;

export function customizeWhatsAppUrl(details: {
  themeName?: string;
  format?: "invitation-card" | "event-page" | string;
  faith?: string;
  languages?: string;
  bride?: string;
  groom?: string;
}) {
  const isCard = !details.format || details.format === "invitation-card";
  const lines = [
    `Hello Protorev Digital,`,
    ``,
    isCard
      ? `I would like to commission the “${details.themeName ?? "gallery"}” invitation card.`
      : `I would like to commission a custom wedding invitation website.`,
    details.themeName ? `Preferred theme: ${details.themeName}` : null,
    details.bride || details.groom
      ? `Names: ${[details.bride, details.groom].filter(Boolean).join(" & ")}`
      : null,
    details.faith ? `Faith: ${details.faith}` : null,
    details.languages ? `Languages: ${details.languages}` : null,
    ``,
    `Please share timeline, deliverables, and pricing.`,
  ]
    .filter(Boolean)
    .join("\n");

  return whatsappUrl(lines);
}

export function customizeEmailUrl(details: {
  themeName?: string;
  format?: string;
  bride?: string;
  groom?: string;
}) {
  const subject = encodeURIComponent(
    `Invitation commission${details.themeName ? ` — ${details.themeName}` : ""}`,
  );
  const body = encodeURIComponent(
    `Hello Protorev Digital,\n\nI would like to commission a custom invitation${
      details.themeName ? ` inspired by “${details.themeName}”` : ""
    }.\n${
      details.bride || details.groom
        ? `Names: ${[details.bride, details.groom].filter(Boolean).join(" & ")}\n`
        : ""
    }${details.format ? `Format: ${details.format}\n` : ""}\nPlease share next steps.\n\nMy phone: \n`,
  );
  return `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
}
