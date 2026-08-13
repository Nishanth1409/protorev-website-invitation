"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TemplateOrCustomize } from "./TemplateOrCustomize";
import { CustomDesignShowcase } from "./CustomDesignShowcase";
import { StudioTrust } from "./StudioTrust";
import { COMPANY } from "@/data/contact";
import { createThemes } from "@/data/themes";
import { PhoneMockup } from "./PhoneMockup";
import { featuredGalleryIds, galleryPresentation } from "@/data/galleryPresentation";
import { customizeWhatsAppUrl } from "@/data/contact";
import { formatInr, getPlan } from "@/data/pricing";

export function LandingPage() {
  const featured = featuredGalleryIds
    .map((id) => createThemes.find((t) => t.id === id))
    .filter(Boolean)
    .slice(0, 6);

  return (
    <main className="relative overflow-hidden bg-[#F7F4EF]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#fff8f0,transparent_55%)]" />

      <section className="mx-auto max-w-3xl px-5 pb-10 pt-14 text-center">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8B6914]">
          {COMPANY.name}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[1.85rem] font-semibold leading-[1.15] text-[#1A1210] sm:text-4xl">
          Invitations as graceful
          <br />
          as your ceremony
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-[#5C4A42]">
          {COMPANY.tagline}. Preview on your phone, then commission a finished
          card or guest website — designed for your faith, language, and family.
        </p>
        <p className="mt-3 text-xs font-medium tracking-wide text-[#8B6914]">
          Browse · Commission · Celebrate
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link
            href="/create"
            className="rounded-full bg-[#1A1210] px-6 py-3 text-sm font-semibold text-[#F7F4EF]"
          >
            Explore designs
          </Link>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
          >
            WhatsApp studio
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-md space-y-14 px-5 pb-10">
        {featured.map((theme, i) => {
          if (!theme) return null;
          const pres = galleryPresentation(theme);
          const price = getPlan(
            theme.format === "invitation-card" ? "custom-card" : "custom-website",
          )?.priceInr;
          return (
            <motion.article
              key={theme.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 flex justify-center gap-2">
                <Link
                  href={`/create/${theme.id}?faith=hindu&langs=en&ready=1`}
                  className="rounded-full bg-[#1A1210] px-3 py-2 text-[11px] font-semibold text-[#F7F4EF]"
                >
                  Live preview
                </Link>
                <a
                  href={customizeWhatsAppUrl({
                    themeName: pres.title,
                    format: theme.format,
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#D9CFC4] bg-white px-3 py-2 text-[11px] font-semibold"
                >
                  Commission design
                </a>
              </div>
              <div
                className="w-full max-w-[280px] rounded-[2rem] px-3 pb-5 pt-7"
                style={{
                  background: `radial-gradient(ellipse at 50% 28%, ${theme.theme.glow}, transparent 58%), linear-gradient(180deg, ${theme.theme.bgDeep}55, transparent 70%)`,
                }}
              >
                <PhoneMockup theme={theme} />
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[#1A1210]">
                {pres.title}
              </h3>
              <p className="mt-1 max-w-xs text-sm text-[#5C4A42]">{pres.tagline}</p>
              {price != null && (
                <p className="mt-2 text-sm font-semibold text-[#1A1210]">
                  From {formatInr(price)}
                </p>
              )}
            </motion.article>
          );
        })}
      </section>

      <div className="pb-4 text-center">
        <Link href="/create" className="text-sm font-semibold text-[#4A0E18]">
          View the full collection →
        </Link>
      </div>

      <StudioTrust />
      <CustomDesignShowcase />
      <TemplateOrCustomize />
    </main>
  );
}
