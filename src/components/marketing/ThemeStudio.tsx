"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InvitationExperience } from "@/components/invite/InvitationExperience";
import type { CreateTheme } from "@/data/themes";
import { formatMeta } from "@/data/themes";
import {
  languageMeta,
  type FaithId,
  type LanguageId,
} from "@/data/types";
import {
  allFaithIds,
  allLanguageIds,
  assembleInvite,
} from "@/lib/buildInvite";
import { faithMeta } from "@/data/invites";

type Props = {
  theme: CreateTheme;
  initialFaith?: FaithId;
  initialLanguages?: LanguageId[];
  initialActiveLanguage?: LanguageId;
  /** When true, skip opening the setup sheet (deep-link already configured). */
  startReady?: boolean;
};

function uniqueLangs(list: LanguageId[]): LanguageId[] {
  return allLanguageIds.filter((id) => list.includes(id));
}

function formatLangSummary(langs: LanguageId[]) {
  if (langs.length === 0) return "—";
  if (langs.length === 1) return languageMeta[langs[0]].native;
  if (langs.length === 2) {
    return `${languageMeta[langs[0]].native} + ${languageMeta[langs[1]].native}`;
  }
  return `${langs.length} languages`;
}

/**
 * Theme preview studio:
 * - One faith
 * - Multiple languages (guest can switch on the invite)
 * - Sheet closes on confirm; reopen anytime to change
 */
