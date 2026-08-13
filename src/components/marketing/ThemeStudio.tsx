"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InvitationExperience } from "@/components/invite/InvitationExperience";
import type { CreateTheme } from "@/data/themes";
import { formatMeta } from "@/data/themes";
import { getFlagshipMeta } from "@/data/flagship";
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
  /** Always open preview; sheet only for Change style */
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
 * Live Preview — sample invite opens immediately.
 * "Change style" adjusts faith + languages without blocking the first view.
 */
export function ThemeStudio({
  theme,
  initialFaith = "hindu",
  initialLanguages = ["en"],
  initialActiveLanguage,
  startReady = true,
}: Props) {
  const flag = getFlagshipMeta(theme.id);
  const displayName = flag?.title ?? theme.name;

  const seededLangs = uniqueLangs(
    initialLanguages.length ? initialLanguages : ["en"],
  );
  const seededActive =
    initialActiveLanguage && seededLangs.includes(initialActiveLanguage)
      ? initialActiveLanguage
      : seededLangs[0];

  const [faith, setFaith] = useState<FaithId>(
    initialFaith || flag?.defaultFaith || "hindu",
  );
  const [languages, setLanguages] = useState<LanguageId[]>(seededLangs);
  const [activeLanguage, setActiveLanguage] =
    useState<LanguageId>(seededActive);

  const [draftFaith, setDraftFaith] = useState<FaithId>(faith);
  const [draftLangs, setDraftLangs] = useState<LanguageId[]>(seededLangs);
  const [setupOpen, setSetupOpen] = useState(false);
  const ready = startReady !== false;

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

  const applySelection = () => {
    const clean = uniqueLangs(draftLangs);
    if (!clean.length || !draftFaith) return;
    const active = clean.includes(activeLanguage) ? activeLanguage : clean[0];
    setFaith(draftFaith);
    setLanguages(clean);
    setActiveLanguage(active);
    setSetupOpen(false);
    persistUrl(draftFaith, clean, active);
  };

  const toggleDraftLang = (id: LanguageId) => {
    setDraftLangs((prev) => {
      if (prev.includes(id)) {
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

  return (
    <div className="relative min-h-screen bg-[#F4EFE7]">
      <div className="sticky top-0 z-70 border-b border-[#E4D9C8] bg-[#F8F3EA]/96 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-lg items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <Link
              href="/create"
              className="text-xs font-medium text-[#8A7A70] hover:text-[#1A1210]"
            >
              ← Invitations
            </Link>
            <h1 className="truncate font-display text-base font-semibold text-[#1A1210]">
              {displayName}
            </h1>
            <p className="truncate text-[11px] text-[#5C4A42]">
              {format.label}
            </p>
          </div>

          <button
            type="button"
            onClick={openSetup}
            className="inline-flex min-h-11 shrink-0 flex-col justify-center rounded-full border border-[#D9CFC4] bg-white px-4 py-2 text-left"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wide text-[#8A7A70]">
              Change style
            </span>
            <span className="text-sm font-semibold text-[#1A1210]">
              {faithMeta[faith]?.icon} {faithMeta[faith]?.label} ·{" "}
              {formatLangSummary(languages)}
            </span>
          </button>
        </div>

        {languages.length > 1 && (
          <div className="border-t border-[#E4D9C8] bg-white/60">
            <div className="mx-auto flex w-full max-w-lg gap-2 overflow-x-auto px-4 py-2">
              <span className="shrink-0 self-center text-[10px] font-semibold uppercase tracking-wide text-[#8A7A70]">
                View in
              </span>
              {languages.map((id) => {
                const active = activeLanguage === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => switchLanguage(id)}
                    className={`inline-flex min-h-11 shrink-0 items-center rounded-full px-4 py-2 text-xs font-semibold transition ${
                      active
                        ? "bg-[#1A1210] text-[#F7F4EF]"
                        : "border border-[#D9CFC4] bg-white text-[#5C4A42]"
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

      <AnimatePresence>
        {setupOpen && (
          <motion.div
            className="fixed inset-0 z-80 flex items-end justify-center bg-black/45 px-3 pb-3 pt-16 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="style-title"
              className="max-h-[90svh] w-full max-w-xl overflow-y-auto rounded-3xl border border-[#E4D9C8] bg-white p-5 shadow-xl sm:p-7"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B6914]">
                Change style
              </p>
              <h2
                id="style-title"
                className="mt-2 font-display text-2xl font-semibold text-[#1A1210]"
              >
                Faith & languages
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#5C4A42]">
                See how this design adapts. When you are ready, customise with
                Protorev Digital.
              </p>

              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8A7A70]">
                  Religion / cultural style
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {allFaithIds.map((id) => {
                    const active = draftFaith === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setDraftFaith(id)}
                        className={`min-h-11 rounded-2xl border px-3 py-3 text-left transition ${
                          active
                            ? "border-[#1A1210] bg-[#1A1210] text-white"
                            : "border-[#E4D9C8] bg-[#F8F3EA] text-[#1A1210]"
                        }`}
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
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8A7A70]">
                  Languages (multi-select)
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {allLanguageIds.map((id) => {
                    const active = draftLangs.includes(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleDraftLang(id)}
                        aria-pressed={active}
                        className={`min-h-11 rounded-2xl border px-3 py-3 text-left transition ${
                          active
                            ? "border-[#1A1210] bg-[#1A1210] text-white"
                            : "border-[#E4D9C8] bg-[#F8F3EA] text-[#1A1210]"
                        }`}
                      >
                        <span className="text-sm font-semibold">
                          {languageMeta[id].label}
                        </span>
                        <span
                          className={`mt-1 block text-xs ${active ? "text-white/80" : "text-[#8A7A70]"}`}
                        >
                          {languageMeta[id].native}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={applySelection}
                  className="min-h-11 rounded-full bg-[#1A1210] px-5 py-3 text-sm font-semibold text-[#F7F4EF]"
                >
                  Apply
                </button>
                <button
                  type="button"
                  onClick={() => setSetupOpen(false)}
                  className="min-h-11 rounded-full border border-[#D9CFC4] px-5 py-3 text-sm font-semibold text-[#5C4A42]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {ready && (
        <InvitationExperience
          invite={invite}
          hidePageHeader
          key={`${faith}-${activeLanguage}-${theme.id}`}
        />
      )}
    </div>
  );
}
