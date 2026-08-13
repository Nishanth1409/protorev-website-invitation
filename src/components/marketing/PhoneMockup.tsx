"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { CreateTheme } from "@/data/themes";
import { galleryPresentation } from "@/data/galleryPresentation";
import { assembleInvite } from "@/lib/buildInvite";
import { PrintableInvitationCard } from "@/components/invite/PrintableInvitationCard";

/**
 * Gallery thumbnail — real invitation design inside a floating phone frame.
 */
export function PhoneMockup({ theme }: { theme: CreateTheme }) {
  const invite = useMemo(
    () => assembleInvite(theme, "hindu", "en"),
    [theme],
  );
  const pres = galleryPresentation(theme);
  const isCard = theme.format === "invitation-card";
  const t = theme.theme;

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[260px]"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="pointer-events-none absolute -inset-7 rounded-[3rem] blur-3xl"
        style={{ background: t.glow, opacity: 0.5 }}
        aria-hidden
      />

      <div
        className="relative overflow-hidden rounded-[2rem] border-[3px] border-[#1a1a1f] bg-[#0c0c10] shadow-[0_28px_65px_rgba(20,12,8,0.38)]"
        style={{ aspectRatio: "9 / 19.5" }}
      >
        <div className="absolute left-1/2 top-[7px] z-30 h-[20px] w-[34%] -translate-x-1/2 rounded-full bg-[#0c0c10]" />

        <div className="absolute inset-[3px] overflow-hidden rounded-[1.7rem] bg-[#16120f]">
          {isCard ? (
            <div className="flex h-full items-start justify-center px-1.5 pt-7">
              <div className="w-full overflow-hidden rounded-sm shadow-lg [&_[data-invite-card]]:!max-w-none">
                <PrintableInvitationCard invite={invite} watermarked={false} />
              </div>
            </div>
          ) : (
            <WebsiteMiniScreen theme={theme} inviteNames={[invite.bride, invite.groom]} title={pres.title} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function WebsiteMiniScreen({
  theme,
  inviteNames,
  title,
}: {
  theme: CreateTheme;
  inviteNames: [string, string];
  title: string;
}) {
  const t = theme.theme;
  return (
    <div
      className="flex h-full flex-col"
      style={{
        background: `radial-gradient(circle at 70% 12%, ${t.glow}, transparent 42%), linear-gradient(180deg, ${t.bg}, ${t.bgDeep})`,
        color: t.text,
      }}
    >
      <div className="flex flex-1 flex-col items-center justify-center px-3 pt-8">
        <div
          className="mb-3 h-16 w-24 rounded-t-full border border-b-0 opacity-70"
          style={{ borderColor: t.accent }}
        />
        <p className="text-[7px] uppercase tracking-[0.28em]" style={{ color: t.accent }}>
          Wedding site
        </p>
        <p className="invite-name mt-2 text-center text-[0.95rem] leading-tight">
          {inviteNames[0]}
        </p>
        <p className="invite-script text-sm" style={{ color: t.accent }}>
          weds
        </p>
        <p className="invite-name text-center text-[0.95rem] leading-tight">
          {inviteNames[1]}
        </p>
      </div>
      <div
        className="border-t px-3 py-2.5"
        style={{ borderColor: `${t.accent}44`, background: `${t.card}` }}
      >
        <p className="truncate text-[8px] font-semibold" style={{ color: t.accent }}>
          {title}
        </p>
        <p className="mt-0.5 text-[6px]" style={{ color: t.muted }}>
          Events · Gallery · RSVP
        </p>
      </div>
    </div>
  );
}
