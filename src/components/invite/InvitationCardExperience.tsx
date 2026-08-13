"use client";

import type { WeddingInvite } from "@/data/types";
import { MusicToggle } from "./MusicToggle";
import { PrintableInvitationCard } from "./PrintableInvitationCard";
import { defaultMusic, musicByMood } from "@/data/music";
import { getCreateTheme } from "@/data/themes";
import {
  COMPANY,
  customizeEmailUrl,
  customizeWhatsAppUrl,
} from "@/data/contact";
import { languageMeta } from "@/data/types";
import Link from "next/link";

type Props = {
  invite: WeddingInvite;
};

function resolveMusic(invite: WeddingInvite) {
  if (invite.music) return invite.music;
  if (invite.themeId) {
    const theme = getCreateTheme(invite.themeId);
    if (theme) return musicByMood[theme.musicMood];
  }
  return defaultMusic;
}

/**
 * Theme example preview only.
 * Customers do not edit, pay, or download here —
 * they pick a theme and WhatsApp us to customise.
 */
export function InvitationCardExperience({ invite }: Props) {
  const t = invite.theme;
  const music = resolveMusic(invite);
  const langLabel = languageMeta[invite.language].label;

  const wa = customizeWhatsAppUrl({
    themeName: invite.styleLabel,
    format: "invitation-card",
    faith: invite.faithLabel,
    languages: langLabel,
    bride: invite.bride,
    groom: invite.groom,
  });
  const mail = customizeEmailUrl({
    themeName: invite.styleLabel,
    format: "invitation-card",
    bride: invite.bride,
    groom: invite.groom,
  });

  return (
    <div
      className="invite-viewport relative min-h-[calc(100svh-4rem)]"
      lang={invite.language}
      style={{
        background: `radial-gradient(circle at 20% 0%, ${t.glow}, transparent 40%), ${t.bgDeep}`,
      }}
    >
      <MusicToggle music={music} accent={t.accent} enabled />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px] lg:items-start lg:px-6 lg:py-12">
        <div className="flex justify-center">
          <div
            className="relative w-full max-w-[420px] rounded-[1.5rem] p-3 sm:p-5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${t.border}`,
            }}
          >
            <PrintableInvitationCard invite={invite} watermarked={false} />
            <p className="mt-3 text-center text-[11px] text-white/55">
              Example preview · Sample names for display only
            </p>
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-[var(--line)] bg-white/95 p-5 shadow-[var(--shadow-soft)] backdrop-blur sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--grad-a)]">
            Like this theme?
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">
            We customise it for you
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            Tell us this theme name and your details (names, date, venue, faith,
            language, photos). Our team designs your invitation and delivers the
            finished files — no login or payment on this website.
          </p>

          <div className="mt-4 rounded-2xl bg-[var(--background)] px-4 py-3 text-sm">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--ink-mute)]">
              Theme selected
            </p>
            <p className="font-bold text-[var(--ink)]">{invite.styleLabel}</p>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">
              {invite.faithLabel} · {langLabel}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center rounded-2xl bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white"
            >
              WhatsApp — customise this theme
            </a>
            <a
              href={mail}
              className="flex w-full items-center justify-center rounded-2xl border border-[var(--line)] bg-white px-4 py-3.5 text-sm font-semibold text-[var(--ink)]"
            >
              Email your details
            </a>
            <a
              href={`tel:+${COMPANY.whatsapp}`}
              className="flex w-full items-center justify-center rounded-2xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--ink-soft)]"
            >
              Call {COMPANY.phoneDisplay}
            </a>
          </div>

          <ul className="mt-6 space-y-2 text-xs text-[var(--ink-soft)]">
            <li>1. Choose a theme you like</li>
            <li>2. WhatsApp or email your names, date & photos</li>
            <li>3. We design & deliver your finished invitation</li>
          </ul>

          <Link
            href="/create"
            className="mt-5 inline-block text-sm font-semibold text-[var(--grad-a)]"
          >
            ← Browse more themes
          </Link>
        </aside>
      </div>
    </div>
  );
}
