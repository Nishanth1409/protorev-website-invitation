"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import { getCountdown, pad2 } from "@/lib/countdown";

type CoverProps = {
  invite: WeddingInvite;
  onOpen: () => void;
};

/** Floating palace / courtyard hero — names + live countdown (mobile-first). */
export function FloatingCeremonyHero({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const [clock, setClock] = useState(() => getCountdown(invite.weddingDate));

  useEffect(() => {
    const id = window.setInterval(() => setClock(getCountdown(invite.weddingDate)), 1000);
    return () => window.clearInterval(id);
  }, [invite.weddingDate]);

  return (
    <section
      className="relative flex min-h-[100%] flex-col overflow-hidden"
      style={{
        background: `radial-gradient(circle at 72% 12%, ${t.glow}, transparent 42%), linear-gradient(180deg, ${t.bg} 0%, ${t.bgDeep} 100%)`,
        color: t.ink,
      }}
    >
      <FloatingPetals accent={t.accent} />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-10">
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-full max-w-[280px]"
        >
          <PalaceSvg accent={t.accent} soft={t.accentSoft || t.accent} fill={t.card} />
        </motion.div>
      </div>

      <div className="relative z-10 flex items-end justify-between gap-3 px-5 pb-8">
        <div>
          <h1 className="invite-name text-3xl leading-none">{invite.bride}</h1>
          {invite.groom?.trim() && (
            <>
              <p className="invite-script my-1 text-xl leading-none" style={{ color: t.accent }}>
                weds
              </p>
              <h1 className="invite-name text-3xl leading-none">{invite.groom}</h1>
            </>
          )}
        </div>
        <div
          className="flex shrink-0 items-center gap-2 border-l pl-3 text-right"
          style={{ borderColor: `${t.accent}66` }}
        >
          <TimeCell n={clock.days} label="Days" color={t.ink} mute={t.inkSoft} />
          <Dot color={t.accent} />
          <TimeCell n={clock.hours} label="Hrs" color={t.ink} mute={t.inkSoft} />
          <Dot color={t.accent} />
          <TimeCell n={clock.minutes} label="Min" color={t.ink} mute={t.inkSoft} />
          <Dot color={t.accent} />
          <TimeCell n={clock.seconds} label="Sec" color={t.ink} mute={t.inkSoft} />
        </div>
      </div>
    </section>
  );
}

function TimeCell({
  n,
  label,
  color,
  mute,
}: {
  n: number;
  label: string;
  color: string;
  mute: string;
}) {
  return (
    <div>
      <p className="invite-name text-sm leading-none" style={{ color }}>
        {pad2(n)}
      </p>
      <p className="mt-0.5 text-[7px] uppercase tracking-wider" style={{ color: mute }}>
        {label}
      </p>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return <span className="mb-3 text-[8px]" style={{ color }}>·</span>;
}

function FloatingPetals({ accent }: { accent: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          className="absolute h-3 w-3 rounded-full opacity-40"
          style={{
            left: `${12 + i * 14}%`,
            top: `${18 + (i % 3) * 16}%`,
            background: accent,
          }}
          animate={{ y: [0, 18, 0], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.5 + i * 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <span className="absolute right-6 top-16 h-20 w-20 rounded-full bg-white/25 blur-[1px]" />
    </div>
  );
}

function PalaceSvg({
  accent,
  soft,
  fill,
}: {
  accent: string;
  soft: string;
  fill: string;
}) {
  return (
    <svg viewBox="0 0 280 220" className="h-auto w-full drop-shadow-2xl">
      <ellipse cx="140" cy="205" rx="90" ry="10" fill={accent} opacity="0.2" />
      <path
        d="M40 190 V110 H70 V78 H100 V55 H180 V78 H210 V110 H240 V190 Z"
        fill={fill}
        stroke={accent}
        strokeOpacity="0.35"
      />
      <path d="M110 190 V130 H170 V190" fill={soft} opacity="0.45" />
      <circle cx="140" cy="42" r="18" fill={accent} opacity="0.85" />
      <path d="M115 55 H165 L140 22 Z" fill={accent} />
      {[80, 115, 150, 185].map((x) => (
        <rect key={x} x={x} y="118" width="16" height="28" rx="2" fill={accent} opacity="0.35" />
      ))}
      <rect x="128" y="145" width="24" height="45" rx="2" fill={accent} opacity="0.7" />
    </svg>
  );
}

/** Wipe mist to open — original Protorev interactive cover. */
export function MistRevealCover({ invite, onOpen }: CoverProps) {
  const t = invite.theme;
  const progress = useMotionValue(1);
  const opacity = useTransform(progress, [0, 1], [0, 1]);
  const [done, setDone] = useState(false);

  const reveal = () => {
    if (done) return;
    setDone(true);
    animate(progress, 0, { duration: 1.1, ease: "easeOut" }).then(onOpen);
  };

  return (
    <div
      className="absolute inset-0 z-[60] flex flex-col"
      style={{ background: t.bgDeep, color: t.text }}
    >
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: t.accent }}>
          Wipe to open
        </p>
        <h1 className="invite-name mt-4 text-4xl">{invite.bride}</h1>
        {invite.groom?.trim() && (
          <>
            <p className="invite-script my-1 text-3xl" style={{ color: t.accent }}>
              &
            </p>
            <h1 className="invite-name text-4xl">{invite.groom}</h1>
          </>
        )}
        <p className="mt-4 text-sm" style={{ color: t.muted }}>
          {invite.weddingDateLabel}
        </p>
      </div>
      <motion.button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer touch-none"
        style={{
          opacity,
          background: `radial-gradient(circle at 50% 40%, rgba(255,255,255,0.55), transparent 55%), linear-gradient(180deg, rgba(240,240,245,0.92), rgba(200,210,220,0.88))`,
        }}
        onPointerDown={reveal}
        onClick={reveal}
        aria-label="Wipe mist to open invitation"
      >
        <span className="absolute bottom-16 left-1/2 -translate-x-1/2 rounded-full bg-black/35 px-4 py-2 text-xs tracking-wide text-white">
          Drag or tap to clear the mist
        </span>
      </motion.button>
    </div>
  );
}

/** Pull the lantern rope to light the courtyard. */
export function LanternRopeCover({ invite, onOpen }: CoverProps) {
  const t = invite.theme;
  const [lit, setLit] = useState(false);
  const y = useMotionValue(0);

  const pull = () => {
    if (lit) return;
    setLit(true);
    animate(y, 40, { duration: 0.45 }).then(() => {
      window.setTimeout(onOpen, 700);
    });
  };

  return (
    <div
      className="absolute inset-0 z-[60] flex flex-col items-center justify-center px-6 text-center"
      style={{
        background: lit
          ? `radial-gradient(circle at 50% 30%, ${t.glow}, transparent 50%), ${t.bgDeep}`
          : t.bgDeep,
        color: t.text,
        transition: "background 0.6s ease",
      }}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: t.accent }}>
        Courtyard Prelude
      </p>
      <h1 className="invite-name mt-3 text-3xl">
        {invite.bride}
        {invite.groom?.trim() ? ` & ${invite.groom}` : ""}
      </h1>
      <motion.button
        type="button"
        onClick={pull}
        className="mt-10 flex flex-col items-center"
        aria-label="Pull rope to light courtyard"
      >
        <motion.span
          style={{ y }}
          className="mb-2 text-4xl"
          animate={lit ? { scale: [1, 1.2, 1], opacity: 1 } : { opacity: 0.55 }}
        >
          🪔
        </motion.span>
        <span className="h-16 w-0.5" style={{ background: t.accent }} />
        <span
          className="mt-1 rounded-full border px-4 py-2 text-xs tracking-wide"
          style={{ borderColor: t.accent, color: t.accentSoft }}
        >
          {lit ? "Lighting…" : "Pull to light"}
        </span>
      </motion.button>
    </div>
  );
}

