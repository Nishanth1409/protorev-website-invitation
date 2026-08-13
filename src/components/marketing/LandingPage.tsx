"use client";

import Link from "next/link";
import { COMPANY, customizeWhatsAppUrl, whatsappUrl } from "@/data/contact";
import { formatInr, getPlan } from "@/data/pricing";
import { handleHomeHashClick } from "@/lib/scrollToId";
import { CustomWorkPreview } from "./CustomWorkPreview";

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5b4aff_0%,#8b5cf6_50%,#06b6d4_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(91,74,255,0.35)] transition hover:brightness-105";

const btnSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-[#e8e8f0] bg-white px-7 py-3.5 text-sm font-semibold text-[#0f0f1a] shadow-[0_8px_30px_rgba(15,15,26,0.06)] transition hover:border-[#5b4aff]/35";

const btnSoft =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-[#5b4aff]/25 bg-[#5b4aff]/08 px-7 py-3.5 text-sm font-semibold text-[#5b4aff] transition hover:bg-[#5b4aff]/14";

export function LandingPage() {
  const wa = whatsappUrl(
    "Hi Protorev Digital, I love your work — I would like a custom wedding invitation website.",
  );
  const fromPrice = formatInr(getPlan("custom-website")?.priceInr ?? 999);

  return (
    <main className="bg-[#f8f8fc] text-[#0f0f1a]">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(91,74,255,0.12), transparent 45%), radial-gradient(ellipse at 90% 10%, rgba(6,182,212,0.10), transparent 40%), linear-gradient(180deg, #ffffff 0%, #f8f8fc 55%, #f3f0ff 100%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-14 text-center lg:pb-20 lg:pt-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#e8e8f0] bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-[#4a4a6a] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            New creators · Taking flight
          </p>
          <h1 className="mt-6 font-brand text-[2rem] font-bold leading-[1.15] tracking-tight text-[#0f0f1a] sm:text-5xl">
            We&apos;re just getting{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #5b4aff 0%, #8b5cf6 50%, #06b6d4 100%)",
              }}
            >
              started
            </span>
            — and already making magic.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#4a4a6a] sm:text-base">
            Protorev Digital is a small, young studio learning in public. We
            turn culture, colour and story into digital wedding invitations —
            then put the real live work right here for you to tap through.
          </p>

          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[#4a4a6a]">
            Soft on the budget, strong on the feeling —{" "}
            <span className="font-semibold text-[#0f0f1a]">
              custom invites from {fromPrice}
            </span>
            . No hidden fees. Just beautiful beginnings.
          </p>

          <div className="mt-5 flex justify-center">
            <Link href="/pricing" className={btnSoft}>
              View Pricing →
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/#custom-work"
              onClick={(e) => handleHomeHashClick(e, "/#custom-work")}
              className={btnPrimary}
            >
              See What We&apos;ve Made
            </Link>
            <a href={wa} target="_blank" rel="noreferrer" className={btnSecondary}>
              Build Yours With Us
            </a>
          </div>
          <p className="mt-6 text-xs tracking-wide text-[#8888aa]">
            ★ {COMPANY.productLine}
          </p>
        </div>
      </section>

      <section className="border-y border-[#e8e8f0] bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-3 px-5 py-5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a4a6a]">
          <span>Beginner energy</span>
          <span>Honest craft</span>
          <span>Culture-first</span>
          <span>Show, don&apos;t tell</span>
        </div>
      </section>

      <CustomWorkPreview />

      <section className="relative overflow-hidden px-5 py-16 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(91,74,255,0.08), transparent 55%)",
          }}
        />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5b4aff]">
            Take flight with us
          </p>
          <h2 className="mt-3 font-brand text-2xl font-bold text-[#0f0f1a] sm:text-3xl">
            Your story. Our first chapters.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#4a4a6a]">
            We&apos;re new — so we listen harder, design with heart, and treat
            every invite like it&apos;s the one that puts us on the map. Tell us
            your ceremony. Let&apos;s create something worth showing.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={customizeWhatsAppUrl({ format: "event-page" })}
              target="_blank"
              rel="noreferrer"
              className={btnPrimary}
            >
              WhatsApp the Studio
            </a>
            <Link href="/pricing" className={btnSoft}>
              View Pricing
            </Link>
            <a
              href={`mailto:${COMPANY.email}`}
              className={btnSecondary}
            >
              {COMPANY.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
