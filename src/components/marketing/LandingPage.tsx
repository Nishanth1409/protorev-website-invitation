"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TemplateOrCustomize } from "./TemplateOrCustomize";
import { CustomDesignShowcase } from "./CustomDesignShowcase";
import { COMPANY } from "@/data/contact";
import { createThemes } from "@/data/themes";
import { PhoneMockup } from "./PhoneMockup";
import { lookFromDesignStyle, lookMeta } from "@/data/lookFamilies";

const featuredIds = [
  "velvet-soiree",
  "heritage-arch",
  "ivory-edit",
  "diya-vivah-card",
  "mehendi-mandala-card",
  "palace-envelope",
];

export function LandingPage() {
  const featured = featuredIds
    .map((id) => createThemes.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <main className="relative overflow-hidden bg-[#F7F4EF]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#fff8f0,transparent_55%)]" />
        <div className="absolute -right-20 top-20 h-[26rem] w-[26rem] rounded-full bg-[rgba(196,154,74,0.14)] blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[88svh] max-w-4xl flex-col items-center justify-center px-6 pb-14 pt-16 text-center">
        <motion.p
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8B6914]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Protorev Digital · Invitation studio
        </motion.p>

        <motion.h1
          className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.12] tracking-tight text-[#1A1210] sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          A website as beautiful
          <br className="hidden sm:block" /> as your wedding day
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-[#5C4A42] sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          Your guests will feel it before they even arrive. Browse premium
          invitation websites & cards — we customise every detail and deliver
          via WhatsApp.
        </motion.p>

        <motion.p
          className="mt-4 text-sm font-medium tracking-wide text-[#8B6914]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
        >
          Design · Personalise · Share
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <Link
            href="/create"
            className="rounded-full bg-[#1A1210] px-7 py-3.5 text-sm font-semibold text-[#F7F4EF]"
          >
            Browse designs
          </Link>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white"
          >
            WhatsApp {COMPANY.phoneDisplay}
          </a>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
            Featured designs
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#1A1210] sm:text-4xl">
            Beautiful on every phone
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-[#5C4A42]">
            Live previews in an elegant gallery — tap a design, then enquire so
            we can customise it for your ceremony.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((theme, i) => {
            if (!theme) return null;
            const look = lookFromDesignStyle(theme.designStyle);
            return (
              <motion.article
                key={theme.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-[1.5rem] border border-[#E8DFD4] bg-white shadow-[0_12px_40px_rgba(26,18,16,0.06)]"
              >
                <div
                  className="relative flex justify-center px-4 pb-2 pt-8"
                  style={{
                    background: `linear-gradient(180deg, ${theme.theme.bgDeep} 0%, #F7F4EF 100%)`,
                    minHeight: 300,
                  }}
                >
                  <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    {lookMeta[look].label}
                  </span>
                  <PhoneMockup theme={theme} />
                </div>
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-[#1A1210]">
                    {theme.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#5C4A42]">
                    {theme.blurb}
                  </p>
                  <Link
                    href={`/create/${theme.id}?ready=1`}
                    className="mt-4 inline-flex rounded-full bg-[#1A1210] px-4 py-2.5 text-xs font-semibold text-[#F7F4EF]"
                  >
                    Live preview
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/create"
            className="text-sm font-semibold text-[#4A0E18] underline-offset-4 hover:underline"
          >
            View all designs →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-6">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Choose your design",
              body: "Browse Luxe, Royal, Festive & Minimal looks — websites and cards.",
            },
            {
              title: "Tell us your story",
              body: "WhatsApp theme name + names, date, photos, faith & language.",
            },
            {
              title: "Share with guests",
              body: "We customise and deliver your finished invitation for WhatsApp.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-[#E8DFD4] bg-white/90 p-5"
            >
              <h3 className="font-bold text-[#1A1210]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C4A42]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CustomDesignShowcase />
      <TemplateOrCustomize />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-8 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#1A1210] sm:text-4xl">
          Need help choosing?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[#5C4A42]">
          Chat with us on WhatsApp — we&apos;ll recommend the right design for
          your ceremony.
        </p>
        <a
          href={`https://wa.me/${COMPANY.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white"
        >
          WhatsApp {COMPANY.phoneDisplay}
        </a>
      </section>
    </main>
  );
}
