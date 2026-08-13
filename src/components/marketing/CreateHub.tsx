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
import { TemplateOrCustomize } from "./TemplateOrCustomize";
import { CustomDesignShowcase } from "./CustomDesignShowcase";

type Filter = "all" | InviteFormatId;

export function CreateHub() {
  const searchParams = useSearchParams();
  const initialFormat = searchParams.get("format");
  const [filter, setFilter] = useState<Filter>(
    initialFormat === "event-page" ? "event-page" : "invitation-card",
  );
  const [ceremony, setCeremony] = useState<CeremonyCategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const themes = useMemo(() => {
    const q = query.trim().toLowerCase();
    return createThemes.filter((t) => {
      if (filter !== "all" && t.format !== filter) return false;
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
  }, [filter, ceremony, query]);

  const cards = themes.filter((t) => t.format === "invitation-card");
  const pages = themes.filter((t) => t.format === "event-page");
  const totalCombos = createThemes.length * 6 * 6;

  return (
    <main className="relative overflow-hidden bg-[var(--background)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-10 h-[22rem] w-[22rem] rounded-full bg-[rgba(91,74,255,0.1)] blur-3xl" />
        <div className="absolute right-0 top-40 h-[20rem] w-[20rem] rounded-full bg-[rgba(6,182,212,0.1)] blur-3xl" />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-8 pt-14 text-center sm:pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
          Create with Protorev
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-[var(--ink)] md:text-5xl">
          Example invitation cards —{" "}
          <span className="pr-gradient-text italic">edit & download</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--ink-soft)] md:text-lg">
          Pick a design, set faith & language, edit names and date, then download
          PNG or PDF from ₹99. Need fully custom work? WhatsApp us at{" "}
          <strong className="text-[var(--ink)]">+91 90197 26464</strong>.
        </p>
        <p className="mt-4 text-sm font-medium text-[var(--ink-mute)]">
          {createThemes.length} designs · {allCeremonyIds.length} ceremony types · 6
          faiths · 6 languages · {totalCombos.toLocaleString()} preview combinations
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-8 md:grid-cols-2">
        {(
          [
            "invitation-card",
            "event-page",
          ] as const
        ).map((id) => {
          const meta = formatMeta[id];
          const count = createThemes.filter((t) => t.format === id).length;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`rounded-3xl border p-6 text-left transition ${
                filter === id
                  ? "border-transparent shadow-[var(--shadow-soft)]"
                  : "border-[var(--line)] bg-white hover:-translate-y-0.5"
              }`}
              style={
                filter === id
                  ? {
                      background:
                        id === "invitation-card"
                          ? "linear-gradient(135deg,#fff7ed,#fff)"
                          : "linear-gradient(135deg,#eff6ff,#fff)",
                    }
                  : undefined
              }
            >
              <div className="flex items-center justify-between gap-3">
                <p
                  className="text-sm font-semibold"
                  style={{
                    color: id === "invitation-card" ? "#C2410C" : "#1D4ED8",
                  }}
                >
                  {meta.label}
                </p>
                <span className="rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-[var(--ink-soft)]">
                  {count} themes
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                {meta.description}
              </p>
            </button>
          );
        })}
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-mute)]">
          Ceremony type
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCeremony("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              ceremony === "all"
                ? "pr-gradient-btn"
                : "border border-[var(--line)] bg-white text-[var(--ink-soft)]"
            }`}
          >
            All ceremonies
          </button>
          {allCeremonyIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setCeremony(id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                ceremony === id
                  ? "pr-gradient-btn"
                  : "border border-[var(--line)] bg-white text-[var(--ink-soft)]"
              }`}
            >
              {ceremonyMeta[id].emoji} {ceremonyMeta[id].short}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 pb-8">
        {(
          [
            ["all", "All designs"],
            ["invitation-card", "Invitation cards"],
            ["event-page", "Event page websites"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filter === id
                ? "pr-gradient-btn"
                : "border border-[var(--line)] bg-white text-[var(--ink-soft)] hover:text-[var(--ink)]"
            }`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto w-full sm:w-64">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search designs..."
            className="w-full rounded-full border border-[var(--line)] bg-white px-4 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--grad-a)]"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {filter === "all" ? (
          <>
            <ThemeGroup title="Invitation cards" themes={cards} />
            <ThemeGroup
              title="Event page websites"
              themes={pages}
              className="mt-14"
            />
          </>
        ) : (
          <ThemeGroup
            title={
              filter === "invitation-card"
                ? "Invitation cards"
                : "Event page websites"
            }
            themes={themes}
          />
        )}
        {themes.length === 0 && (
          <p className="py-16 text-center text-[var(--ink-soft)]">
            No designs match your search.
          </p>
        )}
      </section>

      <CustomDesignShowcase />
      <TemplateOrCustomize />
    </main>
  );
}

function ThemeGroup({
  title,
  themes,
  className = "",
}: {
  title: string;
  themes: CreateTheme[];
  className?: string;
}) {
  if (themes.length === 0) return null;
  return (
    <div className={className}>
      <h2 className="mb-6 text-2xl font-bold text-[var(--ink)]">{title}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme, i) => (
          <ThemeCard key={theme.id} theme={theme} index={i} />
        ))}
      </div>
    </div>
  );
}

function ThemeCard({ theme, index }: { theme: CreateTheme; index: number }) {
  const isCard = theme.format === "invitation-card";
  const t = theme.theme;
  const cat = theme.ceremony ?? "wedding";
  const cMeta = ceremonyMeta[cat];
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: (index % 6) * 0.04 }}
      className="group overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
    >
      <div
        className="relative h-44 overflow-hidden"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${t.glow}, transparent 45%), linear-gradient(145deg, ${t.bgDeep}, ${t.bg})`,
        }}
      >
        <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
          {cMeta.emoji} {isCard ? "Card" : "Website"}
        </span>
        {theme.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-[rgba(250,204,21,0.92)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black">
            {theme.badge}
          </span>
        )}

        <div
          className="absolute inset-x-8 bottom-5 top-12 rounded-2xl border px-4 py-5 text-center backdrop-blur-sm transition duration-300 group-hover:scale-[1.02]"
          style={{
            borderColor: t.border,
            background: t.card,
            boxShadow: `0 16px 40px ${t.glow}`,
            color: t.text,
          }}
        >
          <p className="text-[10px] tracking-[0.28em]" style={{ color: t.accent }}>
            {cMeta.short.toUpperCase()}
          </p>
          <p
            className="mt-2 font-[family-name:var(--font-script)] text-xl"
            style={{ color: t.accentSoft || t.accent }}
          >
            {theme.name.split(" ")[0]}
          </p>
          <div
            className="mx-auto mt-3 h-8 w-8 rounded-full border text-xs leading-8"
            style={{ borderColor: t.accent, color: t.accent }}
          >
            ✦
          </div>
        </div>
      </div>
      <div className="p-5">
        <p className="mb-1 text-xs font-medium" style={{ color: theme.previewAccent }}>
          {cMeta.label} · {isCard ? "PNG + PDF" : "Guest website"}
        </p>
        <h3 className="text-lg font-bold text-[var(--ink)]">{theme.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--ink-soft)]">
          {theme.blurb}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/create/${theme.id}?ready=1`}
            className="pr-gradient-btn rounded-xl px-4 py-2 text-xs font-semibold"
          >
            {isCard ? "Customise & download" : "Open website theme"}
          </Link>
          <Link
            href={`/create/${theme.id}?ready=1`}
            className="rounded-xl border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
          >
            Preview
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
