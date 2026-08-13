/** Protorev Digital — public contact for invitation customization. */
export const COMPANY = {
  name: "Protorev Digital",
  site: "https://www.protorevdigital.com/",
  email: "hello@protorevdigital.com",
  tagline: "Where creativity meets code",
  productLine: "Young studio. Timeless invitations.",
} as const;

/**
 * Protorev’s own custom invitation website — portfolio example for clients.
 * Not a ready template from the catalog; this is bespoke work we designed.
 */
export const CUSTOM_SHOWCASE = {
  title: "Shubha Vivaha — Opening Blessing",
  subtitle: "Our custom invitation website",
  blurb:
    "A ceremonial guest site we designed end-to-end — blessing-first open, Kannada auspicious cover, and full wedding storytelling. This is what customisation looks like when it is crafted for one family.",
  url: "https://sample-wedding-the-invitationweb.canva.link/",
  formatLabel: "Custom event website",
  credit: "Designed by Protorev Digital",
} as const;

export function customizeWhatsAppUrl(details: {
  themeName?: string;
  format?: "invitation-card" | "event-page" | string;
  faith?: string;
  languages?: string;
}) {
  const lines = [
    `Hello Protorev Digital,`,
    ``,
    `I saw your custom sample invitation (${CUSTOM_SHOWCASE.title}):`,
    CUSTOM_SHOWCASE.url,
    ``,
    `I would like a customised wedding invitation in that quality.`,
    details.themeName ? `Theme interest: ${details.themeName}` : null,
    details.format ? `Format: ${details.format}` : null,
    details.faith ? `Faith: ${details.faith}` : null,
    details.languages ? `Languages: ${details.languages}` : null,
    ``,
    `Please share options, timeline, and pricing.`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://api.whatsapp.com/send?text=${encodeURIComponent(lines)}`;
}

export function customizeEmailUrl(details: {
  themeName?: string;
  format?: string;
}) {
  const subject = encodeURIComponent(
    `Custom wedding invitation${details.themeName ? ` — ${details.themeName}` : ""}`,
  );
  const body = encodeURIComponent(
    `Hello Protorev Digital,\n\nI saw your custom sample (${CUSTOM_SHOWCASE.title}):\n${CUSTOM_SHOWCASE.url}\n\nI want a customised invitation${
      details.themeName ? ` based on “${details.themeName}”` : ""
    }${details.format ? ` (${details.format})` : ""} in that quality.\n\nPlease share options and next steps.\n`,
  );
  return `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
}
