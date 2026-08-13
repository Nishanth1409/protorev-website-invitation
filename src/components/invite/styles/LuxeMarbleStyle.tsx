"use client";

import { motion } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import {
  InviteShell,
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./InviteShell";

export function LuxeMarbleStyle({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const c = invite.copy;

  return (
    <InviteShell
      invite={invite}
      particleMode="sparks"
      cover={(onOpen) => (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center px-6"
          style={{
            background: `linear-gradient(135deg, #f7f4ef 0%, #ebe4d8 40%, #d9cfc0 100%)`,
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="w-full max-w-md border px-8 py-14 text-center"
            style={{ borderColor: t.accent, color: t.ink, background: "rgba(255,255,255,0.55)" }}
          >
            <p className="text-[0.65rem] tracking-[0.4em]" style={{ color: t.inkSoft }}>
              {invite.styleLabel.toUpperCase()}
            </p>
            <h1 className="mt-6 invite-name text-4xl">{invite.bride}</h1>
            <p className="my-3 invite-script text-3xl" style={{ color: t.accent }}>
              and
            </p>
            <h1 className="invite-name text-4xl">{invite.groom}</h1>
            <button
              type="button"
              onClick={onOpen}
              className="mt-10 border px-8 py-3 text-xs uppercase tracking-[0.28em]"
              style={{ borderColor: t.accent, color: t.ink }}
            >
              {c.openInvite}
            </button>
          </div>
        </motion.div>
      )}
    >
      {() => (
        <div style={{ background: t.surface, color: t.ink }}>
          <section className="relative z-20 mx-auto max-w-xl px-6 py-16 text-center">
            <div className="mx-auto mb-8 h-px w-24" style={{ background: t.accent }} />
            <p className="text-xs tracking-[0.35em]" style={{ color: t.inkSoft }}>
              {c.weddingOf}
            </p>
            <h1 className="mt-5 invite-name text-5xl">{invite.bride}</h1>
            <p className="my-3 invite-script text-3xl" style={{ color: t.accent }}>
              &
            </p>
            <h1 className="invite-name text-5xl">{invite.groom}</h1>
            <p className="mt-8 tracking-[0.25em]">{invite.weddingDateLabel}</p>
            <p className="mx-auto mt-6 max-w-md text-sm leading-7" style={{ color: t.inkSoft }}>
              {invite.invitationCopy}
            </p>
            <div className="mx-auto mt-8 h-px w-24" style={{ background: t.accent }} />
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
