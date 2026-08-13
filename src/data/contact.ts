/** Protorev Digital — public contact for invitation customization. */
export const COMPANY = {
  name: "Protorev Digital",
  site: "https://www.protorevdigital.com/",
  email: "hello@protorevdigital.com",
  /** Customer service — WhatsApp & calls */
  whatsapp: "919019726464",
  phoneDisplay: "+91 90197 26464",
  tagline: "Where creativity meets code",
  productLine: "Invitation cards · Edit, preview, download PNG/PDF",
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
  subtitle: "Custom design reference",
  blurb:
    "When you need something fully bespoke — blessing-first cover, family photos, regional wording — our team designs it for you. Message us on WhatsApp or email.",
  url: "https://sample-wedding-the-invitationweb.canva.link/",
  formatLabel: "Custom reference sample",
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
      ? `I want a custom wedding invitation *card* (PNG/PDF for WhatsApp & print).`
      : `I want a custom wedding invitation.`,
    details.themeName ? `Template I liked: ${details.themeName}` : null,
    details.bride || details.groom
      ? `Names: ${[details.bride, details.groom].filter(Boolean).join(" & ")}`
      : null,
    details.faith ? `Faith: ${details.faith}` : null,
    details.languages ? `Languages: ${details.languages}` : null,
    ``,
    `Please share options, timeline, and pricing.`,
    ``,
    `Contact: ${COMPANY.phoneDisplay}`,
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
    `Custom invitation card${details.themeName ? ` — ${details.themeName}` : ""}`,
  );
  const body = encodeURIComponent(
    `Hello Protorev Digital,\n\nI want a custom invitation card (PNG/PDF)${
      details.themeName ? ` inspired by “${details.themeName}”` : ""
    }.\n${
      details.bride || details.groom
        ? `Names: ${[details.bride, details.groom].filter(Boolean).join(" & ")}\n`
        : ""
    }${details.format ? `Format: ${details.format}\n` : ""}\nPlease share options and next steps.\n\nMy phone: \n`,
  );
  return `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
}
