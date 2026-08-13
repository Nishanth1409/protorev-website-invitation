"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { createThemes, type CreateTheme } from "@/data/themes";
import type { InviteFormatId } from "@/data/types";
import {
  allLookFamilies,
  lookFromDesignStyle,
  lookMeta,
  type LookFamily,
} from "@/data/lookFamilies";
import {
  featuredGalleryIds,
  galleryPresentation,
} from "@/data/galleryPresentation";
import { COMPANY, customizeWhatsAppUrl } from "@/data/contact";
import { formatInr, getPlan } from "@/data/pricing";
import { TemplateOrCustomize } from "./TemplateOrCustomize";
import { CustomDesignShowcase } from "./CustomDesignShowcase";
import { PhoneMockup } from "./PhoneMockup";

type FormatFilter = InviteFormatId;
type LookFilter = "all" | LookFamily | "custom";

export function CreateHub() {
  const searchParams = useSearchParams();
  const initialFormat = searchParams.get("format");
  const [format, setFormat] = useState<FormatFilter>(
    initialFormat === "invitation-card" ? "invitation-card" : "event-page",
  );
  const [look, setLook] = useState<LookFilter>("all");

  const themes = useMemo(() => {
    let list = createThemes.filter((t) => t.format === format);

    if (look === "custom") {
      list = list.filter(
        (t) =>
          featuredGalleryIds.includes(t.id) ||
          t.badge === "Premium" ||
          t.badge === "Flagship",
      );
    } else if (look !== "all") {
      list = list.filter((t) => lookFromDesignStyle(t.designStyle) === look);
    }

    return list;
  }, [format, look]);

  const startingPrice = getPlan("custom-card")?.priceInr ?? 699;

  return (
    <main className="relative overflow-hidden bg-[#F7F4EF] pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#fff8f0,transparent_55%)]" />

      <section className="mx-auto max-w-3xl px-5 pb-8 pt-14 text-center">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8B6914]">
          Protorev Digital
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[1.85rem] font-semibold leading-[1.15] text-[#1A1210] sm:text-4xl">
          A website as beautiful
          <br />
          as your wedding day
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#5C4A42]">
          Your guests will feel it before they even arrive.
        </p>
        <p className="mt-3 text-xs font-medium tracking-wide text-[#8B6914]">
          Design · Personalise · Share
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setFormat("event-page")}
            className={`rounded-full px-5 py-2.5 text-xs font-semibold ${
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
            className={`rounded-full px-5 py-2.5 text-xs font-semibold ${
              format === "invitation-card"
                ? "bg-[#1A1210] text-[#F7F4EF]"
                : "border border-[#D9CFC4] bg-white text-[#5C4A42]"
            }`}
          >
            Invitation cards
          </button>
          <Link
            href="/pricing"
            className="rounded-full border border-[#D9CFC4] bg-white px-5 py-2.5 text-xs font-semibold text-[#5C4A42]"
          >
            Packages & pricing →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5">
        <div className="flex flex-wrap justify-center gap-1.5 border-y border-[#E8DFD4] py-3">
          {(["all", ...allLookFamilies, "custom"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setLook(id)}
              className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                look === id ? "bg-[#4A0E18] text-[#F8F1E3]" : "text-[#7A6A60]"
              }`}
            >
              {id === "all" ? "All" : id === "custom" ? "Custom" : lookMeta[id].label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] text-[#8A7A70]">
          Every design includes · Invitation · Events · Gallery · WhatsApp delivery
        </p>
      </section>

      {/* Floating phone gallery — full width, phones float in soft stages */}
      <section className="mx-auto mt-10 grid max-w-6xl gap-16 px-5 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme, i) => (
          <TemplateMobileCard key={theme.id} theme={theme} index={i} />
        ))}
        {themes.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-[#7A6A60]">
            No designs in this collection yet.
          </p>
        )}
      </section>

      <section className="mx-auto mt-16 max-w-lg px-5">
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#2A0810,#4A0E18)] px-5 py-8 text-center text-[#F8F1E3]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E8C56A]">
            ✦ Custom design ✦
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl">
            Fully bespoke for your story
          </h2>
          <p className="mt-2 text-xs text-white/75">
            Share inspiration on WhatsApp — we craft a one-of-a-kind floating
            invitation experience.
          </p>
          <p className="mt-3 text-base font-semibold text-[#E8C56A]">
            Starting {formatInr(startingPrice)}
          </p>
          <a
            href={customizeWhatsAppUrl({ format })}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Customize design
          </a>
        </div>
      </section>

      <CustomDesignShowcase />
      <TemplateOrCustomize />

      <p className="mx-auto mt-8 max-w-lg px-5 text-center text-[10px] text-[#8A7A70]">
        Need help choosing? WhatsApp {COMPANY.phoneDisplay}
      </p>
    </main>
  );
}

function TemplateMobileCard({
  theme,
  index,
}: {
  theme: CreateTheme;
  index: number;
}) {
  const pres = galleryPresentation(theme);
  const isCard = theme.format === "invitation-card";
  const wa = customizeWhatsAppUrl({
    themeName: pres.title,
    format: theme.format,
  });
  const price = getPlan(isCard ? "custom-card" : "custom-website")?.priceInr;
  const compareAt = price != null ? Math.round(price * 1.45) : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.06 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        <Link
          href={`/create/${theme.id}?ready=1`}
          className="rounded-full bg-[#1A1210] px-4 py-2 text-[11px] font-semibold text-[#F7F4EF]"
        >
          Live preview
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-[#D9CFC4] bg-white px-4 py-2 text-[11px] font-semibold text-[#1A1210]"
        >
          Customize design
        </a>
      </div>

      {/* Soft floating stage behind the phone */}
      <div
        className="relative w-full max-w-[300px] rounded-[2rem] px-4 pb-6 pt-8"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${theme.theme.glow}, transparent 60%), linear-gradient(180deg, ${theme.theme.bgDeep}66 0%, transparent 75%)`,
        }}
      >
        {(pres.featured || theme.badge === "Premium") && (
          <span className="absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-full bg-[#E8C56A] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#2A0810]">
            {theme.badge === "Premium" ? "Luxe" : "Featured"}
          </span>
        )}
        <PhoneMockup theme={theme} />
      </div>

      <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-[#1A1210]">
        {pres.title}
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#5C4A42]">
        {pres.tagline}
      </p>

      {price != null && (
        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
          {compareAt != null && (
            <span className="text-[#8A7A70] line-through">{formatInr(compareAt)}</span>
          )}
          <span className="font-bold text-[#1A1210]">{formatInr(price)}</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-[#1A1210] px-4 py-2.5 text-xs font-semibold text-[#F7F4EF]"
        >
          Customize design
        </a>
        <Link
          href={`/create/${theme.id}?ready=1`}
          className="rounded-full border border-[#D9CFC4] px-4 py-2.5 text-xs font-semibold text-[#1A1210]"
        >
          Try this design
        </Link>
      </div>
    </motion.article>
  );
}
