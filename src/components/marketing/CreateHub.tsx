"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  createThemes,
  formatMeta,
  type CreateTheme,
} from "@/data/themes";
import type { InviteFormatId } from "@/data/types";
import {
  allCeremonyIds,
  ceremonyMeta,
  type CeremonyCategoryId,
} from "@/data/ceremony";
import {
  allLookFamilies,
  lookFromDesignStyle,
  lookMeta,
  type LookFamily,
} from "@/data/lookFamilies";
import { COMPANY, customizeWhatsAppUrl } from "@/data/contact";
import { formatInr, getPlan } from "@/data/pricing";
import { TemplateOrCustomize } from "./TemplateOrCustomize";
import { CustomDesignShowcase } from "./CustomDesignShowcase";
import { PhoneMockup } from "./PhoneMockup";

type FormatFilter = "all" | InviteFormatId;
type LookFilter = "all" | LookFamily;

/**
 * Premium theme gallery inspired by ShaadiPath-style showcase:
 * phone mockups, look filters, Live Preview + WhatsApp enquire.
 */
export function CreateHub() {
  const searchParams = useSearchParams();
  const initialFormat = searchParams.get("format");
  const [format, setFormat] = useState<FormatFilter>(
    initialFormat === "invitation-card"
      ? "invitation-card"
      : initialFormat === "event-page"
        ? "event-page"
        : "event-page",
  );
  const [look, setLook] = useState<LookFilter>("all");
  const [ceremony, setCeremony] = useState<CeremonyCategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const themes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return createThemes.filter((t) => {
      if (format !== "all" && t.format !== format) return false;
      if (look !== "all" && lookFromDesignStyle(t.designStyle) !== look) {
        return false;
      }
      const cat = t.ceremony ?? "wedding";
      if (ceremony !== "all" && cat !== ceremony) return false;
      if (!q) return true;
      const meta = ceremonyMeta[cat];
      return (
        t.name.toLowerCase().includes(q) ||
        t.blurb.toLowerCase().includes(q) ||
        t.designStyle.includes(q) ||
        t.experience.includes(q) ||
        meta.label.toLowerCase().includes(q)
      );
    });
  }, [format, look, ceremony, query]);

  const startingPrice = getPlan("custom-card")?.priceInr ?? 699;

  return (
    <main className="relative overflow-hidden bg-[#F7F4EF]">
      {/* Atmosphere — warm paper, not purple SaaS */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#fff8f0,transparent_55%)]" />
        <div className="absolute -right-20 top-40 h-[28rem] w-[28rem] rounded-full bg-[rgba(196,154,74,0.12)] blur-3xl" />
        <div className="absolute -left-16 bottom-20 h-[22rem] w-[22rem] rounded-full bg-[rgba(74,14,24,0.06)] blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-14 text-center sm:px-6 sm:pt-20">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8B6914]">
          Protorev Digital · Invitation studio
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.15] tracking-tight text-[#1A1210] sm:text-5xl md:text-6xl">
          A website as beautiful
          <br className="hidden sm:block" /> as your wedding day
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#5C4A42] sm:text-lg">
          Your guests will feel it before they even arrive. Browse designs —
          we customise and deliver. WhatsApp{" "}
          <strong className="text-[#1A1210]">{COMPANY.phoneDisplay}</strong>
        </p>
        <p className="mt-4 text-sm font-medium tracking-wide text-[#8B6914]">
          Design · Personalise · Share
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setFormat("event-page")}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              format === "event-page"
                ? "bg-[#1A1210] text-[#F7F4EF]"
                : "border border-[#D9CFC4] bg-white text-[#5C4A42]"
            }`}
          >
            Wedding websites
          </button>
          <button
            type="button"
            onClick={() => setFormat("invitation-card")}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              format === "invitation-card"
                ? "bg-[#1A1210] text-[#F7F4EF]"
                : "border border-[#D9CFC4] bg-white text-[#5C4A42]"
            }`}
          >
            Invitation cards
          </button>
          <Link
            href="/pricing"
            className="rounded-full border border-[#D9CFC4] bg-white px-5 py-2.5 text-sm font-semibold text-[#5C4A42]"
          >
            View packages & pricing →
          </Link>
        </div>
      </section>

      {/* Look filters — ALL / LUXE / ROYAL / FESTIVE / MINIMAL */}
      <section className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 border-y border-[#E8DFD4] py-4">
          <button
            type="button"
            onClick={() => setLook("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition ${
              look === "all"
                ? "bg-[#4A0E18] text-[#F8F1E3]"
                : "text-[#7A6A60] hover:text-[#1A1210]"
            }`}
          >
            All
          </button>
          {allLookFamilies.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setLook(id)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition ${
                look === id
                  ? "bg-[#4A0E18] text-[#F8F1E3]"
                  : "text-[#7A6A60] hover:text-[#1A1210]"
              }`}
            >
              {lookMeta[id].label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-[#8A7A70]">
          Every design includes · Invitation · Events · Gallery-ready layout ·
          WhatsApp delivery
        </p>
      </section>

      {/* Ceremony + search */}
      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:px-6">
        <div className="flex flex-1 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCeremony("all")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
              ceremony === "all"
                ? "bg-[#C9A227]/25 text-[#4A0E18]"
                : "bg-white text-[#7A6A60] ring-1 ring-[#E8DFD4]"
            }`}
          >
            All ceremonies
          </button>
          {allCeremonyIds.slice(0, 6).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCeremony(id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                ceremony === id
                  ? "bg-[#C9A227]/25 text-[#4A0E18]"
                  : "bg-white text-[#7A6A60] ring-1 ring-[#E8DFD4]"
              }`}
            >
              {ceremonyMeta[id].emoji} {ceremonyMeta[id].short}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search designs…"
          className="w-full rounded-full border border-[#E8DFD4] bg-white px-4 py-2.5 text-sm text-[#1A1210] outline-none focus:border-[#C9A227] sm:w-56"
        />
      </section>

      {/* Theme grid */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme, i) => (
            <ThemeShowcaseCard key={theme.id} theme={theme} index={i} />
          ))}
        </div>
        {themes.length === 0 && (
          <p className="py-20 text-center text-[#7A6A60]">
            No designs match your filters.
          </p>
        )}

        {/* Custom banner */}
        <div className="mt-14 overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,#2A0810,#4A0E18)] px-6 py-10 text-center text-[#F8F1E3] sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E8C56A]">
            ✦ Custom design ✦
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
            Fully bespoke — designed around your story
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/75">
            Not seeing the exact vibe? Message us with inspiration photos. We
            craft a one-of-a-kind invitation website or card for your family.
          </p>
          <p className="mt-4 text-lg font-semibold text-[#E8C56A]">
            Starting {formatInr(startingPrice)}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={customizeWhatsAppUrl({ format: "invitation-card" })}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
            >
              WhatsApp custom order
            </a>
            <Link
              href="/pricing"
              className="rounded-full border border-[#E8C56A]/50 px-6 py-3 text-sm font-semibold text-[#E8C56A]"
            >
              View packages
            </Link>
          </div>
        </div>
      </section>

      <CustomDesignShowcase />
      <TemplateOrCustomize />
    </main>
  );
}

