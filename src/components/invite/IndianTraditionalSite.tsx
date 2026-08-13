"use client";

import Image from "next/image";
import type { WeddingInvite } from "@/data/types";
import { getIndianCardStyle, MODERN_WESTERN_EXPERIENCES } from "./traditional/indianStyle";
import {
  SharedCountdown,
  SharedLocationClosing,
} from "./styles/InviteShell";

/** Guest websites that feel like opening a printed Indian invitation online. */
export function IndianTraditionalSiteBody({ invite }: { invite: WeddingInvite }) {
  const style = getIndianCardStyle(invite.faith, invite.language);
  const single = !invite.groom?.trim();
  const frame =
    invite.faith === "muslim" ? "/cards/frame-muslim.jpg" : "/cards/frame-cream.jpg";

  return (
    <div style={{ background: "#1A0A0E", color: "#F7F0E4" }}>
      <section className="relative flex min-h-[92svh] items-center justify-center px-4 py-14 sm:px-6">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(184,134,11,0.35), transparent 55%), #1A0A0E",
          }}
        />

        <div className="relative z-10 w-full max-w-md">
          <div
            className="physical-invite-card relative overflow-hidden"
            style={{ aspectRatio: "5 / 7" }}
          >
            <Image src={frame} alt="" fill priority className="object-cover" sizes="420px" />
            <div
              className="absolute inset-[10%] flex flex-col items-center justify-between rounded-sm px-5 py-6 text-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(252,247,236,0.94), rgba(247,240,228,0.96))",
                color: "#3D2415",
              }}
              lang={invite.language}
            >
              <div>
                <p className="invite-blessing text-base" style={{ color: "#6B1E2A" }}>
                  {style.openingLine}
                </p>
                <p className="invite-meta mt-1" style={{ color: "#B8860B" }}>
                  {style.subOpening}
                </p>
                <div className="relative mx-auto mt-4 h-16 w-32 overflow-hidden rounded-2xl">
                  <Image
                    src="/motifs/diyas.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </div>

              <div>
                <p className="invite-body-copy text-xs" style={{ color: "#6B4E3D" }}>
                  {invite.hosts}
                </p>
                <p className="invite-script mt-2 text-2xl" style={{ color: "#B8860B" }}>
                  {invite.ofLabel ?? invite.copy.weddingOf}
                </p>
                <h1
                  className="invite-name mt-2 text-3xl"
                  style={{ color: "#6B1E2A" }}
                  lang={invite.language}
                >
                  {invite.bride}
                </h1>
                {!single && (
                  <>
                    <p className="invite-script my-1 text-xl" style={{ color: "#B8860B" }}>
                      {style.wedsWord}
                    </p>
                    <h1
                      className="invite-name text-3xl"
                      style={{ color: "#6B1E2A" }}
                      lang={invite.language}
                    >
                      {invite.groom}
                    </h1>
                  </>
                )}
                <p className="invite-blessing mt-4 text-lg" style={{ color: "#6B1E2A" }}>
                  {invite.blessingNative}
                </p>
              </div>

              <div
                className="w-full rounded border px-3 py-2"
                style={{ borderColor: "rgba(184,134,11,0.45)", background: "rgba(255,250,240,0.9)" }}
              >
                <p className="invite-name text-sm" style={{ color: "#6B1E2A" }}>
                  {invite.weddingDateLabel}
                </p>
                <p className="invite-body-copy mt-1 text-xs">{invite.location.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="invite-stage px-4 sm:px-6" style={{ background: "#F7F0E4", color: "#3D2415" }}>
        <SharedCountdown invite={invite} />
      </div>

      <section className="px-4 py-12 sm:px-6" style={{ background: "#4A0E18" }}>
        <div className="invite-stage mx-auto max-w-3xl">
          <h2
            className="mb-6 text-center invite-name text-2xl"
            style={{ color: "#E8C56A" }}
          >
            {invite.copy.eventsTitle}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {invite.events.map((e) => (
              <article
                key={e.id}
                className="rounded-2xl border px-4 py-4"
                style={{
                  borderColor: "rgba(232,197,106,0.35)",
                  background: "rgba(42,8,16,0.85)",
                  color: "#F8F1E3",
                }}
              >
                <p className="text-lg">{e.emoji}</p>
                <h3 className="mt-1 font-semibold" style={{ color: "#E8C56A" }}>
                  {e.title}
                </h3>
                <p className="mt-1 text-sm">
                  {e.dateLabel} · {e.time}
                </p>
                <p className="text-xs text-white/70">
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
