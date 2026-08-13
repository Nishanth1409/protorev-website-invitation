"use client";

import Image from "next/image";
import { forwardRef } from "react";
import type { WeddingInvite } from "@/data/types";
import { getArtDirection, type ArtDirection } from "@/data/artDirection";
import { getIndianCardStyle } from "../traditional/indianStyle";

type Props = {
  invite: WeddingInvite;
  watermarked?: boolean;
  /** Smaller hero/gallery thumbnails — hide dense footer rows */
  compact?: boolean;
};

function Watermark() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div className="rotate-[-28deg] text-center">
        <p className="invite-name text-3xl tracking-[0.18em] text-black/25">
          SAMPLE
        </p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-black/30">
          Studio preview
        </p>
      </div>
    </div>
  );
}

function Monogram({ bride, groom, gold }: { bride: string; groom: string; gold: string }) {
  const b = bride.trim()[0]?.toUpperCase() ?? "";
  const g = groom.trim()[0]?.toUpperCase() ?? "";
  return (
    <div
      className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2"
      style={{ borderColor: gold, color: gold }}
    >
      <span className="invite-name text-2xl tracking-widest">
        {b}
        <span className="mx-0.5 text-lg opacity-60">&</span>
        {g}
      </span>
    </div>
  );
}

function NameBlock({
  invite,
  art,
  style,
  compact = false,
}: {
  invite: WeddingInvite;
  art: ArtDirection;
  style: ReturnType<typeof getIndianCardStyle>;
  compact?: boolean;
}) {
  const { palette } = art;
  const single = !invite.groom?.trim();
  const lang = invite.language;
  const nameSize = compact
    ? "text-[1.05rem] leading-[1.15]"
    : art.nameScale === "grand"
      ? "text-[1.55rem] leading-[1.15] sm:text-[1.75rem]"
      : art.nameScale === "formal"
        ? "text-[1.45rem] leading-[1.2] sm:text-[1.65rem]"
        : "text-[1.35rem] leading-[1.2] sm:text-[1.55rem]";

  return (
    <div className="flex flex-col items-center text-center">
      {!compact && (
        <p
          className="invite-body-copy max-w-[92%] text-[9px] leading-relaxed"
          style={{ color: palette.inkSoft }}
          lang={lang}
        >
          {invite.hosts}
        </p>
      )}

      <p
        className={`invite-script leading-none ${
          compact ? "mt-0 text-[1rem]" : "mt-2 text-[1.25rem]"
        }`}
        style={{ color: palette.gold }}
      >
        {invite.ofLabel ?? invite.copy.weddingOf}
      </p>

      {!compact && art.family === "modern-monogram" && (
        <Monogram bride={invite.bride} groom={invite.groom} gold={palette.gold} />
      )}

      <h1
        className={`invite-name mt-1.5 ${nameSize}`}
        style={{ color: palette.accentDeep }}
        lang={lang}
      >
        {invite.bride}
      </h1>

      {!single && (
        <>
          <p
            className={`invite-script leading-none ${
              compact ? "my-0.5 text-[0.9rem]" : "my-0.5 text-[1.1rem]"
            }`}
            style={{ color: palette.gold }}
          >
            {style.wedsWord === "weds" ? "weds" : style.wedsWord}
          </p>
          <h1
            className={`invite-name ${nameSize}`}
            style={{ color: palette.accentDeep }}
            lang={lang}
          >
            {invite.groom}
          </h1>
        </>
      )}

      <div
        className="mx-auto my-2 h-px w-14"
        style={{
          background: `linear-gradient(90deg, transparent, ${palette.gold}, transparent)`,
        }}
      />

      <p
        className={`invite-blessing leading-snug ${
          compact ? "text-[12px]" : "text-[14px] sm:text-[15px]"
        }`}
        style={{ color: palette.accent }}
        lang={lang}
      >
        {invite.blessingNative}
      </p>
      {!compact && (
        <p
          className="invite-body-copy mt-1 max-w-[95%] text-[10px] leading-relaxed"
          style={{ color: palette.inkSoft }}
          lang={lang}
        >
          {invite.tagline}
        </p>
      )}
    </div>
  );
}

/**
 * Layered flagship invitation card — artwork-first, not CSS-gradient UI.
 */
