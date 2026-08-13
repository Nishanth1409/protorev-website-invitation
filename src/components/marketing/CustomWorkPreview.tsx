"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { COMPANY, whatsappUrl } from "@/data/contact";
import { formatInr, getPlan } from "@/data/pricing";

/** Live invite via same-origin proxy — Canva URL is never shown to visitors. */
const LIVE_SRC = "/canva-live";

/**
 * Canva website page size from the published design (bootstrap page C: 360×720).
 * Keep this exact size so gold borders sit edge-to-edge and pages stay interactive.
 */
const PHONE_W = 360;
const PHONE_H = 720;
const PHONE_RATIO = `${PHONE_W} / ${PHONE_H}`;

const CAPABILITIES = [
  "South Indian heritage",
  "Kannada · Tamil · Telugu · Hindi · Malayalam",
  "Muslim & Nikah websites",
  "Anand Karaj",
  "Christian ceremonies",
  "Destination & editorial",
  "Multi-language websites",
  "Fully custom art direction",
] as const;

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5b4aff_0%,#8b5cf6_50%,#06b6d4_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(91,74,255,0.35)] transition hover:brightness-105";

const btnGhost =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10";

/**
 * Custom website invitation — live Canva preview in a phone frame.
 * Interactive: guests tap ಶುಭಮಸ್ತು / scroll to move through pages.
 */
export function CustomWorkPreview() {
  const wa = whatsappUrl(
    "Hi Protorev Digital, I would like to commission a custom wedding invitation website designed uniquely for my celebration.",
  );

  return (
    <section
      id="custom-work"
      className="scroll-mt-24 border-t border-white/10 bg-[#0f0f1a] px-5 py-16 text-white"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8b5cf6]">
            Live website · Tap to explore
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-brand)] text-2xl font-bold tracking-tight sm:text-3xl">
            Opening Blessing
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/65">
            A real invitation website — not a static picture. Tap the gold
            button inside the phone to open the next pages, just like a guest
            would.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <MobileFrame>
            <ScaledMobileCanva />
          </MobileFrame>
        </div>

        <p className="mt-5 text-center text-[12px] font-medium text-[#8b5cf6]">
          Tap ಶುಭಮಸ್ತು inside the phone → next page
        </p>
        <p className="mt-2 text-center text-[11px] text-white/40">
          Crafted by new hands at Protorev Digital
        </p>

        <div className="mx-auto mt-12 max-w-2xl">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#06b6d4]">
            Where we can fly next
          </p>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/60">
            These are paths we love exploring — faiths, languages, moods. Not
            templates. Each invite is drawn for one celebration only.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CAPABILITIES.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-2 text-[11px] text-white/75"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <a href={wa} target="_blank" rel="noreferrer" className={btnPrimary}>
              Let&apos;s Create Yours
            </a>
            <Link href="/pricing" className={btnGhost}>
              See Packages
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/40">
            From {formatInr(getPlan("custom-website")?.priceInr ?? 999)} ·{" "}
            {COMPANY.phoneDisplay}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Live Canva at native 360×720, cover-scaled into the phone.
 * Pointer events stay ON so guests can tap through pages.
 */
function ScaledMobileCanva() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0, y: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const update = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (w <= 0 || h <= 0) return;
      const scale = Math.max(w / PHONE_W, h / PHONE_H);
      const x = (w - PHONE_W * scale) / 2;
      const y = (h - PHONE_H * scale) / 2;
      setFit({ scale, x, y });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative h-full w-full overflow-hidden overscroll-contain bg-[#51100f] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-y"
    >
      {!ready && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#51100f] text-[11px] text-white/50">
          Loading live invite…
        </div>
      )}
      <div
        className="absolute origin-top-left"
        style={{
          width: PHONE_W,
          height: PHONE_H,
          transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})`,
        }}
      >
        <iframe
          title="Opening Blessing — live invitation website"
          src={`${LIVE_SRC}?preview=1`}
          width={PHONE_W}
          height={PHONE_H}
          className="block border-0 bg-[#51100f]"
          style={{
            width: PHONE_W,
            height: PHONE_H,
            // Keep hit-testing aligned with the scaled visual
            pointerEvents: "auto",
          }}
          loading="eager"
          allow="autoplay; fullscreen"
          onLoad={() => setReady(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

/** Phone frame sized for real taps on mobile (near native Canva width). */
function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[min(88vw,360px)] sm:w-[320px] md:w-[340px]">
      <div
        className="relative overflow-hidden rounded-[1.85rem] border-[3px] border-[#2a2a2e] bg-[#0a0a0d] shadow-[0_28px_60px_rgba(91,74,255,0.25)]"
        style={{ aspectRatio: PHONE_RATIO }}
      >
        <div className="pointer-events-none absolute left-1/2 top-[8px] z-20 h-[16px] w-[30%] -translate-x-1/2 rounded-full bg-[#0a0a0d]" />
        <div className="absolute inset-0 overflow-hidden rounded-[1.65rem] bg-[#51100f]">
          {children}
        </div>
      </div>
    </div>
  );
}
