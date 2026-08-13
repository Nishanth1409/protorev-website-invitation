"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { WeddingInvite } from "@/data/types";
import type { ExperienceKey } from "@/data/themes";
import {
  InviteShell,
  SharedCountdown,
  SharedEvents,
  SharedLocationClosing,
} from "./styles/InviteShell";
import {
  FestivalSiteBody,
  isFestivalWebExperience,
} from "./FestivalSiteLayouts";
import {
  IndianTraditionalSiteBody,
  shouldUseIndianTraditionalSite,
} from "./IndianTraditionalSite";
import { getIndianCardStyle } from "./traditional/indianStyle";

type Props = {
  invite: WeddingInvite;
  experience: ExperienceKey;
};

function Stage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`invite-stage ${className}`}>{children}</div>;
}

function RibbonCover({
  invite,
  onOpen,
}: {
  invite: WeddingInvite;
  onOpen: () => void;
}) {
  const t = invite.theme;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${t.glow}, transparent 50%), ${t.bgDeep}`,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stage className="w-full text-center" >
        <p className="mb-4 text-[0.65rem] tracking-[0.4em]" style={{ color: t.accent }}>
          ✦ {invite.copy.openingTitle} ✦
        </p>
        <div
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border px-6 py-14 sm:px-10"
          style={{ borderColor: t.border, background: t.card, color: t.text }}
        >
          <p className="mb-2 font-[family-name:var(--font-script)] text-2xl" style={{ color: t.accentSoft }}>
            With Love
          </p>
          <p className="mb-8 text-xs uppercase tracking-[0.25em]" style={{ color: t.inkSoft }}>
            {invite.copy.youAreInvited}
          </p>
          <div
            className="absolute left-0 right-0 top-1/2 h-10 -translate-y-1/2"
            style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }}
          />
          <button
            type="button"
            onClick={onOpen}
            className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border text-2xl shadow-lg"
            style={{ borderColor: t.accent, background: t.bgDeep, color: t.accent }}
            aria-label="Open invitation"
          >
            ✂
          </button>
          <p className="relative z-10 mt-6 text-[0.65rem] uppercase tracking-[0.2em]" style={{ color: t.inkSoft }}>
            Tap the seal to open
          </p>
        </div>
      </Stage>
    </motion.div>
  );
}

function CurtainCover({
  invite,
  onOpen,
}: {
  invite: WeddingInvite;
  onOpen: () => void;
}) {
  const t = invite.theme;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden px-4"
      style={{ background: t.bgDeep }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 origin-left"
        style={{
          background: `linear-gradient(90deg, #3b0a14, ${t.bg})`,
          boxShadow: `inset -20px 0 40px ${t.glow}`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 origin-right"
        style={{
          background: `linear-gradient(270deg, #3b0a14, ${t.bg})`,
          boxShadow: `inset 20px 0 40px ${t.glow}`,
        }}
      />
      <Stage className="relative z-10 w-full text-center">
        <p className="mb-3 text-xs tracking-[0.35em]" style={{ color: t.accent }}>
          An Evening of Gold
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl" style={{ color: t.text }}>
          {invite.bride}
        </h1>
        <p className="my-2 font-[family-name:var(--font-script)] text-3xl" style={{ color: t.accent }}>
          &
        </p>
        <h1 className="mb-8 font-[family-name:var(--font-display)] text-4xl sm:text-5xl" style={{ color: t.text }}>
          {invite.groom}
        </h1>
        <button
          type="button"
          onClick={onOpen}
          className="rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ background: t.accent, color: t.bgDeep }}
        >
          Enter the soirée
        </button>
        <p className="mt-4 text-xs" style={{ color: t.inkSoft }}>
          Tap anywhere to enter
        </p>
      </Stage>
      <button type="button" className="absolute inset-0 z-[5]" aria-label="Enter" onClick={onOpen} />
    </motion.div>
  );
}

