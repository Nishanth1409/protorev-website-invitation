"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TemplateOrCustomize } from "./TemplateOrCustomize";
import { CustomDesignShowcase } from "./CustomDesignShowcase";
import { COMPANY } from "@/data/contact";

const featuredCards = [
  {
    id: "diya-vivah-card",
    label: "Diya Vivah",
    faith: "Hindu · Kannada",
    accent: "#C2410C",
  },
  {
    id: "peacock-palace-card",
    label: "Peacock Palace",
    faith: "Hindu · Tamil",
    accent: "#7C3AED",
  },
  {
    id: "palace-envelope",
    label: "Palace Envelope",
    faith: "Muslim style",
    accent: "#0B3D2E",
  },
  {
    id: "temple-dawn",
    label: "Temple Dawn",
    faith: "Hindu · Telugu",
    accent: "#B45309",
  },
  {
    id: "mehendi-mandala-card",
    label: "Mehendi Mandala",
    faith: "Hindu · Hindi",
    accent: "#BE185D",
  },
  {
    id: "classic-ornate",
    label: "Classic Ornate",
    faith: "Christian · English",
    accent: "#5C2430",
  },
];

export function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[rgba(91,74,255,0.12)] blur-3xl" />
        <div className="absolute -right-16 top-24 h-[24rem] w-[24rem] rounded-full bg-[rgba(6,182,212,0.12)] blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[85svh] max-w-5xl flex-col items-center justify-center px-6 pb-14 pt-16 text-center">
        <motion.div
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--ink-soft)] shadow-[var(--shadow-card)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="h-2 w-2 rounded-full bg-[var(--mint)]" />
          Browse themes · We customise for you
        </motion.div>

        <motion.h1
          className="max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-[var(--ink)] md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Choose a theme.{" "}
          <span className="pr-gradient-text">We design your invitation.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          Browse our invitation examples. Tell us which theme you like and your
          details — names, date, faith, language, photos. Our team customises it
          and delivers the finished invitation. No login. No online payment. No
          self-download.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <Link
            href="/create"
            className="pr-gradient-btn rounded-2xl px-7 py-3.5 text-sm font-semibold"
          >
            Browse themes
          </Link>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-2xl bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white"
          >
            WhatsApp {COMPANY.phoneDisplay}
          </a>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
            Theme gallery
          </p>
          <h2 className="text-3xl font-bold text-[var(--ink)]">
            Pick a look — we make it yours
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Preview sample designs. When you find one you like, message us with
            the theme name and your details.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCards.map((card, i) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/create/${card.id}?ready=1`}
                className="group block overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <div
                  className="relative flex h-48 items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 50% 30%, ${card.accent}33, transparent 55%), linear-gradient(145deg,#2A0810,#4A0E18)`,
                  }}
                >
                  <div className="rounded-2xl border border-[#E8C56A]/40 bg-[#F8F1E3]/95 px-6 py-8 text-center shadow-lg transition group-hover:scale-[1.02]">
                    <p className="text-[10px] tracking-[0.25em] text-[#4A0E18]/60">
                      THEME EXAMPLE
                    </p>
                    <p className="invite-name mt-2 text-xl text-[#4A0E18]">
                      {card.label}
                    </p>
                    <p className="mt-2 text-[10px] text-[#4A0E18]/55">
                      Preview & enquire →
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium text-[var(--ink-mute)]">
                    {card.faith}
                  </p>
                  <h3 className="font-bold text-[var(--ink)]">{card.label}</h3>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/create" className="pr-gradient-text text-sm font-semibold">
            See all themes →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "1 · Choose a theme",
              body: "Browse ceremonial designs for every faith and language.",
            },
            {
              title: "2 · Message us",
              body: "WhatsApp or email the theme name + your names, date, photos.",
            },
            {
              title: "3 · We deliver",
              body: "Our team customises and sends your finished invitation files.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-[var(--line)] bg-white/90 p-5 shadow-[var(--shadow-card)]"
            >
              <h3 className="text-base font-bold text-[var(--ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CustomDesignShowcase />
      <TemplateOrCustomize />

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)] md:text-4xl">
          Ready to order your invitation?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[var(--ink-soft)]">
          Browse themes, then contact customer service. We handle the rest.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/create"
            className="pr-gradient-btn inline-flex rounded-2xl px-8 py-3.5 text-sm font-semibold"
          >
            Browse themes
          </Link>
          <a
            href={`https://wa.me/${COMPANY.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-2xl bg-[#25D366] px-8 py-3.5 text-sm font-semibold text-white"
          >
            WhatsApp {COMPANY.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  );
}
