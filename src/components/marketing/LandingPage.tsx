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
    faith: "Muslim · Urdu style",
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
          Edit · Preview · Download PNG/PDF
        </motion.div>

        <motion.h1
          className="max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-[var(--ink)] md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Professional wedding invitation{" "}
          <span className="pr-gradient-text">cards for every faith</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          Pick an example design, edit names and date, choose your language —
          then download a print-ready PNG or PDF for WhatsApp and local print
          shops. Custom designs? Message us at{" "}
          <strong className="text-[var(--ink)]">{COMPANY.phoneDisplay}</strong>.
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
            Browse example cards
          </Link>
          <Link
            href="/pricing"
            className="pr-ghost-btn rounded-2xl px-7 py-3.5 text-sm font-semibold"
          >
            Pricing from ₹99
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
            Example invitations
          </p>
          <h2 className="text-3xl font-bold text-[var(--ink)]">
            Choose one — customise — download
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Each card opens in our studio. Edit details, preview in your language,
            then unlock PNG/PDF download.
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
                      INVITATION
                    </p>
                    <p className="invite-name mt-2 text-xl text-[#4A0E18]">
                      {card.label}
                    </p>
                    <p className="mt-2 text-[10px] text-[#4A0E18]/55">
                      Tap to customise →
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
          <Link
            href="/create"
            className="pr-gradient-text text-sm font-semibold"
          >
            See all {">"} 25 card designs →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "1 · Pick an example",
              body: "Browse ceremonial card designs for Hindu, Muslim, Christian, Sikh, Jain & interfaith.",
            },
            {
              title: "2 · Edit & preview",
              body: "Set faith, language, names, and date. Preview exactly what you will share.",
            },
            {
              title: "3 · Download PNG/PDF",
              body: "Sign in, pay from ₹99, get clean files for WhatsApp groups and print shops.",
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

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
            All faiths & languages
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)] md:text-4xl">
            Built for Indian families
          </h2>
          <p className="mt-4 text-[var(--ink-soft)]">
            English, Kannada, Tamil, Telugu, Hindi, and Malayalam — with respectful
            blessings and regional styling.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { key: "hindu", label: "Hindu", icon: "🪔", card: "diya-vivah-card" },
            { key: "muslim", label: "Muslim", icon: "☪", card: "palace-envelope" },
            { key: "christian", label: "Christian", icon: "✝", card: "classic-ornate" },
            { key: "sikh", label: "Sikh", icon: "☬", card: "temple-dawn" },
            { key: "jain", label: "Jain", icon: "🕉", card: "peacock-palace-card" },
            { key: "interfaith", label: "Interfaith", icon: "🤝", card: "watercolour-shaadi-card" },
          ].map((meta, i) => (
            <motion.article
              key={meta.key}
              className="group rounded-3xl border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-white"
                style={{ background: "var(--brand-gradient)" }}
              >
                {meta.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)]">{meta.label}</h3>
              <Link
                href={`/create/${meta.card}?faith=${meta.key}&ready=1`}
                className="pr-gradient-text mt-6 inline-flex text-sm font-semibold transition group-hover:translate-x-1"
              >
                Customise {meta.label} card →
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)] md:text-4xl">
          Ready to share your invitation?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[var(--ink-soft)]">
          Start with an example card today — or WhatsApp us for a fully custom design.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/create"
            className="pr-gradient-btn inline-flex rounded-2xl px-8 py-3.5 text-sm font-semibold"
          >
            Browse example cards
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
