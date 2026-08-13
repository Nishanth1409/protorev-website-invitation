"use client";

import { motion } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import {
  InviteShell,
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./InviteShell";

export function ModernCleanStyle({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const c = invite.copy;

  return (
    <InviteShell
      invite={invite}
      particleMode="sparks"
      cover={(onOpen) => (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-white px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-full max-w-lg text-left" style={{ color: t.ink }}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: t.accent }}>
              {invite.styleLabel}
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              {invite.bride}
              <span className="block text-[var(--ink-mute)]">&</span>
              {invite.groom}
            </h1>
            <p className="mt-6 text-sm" style={{ color: t.inkSoft }}>
              {invite.weddingDateLabel} · {invite.regionLabel}
            </p>
            <button
              type="button"
              onClick={onOpen}
              className="mt-10 rounded-none border-b-2 pb-1 text-sm font-semibold uppercase tracking-[0.2em]"
              style={{ borderColor: t.accent, color: t.ink }}
            >
              {c.openInvite}
            </button>
          </div>
        </motion.div>
      )}
    >
      {() => (
        <div className="bg-white" style={{ color: t.ink }}>
          <section className="relative z-20 mx-auto max-w-3xl px-6 py-20">
            <div className="grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: t.inkSoft }}>
                  {c.weddingOf}
                </p>
                <h1 className="mt-4 text-5xl font-bold tracking-tight">{invite.monogram}</h1>
              </div>
              <p className="text-sm leading-7" style={{ color: t.inkSoft }}>
                {invite.invitationCopy}
              </p>
            </div>
            <div className="mt-14 border-y py-8" style={{ borderColor: t.border }}>
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: t.inkSoft }}>
                {c.saveTheDate}
              </p>
              <p className="mt-2 text-3xl font-semibold">{invite.weddingDateLabel}</p>
            </div>
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
