"use client";

import { forwardRef } from "react";
import type { WeddingInvite } from "@/data/types";
import type { ExperienceKey } from "@/data/themes";
import { getCreateTheme } from "@/data/themes";
import { isArtDirectedTheme } from "@/data/artDirection";
import { ArtDirectedCard } from "./art/ArtDirectedCard";
import { FestivalArtCard, isRichFestivalCard } from "./FestivalArtCard";
import { TraditionalIndianCard } from "./traditional/TraditionalIndianCard";
import {
  getIndianCardStyle,
  shouldRenderTraditionalIndian,
} from "./traditional/indianStyle";

type Props = {
  invite: WeddingInvite;
  /** When true, burns PREVIEW watermark into the card (export-safe). */
  watermarked?: boolean;
  /** Compact hero/gallery thumbnail */
  compact?: boolean;
};

/**
 * Fixed 5×7 invitation card for studio preview and print-ready delivery.
 * Wedding templates use authentic Indian regional card art by faith & language.
 * Festival / modern themes keep their own visual families.
 */
export const PrintableInvitationCard = forwardRef<HTMLDivElement, Props>(
  function PrintableInvitationCard(
    { invite, watermarked = false, compact = false },
    ref,
  ) {
    const theme = invite.themeId ? getCreateTheme(invite.themeId) : null;
    const experience = (theme?.experience ?? "classic-ornate") as ExperienceKey;

    if (isArtDirectedTheme(invite.themeId)) {
      return (
        <ArtDirectedCard
          ref={ref}
          invite={invite}
          watermarked={watermarked}
          compact={compact}
        />
      );
    }

    const rich = isRichFestivalCard(experience);

    if (rich) {
      return (
        <FestivalArtCard
          ref={ref}
          invite={invite}
          experience={experience}
          watermarked={watermarked}
        />
      );
    }

    if (
      shouldRenderTraditionalIndian({
        ceremony: invite.ceremony,
        experience,
        isRichFestival: rich,
      })
    ) {
      return (
        <TraditionalIndianCard
          ref={ref}
          invite={invite}
          watermarked={watermarked}
        />
      );
    }

  if (
    experience === "gilded-curtain" ||
    experience === "velvet-royal" ||
    experience === "ribbon-envelope" ||
    experience === "heritage-arch" ||
    experience === "classic-ornate" ||
    experience === "temple-dawn" ||
    experience === "lantern-fire" ||
    experience === "vivah-festival" ||
    experience === "film-poster" ||
    experience === "soft-bloom" ||
    experience === "lotus-garden"
  ) {
    return (
      <CeremonialBlessingCard
        ref={ref}
        invite={invite}
        watermarked={watermarked}
      />
    );
  }

    return (
      <ModernStudioCard
        ref={ref}
        invite={invite}
        experience={experience}
        watermarked={watermarked}
      />
    );
  },
);

function WatermarkLayer() {
  return (
    <div
      data-preview-mark
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div className="rotate-[-28deg] text-center">
        <p className="text-3xl font-bold tracking-[0.18em] text-white/40 sm:text-4xl">
          SAMPLE
        </p>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
          Studio preview
        </p>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(-28deg, transparent, transparent 36px, rgba(255,255,255,0.05) 36px, rgba(255,255,255,0.05) 38px)",
        }}
      />
    </div>
  );
}