export const ArtDirectedCard = forwardRef<HTMLDivElement, Props>(
  function ArtDirectedCard(
    { invite, watermarked = false, compact = false },
    ref,
  ) {
    const art = getArtDirection(invite.themeId);
    if (!art) return null;

    const style = getIndianCardStyle(invite.faith, invite.language);
    const lang = invite.language;
    const { palette } = art;
    /** Solid paper — never translucent over artwork text */
    const paper = palette.paper;

    return (
      <div
        ref={ref}
        data-invite-card
        data-art-family={art.family}
        data-compact={compact ? "1" : undefined}
        className="invite-print-card physical-invite-card relative overflow-hidden isolate"
        lang={lang}
        style={{
          width: "100%",
          maxWidth: 420,
          aspectRatio: "5 / 7",
          color: palette.ink,
          background: paper,
          boxShadow:
            "0 22px 48px rgba(20,10,8,0.32), 0 1px 0 rgba(255,255,255,0.4) inset",
        }}
      >
        {/* Artwork as frame only — clipped so decorative art doesn't sit under text */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={art.cardArt}
            alt=""
            fill
            priority={!compact}
            className="object-cover"
            sizes={compact ? "200px" : "420px"}
          />
        </div>

        {/* Opaque paper panel — hides any baked-in calligraphy in the art */}
        <div
          className="absolute z-10 flex flex-col overflow-hidden rounded-sm"
          style={{
            inset: compact ? "9%" : "8%",
            background: paper,
            boxShadow: `inset 0 0 0 1px ${palette.goldSoft}66, 0 0 0 1px ${palette.gold}22`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div
            className={`relative z-10 flex h-full flex-col text-center ${
              compact ? "px-[8%] py-[8%]" : "px-[10%] py-[9%]"
            }`}
          >
            <div className="shrink-0">
              <p
                className={`invite-blessing leading-snug ${
                  compact ? "text-[11px]" : "text-[13px] sm:text-[14px]"
                }`}
                style={{ color: palette.accent }}
                lang={lang}
              >
                {style.openingLine}
              </p>
              <p
                className={`invite-meta mt-1 ${compact ? "text-[8px]" : "text-[9px]"}`}
                style={{ color: palette.gold, letterSpacing: "0.18em" }}
                lang={lang === "en" ? "en" : lang}
              >
                {style.subOpening}
              </p>

              {!compact && art.motif && (
                <div className="relative mx-auto mt-2.5 h-12 w-24 overflow-hidden rounded-full ring-1 ring-black/10">
                  <Image
                    src={art.motif}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              )}

              <div className="mx-auto mt-2 flex items-center justify-center gap-2">
                <span
                  className="h-px w-8"
                  style={{ background: palette.gold }}
                />
                <span
                  className="invite-meta text-[9px]"
                  style={{ color: palette.accent }}
                >
                  {invite.emblem}
                </span>
                <span
                  className="h-px w-8"
                  style={{ background: palette.gold }}
                />
              </div>
            </div>

            <div className="my-auto flex min-h-0 flex-col justify-center py-1">
              <NameBlock
                invite={invite}
                art={art}
                style={style}
                compact={compact}
              />
            </div>

            <div className="shrink-0">
              <div
                className={`mx-auto border px-3 ${compact ? "py-1.5" : "rounded py-2"}`}
                style={{
                  borderColor: `${palette.gold}88`,
                  background: paper,
                }}
              >
                <p
                  className={`invite-name tracking-widest ${
                    compact ? "text-[11px]" : "text-[13px]"
                  }`}
                  style={{ color: palette.accentDeep }}
                >
                  {invite.weddingDateLabel}
                </p>
                {!compact && (
                  <>
                    <p
                      className="invite-body-copy mt-0.5 text-[10px]"
                      style={{ color: palette.ink }}
                      lang={lang}
                    >
                      {invite.location.name}
                    </p>
                    <p
                      className="invite-body-copy text-[8px]"
                      style={{ color: palette.inkSoft }}
                    >
                      {invite.regionLabel}
                    </p>
                  </>
                )}
              </div>

              {!compact && invite.events.length > 0 && (
                <div className="mt-1.5 space-y-0.5">
                  {invite.events.slice(0, 2).map((e) => (
                    <div
                      key={e.id}
                      className="invite-body-copy flex justify-between px-1 text-[7px]"
                      style={{ color: palette.inkSoft }}
                    >
                      <span>
                        {e.emoji} {e.title}
                      </span>
                      <span style={{ color: palette.gold }}>{e.dateLabel}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {watermarked && <Watermark />}
      </div>
    );
  },
);
