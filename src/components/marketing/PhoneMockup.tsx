"use client";

import { motion } from "framer-motion";
import type { CreateTheme } from "@/data/themes";
import { galleryPresentation } from "@/data/galleryPresentation";
import type { LookFamily } from "@/data/lookFamilies";

/** Soft floating phone — illustrated mini invite (original Protorev art). */
export function PhoneMockup({ theme }: { theme: CreateTheme }) {
  const t = theme.theme;
  const pres = galleryPresentation(theme);
  const isCard = theme.format === "invitation-card";

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[250px]"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-[3rem] blur-3xl"
        style={{ background: t.glow, opacity: 0.55 }}
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-[2rem] border-[3px] border-[#1a1a1f] bg-[#0c0c10] shadow-[0_30px_70px_rgba(20,12,8,0.35)]"
        style={{ aspectRatio: "9 / 19.5" }}
      >
        {/* Dynamic island */}
        <div className="absolute left-1/2 top-[7px] z-30 h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-[#0c0c10]" />

        <div
          className="absolute inset-[3px] overflow-hidden rounded-[1.7rem]"
          style={{
            background: sceneGradient(pres.look, t.bgDeep, t.bg, t.glow),
            color: t.text,
          }}
        >
          <SceneArt look={pres.look} accent={t.accent} soft={t.accentSoft || t.accent} />

          <div className="relative z-10 flex h-full flex-col justify-between px-3.5 pb-5 pt-9 text-center">
            <div>
              {(pres.featured || theme.badge === "Premium") && (
                <span
                  className="mb-2 inline-block rounded-full px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider"
                  style={{ background: `${t.accent}33`, color: t.accent }}
                >
                  {theme.badge === "Premium" ? "Luxe" : "Featured"}
                </span>
              )}
              <p
                className="text-[7px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: t.accent }}
              >
                {isCard ? "Invitation" : "Wedding site"}
              </p>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-[28%] flex justify-center opacity-90">
              <Illustration look={pres.look} accent={t.accent} soft={t.accentSoft || t.accent} />
            </div>

            <div className="relative z-10 mt-auto w-full">
              <div className="flex items-end justify-between gap-2 px-0.5 text-left">
                <div>
                  <p className="invite-name text-[0.95rem] leading-none" style={{ color: t.text }}>
                    Anika
                  </p>
                  <p
                    className="invite-script my-0.5 text-sm leading-none"
                    style={{ color: t.accentSoft || t.accent }}
                  >
                    weds
                  </p>
                  <p className="invite-name text-[0.95rem] leading-none" style={{ color: t.text }}>
                    Rohan
                  </p>
                </div>
                <div
                  className="shrink-0 border-l pl-2 text-right"
                  style={{ borderColor: `${t.accent}55` }}
                >
                  <p className="invite-name text-[10px] leading-none" style={{ color: t.text }}>
                    120
                  </p>
                  <p className="text-[5px] uppercase tracking-wider" style={{ color: t.muted }}>
                    Days
                  </p>
                </div>
              </div>
              <p className="mt-2 truncate text-[6px] tracking-wide" style={{ color: t.muted }}>
                {pres.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function sceneGradient(look: LookFamily, deep: string, bg: string, glow: string) {
  if (look === "royal") {
    return `radial-gradient(circle at 70% 18%, ${glow}, transparent 42%), linear-gradient(180deg, #1a0f24 0%, ${deep} 55%, ${bg} 100%)`;
  }
  if (look === "festive") {
    return `radial-gradient(circle at 30% 20%, ${glow}, transparent 45%), linear-gradient(180deg, #f7d9c8 0%, #f3c4b0 45%, #e8a988 100%)`;
  }
  if (look === "luxe") {
    return `radial-gradient(circle at 50% 10%, ${glow}, transparent 40%), linear-gradient(180deg, #0b1a2e 0%, #12263f 50%, #1a334f 100%)`;
  }
  return `radial-gradient(circle at 50% 12%, ${glow}, transparent 48%), linear-gradient(180deg, #f6efe6 0%, ${bg} 55%, ${deep} 100%)`;
}

function SceneArt({
  look,
  accent,
  soft,
}: {
  look: LookFamily;
  accent: string;
  soft: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {look === "festive" && (
        <>
          <span className="absolute right-4 top-10 h-16 w-16 rounded-full bg-white/35 blur-[1px]" />
          {[12, 28, 55, 70, 82].map((left, i) => (
            <span
              key={left}
              className="absolute h-2 w-2 rounded-full opacity-70"
              style={{
                left: `${left}%`,
                top: `${18 + (i % 3) * 10}%`,
                background: i % 2 ? soft : accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
          ))}
        </>
      )}
      {look === "royal" && (
        <span className="absolute right-3 top-12 h-14 w-14 rounded-full bg-[#E8C56A]/35 blur-[0.5px]" />
      )}
      {look === "luxe" && (
        <span className="absolute left-1/2 top-10 h-20 w-20 -translate-x-1/2 rounded-full bg-[#E8C56A]/20 blur-md" />
      )}
      {look === "minimal" && (
        <span className="absolute left-1/2 top-14 h-24 w-24 -translate-x-1/2 rounded-full border border-black/5 bg-white/40" />
      )}
    </div>
  );
}

function Illustration({
  look,
  accent,
  soft,
}: {
  look: LookFamily;
  accent: string;
  soft: string;
}) {
  if (look === "royal" || look === "luxe") {
    return (
      <svg width="150" height="120" viewBox="0 0 150 120" fill="none">
        <ellipse cx="75" cy="108" rx="48" ry="6" fill={accent} opacity="0.2" />
        <path
          d="M30 100 V58 H45 V42 H60 V30 H90 V42 H105 V58 H120 V100 Z"
          fill={soft}
          opacity="0.92"
        />
        <path d="M55 100 V70 H95 V100" fill="#fff" opacity="0.55" />
        <circle cx="75" cy="24" r="10" fill={accent} opacity="0.85" />
        <path d="M60 30 H90 L75 12 Z" fill={accent} />
        <rect x="48" y="78" width="10" height="14" rx="1" fill={accent} opacity="0.45" />
        <rect x="92" y="78" width="10" height="14" rx="1" fill={accent} opacity="0.45" />
        <rect x="68" y="82" width="14" height="18" rx="1" fill={accent} opacity="0.7" />
      </svg>
    );
  }
  if (look === "festive") {
    return (
      <svg width="150" height="110" viewBox="0 0 150 110" fill="none">
        <ellipse cx="75" cy="98" rx="40" ry="5" fill={accent} opacity="0.18" />
        <path
          d="M40 90 C40 55 60 35 75 28 C90 35 110 55 110 90 Z"
          fill={soft}
          opacity="0.85"
        />
        <circle cx="75" cy="52" r="14" fill="#fff" opacity="0.45" />
        <path d="M55 78 Q75 68 95 78" stroke={accent} strokeWidth="2" fill="none" />
        <circle cx="48" cy="40" r="4" fill={accent} />
        <circle cx="102" cy="44" r="3.5" fill={accent} />
        <circle cx="70" cy="30" r="3" fill={soft} />
      </svg>
    );
  }
  return (
    <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
      <ellipse cx="70" cy="90" rx="36" ry="5" fill={accent} opacity="0.15" />
      <path
        d="M35 88 V50 Q35 28 70 22 Q105 28 105 50 V88 Z"
        fill="#fff"
        opacity="0.75"
        stroke={accent}
        strokeOpacity="0.35"
      />
      <path d="M55 88 V62 H85 V88" fill={soft} opacity="0.5" />
      <circle cx="70" cy="48" r="8" fill={accent} opacity="0.35" />
    </svg>
  );
}
