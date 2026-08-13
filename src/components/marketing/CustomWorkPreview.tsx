"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { COMPANY, whatsappUrl } from "@/data/contact";
import { formatInr, getPlan } from "@/data/pricing";

type ViewMode = "mobile" | "laptop";

/** Live Canva website via same-origin proxy (direct Canva iframes are blocked). */
const LIVE_SRC = "/canva-live";
const LIVE_EXTERNAL = "https://sample-wedding-the-invitationweb.canva.link/";

/** Natural Opening Blessing Canva artboard — always render at this size, then scale. */
const CANVA_W = 360;
const CANVA_H = 720;
const CANVA_RATIO = `${CANVA_W} / ${CANVA_H}`;

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

/**
 * Custom website invitation preview inside real device frames.
 * Shows the live Opening Blessing Canva website (proxied).
 */
export function CustomWorkPreview() {
  const [view, setView] = useState<ViewMode>("mobile");
  const wa = whatsappUrl(
    "Hi Protorev Digital, I would like to commission a custom wedding invitation website designed uniquely for my celebration.",
  );

  return (
    <section
      id="custom-work"
      className="scroll-mt-24 border-t border-[#E4D9C8] bg-[#14110F] px-5 py-16 text-[#F7F4EF]"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
            Custom website invitation
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
            Opening Blessing
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70">
            Your live custom wedding website — Smathi &amp; Kiran — shown here
            in phone and laptop frames. Designed uniquely for one celebration.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setView("mobile")}
            className={`min-h-11 rounded-full px-5 text-xs font-semibold transition ${
              view === "mobile"
                ? "bg-[#E8C56A] text-[#1A1210]"
                : "border border-white/20 text-white/80"
            }`}
          >
            Mobile
          </button>
          <button
            type="button"
            onClick={() => setView("laptop")}
            className={`min-h-11 rounded-full px-5 text-xs font-semibold transition ${
              view === "laptop"
                ? "bg-[#E8C56A] text-[#1A1210]"
                : "border border-white/20 text-white/80"
            }`}
          >
            Laptop
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          {view === "mobile" ? (
            <MobileFrame>
              <ScaledCanvaStage />
            </MobileFrame>
          ) : (
            <LaptopFrame>
              <ScaledCanvaStage />
            </LaptopFrame>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <p className="text-[11px] text-white/45">Designed by Protorev Digital</p>
          <a
            href={LIVE_EXTERNAL}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-semibold text-[#E8C56A] underline-offset-2 hover:underline"
          >
            Open live invitation ↗
          </a>
        </div>

        <div className="mx-auto mt-12 max-w-2xl">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A227]">
            Styles we create
          </p>
          <p className="mx-auto mt-3 max-w-md text-center text-sm text-white/65">
            Every project is original. These are directions we craft — not
            ready-made templates to copy.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {CAPABILITIES.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/15 px-3 py-2 text-[11px] text-white/75"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-xl text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
            >
              Request Your Custom Design
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white"
            >
              {COMPANY.email}
            </a>
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
 * Renders Canva at its real 360×720 viewport, then scales down to the
 * device stage — no scrollbar lines, no overflow in the frames.
 */
function ScaledCanvaStage() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const update = () => {
      const w = host.clientWidth;
      if (w > 0) setScale(w / CANVA_W);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="relative h-full w-full overflow-hidden bg-[#51100f] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div
        className="origin-top-left"
        style={{
          width: CANVA_W,
          height: CANVA_H,
          transform: `scale(${scale})`,
        }}
      >
        <iframe
          title="Opening Blessing — live custom invitation"
          src={`${LIVE_SRC}?preview=1`}
          width={CANVA_W}
          height={CANVA_H}
          className="pointer-events-none block border-0 bg-[#51100f]"
          style={{
            width: CANVA_W,
            height: CANVA_H,
            overflow: "hidden",
            scrollbarWidth: "none",
          }}
          loading="eager"
          tabIndex={-1}
          referrerPolicy="no-referrer"
        />
      </div>
      {/* Block interaction so the preview never shows a scroll line */}
      <div aria-hidden className="absolute inset-0 z-10 touch-none" />
    </div>
  );
}

/** Compact phone — Canva 360×720 ratio, smaller on-page footprint. */
function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[min(56vw,220px)] sm:w-[230px]">
      <div
        className="relative overflow-hidden rounded-[1.6rem] border-[2.5px] border-[#2a2a2e] bg-[#0a0a0d] shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
        style={{ aspectRatio: CANVA_RATIO }}
      >
        <div className="absolute left-1/2 top-[7px] z-20 h-[15px] w-[34%] -translate-x-1/2 rounded-full bg-[#0a0a0d]" />
        <div className="absolute inset-[2px] overflow-hidden rounded-[1.35rem] bg-[#51100f]">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Laptop chrome with the same centered 360×720 stage Canva uses on desktop.
 */
function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-xl sm:max-w-2xl">
      <div className="overflow-hidden rounded-t-xl border border-[#3a3a40] bg-[#1c1c20] p-2 shadow-[0_30px_70px_rgba(0,0,0,0.45)] sm:p-3">
        <div className="mb-2 flex items-center gap-1.5 px-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 h-5 flex-1 truncate rounded-md bg-white/5 pl-2 text-[10px] leading-5 text-white/40">
            sample-wedding-the-invitationweb.canva.link
          </span>
        </div>
        <div className="flex h-[min(56vh,440px)] items-center justify-center overflow-hidden rounded-md bg-[#120808]">
          <div
            className="h-full max-h-full overflow-hidden bg-[#51100f] shadow-[0_0_36px_rgba(0,0,0,0.5)]"
            style={{ aspectRatio: CANVA_RATIO }}
          >
            {children}
          </div>
        </div>
      </div>
      <div className="mx-auto h-3 w-[72%] rounded-b-md bg-[#2a2a30]" />
      <div className="mx-auto h-1.5 w-[40%] rounded-b-full bg-[#1a1a1e]" />
    </div>
  );
}
