"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import { MusicToggle } from "../MusicToggle";
import { ParticleCanvas } from "../ParticleCanvas";
import { CountdownBlock } from "../CountdownBlock";
import { musicByMood } from "@/data/music";
import { getCreateTheme } from "@/data/themes";

type Props = {
  invite: WeddingInvite;
  cover: (open: () => void) => ReactNode;
  children: (opened: boolean) => ReactNode;
  particleMode?: "petals" | "sparks";
};

function resolveMusic(invite: WeddingInvite) {
  if (invite.music) return invite.music;
  if (invite.themeId) {
    const theme = getCreateTheme(invite.themeId);
    if (theme) return musicByMood[theme.musicMood];
  }
  const byStyle: Record<string, keyof typeof musicByMood> = {
    "royal-night": "royal",
    "garden-bloom": "garden",
    "modern-clean": "neon",
    "coastal-mist": "coastal",
    "festival-bright": "festival",
    "luxe-marble": "classic",
  };
  return musicByMood[byStyle[invite.designStyle] ?? "royal"];
}

export function InviteShell({
  invite,
  cover,
  children,
  particleMode = "petals",
}: Props) {
  const [opened, setOpened] = useState(false);
  const t = invite.theme;
  const music = resolveMusic(invite);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden invite-viewport"
      lang={invite.language}
    >
      <AnimatePresence>{!opened && cover(() => setOpened(true))}</AnimatePresence>
      {opened && (
        <>
          <MusicToggle music={music} accent={t.accent} enabled />
          <ParticleCanvas color={t.particle} active mode={particleMode} />
          {children(opened)}
        </>
      )}
    </div>
  );
}

export function SharedCountdown({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  return (
    <CountdownBlock
      targetIso={invite.weddingDate}
      accent={t.accent}
      accentSoft={t.accentSoft}
      text={t.ink}
      muted={t.inkSoft}
      border={t.border}
      card={t.card}
      glow={t.glow}
      copy={invite.copy}
    />
  );
}

export function SharedEvents({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const c = invite.copy;
  return (
    <section className="relative z-20 px-5 py-14">
      <h2
        className="mb-8 text-center font-[family-name:var(--font-display)] text-3xl"
        style={{ color: t.ink }}
      >
        {c.eventsTitle}
      </h2>
      <div className="mx-auto grid max-w-lg grid-cols-1 gap-4 md:max-w-3xl md:grid-cols-2 xl:max-w-5xl xl:grid-cols-3 2xl:max-w-6xl">
        {invite.events.map((event) => (
          <article
            key={event.id}
            className="rounded-2xl px-6 py-7 text-center"
            style={{
              background: t.card,
              border: `1px solid ${t.border}`,
              color: t.ink,
              boxShadow: `0 12px 40px ${t.glow}`,
            }}
          >
            <div className="mb-2 text-2xl">{event.emoji}</div>
            <h3 className="mb-2 font-[family-name:var(--font-display)] text-2xl">
              {event.title}
            </h3>
            <p className="text-sm">{event.dateLabel}</p>
            <p className="text-xs uppercase tracking-widest" style={{ color: t.inkSoft }}>
              {event.dayLabel}
            </p>
            <p className="mt-2 text-lg" style={{ color: t.accent }}>
              {event.time}
            </p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-lg">{event.venue}</p>
            <p className="text-sm" style={{ color: t.inkSoft }}>
              {event.city}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SharedLocationClosing({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const c = invite.copy;
  return (
    <>
      <section className="relative z-20 mx-auto max-w-lg px-5 py-10 text-center">
        <h2 className="mb-5 font-[family-name:var(--font-display)] text-3xl" style={{ color: t.ink }}>
          {c.locationTitle}
        </h2>
        <div
          className="rounded-2xl px-6 py-8"
          style={{ background: t.card, border: `1px solid ${t.border}`, color: t.ink }}
        >
          <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl">{invite.location.name}</h3>
          <p className="mb-6 text-sm" style={{ color: t.inkSoft }}>
            {invite.location.address}
          </p>
          <a
            href={invite.location.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border px-6 py-3 text-xs uppercase tracking-[0.2em]"
            style={{ borderColor: t.accent, color: t.ink }}
          >
            {c.viewMap}
          </a>
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-xl px-6 py-16 text-center" style={{ color: t.ink }}>
        <p className="mb-3 font-[family-name:var(--font-script)] text-4xl" style={{ color: t.accent }}>
          {c.thankYou}
        </p>
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-3xl">{c.presence}</h2>
        <p className="mb-8 text-sm leading-7" style={{ color: t.inkSoft }}>
          {invite.closingCopy}
        </p>
        <p className="font-[family-name:var(--font-display)] text-2xl">{invite.bride}</p>
        <p className="my-1" style={{ color: t.accent }}>
          &
        </p>
        <p className="mb-10 font-[family-name:var(--font-display)] text-2xl">{invite.groom}</p>
        <div className="mb-8 flex justify-center gap-5 text-sm" style={{ color: t.inkSoft }}>
          {invite.socials.whatsapp && (
            <a href={invite.socials.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          )}
          <a href={invite.location.mapUrl} target="_blank" rel="noreferrer">
            {c.locationTitle}
          </a>
        </div>
        <p className="text-[0.65rem] uppercase tracking-[0.28em]" style={{ color: t.inkSoft }}>
          {c.crafted}
        </p>
      </section>
    </>
  );
}