/** Scratch foil medallion to reveal the date. */
export function FoilScratchCover({ invite, onOpen }: CoverProps) {
  const t = invite.theme;
  const [cleared, setCleared] = useState(0);

  const scratch = () => {
    setCleared((c) => {
      const next = Math.min(100, c + 28);
      if (next >= 100) window.setTimeout(onOpen, 400);
      return next;
    });
  };

  return (
    <div
      className="absolute inset-0 z-[60] flex flex-col items-center justify-center px-6 text-center"
      style={{ background: `radial-gradient(circle at 50% 20%, ${t.glow}, ${t.bgDeep})`, color: t.text }}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.3em]" style={{ color: t.accent }}>
        Royal Reveal
      </p>
      <h1 className="invite-name mt-3 text-3xl">{invite.bride}</h1>
      {invite.groom?.trim() && (
        <p className="invite-script text-2xl" style={{ color: t.accent }}>
          & {invite.groom}
        </p>
      )}
      <button
        type="button"
        onPointerMove={scratch}
        onClick={scratch}
        className="relative mt-10 h-36 w-36 overflow-hidden rounded-full border-4"
        style={{ borderColor: t.accent }}
        aria-label="Scratch to reveal date"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="invite-name text-lg" style={{ color: t.accentSoft }}>
            {invite.weddingDateLabel}
          </p>
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: 1 - cleared / 100,
            background: `repeating-linear-gradient(135deg, ${t.accent}, ${t.accentSoft} 12px, ${t.accent} 24px)`,
          }}
        />
      </button>
      <p className="mt-4 text-xs" style={{ color: t.muted }}>
        Scratch the medallion to open
      </p>
    </div>
  );
}

export function InteractiveCoverShell({ children }: { children: ReactNode }) {
  return <div className="absolute inset-0 z-[60]">{children}</div>;
}
