"use client";

import { motion } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import { FaithEmblem, LaceToran, RitualHands } from "./FestivalDecor";

type Props = {
  invite: WeddingInvite;
  onOpen: () => void;
};

/** Opening blessing — Canva-style auspicious first screen. */
export function SealCover({ invite, onOpen }: Props) {
  const t = invite.theme;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col"
      style={{ background: t.bgDeep, color: t.text }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, ${t.glow}, transparent 50%),
            radial-gradient(${t.accent} 0.7px, transparent 0.7px)
          `,
          backgroundSize: "auto, 18px 18px",
          opacity: 0.9,
        }}
      />

      <div className="relative z-10 px-3 pt-3" style={{ color: t.accent }}>
        <LaceToran color={t.accent} />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <FaithEmblem emblem={invite.emblem} accent={t.accent} />

          <p
            className="mb-2 text-[0.65rem] uppercase tracking-[0.3em]"
            style={{ color: t.muted }}
          >
            {invite.faithLabel} · {invite.languageLabel}
          </p>

          <h1
            className="mb-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-wide md:text-5xl"
            style={{ color: t.accentSoft }}
            lang={invite.language}
          >
            {invite.copy.openingTitle}
          </h1>

          <p
            className="mb-2 font-[family-name:var(--font-display)] text-lg leading-relaxed"
            style={{ color: t.accent }}
            dir="auto"
            lang={invite.language}
          >
            {invite.blessingNative}
          </p>
          <p className="mx-auto mb-2 max-w-sm text-sm leading-relaxed" style={{ color: t.muted }}>
            {invite.blessingEnglish}
          </p>

          <RitualHands accent={t.accent} />

          <p
            className="mb-8 text-[0.7rem] uppercase tracking-[0.28em]"
            style={{ color: t.muted }}
          >
            {invite.coverSubtitle || invite.copy.togetherWith}
          </p>

          <button
            type="button"
            onClick={onOpen}
            className="mx-auto inline-flex items-center gap-3 rounded-full border px-8 py-3.5 text-sm font-medium tracking-[0.12em] transition hover:scale-[1.03]"
            style={{
              borderColor: t.accent,
              color: t.accentSoft,
              background: "rgba(0,0,0,0.2)",
              boxShadow: `0 0 32px ${t.glow}`,
            }}
          >
            <span aria-hidden>{invite.emblem}</span>
            {invite.copy.openInvite}
          </button>
        </motion.div>
      </div>

      <div className="relative z-10 px-3 pb-3" style={{ color: t.accent }}>
        <LaceToran color={t.accent} />
      </div>
    </motion.div>
  );
}
