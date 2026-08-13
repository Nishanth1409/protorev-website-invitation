"use client";

import Image from "next/image";
import { forwardRef } from "react";
import type { WeddingInvite } from "@/data/types";
import type { ExperienceKey } from "@/data/themes";
import { getCreateTheme } from "@/data/themes";
import { getIndianCardStyle } from "./traditional/indianStyle";
import { MangoToran } from "./traditional/IndianMotifs";
import { MandalaWatermark } from "./FestivalDecor";

type Props = {
  invite: WeddingInvite;
  experience: ExperienceKey;
  watermarked?: boolean;
};

const MOTIF: Record<string, string> = {
  diyas: "/motifs/diyas.jpg",
  mehendi: "/motifs/mehendi.jpg",
  naming: "/motifs/naming.jpg",
  campus: "/motifs/campus.jpg",
};

const RICH: ExperienceKey[] = [
  "diya-vivah",
  "mehendi-mandala",
  "haldi-sunburst",
  "peacock-palace",
  "watercolour-shaadi",
  "bollywood-reel",
  "naming-lotus",
  "gruhapravesha-glow",
  "campus-farewell",
  "school-annual",
  "birthday-spark",
  "silver-toast",
  "engagement-sparkle",
  "marigold-baraat",
  "festival-lane",
];

export function isRichFestivalCard(experience: ExperienceKey) {
  return RICH.includes(experience);
}

function Names({ invite, accent, ink }: { invite: WeddingInvite; accent: string; ink: string }) {
  const ofLabel = invite.ofLabel ?? invite.copy.weddingOf;
  const single = !invite.groom?.trim();
  return (
    <div className="w-full" lang={invite.language}>
      <p className="invite-script mb-2 text-xl leading-none" style={{ color: accent }}>
        {ofLabel}
      </p>
      <h1 className="invite-name text-[1.65rem] sm:text-[1.85rem]" style={{ color: ink }}>
        {invite.bride}
      </h1>
      {!single && (
        <>
          <p className="invite-script my-1 text-2xl leading-none" style={{ color: accent }}>
            &
          </p>
          <h1 className="invite-name text-[1.65rem] sm:text-[1.85rem]" style={{ color: ink }}>
            {invite.groom}
          </h1>
        </>
      )}
    </div>
  );
}

function Watermark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden" aria-hidden>
      <div className="rotate-[-28deg] text-center">
        <p className="text-3xl font-bold tracking-[0.18em] text-white/40 sm:text-4xl">SAMPLE</p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
          Studio preview
        </p>
      </div>
    </div>
  );
}

/**
 * Canva-market festival cards — lamps, mehendi, naming, campus, etc.
 * Distinct layouts (not plain centered text blocks).
 */
