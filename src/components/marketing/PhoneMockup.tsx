"use client";

import type { CreateTheme } from "@/data/themes";

/** Mini invitation UI shown inside an iPhone-style frame (ShaadiPath-style gallery). */
export function PhoneMockup({ theme }: { theme: CreateTheme }) {
  const t = theme.theme;
  const isCard = theme.format === "invitation-card";

  return (
    <div className="relative mx-auto w-[min(100%,220px)]">
      {/* Soft glow behind phone */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[3rem] blur-2xl"
        style={{ background: t.glow }}
        aria-hidden
      />

      {/* Device chrome */}
      <div
        className="relative overflow-hidden rounded-[2rem] border-[3px] border-[#1a1a1f] bg-[#0c0c10] shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
        style={{ aspectRatio: "9 / 19" }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#1a1a1f]" />

        {/* Screen */}
        <div
          className="absolute inset-[3px] overflow-hidden rounded-[1.7rem]"
          style={{
            background: `radial-gradient(circle at 50% 18%, ${t.glow}, transparent 45%), linear-gradient(165deg, ${t.bgDeep}, ${t.bg})`,
            color: t.text,
          }}
        >
          <div className="flex h-full flex-col items-center justify-between px-4 pb-6 pt-8 text-center">
            <div>
              <p
                className="text-[8px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: t.accent }}
              >
                {isCard ? "Invitation" : "Wedding website"}
              </p>
              <p className="mt-3 text-[9px] tracking-[0.2em]" style={{ color: t.muted }}>
                The wedding of
              </p>
            </div>

            <div className="w-full">
              <p
                className="invite-name text-[1.05rem] leading-tight"
                style={{ color: t.text }}
              >
                Aanya
              </p>
              <p
                className="invite-script my-0.5 text-lg leading-none"
                style={{ color: t.accent }}
              >
                &
              </p>
              <p
                className="invite-name text-[1.05rem] leading-tight"
                style={{ color: t.text }}
              >
                Kabir
              </p>
              <div
                className="mx-auto mt-3 h-px w-12"
                style={{ background: t.accent, opacity: 0.7 }}
              />
              <p className="mt-2 text-[9px] leading-relaxed" style={{ color: t.muted }}>
                12 · 12 · 2026
              </p>
            </div>

            <div
              className="w-full rounded-xl border px-2 py-2"
              style={{
                borderColor: t.border,
                background: t.card,
              }}
            >
              <p className="text-[8px] tracking-[0.15em]" style={{ color: t.accent }}>
                {theme.name.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="mt-1 text-[7px]" style={{ color: t.muted }}>
                Live preview · Protorev
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
