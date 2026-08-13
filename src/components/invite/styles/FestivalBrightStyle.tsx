"use client";

import { motion } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import {
  InviteShell,
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./InviteShell";

export function FestivalBrightStyle({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const c = invite.copy;

  return (
    <InviteShell
      invite={invite}
      cover={(onOpen) => (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-5"
          style={{ background: t.bgDeep }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
        >
          <div className="w-full max-w-md overflow-hidden rounded-3xl" style={{ background: t.accent }}>
            <div className="bg-white px-7 py-10 text-center" style={{ color: t.ink }}>
              <p className="text-4xl">{invite.emblem}</p>
              <h1 className="mt-3 invite-name text-3xl tracking-tight">{c.openingTitle}</h1>
              <p className="mt-3 invite-name text-sm">
                {invite.bride} + {invite.groom}
              </p>
              <button
                type="button"
                onClick={onOpen}
                className="mt-8 rounded-2xl px-6 py-3 text-sm font-bold text-white"
                style={{ background: t.bgDeep }}
              >
                {c.openInvite}
              </button>
            </div>
            <div className="grid grid-cols-3">
              <div className="h-3" style={{ background: "#FF6B6B" }} />
              <div className="h-3" style={{ background: "#FFD93D" }} />
              <div className="h-3" style={{ background: "#6BCB77" }} />
            </div>
          </div>
        </motion.div>
      )}
    >
      {() => (
        <div style={{ background: t.surface, color: t.ink }}>
          <section className="relative z-20 px-5 py-14 text-center">
            <div
              className="mx-auto max-w-md rounded-[2rem] px-6 py-10"
              style={{ background: t.card, border: `3px solid ${t.accent}` }}
            >
              <p className="invite-meta" style={{ color: t.accent }}>
                {c.weddingOf}
              </p>
              <h1 className="mt-4 invite-name text-4xl">{invite.bride}</h1>
              <p className="invite-script my-2 text-2xl" style={{ color: t.accent }}>
                &
              </p>
              <h1 className="invite-name text-4xl">{invite.groom}</h1>
              <p className="mt-5 invite-name text-lg">{invite.weddingDateLabel}</p>
            </div>
            <p className="mx-auto mt-8 max-w-md text-sm leading-7" style={{ color: t.inkSoft }}>
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
