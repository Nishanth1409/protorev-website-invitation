"use client";

import type { CreateTheme } from "@/data/themes";
import { galleryPresentation } from "@/data/galleryPresentation";
import type { LookFamily } from "@/data/lookFamilies";

function MiniOrnament({ color }: { color: string }) {
  return (
    <div className="mx-auto flex items-center justify-center gap-1 opacity-80">
      <span className="h-px w-6" style={{ background: color }} />
      <span className="text-[8px]" style={{ color }}>
        ✦
      </span>
      <span className="h-px w-6" style={{ background: color }} />
    </div>
  );
}

function LookAccent({ look, accent }: { look: LookFamily; accent: string }) {
  if (look === "festive") {
    return (
      <div className="pointer-events-none absolute inset-x-3 top-14 flex justify-center gap-1 opacity-40">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent }}
          />
        ))}
      </div>
    );
  }
  if (look === "royal") {
    return (
      <div
        className="pointer-events-none absolute inset-x-4 top-12 h-8 rounded-t-full border border-b-0 opacity-30"
        style={{ borderColor: accent }}
      />
    );
  }
  if (look === "luxe") {
    return (
      <div
        className="pointer-events-none absolute inset-x-6 top-16 h-px opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
    );
  }
  return null;
}

/** Gallery thumbnail — original Protorev mini invite inside phone frame. */
export function PhoneMockup({ theme }: { theme: CreateTheme }) {
  const t = theme.theme;
  const pres = galleryPresentation(theme);
  const isCard = theme.format === "invitation-card";

  return (
    <div className="relative mx-auto w-full max-w-[240px]">
      <div
        className="pointer-events-none absolute -inset-5 rounded-[2.75rem] blur-2xl"
        style={{ background: t.glow }}
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-[1.85rem] border-[3px] border-[#141418] bg-[#0a0a0d] shadow-[0_24px_55px_rgba(0,0,0,0.32)]"
        style={{ aspectRatio: "9 / 19.5" }}
      >
        <div className="absolute left-1/2 top-0 z-20 h-[18px] w-[34%] -translate-x-1/2 rounded-b-xl bg-[#141418]" />

        <div
          className="absolute inset-[3px] overflow-hidden rounded-[1.55rem]"
          style={{
            background: `radial-gradient(circle at 50% 16%, ${t.glow}, transparent 48%), linear-gradient(168deg, ${t.bgDeep}, ${t.bg})`,
            color: t.text,
          }}
        >
          <LookAccent look={pres.look} accent={t.accent} />

          <div className="relative z-10 flex h-full flex-col items-center justify-between px-3.5 pb-5 pt-7 text-center">
            <div>
              {pres.featured && (
                <span
                  className="mb-2 inline-block rounded-full px-2 py-0.5 text-[7px] font-bold uppercase tracking-wider"
                  style={{ background: `${t.accent}33`, color: t.accent }}
                >
                  Featured
                </span>
              )}
              <p
                className="text-[7px] font-semibold uppercase tracking-[0.26em]"
                style={{ color: t.accent }}
              >
                {isCard ? "Invitation" : "Wedding site"}
              </p>
              <MiniOrnament color={t.accent} />
            </div>

            <div className="w-full px-1">
              <p className="text-[8px] tracking-[0.18em]" style={{ color: t.muted }}>
                The wedding of
              </p>
              <p
                className="invite-name mt-1.5 text-[0.95rem] leading-tight"
                style={{ color: t.text }}
              >
                Anika
              </p>
              <p
                className="invite-script my-0.5 text-base leading-none"
                style={{ color: t.accentSoft || t.accent }}
              >
                &
              </p>
              <p
                className="invite-name text-[0.95rem] leading-tight"
                style={{ color: t.text }}
              >
                Rohan
              </p>
              <div
                className="mx-auto mt-2.5 h-px w-10"
                style={{ background: t.accent, opacity: 0.65 }}
              />
              <p className="mt-1.5 text-[8px]" style={{ color: t.muted }}>
                December · 2026
              </p>
            </div>

            <div
              className="w-full rounded-lg border px-2 py-1.5"
              style={{ borderColor: t.border, background: t.card }}
            >
              <p
                className="truncate text-[7px] font-semibold tracking-wide"
                style={{ color: t.accent }}
              >
                {pres.title}
              </p>
              <p className="mt-0.5 text-[6px] leading-tight" style={{ color: t.muted }}>
                Tap to preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
