"use client";

import { forwardRef } from "react";
import type { WeddingInvite } from "@/data/types";
import {
  BrassLampPair,
  EventMiniRow,
  GaneshaMedallion,
  IslamicGeometryFrame,
  KairiCorner,
  KhandaEmblem,
  KolamCorner,
  MangoToran,
  PaisleySideStrip,
  RingBorder,
  TempleGopuram,
} from "./IndianMotifs";
import { getIndianCardStyle } from "./indianStyle";

type Props = {
  invite: WeddingInvite;
  watermarked?: boolean;
};

function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden" aria-hidden>
      <div className="rotate-[-28deg] text-center">
        <p className="text-3xl font-bold tracking-[0.18em] text-white/40">PREVIEW</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
          Unlock to download
        </p>
      </div>
    </div>
  );
}

/**
 * Authentic Indian wedding invitation card — faith + regional styling.
 * Inspired by South Indian kolam/temple cards, North paisley maroon-gold,
 * Muslim geometry, Sikh khanda, Christian ivory, Jain lotus.
 */
export const TraditionalIndianCard = forwardRef<HTMLDivElement, Props>(
  function TraditionalIndianCard({ invite, watermarked = false }, ref) {
    const style = getIndianCardStyle(invite.faith, invite.language);
    const c = invite.copy;
    const single = !invite.groom?.trim();

    const Corner =
      style.border === "kolam" ? KolamCorner : KairiCorner;

    return (
      <div
        ref={ref}
        data-invite-card
        className="invite-print-card relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 420,
          aspectRatio: "5 / 7",
          background: `radial-gradient(circle at 50% 8%, ${style.gold}22, transparent 38%), linear-gradient(180deg, ${style.maroon}, ${style.deep})`,
          color: style.cream,
          fontFamily: "Georgia, 'Times New Roman', 'Noto Sans Kannada', serif",
        }}
      >
        <RingBorder gold={style.gold} cream={style.cream} />

        {style.border === "geometry" && <IslamicGeometryFrame color={style.gold} />}
        {(style.border === "paisley" || style.border === "blend") && (
          <>
            <PaisleySideStrip color={style.gold} side="left" />
            <PaisleySideStrip color={style.gold} side="right" />
          </>
        )}

        <div className="absolute left-2 top-2">
          <Corner color={style.gold} />
        </div>
        <div className="absolute right-2 top-2">
          <Corner color={style.gold} flip="x" />
        </div>
        <div className="absolute bottom-2 left-2">
          <Corner color={style.gold} flip="y" />
        </div>
        <div className="absolute bottom-2 right-2">
          <Corner color={style.gold} flip="xy" />
        </div>

        <div className="relative z-10 flex h-full flex-col px-[9%] py-[10%] text-center">
          {/* Top blessing band — like printed Indian cards */}
          <div className="shrink-0">
            <MangoToran color={style.gold} />
            <p
              className="mt-2 text-[11px] font-semibold tracking-[0.28em]"
              style={{ color: style.gold }}
            >
              {style.openingLine}
            </p>
            <p className="mt-0.5 text-[9px] tracking-[0.22em]" style={{ color: `${style.cream}99` }}>
              {style.subOpening}
            </p>

            {invite.faith === "hindu" && style.regional === "south" && (
              <TempleGopuram color={style.gold} cream={style.cream} />
            )}
            {invite.faith === "hindu" && style.regional !== "south" && (
              <div className="mt-2">
                <GaneshaMedallion gold={style.gold} cream={style.cream} />
              </div>
            )}
            {invite.faith === "sikh" && (
              <div className="mt-2">
                <KhandaEmblem color={style.cream} accent={style.accent} />
              </div>
            )}
            {(invite.faith === "muslim" || invite.faith === "jain" || invite.faith === "christian") && (
              <p className="mt-3 text-2xl" aria-hidden>
                {invite.emblem}
              </p>
            )}

            <div className="mx-auto mt-2 flex items-center justify-center gap-2">
              <span className="h-px w-8" style={{ background: style.gold }} />
              <span className="text-[8px] uppercase tracking-[0.32em]" style={{ color: style.gold }}>
                {c.openingTitle}
              </span>
              <span className="h-px w-8" style={{ background: style.gold }} />
            </div>
          </div>

          {/* Hosts + couple — traditional card hierarchy */}
          <div className="my-auto flex flex-col items-center">
            <p className="text-[9px] leading-relaxed" style={{ color: `${style.cream}bb` }}>
              {invite.hosts}
            </p>
            <p className="mt-2 text-xs italic" style={{ color: style.gold }}>
              {invite.ofLabel ?? c.weddingOf}
            </p>

            <h1
              className="mt-2 text-[1.45rem] leading-tight sm:text-[1.65rem]"
              style={{ color: style.cream }}
              lang={invite.language}
            >
              {invite.bride}
            </h1>

            {!single && (
              <>
                <p className="my-1.5 text-sm uppercase tracking-[0.35em]" style={{ color: style.gold }}>
                  {style.wedsWord}
                </p>
                <h1
                  className="text-[1.45rem] leading-tight sm:text-[1.65rem]"
                  style={{ color: style.cream }}
                  lang={invite.language}
                >
                  {invite.groom}
                </h1>
              </>
            )}

            <div className="mx-auto mt-3 h-px w-20" style={{ background: style.gold, opacity: 0.7 }} />

            <p className="mt-3 text-sm leading-relaxed" style={{ color: style.gold }}>
              {invite.blessingNative}
            </p>
            <p className="mt-1.5 text-[10px] leading-relaxed px-2" style={{ color: `${style.cream}aa` }}>
              {invite.tagline}
            </p>
          </div>

          {/* Date + venue + mini events — like multi-event Indian cards */}
          <div className="shrink-0">
            <BrassLampPair color={style.gold} />
            <div
              className="mx-auto mt-2 rounded border px-3 py-2"
              style={{ borderColor: `${style.gold}66`, background: `${style.deep}88` }}
            >
              <p className="text-sm font-semibold tracking-[0.16em]" style={{ color: style.gold }}>
                {invite.weddingDateLabel}
              </p>
              <p className="mt-1 text-[10px]" style={{ color: style.cream }}>
                {invite.location.name}
              </p>
              <p className="text-[9px]" style={{ color: `${style.cream}88` }}>
                {invite.regionLabel}
              </p>
            </div>

            <EventMiniRow
              events={invite.events.map((e) => ({ title: e.title, dateLabel: e.dateLabel }))}
              gold={style.gold}
              cream={style.cream}
            />

            <p className="mt-3 text-[8px] uppercase tracking-[0.24em]" style={{ color: `${style.cream}66` }}>
              {invite.faithLabel} · {invite.languageLabel} · {invite.styleLabel}
            </p>
          </div>
        </div>

        {watermarked && <Watermark />}
      </div>
    );
  },
);