function CyberCover({
  invite,
  onOpen,
}: {
  invite: WeddingInvite;
  onOpen: () => void;
}) {
  const t = invite.theme;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 font-mono"
      style={{ background: "#050505", color: t.accent }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stage className="w-full max-w-lg border border-dashed p-6 sm:p-10" >
        <p className="mb-4 text-xs opacity-70">&gt; SYSTEM_BOOT · INVITE_PROTOCOL</p>
        <p className="mb-2 text-sm">PLAYER_ONE :: {invite.bride}</p>
        <p className="mb-6 text-sm">PLAYER_TWO :: {invite.groom}</p>
        <p className="mb-8 text-xs opacity-80">
          Ready to initialize lifelong cooperative adventure mode.
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="border px-5 py-3 text-xs uppercase tracking-widest"
          style={{ borderColor: t.accent, color: t.accent }}
        >
          [ SYSTEM_NAVIGATE ]
        </button>
      </Stage>
    </motion.div>
  );
}

function AuroraCover({
  invite,
  onOpen,
}: {
  invite: WeddingInvite;
  onOpen: () => void;
}) {
  const t = invite.theme;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(52,211,153,0.35), transparent 40%),
          radial-gradient(ellipse at 80% 20%, rgba(129,140,248,0.35), transparent 40%),
          radial-gradient(ellipse at 50% 80%, rgba(244,114,182,0.25), transparent 45%),
          ${t.bgDeep}
        `,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stage className="text-center">
        <div
          className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full border sm:h-52 sm:w-52"
          style={{ borderColor: t.accent, boxShadow: `0 0 60px ${t.glow}` }}
        >
          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-2xl" style={{ color: t.text }}>
              {invite.monogram}
            </p>
            <p className="mt-1 text-[0.65rem] tracking-[0.3em]" style={{ color: t.accentSoft }}>
              ORBIT
            </p>
          </div>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl" style={{ color: t.text }}>
          {invite.bride} & {invite.groom}
        </h1>
        <button
          type="button"
          onClick={onOpen}
          className="mt-8 rounded-full border px-7 py-3 text-xs uppercase tracking-[0.25em]"
          style={{ borderColor: t.accent, color: t.accentSoft }}
        >
          {invite.copy.openInvite}
        </button>
      </Stage>
    </motion.div>
  );
}

function DefaultCover({
  invite,
  onOpen,
  kicker,
}: {
  invite: WeddingInvite;
  onOpen: () => void;
  kicker?: string;
}) {
  const t = invite.theme;
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${t.glow}, transparent 45%), ${t.bgDeep}`,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Stage className="w-full">
        <div
          className="mx-auto w-full max-w-md rounded-[2rem] border px-6 py-12 text-center backdrop-blur-xl sm:px-8 sm:py-14"
          style={{ borderColor: t.border, background: t.card, color: t.text }}
        >
          <p className="mb-3 text-xs tracking-[0.35em]" style={{ color: t.accent }}>
            {(kicker || invite.styleLabel).toUpperCase()}
          </p>
          <p className="mb-2 text-3xl" aria-hidden>
            {invite.emblem}
          </p>
          <p className="mb-2 font-[family-name:var(--font-script)] text-3xl" style={{ color: t.accentSoft }}>
            {invite.copy.weddingOf}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl">{invite.bride}</h1>
          {invite.groom?.trim() ? (
            <>
              <p className="my-2" style={{ color: t.accent }}>
                &
              </p>
              <h1 className="mb-8 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">{invite.groom}</h1>
            </>
          ) : (
            <div className="mb-8" />
          )}
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full border px-7 py-3 text-xs uppercase tracking-[0.25em]"
            style={{ borderColor: t.accent, color: t.accentSoft }}
          >
            {invite.copy.openInvite}
          </button>
        </div>
      </Stage>
    </motion.div>
  );
}

