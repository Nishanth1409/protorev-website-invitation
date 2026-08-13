"use client";

import type { WeddingInvite } from "@/data/types";
import {
  BrassLampPair,
  MangoToran,
  TempleGopuram,
} from "./traditional/IndianMotifs";
import { getIndianCardStyle, MODERN_WESTERN_EXPERIENCES } from "./traditional/indianStyle";
import {
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./styles/InviteShell";
import { LaceToran, MandalaWatermark } from "./FestivalDecor";

/** Guest websites with South/North Indian wedding invitation feel. */
export function IndianTraditionalSiteBody({ invite }: { invite: WeddingInvite }) {
  const style = getIndianCardStyle(invite.faith, invite.language);
  const t = invite.theme;
  const single = !invite.groom?.trim();

  return (
    <div style={{ background: style.deep, color: style.cream }}>
      <section className="relative min-h-[92svh] overflow-hidden px-4 py-16 sm:px-6">
        <MandalaWatermark color={style.gold} />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${style.gold}33, transparent 50%)`,
          }}
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <MangoToran color={style.gold} />
          <p className="mt-4 text-sm tracking-[0.32em]" style={{ color: style.gold }}>
            {style.openingLine}
          </p>
          <p className="mt-1 text-xs tracking-[0.22em]" style={{ color: `${style.cream}99` }}>
            {style.subOpening}
          </p>

          {style.regional === "south" && invite.faith === "hindu" && (
            <div className="mt-6">
              <TempleGopuram color={style.gold} cream={style.cream} />
            </div>
          )}

          <div
            className="mx-auto mt-8 max-w-lg rounded-[1.75rem] border px-6 py-10 sm:px-10"
            style={{
              borderColor: `${style.gold}55`,
              background: `linear-gradient(180deg, ${style.maroon}ee, ${style.deep}f5)`,
              boxShadow: `0 0 60px ${style.gold}22`,
            }}
          >
            <LaceToran color={style.gold} />
            <p className="mt-4 text-xs" style={{ color: `${style.cream}bb` }}>
              {invite.hosts}
            </p>
            <p className="mt-3 text-sm italic" style={{ color: style.gold }}>
              {invite.ofLabel ?? invite.copy.weddingOf}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl" lang={invite.language}>
              {invite.bride}
            </h1>
            {!single && (
              <>
                <p className="my-2 text-lg uppercase tracking-[0.35em]" style={{ color: style.gold }}>
                  {style.wedsWord}
                </p>
                <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl" lang={invite.language}>
                  {invite.groom}
                </h1>
              </>
            )}
            <p className="mt-5 text-base" style={{ color: style.gold }}>
              {invite.blessingNative}
            </p>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: `${style.cream}cc` }}>
              {invite.invitationCopy}
            </p>
            <div className="mt-6">
              <BrassLampPair color={style.gold} />
            </div>
            <p className="mt-4 text-sm tracking-[0.2em]" style={{ color: style.gold }}>
              {invite.weddingDateLabel}
            </p>
            <p className="mt-2 text-sm">{invite.location.name}</p>
          </div>
        </div>
      </section>

      <div className="invite-stage px-4 sm:px-6" style={{ background: t.bgDeep }}>
        <SharedCountdown invite={invite} />
      </div>

      <section className="px-4 py-10 sm:px-6" style={{ background: style.maroon }}>
        <div className="invite-stage mx-auto max-w-3xl">
          <h2
            className="mb-6 text-center font-[family-name:var(--font-display)] text-2xl"
            style={{ color: style.gold }}
          >
            {invite.copy.eventsTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {invite.events.map((e) => (
              <article
                key={e.id}
                className="rounded-2xl border px-4 py-4"
                style={{
                  borderColor: `${style.gold}44`,
                  background: `${style.deep}cc`,
                  color: style.cream,
                }}
              >
                <p className="text-lg">{e.emoji}</p>
                <h3 className="mt-1 font-semibold" style={{ color: style.gold }}>
                  {e.title}
                </h3>
                <p className="mt-1 text-sm">{e.dateLabel} · {e.time}</p>
                <p className="text-xs" style={{ color: `${style.cream}aa` }}>
                  {e.venue}, {e.city}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SharedLocationClosing invite={invite} />
    </div>
  );
}

export function shouldUseIndianTraditionalSite(opts: {
  ceremony?: string;
  experience: string;
  isFestivalWeb: boolean;
}): boolean {
  if (opts.isFestivalWeb) return false;
  if (MODERN_WESTERN_EXPERIENCES.has(opts.experience)) return false;
  const c = opts.ceremony ?? "wedding";
  return c === "wedding" || c === "engagement";
}
