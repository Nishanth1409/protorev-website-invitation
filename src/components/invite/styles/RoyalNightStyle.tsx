"use client";

import { motion } from "framer-motion";
import type { WeddingInvite } from "@/data/types";
import {
  InviteShell,
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./InviteShell";

function Cover({ invite, onOpen }: { invite: WeddingInvite; onOpen: () => void }) {
  const t = invite.theme;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-6"
      style={{ background: `radial-gradient(circle at 30% 20%, ${t.glow}, transparent 45%), ${t.bgDeep}` }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="w-full max-w-md rounded-[2rem] border px-8 py-14 text-center backdrop-blur-xl"
        style={{ borderColor: t.border, background: t.card, color: t.text }}
      >
        <p className="mb-3 text-xs tracking-[0.35em]" style={{ color: t.accent }}>
          {invite.styleLabel.toUpperCase()}
        </p>
        <p className="mb-2 font-[family-name:var(--font-script)] text-3xl" style={{ color: t.accentSoft }}>
          {invite.copy.weddingOf}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl">{invite.bride}</h1>
        <p className="my-2" style={{ color: t.accent }}>
          &
        </p>
        <h1 className="mb-8 font-[family-name:var(--font-display)] text-4xl">{invite.groom}</h1>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-full border px-7 py-3 text-xs uppercase tracking-[0.25em]"
          style={{ borderColor: t.accent, color: t.accentSoft }}
        >
          {invite.copy.openInvite}
        </button>
      </div>
    </motion.div>
  );
}

export function RoyalNightStyle({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const c = invite.copy;
  return (
    <InviteShell
      invite={invite}
      particleMode="sparks"
      cover={(open) => <Cover invite={invite} onOpen={open} />}
    >
      {() => (
        <div style={{ background: t.bgDeep, color: t.ink }}>
          <section className="relative z-20 flex min-h-[88vh] items-center justify-center px-5 py-16">
            <div
              className="w-full max-w-xl rounded-[1.8rem] border px-8 py-14 text-center backdrop-blur-md"
              style={{ background: t.card, borderColor: t.border, boxShadow: `0 0 80px ${t.glow}` }}
            >
              <div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border text-2xl"
                style={{ borderColor: t.border, color: t.accent }}
              >
                {invite.monogram}
              </div>
              <p className="mb-4 text-xs tracking-[0.35em]" style={{ color: t.inkSoft }}>
                {c.saveTheDate}
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-5xl">{invite.bride}</h1>
              <p className="my-3 font-[family-name:var(--font-script)] text-3xl" style={{ color: t.accent }}>
                &
              </p>
              <h1 className="mb-6 font-[family-name:var(--font-display)] text-5xl">{invite.groom}</h1>
              <p className="tracking-[0.25em]" style={{ color: t.accentSoft }}>
                {invite.weddingDateLabel}
              </p>
            </div>
          </section>
          <section className="relative z-20 mx-auto max-w-lg px-6 py-12 text-center">
            <p className="mb-3 text-sm" style={{ color: t.accentSoft }} dir="auto">
              {invite.blessingNative}
            </p>
            <p className="text-sm leading-7" style={{ color: t.inkSoft }}>
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