export const FestivalArtCard = forwardRef<HTMLDivElement, Props>(
  function FestivalArtCard({ invite, experience, watermarked = false }, ref) {
    const themeMeta = invite.themeId ? getCreateTheme(invite.themeId) : null;
    const motifKey = themeMeta?.artMotif;
    const motif = motifKey ? MOTIF[motifKey] : undefined;
    const t = invite.theme;
    const indian =
      (invite.ceremony ?? "wedding") === "wedding" || invite.ceremony === "engagement"
        ? getIndianCardStyle(invite.faith, invite.language)
        : null;

    if (experience === "diya-vivah" || experience === "marigold-baraat" || experience === "gruhapravesha-glow") {
      const gold = indian?.gold ?? t.accent;
      const cream = indian?.cream ?? t.ink;
      const maroon = indian?.maroon ?? t.bg;
      const deep = indian?.deep ?? t.bgDeep;
      return (
        <div
          ref={ref}
          data-invite-card
          className="invite-print-card relative overflow-hidden"
          style={{
            width: "100%",
            maxWidth: 420,
            aspectRatio: "5 / 7",
            background: `radial-gradient(circle at 50% 12%, ${gold}33, transparent 42%), linear-gradient(180deg, ${maroon}, ${deep})`,
            color: cream,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          <div className="absolute inset-x-0 top-0 px-2 pt-2 opacity-90">
            <MangoToran color={gold} />
          </div>
          <div className="pointer-events-none absolute inset-3 border" style={{ borderColor: `${gold}66` }} />
          <div className="pointer-events-none absolute inset-5 border" style={{ borderColor: `${gold}44` }} />
          <MandalaWatermark color={gold} />

          <div className="relative z-10 flex h-full flex-col items-center px-[8%] pb-[8%] pt-[12%] text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em]" style={{ color: gold }}>
              {indian?.openingLine ?? "Shubha Vivaha"} · {invite.languageLabel}
            </p>
            {motif && (
              <div className="relative mt-3 h-24 w-full max-w-55 overflow-hidden rounded-2xl border" style={{ borderColor: t.border }}>
                <Image src={motif} alt="" fill className="object-cover" sizes="220px" />
              </div>
            )}
            <div className="mt-4 flex-1">
              <Names invite={invite} accent={gold} ink={cream} />
              <div className="mx-auto mt-4 h-px w-16" style={{ background: gold }} />
              <p className="mt-3 text-sm" style={{ color: gold }}>
                {invite.blessingNative}
              </p>
              <p className="mt-2 text-[11px] leading-relaxed" style={{ color: `${cream}bb` }}>
                {invite.tagline}
              </p>
            </div>
            <div>
              <p className="text-sm tracking-[0.18em]" style={{ color: gold }}>
                {invite.weddingDateLabel}
              </p>
              <p className="mt-1 text-xs" style={{ color: cream }}>
                {invite.location.name}
              </p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.22em]" style={{ color: t.inkSoft }}>
                ✦ Diya · Marigold · Blessing ✦
              </p>
            </div>
          </div>
          {watermarked && <Watermark />}
        </div>
      );
    }

    if (experience === "mehendi-mandala") {
      return (
        <div
          ref={ref}
          data-invite-card
          className="invite-print-card relative overflow-hidden"
          style={{
            width: "100%",
            maxWidth: 420,
            aspectRatio: "5 / 7",
            background: t.bg,
            color: t.ink,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {motif && (
            <div className="absolute inset-0 opacity-[0.22]">
              <Image src={motif} alt="" fill className="object-cover" sizes="420px" />
            </div>
          )}
          <div className="pointer-events-none absolute inset-4 rounded-4xl border-2" style={{ borderColor: t.accent }} />
          <div className="relative z-10 flex h-full flex-col items-center justify-between px-[10%] py-[12%] text-center">
            <div>
              <p className="text-3xl" aria-hidden>
                🌿
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: t.accent }}>
                Mehendi night
              </p>
            </div>
            <Names invite={invite} accent={t.accent} ink={t.ink} />
            <div>
              <p className="text-xs leading-relaxed" style={{ color: t.inkSoft }}>
                {invite.invitationCopy}
              </p>
              <p className="mt-4 text-sm font-semibold" style={{ color: t.accent }}>
                {invite.weddingDateLabel}
              </p>
              <p className="mt-1 text-xs">{invite.location.name}</p>
            </div>
          </div>
          {watermarked && <Watermark />}
        </div>
      );
    }

    if (experience === "haldi-sunburst") {
      return (
        <div
          ref={ref}
          data-invite-card
          className="invite-print-card relative overflow-hidden"
          style={{
            width: "100%",
            maxWidth: 420,
            aspectRatio: "5 / 7",
            background: `radial-gradient(circle at 50% 0%, ${t.glow}, transparent 55%), ${t.bg}`,
            color: t.ink,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          <div
            className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full opacity-40"
            style={{
              background: `repeating-conic-gradient(from 0deg, ${t.accent} 0 8deg, transparent 8deg 16deg)`,
            }}
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 px-[10%] text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: t.accent }}>
              Haldi · Sunshine
            </p>
            <p className="text-4xl" aria-hidden>
              🌼
            </p>
            <Names invite={invite} accent={t.accent} ink={t.ink} />
            <p className="text-sm" style={{ color: t.accent }}>
              {invite.weddingDateLabel}
            </p>
            <p className="text-xs" style={{ color: t.inkSoft }}>
              {invite.location.name}
            </p>
          </div>
          {watermarked && <Watermark />}
        </div>
      );
    }

    if (experience === "naming-lotus") {
      return (
        <div
          ref={ref}
          data-invite-card
          className="invite-print-card relative overflow-hidden"
          style={{
            width: "100%",
            maxWidth: 420,
            aspectRatio: "5 / 7",
            background: `linear-gradient(180deg, ${t.bg}, ${t.bgDeep})`,
            color: t.ink,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          {motif && (
            <div className="absolute inset-x-0 top-0 h-[38%] opacity-90">
              <Image src={motif} alt="" fill className="object-cover" sizes="420px" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent to-(--fade)" style={{ ["--fade" as string]: t.bg }} />
            </div>
          )}
          <div className="relative z-10 flex h-full flex-col items-center justify-end px-[9%] pb-[10%] pt-[42%] text-center">
            <p className="text-[10px] uppercase tracking-[0.3em]" style={{ color: t.accent }}>
              Naamkaran · Naming
            </p>
            <p className="mt-2 text-sm italic" style={{ color: t.inkSoft }}>
              {invite.ofLabel ?? "Naming ceremony of"}
            </p>
            <h1 className="mt-2 text-3xl" style={{ color: t.ink }}>
              {invite.bride}
            </h1>
            <div className="mx-auto mt-4 h-px w-14" style={{ background: t.accent }} />
            <p className="mt-3 text-sm" style={{ color: t.accent }}>
              {invite.blessingNative}
            </p>
            <p className="mt-4 text-sm font-semibold tracking-wide">{invite.weddingDateLabel}</p>
            <p className="mt-1 text-xs" style={{ color: t.inkSoft }}>
              {invite.hosts}
            </p>
          </div>
          {watermarked && <Watermark />}
        </div>
      );
    }

    if (experience === "campus-farewell" || experience === "school-annual" || experience === "birthday-spark") {
      const title =
        experience === "campus-farewell"
          ? "Farewell night"
          : experience === "school-annual"
            ? "Annual day"
            : "Birthday bash";
      return (
        <div
          ref={ref}
          data-invite-card
          className="invite-print-card relative overflow-hidden"
          style={{
            width: "100%",
            maxWidth: 420,
            aspectRatio: "5 / 7",
            background: `linear-gradient(160deg, ${t.bgDeep}, ${t.bg})`,
            color: t.ink,
            fontFamily: "var(--font-brand), system-ui, sans-serif",
          }}
        >
          {motif && experience === "campus-farewell" && (
            <div className="absolute inset-0 opacity-35">
              <Image src={motif} alt="" fill className="object-cover" sizes="420px" />
            </div>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_40%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between px-[9%] py-[10%]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: t.accent }}>
                {title}
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight">{invite.bride}</h1>
              {invite.groom?.trim() && (
                <p className="mt-2 text-sm" style={{ color: t.inkSoft }}>
                  {invite.groom}
                </p>
              )}
            </div>
            <div className="rounded-2xl border p-4" style={{ borderColor: t.border, background: t.card }}>
              <p className="text-xs uppercase tracking-[0.2em]" style={{ color: t.accent }}>
                {invite.weddingDateLabel}
              </p>
              <p className="mt-2 text-sm font-semibold">{invite.location.name}</p>
              <p className="mt-1 text-xs" style={{ color: t.inkSoft }}>
                {invite.tagline}
              </p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.22em]" style={{ color: t.inkSoft }}>
              {invite.styleLabel} · Protorev
            </p>
          </div>
          {watermarked && <Watermark />}
        </div>
      );
    }

    // peacock / watercolour / bollywood / engagement / silver / festival-lane default rich
    return (
      <div
        ref={ref}
        data-invite-card
        className="invite-print-card relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 420,
          aspectRatio: "5 / 7",
          background:
            experience === "watercolour-shaadi" || experience === "silver-toast"
              ? `linear-gradient(180deg, ${t.bg}, ${t.bgDeep})`
              : `radial-gradient(circle at 50% 18%, ${t.glow}, transparent 45%), linear-gradient(165deg, ${t.bgDeep}, ${t.bg})`,
          color: t.ink,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          className="pointer-events-none absolute inset-4 rounded-3xl border"
          style={{
            borderColor: t.border,
            borderRadius: experience === "peacock-palace" ? "1.5rem 1.5rem 2.5rem 2.5rem" : undefined,
          }}
        />
        {experience === "peacock-palace" && (
          <p className="absolute left-1/2 top-6 -translate-x-1/2 text-3xl opacity-80" aria-hidden>
            🦚
          </p>
        )}
        {experience === "bollywood-reel" && (
          <>
            <div className="absolute inset-y-0 left-0 w-4 opacity-40" style={{ background: `repeating-linear-gradient(180deg, ${t.accent} 0 10px, transparent 10px 18px)` }} />
            <div className="absolute inset-y-0 right-0 w-4 opacity-40" style={{ background: `repeating-linear-gradient(180deg, ${t.accent} 0 10px, transparent 10px 18px)` }} />
          </>
        )}
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-[9%] py-[11%] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: t.accent }}>
            {invite.ceremony ?? "wedding"} · {invite.emblem}
          </p>
          <Names invite={invite} accent={t.accent} ink={t.ink} />
          <div>
            <p className="text-xs leading-relaxed" style={{ color: t.inkSoft }}>
              {invite.blessingNative}
            </p>
            <p className="mt-3 text-sm tracking-[0.16em]" style={{ color: t.accent }}>
              {invite.weddingDateLabel}
            </p>
            <p className="mt-1 text-xs">{invite.location.name}</p>
          </div>
        </div>
        {watermarked && <Watermark />}
      </div>
    );
  },
);
