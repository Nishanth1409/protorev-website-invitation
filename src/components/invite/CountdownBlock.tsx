"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { getCountdown, pad2 } from "@/lib/countdown";
import type { InviteCopy } from "@/data/types";

type Props = {
  targetIso: string;
  accent: string;
  accentSoft: string;
  text: string;
  muted: string;
  border: string;
  card: string;
  glow: string;
  copy: InviteCopy;
};

export function CountdownBlock({
  targetIso,
  accent,
  accentSoft,
  text,
  muted,
  border,
  card,
  glow,
  copy,
}: Props) {
  const [parts, setParts] = useState(() => getCountdown(targetIso));

  useEffect(() => {
    const id = setInterval(() => setParts(getCountdown(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  const celebrate = () => {
    const colors = [accent, accentSoft, "#ffffff"];
    confetti({ particleCount: 90, spread: 68, origin: { y: 0.72 }, colors, scalar: 0.9 });
    setTimeout(() => {
      confetti({ particleCount: 55, angle: 60, spread: 50, origin: { x: 0, y: 0.78 }, colors });
      confetti({ particleCount: 55, angle: 120, spread: 50, origin: { x: 1, y: 0.78 }, colors });
    }, 220);
  };

  const units = [
    { label: copy.days, value: parts.days },
    { label: copy.hours, value: parts.hours },
    { label: copy.minutes, value: parts.minutes },
    { label: copy.seconds, value: parts.seconds },
  ];

  return (
    <section className="relative px-5 py-16 text-center">
      <p className="mb-2 text-[0.7rem] uppercase tracking-[0.3em]" style={{ color: muted }}>
        {copy.counting}
      </p>
      <h2
        className="mb-8 font-[family-name:var(--font-display)] text-3xl md:text-4xl"
        style={{ color: text }}
      >
        {copy.untilWedding}
      </h2>
      <div className="mx-auto mb-10 grid max-w-lg grid-cols-4 gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="rounded-2xl px-2 py-4"
            style={{
              background: card,
              border: `1px solid ${border}`,
              boxShadow: `0 0 24px ${glow}`,
            }}
          >
            <div
              className="font-[family-name:var(--font-display)] text-2xl md:text-3xl"
              style={{ color: accentSoft }}
            >
              {pad2(u.value)}
            </div>
            <div className="mt-1 text-[0.58rem] uppercase tracking-[0.14em]" style={{ color: muted }}>
              {u.label}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={celebrate}
        className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-xs uppercase tracking-[0.22em] transition hover:scale-[1.03]"
        style={{ borderColor: accent, color: accentSoft, boxShadow: `0 0 24px ${glow}` }}
      >
        🎉 {copy.celebrate}
      </button>
    </section>
  );
}
