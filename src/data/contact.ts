/** Protorev Digital — wedding invitation studio contact. */
export const COMPANY = {
  name: "Protorev Digital",
  site: "https://www.protorevdigital.com/",
  email: "hello@protorevdigital.com",
  whatsapp: "919019726464",
  phoneDisplay: "+91 90197 26464",
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

/** Custom work showcase — live Canva invitation via same-origin proxy. */
export const CUSTOM_SHOWCASE = {
  title: "Opening Blessing",
  subtitle: "Custom Work",
  blurb:
    "A commissioned digital wedding website — designed uniquely for one celebration.",
  /** Proxied live site for device frames (Canva blocks direct iframes). */
  embedPath: "/canva-live/",
  liveUrl: "https://sample-wedding-the-invitationweb.canva.link/",
  formatLabel: "Custom Work",
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
  const name = details.themeName ?? "gallery";
  const lines = [
    `Hi Protorev Digital, I am interested in the ${name} invitation. I would like to customize it.`,
    details.bride || details.groom
      ? `Names: ${[details.bride, details.groom].filter(Boolean).join(" & ")}`
      : null,
    details.faith ? `Faith / style: ${details.faith}` : null,
    details.languages ? `Languages: ${details.languages}` : null,
    details.format ? `Format: ${details.format}` : null,
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
    `Customize invitation${details.themeName ? ` — ${details.themeName}` : ""}`,
  );
  const body = encodeURIComponent(
    `Hi Protorev Digital,\n\nI am interested in the ${
      details.themeName ?? "selected"
    } invitation. I would like to customize it.\n${
      details.bride || details.groom
        ? `Names: ${[details.bride, details.groom].filter(Boolean).join(" & ")}\n`
        : ""
    }${details.format ? `Format: ${details.format}\n` : ""}\nPlease share next steps.\n\nMy phone: \n`,
  );
  return `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
}