export function ThemeStudio({
  theme,
  initialFaith = "hindu",
  initialLanguages = ["en"],
  initialActiveLanguage,
  startReady = false,
}: Props) {
  const seededLangs = uniqueLangs(
    initialLanguages.length ? initialLanguages : ["en"],
  );
  const seededActive =
    initialActiveLanguage && seededLangs.includes(initialActiveLanguage)
      ? initialActiveLanguage
      : seededLangs[0];

  const [faith, setFaith] = useState<FaithId>(initialFaith);
  const [languages, setLanguages] = useState<LanguageId[]>(seededLangs);
  const [activeLanguage, setActiveLanguage] =
    useState<LanguageId>(seededActive);

  const [draftFaith, setDraftFaith] = useState<FaithId | null>(
    startReady ? initialFaith : null,
  );
  const [draftLangs, setDraftLangs] = useState<LanguageId[]>(
    startReady ? seededLangs : [],
  );
  const [setupOpen, setSetupOpen] = useState(!startReady);
  const [ready, setReady] = useState(startReady);

  const invite = useMemo(
    () => assembleInvite(theme, faith, activeLanguage),
    [theme, faith, activeLanguage],
  );

  const format = formatMeta[theme.format];

  const persistUrl = (
    f: FaithId,
    langs: LanguageId[],
    active: LanguageId,
  ) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("faith", f);
    url.searchParams.set("langs", langs.join(","));
    url.searchParams.set("lang", active);
    url.searchParams.set("ready", "1");
    window.history.replaceState({}, "", url.toString());
  };

  const applySelection = (f: FaithId, langs: LanguageId[]) => {
    const clean = uniqueLangs(langs);
    if (!clean.length) return;
    const active = clean.includes(activeLanguage)
      ? activeLanguage
      : clean[0];
    setFaith(f);
    setLanguages(clean);
    setActiveLanguage(active);
    setReady(true);
    setSetupOpen(false);
    persistUrl(f, clean, active);
  };

  const toggleDraftLang = (id: LanguageId) => {
    setDraftLangs((prev) => {
      if (prev.includes(id)) {
        // Keep at least one language selected
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== id);
      }
      return uniqueLangs([...prev, id]);
    });
  };

  const openSetup = () => {
    setDraftFaith(faith);
    setDraftLangs(languages);
    setSetupOpen(true);
  };

  const switchLanguage = (id: LanguageId) => {
    if (!languages.includes(id)) return;
    setActiveLanguage(id);
    persistUrl(faith, languages, id);
  };

  const canOpen = Boolean(draftFaith && draftLangs.length > 0);

  return (
    <div className="relative min-h-screen bg-[#F7F4EF]">
      {(!ready || setupOpen) && (
      <div className="sticky top-0 z-[70] border-b border-[var(--line)] bg-[rgba(248,248,252,0.94)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <Link
              href="/create"
              className="text-xs font-medium text-[var(--ink-mute)] hover:text-[var(--ink)]"
            >
              ← All themes
            </Link>
            <h1 className="truncate text-base font-bold text-[var(--ink)] sm:text-lg">
              {theme.name}
            </h1>
            <p className="truncate text-[11px] text-[var(--ink-soft)] sm:text-xs">
              {format.label} · {theme.badge ?? "Studio"}
            </p>
          </div>

          {ready && !setupOpen ? (
            <button
              type="button"
              onClick={openSetup}
              className="shrink-0 rounded-full border border-[var(--line)] bg-white px-3 py-2 text-left shadow-[var(--shadow-card)] transition hover:border-[var(--grad-a)] sm:px-4"
              title="Change faith or languages"
            >
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-[var(--ink-mute)]">
                Your selection
              </span>
              <span className="text-sm font-semibold text-[var(--ink)]">
                {faithMeta[faith]?.icon} {faithMeta[faith]?.label} ·{" "}
                {formatLangSummary(languages)}
              </span>
              <span className="mt-0.5 block text-[11px] text-[var(--grad-a)]">
                Change →
              </span>
            </button>
          ) : (
            <p className="hidden text-xs text-[var(--ink-mute)] sm:block">
              Choose faith & languages
            </p>
          )}
        </div>

        {/* Guest language switcher — only enabled languages */}
        {ready && !setupOpen && languages.length > 1 && (
          <div className="border-t border-[var(--line)] bg-white/70">
            <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
              <span className="shrink-0 self-center text-[10px] font-semibold uppercase tracking-wide text-[var(--ink-mute)]">
                View in
              </span>
              {languages.map((id) => {
                const active = activeLanguage === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => switchLanguage(id)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      active
                        ? "pr-gradient-btn"
                        : "border border-[var(--line)] bg-white text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {languageMeta[id].native}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      )}

      <AnimatePresence>
        {setupOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 px-3 pb-3 pt-16 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="setup-title"
              className="max-h-[90svh] w-full max-w-xl overflow-y-auto rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--grad-a)]">
                Customize preview
              </p>
              <h2
                id="setup-title"
                className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink)]"
              >
                Preview this theme
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                See how this design looks for your faith and language.
                When you like a theme, WhatsApp us — we customise it with your
                names, photos, and details.
              </p>

              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--ink-mute)]">
                  1 · Faith / religion
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {allFaithIds.map((id) => {
                    const active = draftFaith === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setDraftFaith(id)}
                        className={`rounded-2xl border px-3 py-3 text-left transition ${
                          active
                            ? "border-transparent text-white shadow-[var(--shadow-soft)]"
                            : "border-[var(--line)] bg-[var(--background)] text-[var(--ink)] hover:border-[var(--grad-a)]"
                        }`}
                        style={
                          active
                            ? { background: "var(--brand-gradient)" }
                            : undefined
                        }
                      >
                        <span className="block text-lg leading-none">
                          {faithMeta[id]?.icon}
                        </span>
                        <span className="mt-1.5 block text-sm font-semibold">
                          {faithMeta[id]?.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-mute)]">
                    2 · Languages{" "}
                    <span className="normal-case tracking-normal text-[var(--grad-a)]">
                      (multi-select)
                    </span>
                  </p>
                  {draftLangs.length > 0 && (
                    <p className="text-[11px] font-medium text-[var(--ink-soft)]">
                      {draftLangs.length} selected
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {allLanguageIds.map((id) => {
                    const active = draftLangs.includes(id);
                    const disabled = !draftFaith;
                    return (
                      <button
                        key={id}
                        type="button"
                        disabled={disabled}
                        onClick={() => toggleDraftLang(id)}
                        aria-pressed={active}
                        className={`rounded-2xl border px-3 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-40 ${
                          active
                            ? "border-transparent text-white shadow-[var(--shadow-soft)]"
                            : "border-[var(--line)] bg-[var(--background)] text-[var(--ink)] hover:border-[var(--grad-a)]"
                        }`}
                        style={
                          active
                            ? { background: "var(--brand-gradient)" }
                            : undefined
                        }
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold">
                            {languageMeta[id].label}
                          </span>
                          <span
                            className={`text-xs ${active ? "text-white" : "text-[var(--ink-mute)]"}`}
                          >
                            {active ? "✓" : "+"}
                          </span>
                        </span>
                        <span
                          className={`mt-1 block text-xs ${active ? "text-white/85" : "text-[var(--ink-mute)]"}`}
                        >
                          {languageMeta[id].native}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {!draftFaith && (
                  <p className="mt-2 text-xs text-[var(--ink-mute)]">
                    Select a faith first, then one or more languages.
                  </p>
                )}
                {draftFaith && draftLangs.length > 0 && (
                  <p className="mt-3 text-xs font-medium text-[var(--ink-soft)]">
                    Selected:{" "}
                    {draftLangs.map((id) => languageMeta[id].label).join(", ")}
                  </p>
                )}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  disabled={!canOpen}
                  onClick={() => {
                    if (draftFaith && draftLangs.length) {
                      applySelection(draftFaith, draftLangs);
                    }
                  }}
                  className="pr-gradient-btn rounded-2xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Open theme preview
                </button>
                {draftFaith && (
                  <button
                    type="button"
                    onClick={() => setDraftLangs(allLanguageIds.slice())}
                    className="rounded-2xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--ink-soft)]"
                  >
                    Select all languages
                  </button>
                )}
                {ready && (
                  <button
                    type="button"
                    onClick={() => setSetupOpen(false)}
                    className="rounded-2xl border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--ink-soft)]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {ready ? (
        <InvitationExperience
          invite={invite}
          key={`${faith}-${activeLanguage}-${theme.id}`}
        />
      ) : (
        <div className="mx-auto flex min-h-[70svh] max-w-lg flex-col items-center justify-center px-6 text-center">
          <div
            className="mb-6 h-40 w-full max-w-xs rounded-3xl border"
            style={{
              background: `linear-gradient(145deg, ${theme.theme.bgDeep}, ${theme.theme.bg})`,
              borderColor: theme.theme.border,
              boxShadow: `0 20px 60px ${theme.theme.glow}`,
            }}
          />
          <h2 className="text-2xl font-bold text-[var(--ink)]">{theme.name}</h2>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">{theme.blurb}</p>
          <p className="mt-6 text-xs text-[var(--ink-mute)]">
            Select faith & languages above to preview
          </p>
        </div>
      )}
    </div>
  );
}
