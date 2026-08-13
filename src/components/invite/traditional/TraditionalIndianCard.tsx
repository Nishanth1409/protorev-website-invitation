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
        <p className="invite-name text-3xl tracking-[0.18em] text-[#4A0E18]/35">PREVIEW</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4A0E18]/40">
          Unlock to download
        </p>
      </div>
    </div>
  );
}

/**
 * Physical-print Indian wedding card — ceremonial multi-language typography.
 */
export const TraditionalIndianCard = forwardRef<HTMLDivElement, Props>(
  function TraditionalIndianCard({ invite, watermarked = false }, ref) {
    const style = getIndianCardStyle(invite.faith, invite.language);
    const c = invite.copy;
    const single = !invite.groom?.trim();
    const frame = frameFor(invite.faith, style.border);
    const lang = invite.language;

    const ink = "#3D2415";
    const inkSoft = "#6B4E3D";
    const gold = "#B8860B";
    const maroon = "#6B1E2A";

    return (
      <div
        ref={ref}
        data-invite-card
        className="invite-print-card physical-invite-card relative overflow-hidden"
        lang={lang}
        style={{
          width: "100%",
          maxWidth: 420,
          aspectRatio: "5 / 7",
          background: "#F7F0E4",
          color: ink,
          boxShadow:
            "0 18px 40px rgba(40,20,10,0.28), 0 2px 0 rgba(255,255,255,0.55) inset",
        }}
      >
        <Image src={frame} alt="" fill priority className="object-cover" sizes="420px" />

        <div
          className="absolute inset-[11%] rounded-sm"
          style={{
            background:
              "linear-gradient(180deg, rgba(252,247,236,0.92) 0%, rgba(247,240,228,0.94) 50%, rgba(252,247,236,0.93) 100%)",
            boxShadow: "inset 0 0 40px rgba(184,134,11,0.08)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

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
          <div className="shrink-0">
            <p
              className="invite-blessing text-[15px] leading-snug sm:text-[16px]"
              style={{ color: maroon }}
              lang={lang}
            >
              {style.openingLine}
            </p>
            <p
              className="invite-meta mt-1.5"
              style={{ color: gold, letterSpacing: "0.2em" }}
              lang={lang === "en" ? "en" : lang}
            >
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
              <span className="invite-meta" style={{ color: maroon }}>
                {invite.emblem} {c.openingTitle}
              </span>
              <span className="h-px w-10" style={{ background: gold }} />
            </div>
          </div>

          <div className="my-auto flex min-h-0 flex-col items-center justify-center px-1">
            <p className="invite-body-copy text-[10px] leading-relaxed" style={{ color: inkSoft }} lang={lang}>
              {invite.hosts}
            </p>
            <p className="invite-script mt-2 text-[1.65rem] leading-none" style={{ color: gold }}>
              {invite.ofLabel ?? c.weddingOf}
            </p>

            <h1
              className="invite-name mt-2 text-[1.7rem] sm:text-[1.9rem]"
              style={{ color: maroon }}
              lang={lang}
            >
              {invite.bride}
            </h1>

            {!single && (
              <>
                <p
                  className="invite-script my-1 text-[1.35rem] leading-none"
                  style={{ color: gold }}
                >
                  {style.wedsWord === "weds" ? "weds" : style.wedsWord}
                </p>
                <h1
                  className="invite-name text-[1.7rem] sm:text-[1.9rem]"
                  style={{ color: maroon }}
                  lang={lang}
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
              className="invite-blessing mt-3 text-[16px] leading-relaxed"
              style={{ color: maroon }}
              lang={lang}
            >
              {invite.blessingNative}
            </p>
            <p
              className="invite-body-copy mt-1.5 text-[11px] leading-relaxed"
              style={{ color: inkSoft }}
              lang={lang}
            >
              {invite.tagline}
            </p>
          </div>

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
              <p className="invite-name text-[14px] tracking-[0.12em]" style={{ color: maroon }}>
                {invite.weddingDateLabel}
              </p>
              <p className="invite-body-copy mt-1 text-[11px]" style={{ color: ink }} lang={lang}>
                {invite.location.name}
              </p>
              <p className="invite-body-copy text-[9px]" style={{ color: inkSoft }}>
                {invite.regionLabel}
              </p>
            </div>

            {invite.events.length > 0 && (
              <div className="mt-2 space-y-1">
                {invite.events.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    className="invite-body-copy flex items-center justify-between border-b px-1 py-0.5 text-[8px]"
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

            <p className="invite-meta mt-2" style={{ color: `${inkSoft}99` }}>
              {invite.faithLabel} · {invite.languageLabel}
            </p>
          </div>
        </div>

        {watermarked && <Watermark />}
      </div>
    );
  },
);
