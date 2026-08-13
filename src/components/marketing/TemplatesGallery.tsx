"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { invites, faithMeta } from "@/data/invites";
import {
  designStyleMeta,
  languageMeta,
  type DesignStyleId,
  type FaithId,
  type LanguageId,
} from "@/data/types";

const faithFilters: Array<FaithId | "all"> = [
  "all",
  "hindu",
  "muslim",
  "christian",
  "sikh",
  "jain",
  "interfaith",
];

const langFilters: Array<LanguageId | "all"> = [
  "all",
  "en",
  "kn",
  "ta",
  "te",
  "hi",
  "ml",
];

const styleFilters: Array<DesignStyleId | "all"> = [
  "all",
  "royal-night",
  "garden-bloom",
  "modern-clean",
  "coastal-mist",
  "festival-bright",
  "luxe-marble",
];

export function TemplatesGallery() {
  const [faith, setFaith] = useState<(typeof faithFilters)[number]>("all");
  const [lang, setLang] = useState<(typeof langFilters)[number]>("all");
  const [style, setStyle] = useState<(typeof styleFilters)[number]>("all");

  const filtered = useMemo(
    () =>
      invites.filter((i) => {
        const faithOk = faith === "all" || i.faith === faith;
        const langOk = lang === "all" || i.language === lang;
        const styleOk = style === "all" || i.designStyle === style;
        return faithOk && langOk && styleOk;
      }),
    [faith, lang, style],
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--background)] pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[rgba(91,74,255,0.1)] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--mint)]" />
          Multiple design systems
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--ink)] md:text-5xl">
          Invitation <span className="pr-gradient-text">styles</span>
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--ink-soft)]">
          Six different creative templates — Royal Night, Garden Bloom, Modern Clean,
          Coastal Mist, Festival Bright, Luxe Marble — across faiths and languages.
          Happy celebration music on every demo.
        </p>

        <div className="mt-8 space-y-3">
          <div className="flex flex-wrap gap-2">
            {styleFilters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  style === s
                    ? "pr-gradient-btn text-white"
                    : "border border-[var(--line)] bg-white text-[var(--ink-soft)]"
                }`}
              >
                {s === "all" ? "All styles" : designStyleMeta[s].label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {faithFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFaith(f)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  faith === f
                    ? "pr-gradient-btn text-white"
                    : "border border-[var(--line)] bg-white text-[var(--ink-soft)]"
                }`}
              >
                {f === "all" ? "All faiths" : faithMeta[f]?.label || f}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {langFilters.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  lang === l
                    ? "pr-gradient-btn text-white"
                    : "border border-[var(--line)] bg-white text-[var(--ink-soft)]"
                }`}
              >
                {l === "all" ? "All languages" : languageMeta[l].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((invite, i) => (
          <motion.article
            key={invite.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[var(--shadow-card)]"
          >
            <div
              className="relative px-6 pb-8 pt-10 text-center"
              style={{
                background: `linear-gradient(165deg, ${invite.theme.bgDeep}, ${invite.theme.bg})`,
                color: invite.theme.text,
              }}
            >
              <p
                className="relative mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em]"
                style={{ color: invite.theme.accentSoft }}
              >
                {invite.styleLabel}
              </p>
              <p className="relative mb-1 text-xs opacity-80">
                {invite.faithLabel} · {invite.languageLabel}
              </p>
              <h2 className="relative mt-4 font-[family-name:var(--font-display)] text-2xl">
                {invite.bride}
              </h2>
              <p className="relative my-1" style={{ color: invite.theme.accent }}>
                &
              </p>
              <h2 className="relative mb-4 font-[family-name:var(--font-display)] text-2xl">
                {invite.groom}
              </h2>
              <p className="relative text-xs tracking-widest opacity-80">
                {invite.weddingDateLabel}
              </p>
              <Link
                href={`/invite/${invite.slug}`}
                className="relative mt-8 inline-flex rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em]"
                style={{
                  borderColor: invite.theme.accent,
                  color: invite.theme.accentSoft || invite.theme.text,
                }}
              >
                Open style demo
              </Link>
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-xs text-[var(--ink-mute)]">
              <span>{designStyleMeta[invite.designStyle]?.label}</span>
              <span className="pr-gradient-text font-semibold">{invite.regionLabel}</span>
            </div>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="pb-24 text-center text-sm text-[var(--ink-soft)]">
          No demos for this filter mix — try another style.
        </p>
      )}
    </main>
  );
}