function PhysicalCardCover({
  invite,
  onOpen,
}: {
  invite: WeddingInvite;
  onOpen: () => void;
}) {
  const style = getIndianCardStyle(invite.faith, invite.language);
  const frame =
    invite.faith === "muslim" ? "/cards/frame-muslim.jpg" : "/cards/frame-cream.jpg";
  const single = !invite.groom?.trim();

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 sm:px-6"
      style={{
        background:
          "radial-gradient(circle at 50% 30%, rgba(184,134,11,0.28), transparent 50%), #1A0A0E",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="physical-invite-card relative w-full max-w-sm overflow-hidden text-left transition hover:scale-[1.01]"
        style={{ aspectRatio: "5 / 7" }}
        aria-label={invite.copy.openInvite}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={frame} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-[11%] flex flex-col items-center justify-between rounded-sm px-4 py-5 text-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(252,247,236,0.95), rgba(247,240,228,0.96))",
            color: "#3D2415",
          }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "#6B1E2A" }}>
              {style.openingLine}
            </p>
            <p className="mt-1 text-[10px] tracking-[0.18em]" style={{ color: "#B8860B" }}>
              {style.subOpening}
            </p>
          </div>
          <div>
            <p
              className="font-[family-name:var(--font-script)] text-xl"
              style={{ color: "#B8860B" }}
            >
              {invite.ofLabel ?? invite.copy.weddingOf}
            </p>
            <h1
              className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight"
              style={{ color: "#6B1E2A" }}
              lang={invite.language}
            >
              {invite.bride}
            </h1>
            {!single && (
              <>
                <p className="my-1 text-xs uppercase tracking-[0.35em]" style={{ color: "#B8860B" }}>
                  {style.wedsWord}
                </p>
                <h1
                  className="font-[family-name:var(--font-display)] text-3xl leading-tight"
                  style={{ color: "#6B1E2A" }}
                  lang={invite.language}
                >
                  {invite.groom}
                </h1>
              </>
            )}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#6B1E2A" }}>
              {invite.weddingDateLabel}
            </p>
            <p
              className="mt-3 inline-flex rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
              style={{ background: "linear-gradient(135deg,#6B1E2A,#B8860B)" }}
            >
              {invite.copy.openInvite} →
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function coverFor(
  experience: ExperienceKey,
  invite: WeddingInvite,
  onOpen: () => void,
) {
  if (
    shouldUseIndianTraditionalSite({
      ceremony: invite.ceremony,
      experience,
      isFestivalWeb: isFestivalWebExperience(experience),
    })
  ) {
    return <PhysicalCardCover invite={invite} onOpen={onOpen} />;
  }

  switch (experience) {
    case "ribbon-envelope":
    case "heritage-arch":
    case "temple-dawn":
      return <RibbonCover invite={invite} onOpen={onOpen} />;
    case "gilded-curtain":
    case "velvet-royal":
      return <CurtainCover invite={invite} onOpen={onOpen} />;
    case "cyber-terminal":
    case "neon-dual":
    case "nova-glitch":
      return <CyberCover invite={invite} onOpen={onOpen} />;
    case "aurora-orbit":
    case "celestial-ring":
    case "cosmic-swipe":
      return <AuroraCover invite={invite} onOpen={onOpen} />;
    case "vivah-festival":
    case "poster-night":
    case "mandala-orbit":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Celebration Night" />;
    case "lotus-garden":
    case "soft-bloom":
    case "petal-story":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Bloom & Blessing" />;
    case "island-sunset":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Destination Vows" />;
    case "film-poster":
    case "cinema-split":
    case "noir-strip":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Cinematic Story" />;
    case "glass-bento":
    case "ivory-edit":
    case "classic-ornate":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Editorial Invite" />;
    case "lantern-fire":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Lantern Light" />;
    case "festival-lane":
    case "diya-vivah":
    case "marigold-baraat":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Festival Lights" />;
    case "mehendi-mandala":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Mehendi Garden" />;
    case "naming-lotus":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Naming Blessing" />;
    case "campus-farewell":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Campus Night" />;
    case "school-annual":
      return <DefaultCover invite={invite} onOpen={onOpen} kicker="Annual Day" />;
    default:
      return <DefaultCover invite={invite} onOpen={onOpen} />;
  }
}

function StoryStrip({ invite }: { invite: WeddingInvite }) {
  const t = invite.theme;
  const beats = [
    { title: "How We Met", body: "A chance encounter that quietly changed everything." },
    { title: "First Date", body: "Nervous smiles, endless conversation, a promise forming." },
    { title: "The Proposal", body: "Under a sky full of hope, forever was joyfully answered." },
  ];
  return (
    <section className="relative z-20 px-4 py-12 sm:px-6 sm:py-16">
      <Stage>
        <h2
          className="mb-8 text-center font-[family-name:var(--font-display)] text-2xl sm:text-3xl"
          style={{ color: t.ink }}
        >
          Chapters of Our Story
        </h2>
        <div className="invite-grid-story mx-auto grid gap-4">
          {beats.map((b) => (
            <article
              key={b.title}
              className="rounded-2xl border px-5 py-6"
              style={{ borderColor: t.border, background: t.card, color: t.ink }}
            >
              <h3 className="mb-2 font-[family-name:var(--font-display)] text-xl">{b.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: t.inkSoft }}>
                {b.body}
              </p>
            </article>
          ))}
        </div>
      </Stage>
    </section>
  );
}