const CeremonialBlessingCard = forwardRef<HTMLDivElement, Props>(
  function CeremonialBlessingCard({ invite, watermarked = false }, ref) {
    const c = invite.copy;
    const style = getIndianCardStyle(invite.faith, invite.language);
    const gold = style.gold;
    const cream = style.cream;
    const maroon = style.maroon;
    const deep = style.deep;

    return (
      <div
        ref={ref}
        data-invite-card
        className="invite-print-card physical-invite-card relative overflow-hidden"
        style={{
          width: "100%",
          maxWidth: 420,
          aspectRatio: "5 / 7",
          background: `radial-gradient(circle at 50% 18%, ${gold}33, transparent 42%), linear-gradient(180deg, ${maroon}, ${deep})`,
          color: cream,
        }}
        lang={invite.language}
      >
        <div
          className="absolute inset-x-0 top-0 h-8"
          style={{
            background: `repeating-linear-gradient(90deg, ${gold} 0 10px, transparent 10px 18px)`,
            opacity: 0.55,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-8"
          style={{
            background: `repeating-linear-gradient(90deg, ${gold} 0 10px, transparent 10px 18px)`,
            opacity: 0.55,
          }}
        />
        <div
          className="pointer-events-none absolute inset-4 border"
          style={{ borderColor: `${gold}88` }}
        />
        <div
          className="pointer-events-none absolute inset-6 border"
          style={{ borderColor: `${gold}44` }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-between px-[9%] py-[11%] text-center">
          <div>
            <div
              className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border text-2xl"
              style={{ borderColor: gold, color: gold }}
            >
              {invite.emblem}
            </div>
            <p className="invite-blessing text-base leading-snug" style={{ color: gold }} lang={invite.language}>
              {style.openingLine}
            </p>
            <p className="invite-meta mt-1.5" style={{ color: `${cream}99` }} lang={invite.language}>
              {style.subOpening}
            </p>
          </div>

          <div className="w-full">
            <p className="invite-script text-sm" style={{ color: gold }}>
              {c.weddingOf}
            </p>
            <h1 className="invite-name mt-2 text-[1.7rem] leading-tight" style={{ color: cream }} lang={invite.language}>
              {invite.bride}
            </h1>
            <p className="invite-script my-1 text-xl leading-none" style={{ color: gold }}>
              {style.wedsWord}
            </p>
            <h1 className="invite-name text-[1.7rem] leading-tight" style={{ color: cream }} lang={invite.language}>
              {invite.groom}
            </h1>
            <div className="mx-auto mt-4 h-px w-20" style={{ background: gold }} />
            <p className="invite-blessing mt-4 text-sm leading-relaxed" style={{ color: gold }} lang={invite.language}>
              {invite.blessingNative}
            </p>
            <p className="invite-body-copy mt-2 text-[11px] leading-relaxed" style={{ color: `${cream}bb` }}>
              {invite.tagline}
            </p>
          </div>

          <div>
            <p className="invite-name text-sm tracking-[0.18em]" style={{ color: gold }}>
              {invite.weddingDateLabel}
            </p>
            <p className="invite-body-copy mt-2 text-xs" style={{ color: cream }}>
              {invite.location.name}
            </p>
            <p className="mt-4 text-[10px] tracking-[0.28em]" style={{ color: `${gold}cc` }}>
              ✦ {invite.faithLabel} · {invite.languageLabel} ✦
            </p>
          </div>
        </div>
        {watermarked && <WatermarkLayer />}
      </div>
    );
  },
);

const ModernStudioCard = forwardRef<
  HTMLDivElement,
  Props & { experience: ExperienceKey }
>(function ModernStudioCard({ invite, experience, watermarked = false }, ref) {
  const t = invite.theme;
  const c = invite.copy;

  return (
    <div
      ref={ref}
      data-invite-card
      className="invite-print-card relative overflow-hidden"
      style={{
        width: "100%",
        maxWidth: 420,
        aspectRatio: "5 / 7",
        background: cardBackground(experience, t.bg, t.bgDeep, t.glow),
        color: t.ink,
      }}
      lang={invite.language}
    >
      <CardChrome experience={experience} accent={t.accent} border={t.border} />

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-[8%] py-[9%] text-center">
        <div>
          <p className="invite-meta" style={{ color: t.accent }}>
            {invite.faithLabel} · {invite.languageLabel}
          </p>
          <p className="mt-3 text-3xl leading-none" aria-hidden>
            {invite.emblem}
          </p>
          <p className="invite-script mt-3 text-xl" style={{ color: t.inkSoft }}>
            {c.youAreInvited}
          </p>
        </div>

        <div className="my-4 w-full">
          <p className="invite-script mb-2 text-xl" style={{ color: t.accentSoft || t.accent }}>
            {c.weddingOf}
          </p>
          <h1 className="invite-name text-[1.75rem] sm:text-[1.95rem]" style={{ color: t.ink }} lang={invite.language}>
            {invite.bride}
          </h1>
          <p className="invite-script my-2 text-3xl leading-none" style={{ color: t.accent }}>
            &
          </p>
          <h1 className="invite-name text-[1.75rem] sm:text-[1.95rem]" style={{ color: t.ink }} lang={invite.language}>
            {invite.groom}
          </h1>
          <div className="mx-auto mt-5 h-px w-24" style={{ background: t.accent }} />
          <p className="invite-blessing mt-5 text-sm leading-relaxed" style={{ color: t.inkSoft }} lang={invite.language}>
            {invite.blessingNative}
          </p>
          <p className="invite-body-copy mt-2 text-[11px] leading-relaxed" style={{ color: t.inkSoft }}>
            {invite.tagline}
          </p>
        </div>

        <div className="w-full">
          <p className="invite-name text-sm tracking-[0.16em]" style={{ color: t.accent }}>
            {invite.weddingDateLabel}
          </p>
          <p className="invite-body-copy mt-2 text-xs" style={{ color: t.ink }}>
            {invite.location.name}
          </p>
          <p className="invite-body-copy mt-1 text-[10px]" style={{ color: t.inkSoft }}>
            {invite.location.address}
          </p>
          <p className="invite-meta mt-4" style={{ color: t.inkSoft }}>
            {invite.styleLabel} · Protorev Digital
          </p>
        </div>
      </div>
      {watermarked && <WatermarkLayer />}
    </div>
  );
});

function cardBackground(
  experience: ExperienceKey,
  bg: string,
  bgDeep: string,
  glow: string,
) {
  if (
    experience === "gilded-curtain" ||
    experience === "velvet-royal" ||
    experience === "ribbon-envelope" ||
    experience === "heritage-arch"
  ) {
    return `radial-gradient(circle at 50% 20%, ${glow}, transparent 45%), linear-gradient(165deg, ${bgDeep}, ${bg})`;
  }
  if (
    experience === "lotus-garden" ||
    experience === "soft-bloom" ||
    experience === "petal-story"
  ) {
    return `radial-gradient(circle at 80% 10%, ${glow}, transparent 40%), radial-gradient(circle at 10% 90%, ${glow}, transparent 35%), ${bg}`;
  }
  if (
    experience === "cyber-terminal" ||
    experience === "neon-dual" ||
    experience === "nova-glitch"
  ) {
    return `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 3px), linear-gradient(160deg, ${bgDeep}, ${bg})`;
  }
  if (experience === "film-poster" || experience === "cinema-split") {
    return `linear-gradient(180deg, ${bgDeep} 0%, ${bg} 40%, ${bgDeep} 100%)`;
  }
  return `linear-gradient(160deg, ${bg}, ${bgDeep})`;
}

function CardChrome({
  experience,
  accent,
  border,
}: {
  experience: ExperienceKey;
  accent: string;
  border: string;
}) {
  if (
    experience === "classic-ornate" ||
    experience === "ivory-edit" ||
    experience === "temple-dawn" ||
    experience === "ribbon-envelope"
  ) {
    return (
      <>
        <div className="pointer-events-none absolute inset-3 rounded-sm border" style={{ borderColor: border }} />
        <div className="pointer-events-none absolute inset-5 rounded-sm border" style={{ borderColor: accent, opacity: 0.55 }} />
      </>
    );
  }
  if (
    experience === "lotus-garden" ||
    experience === "soft-bloom" ||
    experience === "petal-story"
  ) {
    return (
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] border" style={{ borderColor: border }} />
    );
  }
  if (
    experience === "cyber-terminal" ||
    experience === "neon-dual" ||
    experience === "nova-glitch"
  ) {
    return (
      <div className="pointer-events-none absolute inset-3 border border-dashed" style={{ borderColor: accent }} />
    );
  }
  if (experience === "film-poster" || experience === "cinema-split" || experience === "noir-strip") {
    return (
      <>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-5" style={{ background: `repeating-linear-gradient(180deg, ${accent} 0 8px, transparent 8px 16px)`, opacity: 0.35 }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-5" style={{ background: `repeating-linear-gradient(180deg, ${accent} 0 8px, transparent 8px 16px)`, opacity: 0.35 }} />
      </>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-4 rounded-2xl border" style={{ borderColor: border }} />
  );
}
