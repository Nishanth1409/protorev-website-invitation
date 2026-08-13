"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { invites, faithMeta } from "@/data/invites";
import { TemplateOrCustomize } from "./TemplateOrCustomize";
import { CustomDesignShowcase } from "./CustomDesignShowcase";
import { COMPANY } from "@/data/contact";

export function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-[rgba(91,74,255,0.12)] blur-3xl" />
        <div className="absolute -right-16 top-24 h-[24rem] w-[24rem] rounded-full bg-[rgba(6,182,212,0.12)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full bg-[rgba(139,92,246,0.1)] blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[88svh] max-w-5xl flex-col items-center justify-center px-6 pb-14 pt-16 text-center">
        <motion.div
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-4 py-1.5 text-xs font-medium text-[var(--ink-soft)] shadow-[var(--shadow-card)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="h-2 w-2 rounded-full bg-[var(--mint)]" />
          Available for wedding projects
        </motion.div>

        <motion.p
          className="mb-4 max-w-xl text-sm font-medium tracking-wide text-[var(--grad-a)] md:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.03 }}
        >
          {COMPANY.tagline}
        </motion.p>

        <motion.h1
          className="max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-[var(--ink)] md:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          Invitations that feel{" "}
          <span className="pr-gradient-text">personal, sacred & share-ready</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          We are a young creative team under Protorev Digital — careful with every
          detail, proud of every design. Choose a polished template, or ask us to
          customise a ceremonial invite for your family, faith, and language.
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
            Use a template
          </Link>
          <Link
            href="/pricing"
            className="pr-ghost-btn rounded-2xl px-7 py-3.5 text-sm font-semibold"
          >
            See pricing →
          </Link>
        </motion.div>

        <motion.p
          className="mt-8 max-w-lg text-sm italic text-[var(--ink-mute)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
        >
          “Fresh hands. Careful craft. Invitations that feel like they belong to you.”
        </motion.p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Templates ready today",
              body: "Preview cards & websites across faiths and languages — then download or share.",
            },
            {
              title: "Custom when you need magic",
              body: "Blessing covers, photos, family wording — message us and we design it for you.",
            },
            {
              title: "Backed by Protorev Digital",
              body: "Strategy-first creatives who treat your wedding invite like a real product.",
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

      <div id="customise">
        <CustomDesignShowcase />
        <TemplateOrCustomize />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-8">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/create"
            className="rounded-3xl border border-[var(--line)] bg-white p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C2410C]">
              Invitation cards
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[var(--ink)]">
              Beautiful cards — PNG & PDF
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              Ceremonial printable designs inspired by blessing-first invitation
              traditions. Download for WhatsApp or print shops.
            </p>
          </Link>
          <Link
            href="/create"
            className="rounded-3xl border border-[var(--line)] bg-white p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8]">
              Event page websites
            </p>
            <h2 className="mt-3 text-2xl font-bold text-[var(--ink)]">
              Full guest invitation sites
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              Opening blessings, story, countdown, music, map — a complete wedding
              website experience for your guests.
            </p>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
            Faith libraries
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)] md:text-4xl">
            Designed with respect for every tradition
          </h2>
          <p className="mt-4 text-[var(--ink-soft)]">
            Hindu, Muslim, Christian, Sikh, Jain, and interfaith — with English,
            Kannada, Tamil, Telugu, Hindi, and Malayalam ready in studio.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(faithMeta).map(([key, meta], i) => {
            const demo = invites.find((inv) => inv.faith === key);
            return (
              <motion.article
                key={key}
                className="group rounded-3xl border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-white"
                  style={{ background: "var(--brand-gradient)" }}
                  aria-hidden
                >
                  {meta.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)]">{meta.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {meta.blurb}
                </p>
                {demo && (
                  <Link
                    href={`/invite/${demo.slug}`}
                    className="pr-gradient-text mt-6 inline-flex text-sm font-semibold transition group-hover:translate-x-1"
                  >
                    Preview {demo.bride.split(" ")[0]} & {demo.groom.split(" ")[0]} →
                  </Link>
                )}
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-[2rem] border border-[var(--line)] bg-white px-8 py-14 shadow-[var(--shadow-soft)] md:px-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-c)]">
            Why clients trust us
          </p>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight text-[var(--ink)] md:text-4xl">
            We may be beginning — we never rush the sacred details
          </h2>
          <ul className="mt-8 grid gap-4 text-sm text-[var(--ink-soft)] md:grid-cols-2">
            {[
              "Clear choice: ready template or fully customised design",
              "Invitation cards with PNG & PDF download",
              "Full event websites with music, map & countdown",
              "Multi-faith & multi-language studio built in",
              "WhatsApp & email support for personal custom work",
              "Crafted under the Protorev Digital standard",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="pr-gradient-text mt-0.5 font-bold">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 pt-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--ink)] md:text-4xl">
          Let your invitation speak before you do
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-[var(--ink-soft)]">
          Start with a template for confidence today — or message us for a custom
          ceremonial design that feels entirely yours.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/create"
            className="pr-gradient-btn inline-flex rounded-2xl px-8 py-3.5 text-sm font-semibold"
          >
            Explore templates
          </Link>
          <Link
            href="#customise"
            className="pr-ghost-btn inline-flex rounded-2xl px-8 py-3.5 text-sm font-semibold"
          >
            Talk to us
          </Link>
        </div>
      </section>
    </main>
  );
}
