"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { WeddingInvite } from "@/data/types";
import type { InviteTheme } from "@/data/types";
import { getArtDirection, type ArtDirection, type ArtPalette } from "@/data/artDirection";
import {
  InviteShell,
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "../styles/InviteShell";
import { getIndianCardStyle } from "../traditional/indianStyle";

type Props = {
  invite: WeddingInvite;
};

function themeFromPalette(palette: ArtPalette, base?: InviteTheme): InviteTheme {
  return {
    bg: palette.shell,
    bgDeep: palette.shellDeep,
    accent: palette.gold,
    accentSoft: palette.goldSoft,
    text: palette.ink,
    muted: palette.inkSoft,
    card: palette.paper,
    border: `${palette.gold}66`,
    particle: palette.goldSoft,
    glow: palette.glow,
    surface: palette.paper,
    ink: palette.ink,
    inkSoft: palette.inkSoft,
    ...(base ?? {}),
  };
}

function ArtHero({
  invite,
  art,
  onOpen,
}: {
  invite: WeddingInvite;
  art: ArtDirection;
  onOpen: () => void;
}) {
  const { palette } = art;
  const style = getIndianCardStyle(invite.faith, invite.language);

  return (
    <motion.div
      className="absolute inset-0 z-[60] flex flex-col"
      style={{ background: palette.shellDeep }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <div className="relative min-h-[58svh] flex-1 overflow-hidden">
        <Image
          src={art.websiteHero}
          alt=""
          fill
          priority
          className="object-cover object-top"
          sizes="390px"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${palette.shellDeep}88 0%, transparent 35%, transparent 55%, ${palette.shellDeep} 100%)`,
          }}
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-10 pt-16 text-center">
          <p
            className="invite-blessing text-sm"
            style={{ color: palette.goldSoft }}
            lang={invite.language}
          >
            {style.openingLine}
          </p>
          <p
            className="invite-meta mt-2 text-[10px]"
            style={{ color: palette.gold, letterSpacing: "0.2em" }}
          >
            {style.subOpening}
          </p>
          <h1
            className="invite-name mt-4 text-3xl leading-tight"
            style={{ color: palette.paper }}
            lang={invite.language}
          >
            {invite.bride}
          </h1>
          {invite.groom?.trim() && (
            <>
              <p
                className="invite-script my-1 text-xl"
                style={{ color: palette.gold }}
              >
                {style.wedsWord === "weds" ? "weds" : style.wedsWord}
              </p>
              <h1
                className="invite-name text-3xl leading-tight"
                style={{ color: palette.paper }}
                lang={invite.language}
              >
                {invite.groom}
              </h1>
            </>
          )}
          <button
            type="button"
            onClick={onOpen}
            className="invite-meta mt-8 min-h-11 rounded-full border px-6 py-3 text-[11px] tracking-[0.22em] transition hover:scale-[1.02]"
            style={{
              borderColor: palette.gold,
              color: palette.goldSoft,
              background: `${palette.shellDeep}99`,
            }}
          >
            Open invitation
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ArtBody({ invite, art }: { invite: WeddingInvite; art: ArtDirection }) {
  const { palette } = art;
  const lang = invite.language;
  const themedInvite = {
    ...invite,
    theme: themeFromPalette(palette, invite.theme),
  };

  return (
    <div className="invite-mobile-canvas min-h-full">
      <section
        className="px-5 py-8"
        style={{ background: palette.shell, color: palette.ink }}
      >
        <p
          className="invite-blessing text-center text-lg"
          style={{ color: palette.accent }}
          lang={lang}
        >
          {invite.blessingNative}
        </p>
        <p
          className="invite-body-copy mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed"
          style={{ color: palette.inkSoft }}
          lang={lang}
        >
          {invite.tagline}
        </p>
      </section>

      <section
        className="border-t px-5 py-8"
        style={{
          background: palette.shell,
          color: palette.ink,
          borderColor: `${palette.gold}33`,
        }}
      >
        <SharedCountdown invite={themedInvite} />
      </section>

      <section
        className="border-t px-5 py-8"
        style={{
          background: palette.shellDeep,
          color: palette.paper,
          borderColor: `${palette.gold}33`,
        }}
      >
        <SharedEvents invite={themedInvite} />
      </section>

      <section
        className="border-t px-5 py-12 pb-16"
        style={{
          background: palette.shellDeep,
          color: palette.paper,
          borderColor: `${palette.gold}33`,
        }}
      >
        <SharedLocationClosing invite={themedInvite} />
        <p
          className="invite-meta mt-8 text-center text-[9px] opacity-50"
          style={{ color: palette.goldSoft }}
        >
          Invitation Studio · Protorev Digital
        </p>
      </section>
    </div>
  );
}

/** Paired website experience — shares art direction with the card family. */
export function ArtDirectedWebsite({ invite }: Props) {
  const art = getArtDirection(invite.themeId);
  if (!art) return null;

  const shellTheme = themeFromPalette(art.palette, invite.theme);
  const themedInvite = { ...invite, theme: shellTheme };

  return (
    <InviteShell
      invite={themedInvite}
      cover={(onOpen) => <ArtHero invite={invite} art={art} onOpen={onOpen} />}
    >
      {() => <ArtBody invite={invite} art={art} />}
    </InviteShell>
  );
}
