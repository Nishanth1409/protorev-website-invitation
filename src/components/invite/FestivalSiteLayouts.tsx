"use client";

import Image from "next/image";
import type { WeddingInvite } from "@/data/types";
import type { ExperienceKey } from "@/data/themes";
import { getCreateTheme } from "@/data/themes";
import {
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./styles/InviteShell";
import { LaceToran } from "./FestivalDecor";

const MOTIF: Record<string, string> = {
  diyas: "/motifs/diyas.jpg",
  mehendi: "/motifs/mehendi.jpg",
  naming: "/motifs/naming.jpg",
  campus: "/motifs/campus.jpg",
};

export const FESTIVAL_WEB: ExperienceKey[] = [
  "festival-lane",
  "mehendi-mandala",
  "naming-lotus",
  "campus-farewell",
  "school-annual",
  "diya-vivah",
  "marigold-baraat",
];

export function isFestivalWebExperience(experience: ExperienceKey) {
  return FESTIVAL_WEB.includes(experience);
}

function Names({ invite }: { invite: WeddingInvite }) {
  const single = !invite.groom?.trim();
  return (
    <div lang={invite.language}>
      <h1 className="invite-name text-4xl leading-tight sm:text-5xl lg:text-6xl">
        {invite.bride}
      </h1>
      {!single && (
        <>
          <p
            className="invite-script my-2 text-3xl leading-none sm:text-4xl"
            style={{ color: invite.theme.accent }}
          >
            &
          </p>
          <h1 className="invite-name text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {invite.groom}
          </h1>
        </>
      )}
    </div>
  );
}

/** Distinct scrolling bodies for festival / ceremony websites. */
export function FestivalSiteBody({
  invite,
  experience,
}: {
  invite: WeddingInvite;
  experience: ExperienceKey;
}) {
  const t = invite.theme;
  const motifKey = invite.themeId ? getCreateTheme(invite.themeId)?.artMotif : undefined;
  const motif = motifKey ? MOTIF[motifKey] : undefined;

  return (
    <div style={{ background: t.bgDeep, color: t.ink }}>
      <section className="relative min-h-[88svh] overflow-hidden">
        {motif && (
          <div className="absolute inset-0">
            <Image src={motif} alt="" fill priority className="object-cover opacity-45" sizes="100vw" />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${t.bgDeep}cc 0%, ${t.bgDeep} 72%)`,
              }}
            />
          </div>
        )}
        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
          {(experience === "festival-lane" || experience === "diya-vivah" || experience === "marigold-baraat") && (
            <div className="mb-6 w-full max-w-md opacity-90">
              <LaceToran color={t.accent} />
            </div>
          )}
          <p className="mb-3 text-[0.65rem] uppercase tracking-[0.35em]" style={{ color: t.accent }}>
            {invite.ofLabel ?? invite.copy.weddingOf}
          </p>
          <Names invite={invite} />
          <p className="mt-5 text-sm tracking-[0.22em]" style={{ color: t.accentSoft }}>
            {invite.weddingDateLabel}
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed" style={{ color: t.inkSoft }}>
            {invite.tagline}
          </p>
          <p className="mt-4 text-base" style={{ color: t.accent }}>
            {invite.blessingNative}
          </p>
        </div>
      </section>

      <div className="invite-stage px-4 sm:px-6">
        <SharedCountdown invite={invite} />
      </div>

      {experience === "festival-lane" && (
        <section className="px-4 py-12 sm:px-6">
          <div className="invite-stage mx-auto grid gap-4 sm:grid-cols-3">
            {["Diyas lit", "Marigold path", "Family feast"].map((label, i) => (
              <article
                key={label}
                className="rounded-2xl border px-5 py-6 text-center"
                style={{ borderColor: t.border, background: t.card }}
              >
                <p className="text-2xl" aria-hidden>
                  {["🪔", "🌼", "🍽️"][i]}
                </p>
                <h3 className="mt-3 invite-name text-xl">{label}</h3>
                <p className="mt-2 text-sm" style={{ color: t.inkSoft }}>
                  A festive stop on your celebration lane.
                </p>
              </article>
            ))}
          </div>
        </section>
      )}

      {(experience === "campus-farewell" || experience === "school-annual") && (
        <section className="px-4 py-10 sm:px-6">
          <div
            className="invite-stage mx-auto rounded-3xl border px-6 py-8 text-center"
            style={{ borderColor: t.border, background: t.card }}
          >
            <p className="text-xs uppercase tracking-[0.28em]" style={{ color: t.accent }}>
              Tonight&apos;s energy
            </p>
            <p className="mt-3 text-lg font-semibold">{invite.invitationCopy}</p>
            <p className="mt-2 text-sm" style={{ color: t.inkSoft }}>
              {invite.hosts}
            </p>
          </div>
        </section>
      )}

      <SharedEvents invite={invite} />
      <SharedLocationClosing invite={invite} />
    </div>
  );
}
