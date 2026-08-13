"use client";

import { motion } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import {
  InviteShell,
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./InviteShell";

export function CoastalMistStyle({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const c = invite.copy;

  return (
    <InviteShell
      invite={invite}
      cover={(onOpen) => (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-6"
          style={{
            background: `linear-gradient(160deg, ${t.bg} 0%, ${t.surface} 50%, #dff3f0 100%)`,
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-full max-w-md rounded-[2.5rem] bg-white/70 px-8 py-12 text-center shadow-xl backdrop-blur">
            <p className="text-xs tracking-[0.3em]" style={{ color: t.inkSoft }}>
              {invite.regionLabel.toUpperCase()}
            </p>
            <h1 className="mt-5 invite-name text-4xl" style={{ color: t.ink }}>
              {invite.bride}
            </h1>
            <p className="my-2" style={{ color: t.accent }}>
              ✦
            </p>
            <h1 className="invite-name text-4xl" style={{ color: t.ink }}>
              {invite.groom}
            </h1>
            <button
              type="button"
              onClick={onOpen}
              className="mt-10 rounded-full px-8 py-3 text-sm font-semibold text-white"
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
          <section className="relative z-20 px-6 py-16 text-center">
            <p className="text-xs tracking-[0.3em]" style={{ color: t.inkSoft }}>
              {c.weddingOf}
            </p>
            <h1 className="mt-4 invite-name text-5xl">{invite.bride}</h1>
            <p className="my-3 text-2xl" style={{ color: t.accent }}>
              &
            </p>
            <h1 className="invite-name text-5xl">{invite.groom}</h1>
            <p className="mt-6 tracking-[0.2em]">{invite.weddingDateLabel}</p>
            <p className="mx-auto mt-6 max-w-md text-sm leading-7" style={{ color: t.inkSoft }}>
              {invite.tagline}
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