function HeroBlock({ invite, cinematic }: { invite: WeddingInvite; cinematic?: boolean }) {
  const t = invite.theme;
  const c = invite.copy;
  return (
    <section className="relative z-20 flex min-h-[78svh] items-center justify-center px-4 py-14 sm:min-h-[88vh] sm:px-6 sm:py-16">
      <Stage className="w-full">
        <div
          className={`mx-auto w-full border px-6 py-12 text-center backdrop-blur-md sm:px-10 sm:py-14 ${
            cinematic ? "max-w-3xl rounded-[1.5rem] sm:rounded-[2rem]" : "max-w-xl rounded-[1.8rem]"
          }`}
          style={{
            background: t.card,
            borderColor: t.border,
            boxShadow: `0 0 80px ${t.glow}`,
            color: t.ink,
          }}
        >
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border text-xl sm:h-16 sm:w-16 sm:text-2xl"
            style={{ borderColor: t.border, color: t.accent }}
          >
            {invite.emblem || invite.monogram}
          </div>
          <p className="mb-3 text-[0.65rem] tracking-[0.35em] sm:text-xs" style={{ color: t.inkSoft }}>
            {c.saveTheDate}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {invite.bride}
          </h1>
          {invite.groom?.trim() ? (
            <>
              <p className="my-2 font-[family-name:var(--font-script)] text-2xl sm:text-3xl" style={{ color: t.accent }}>
                &
              </p>
              <h1 className="mb-5 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
                {invite.groom}
              </h1>
            </>
          ) : (
            <div className="mb-5" />
          )}
          <p className="tracking-[0.2em] sm:tracking-[0.25em]" style={{ color: t.accentSoft }}>
            {invite.weddingDateLabel}
          </p>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed" style={{ color: t.inkSoft }}>
            {invite.tagline}
          </p>
          <p className="mt-4 text-sm" style={{ color: t.ink }}>
            {invite.blessingNative}
          </p>
        </div>
      </Stage>
    </section>
  );
}

export function CinematicExperience({ invite, experience }: Props) {
  const t = invite.theme;
  const isEvent = [
    "aurora-orbit",
    "island-sunset",
    "cinema-split",
    "glass-bento",
    "poster-night",
    "heritage-arch",
    "mandala-orbit",
    "celestial-ring",
    "petal-story",
    "neon-dual",
    "noir-strip",
    "ivory-edit",
    "gilded-curtain",
    "festival-lane",
    "mehendi-mandala",
    "naming-lotus",
    "campus-farewell",
    "school-annual",
  ].includes(experience);

  const particleMode =
    experience.includes("bloom") ||
    experience.includes("garden") ||
    experience.includes("petal") ||
    experience.includes("mehendi") ||
    experience.includes("lotus")
      ? "petals"
      : "sparks";

  return (
    <InviteShell
      invite={invite}
      particleMode={particleMode}
      cover={(open) => coverFor(experience, invite, open)}
    >
      {() => {
        if (isFestivalWebExperience(experience)) {
          return <FestivalSiteBody invite={invite} experience={experience} />;
        }
        if (
          shouldUseIndianTraditionalSite({
            ceremony: invite.ceremony,
            experience,
            isFestivalWeb: false,
          })
        ) {
          return <IndianTraditionalSiteBody invite={invite} />;
        }
        return (
          <div style={{ background: t.bgDeep, color: t.ink }}>
            <HeroBlock invite={invite} cinematic={isEvent} />
            <div className="invite-stage px-4 sm:px-6">
              <SharedCountdown invite={invite} />
            </div>
            {isEvent && <StoryStrip invite={invite} />}
            <SharedEvents invite={invite} />
            <SharedLocationClosing invite={invite} />
          </div>
        );
      }}
    </InviteShell>
  );
}