function ThemeShowcaseCard({
  theme,
  index,
}: {
  theme: CreateTheme;
  index: number;
}) {
  const look = lookFromDesignStyle(theme.designStyle);
  const isCard = theme.format === "invitation-card";
  const cat = theme.ceremony ?? "wedding";
  const wa = customizeWhatsAppUrl({
    themeName: theme.name,
    format: theme.format,
  });
  const price = getPlan(
    isCard ? "custom-card" : "custom-website",
  )?.priceInr;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 6) * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-[#E8DFD4] bg-white shadow-[0_12px_40px_rgba(26,18,16,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(26,18,16,0.1)]"
    >
      {/* Phone stage */}
      <div
        className="relative flex justify-center px-4 pb-2 pt-8"
        style={{
          background: `linear-gradient(180deg, ${theme.theme.bgDeep} 0%, #F7F4EF 100%)`,
          minHeight: 320,
        }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          {lookMeta[look].label}
          {theme.badge ? ` · ${theme.badge}` : ""}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[#4A0E18]">
          {ceremonyMeta[cat].emoji} {isCard ? "Card" : "Website"}
        </span>
        <PhoneMockup theme={theme} />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B6914]">
          {lookMeta[look].label} · {formatMeta[theme.format].short}
        </p>
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[#1A1210]">
          {theme.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-[#5C4A42]">
          {theme.blurb}
        </p>
        {price != null && (
          <p className="mt-3 text-sm font-semibold text-[#1A1210]">
            From {formatInr(price)}
            <span className="ml-2 text-xs font-normal text-[#8A7A70]">
              · customised for you
            </span>
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/create/${theme.id}?ready=1`}
            className="rounded-full bg-[#1A1210] px-4 py-2.5 text-xs font-semibold text-[#F7F4EF] transition group-hover:bg-[#4A0E18]"
          >
            Live preview
          </Link>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#D9CFC4] px-4 py-2.5 text-xs font-semibold text-[#1A1210] transition hover:border-[#25D366] hover:text-[#128C7E]"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </motion.article>
  );
}
