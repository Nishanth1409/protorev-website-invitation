"use client";

import Image from "next/image";
import { forwardRef } from "react";
import type { WeddingInvite } from "@/data/types";
import { getIndianCardStyle } from "./indianStyle";

type Props = {
  invite: WeddingInvite;
  watermarked?: boolean;
};

function frameFor(faith: WeddingInvite["faith"], border: string) {
  if (faith === "muslim" || border === "geometry") return "/cards/frame-muslim.jpg";
  if (faith === "christian") return "/cards/frame-cream.jpg";
  return "/cards/frame-cream.jpg";
}

function Watermark() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div className="rotate-[-28deg] text-center">
        <p className="text-3xl font-bold tracking-[0.18em] text-[#4A0E18]/35">PREVIEW</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4A0E18]/40">
          Unlock to download
        </p>
      </div>
    </div>
  );
}

/**
 * Physical-print Indian wedding card look:
 * cream paper, foil frame photograph, print-shop hierarchy.
 */
export const TraditionalIndianCard = forwardRef<HTMLDivElement, Props>(
  function TraditionalIndianCard({ invite, watermarked = false }, ref) {
    const style = getIndianCardStyle(invite.faith, invite.language);
    const c = invite.copy;
    const single = !invite.groom?.trim();
    const frame = frameFor(invite.faith, style.border);

    const ink = "#3D2415";
    const inkSoft = "#6B4E3D";
    const gold = "#B8860B";
    const maroon = "#6B1E2A";

    return (
      <div
        ref={ref}
        data-invite-card
        className="invite-print-card physical-invite-card relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 420,
          aspectRatio: "5 / 7",
          background: "#F7F0E4",
          color: ink,
          fontFamily:
            "Georgia, 'Times New Roman', 'Noto Sans Kannada', 'Noto Sans Devanagari', serif",
          boxShadow:
            "0 18px 40px rgba(40,20,10,0.28), 0 2px 0 rgba(255,255,255,0.55) inset",
        }}
      >
        {/* Photoreal foil frame */}
        <Image
          src={frame}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="420px"
        />

        {/* Soft paper wash so text stays readable over frame art */}
        <div
          className="absolute inset-[11%] rounded-sm"
          style={{
            background:
              "linear-gradient(180deg, rgba(252,247,236,0.92) 0%, rgba(247,240,228,0.94) 50%, rgba(252,247,236,0.93) 100%)",
            boxShadow: "inset 0 0 40px rgba(184,134,11,0.08)",
          }}
        />

        {/* Paper grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Foil corners overlay */}
        {(
          [
            ["left-3 top-3", ""],
            ["right-3 top-3", "scale-x-[-1]"],
            ["bottom-3 left-3", "scale-y-[-1]"],
            ["bottom-3 right-3", "scale-[-1]"],
          ] as const
        ).map(([pos, transform], i) => (
          <div
            key={i}
            className={`pointer-events-none absolute ${pos} h-16 w-16 opacity-70 ${transform}`}
          >
            <Image
              src="/cards/foil-corner.jpg"
              alt=""
              fill
              className="object-contain"
              sizes="64px"
            />
          </div>
        ))}

        <div className="relative z-10 flex h-full flex-col px-[14%] py-[13%] text-center">
          {/* Top — auspicious header like print cards */}
          <div className="shrink-0">
            <p
              className="text-[13px] font-semibold leading-snug"
              style={{ color: maroon }}
              lang={invite.language}
            >
              {style.openingLine}
            </p>
            <p className="mt-1 text-[9px] tracking-[0.18em]" style={{ color: gold }}>
              {style.subOpening}
            </p>

            <div className="relative mx-auto mt-3 h-14 w-28 overflow-hidden rounded-full">
              <Image
                src={
                  invite.faith === "muslim"
                    ? "/motifs/mehendi.jpg"
                    : invite.faith === "christian"
                      ? "/motifs/naming.jpg"
                      : "/motifs/diyas.jpg"
                }
                alt=""
                fill
                className="object-cover"
                sizes="112px"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-[#B8860B]/50" />
            </div>

            <div className="mx-auto mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-10" style={{ background: gold }} />
              <span className="text-[8px] uppercase tracking-[0.28em]" style={{ color: maroon }}>
                {invite.emblem} {c.openingTitle}
              </span>
              <span className="h-px w-10" style={{ background: gold }} />
            </div>
          </div>

          {/* Middle — hosts + names */}
          <div className="my-auto flex min-h-0 flex-col items-center justify-center px-1">
            <p className="text-[9px] leading-relaxed" style={{ color: inkSoft }}>
              {invite.hosts}
            </p>
            <p
              className="mt-2 font-[family-name:var(--font-script)] text-lg"
              style={{ color: gold }}
            >
              {invite.ofLabel ?? c.weddingOf}
            </p>

            <h1
              className="mt-1 font-[family-name:var(--font-display)] text-[1.55rem] leading-[1.15] sm:text-[1.75rem]"
              style={{ color: maroon }}
              lang={invite.language}
            >
              {invite.bride}
            </h1>

            {!single && (
              <>
                <p
                  className="my-1.5 text-[11px] font-semibold uppercase tracking-[0.4em]"
                  style={{ color: gold }}
                >
                  {style.wedsWord}
                </p>
                <h1
                  className="font-[family-name:var(--font-display)] text-[1.55rem] leading-[1.15] sm:text-[1.75rem]"
                  style={{ color: maroon }}
                  lang={invite.language}
                >
                  {invite.groom}
                </h1>
              </>
            )}

            <div
              className="mx-auto mt-3 h-[2px] w-16"
              style={{
                background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
              }}
            />

            <p
              className="mt-3 text-[15px] font-medium leading-relaxed"
              style={{ color: maroon }}
              lang={invite.language}
            >
              {invite.blessingNative}
            </p>
            <p className="mt-1.5 text-[10px] leading-relaxed" style={{ color: inkSoft }}>
              {invite.tagline}
            </p>
          </div>

          {/* Bottom — date plate like engraved print cards */}
          <div className="shrink-0">
            <div
              className="mx-auto rounded-md border px-3 py-2.5"
              style={{
                borderColor: `${gold}99`,
                background:
                  "linear-gradient(180deg, rgba(255,250,240,0.95), rgba(245,232,210,0.9))",
                boxShadow: "0 1px 0 rgba(184,134,11,0.25)",
              }}
            >
              <p
                className="text-[13px] font-semibold tracking-[0.14em]"
                style={{ color: maroon }}
              >
                {invite.weddingDateLabel}
              </p>
              <p className="mt-1 text-[10px]" style={{ color: ink }}>
                {invite.location.name}
              </p>
              <p className="text-[9px]" style={{ color: inkSoft }}>
                {invite.regionLabel}
              </p>
            </div>

            {invite.events.length > 0 && (
              <div className="mt-2 space-y-1">
                {invite.events.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between border-b px-1 py-0.5 text-[8px]"
                    style={{ borderColor: `${gold}40`, color: inkSoft }}
                  >
                    <span>
                      {e.emoji} {e.title}
                    </span>
                    <span style={{ color: gold }}>{e.dateLabel}</span>
                  </div>
                ))}
              </div>
            )}

            <p
              className="mt-2 text-[7px] uppercase tracking-[0.22em]"
              style={{ color: `${inkSoft}99` }}
            >
              {invite.faithLabel} · {invite.languageLabel}
            </p>
          </div>
        </div>

        {watermarked && <Watermark />}
      </div>
    );
  },
);
