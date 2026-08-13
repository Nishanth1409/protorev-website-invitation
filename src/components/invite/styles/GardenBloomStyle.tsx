"use client";

import { motion } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import {
  InviteShell,
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./InviteShell";

export function GardenBloomStyle({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const c = invite.copy;

  return (
    <InviteShell
      invite={invite}
      cover={(onOpen) => (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center px-5 pb-16"
          style={{
            background: `linear-gradient(180deg, ${t.bg} 0%, ${t.surface} 55%, ${t.bgDeep} 100%)`,
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-full max-w-md text-center" style={{ color: t.ink }}>
            <p className="mb-3 text-5xl" aria-hidden>
              🌸
            </p>
            <h1 className="invite-name text-4xl leading-tight">
              {invite.copy.openingTitle}
            </h1>
            <p className="mt-3 text-sm" style={{ color: t.inkSoft }}>
              {invite.bride} & {invite.groom}
            </p>
            <button
              type="button"
              onClick={onOpen}
              className="mt-10 rounded-full px-8 py-3.5 text-sm font-semibold text-white"
              style={{ background: t.accent }}
            >
              {c.openInvite}
            </button>
          </div>
        </motion.div>
      )}
    >
      {() => (
        <div style={{ background: t.surface, color: t.ink }}>
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, rgba(255,180,200,0.45), transparent 40%), radial-gradient(circle at 80% 0%, rgba(180,220,170,0.35), transparent 35%)",
            }}
          />
          <section className="relative z-20 px-6 pb-10 pt-16 text-center">
            <p className="text-xs tracking-[0.3em]" style={{ color: t.inkSoft }}>
              {c.weddingOf}
            </p>
            <h1 className="mt-4 invite-script text-5xl" style={{ color: t.accent }}>
              {invite.bride}
            </h1>
            <p className="my-2 text-2xl">♡</p>
            <h1 className="invite-script text-5xl" style={{ color: t.accent }}>
              {invite.groom}
            </h1>
            <p className="mt-6 tracking-widest">{invite.weddingDateLabel}</p>
            <p className="mx-auto mt-6 max-w-sm text-sm leading-7" style={{ color: t.inkSoft }}>
              {invite.tagline}
            </p>
          </section>
          <section className="relative z-20 mx-auto max-w-lg px-6 py-10 text-center">
            <h2 className="invite-name text-3xl">{c.youAreInvited}</h2>
            <p className="mt-4 text-sm leading-7" style={{ color: t.inkSoft }}>
              {invite.invitationCopy}
            </p>
          </section>
          <div className="relative z-20">
            <SharedCountdown invite={invite} />
            <SharedEvents invite={invite} />
            <SharedLocationClosing invite={invite} />
          </div>
        </div>
      )}
    </InviteShell>
  );
}
