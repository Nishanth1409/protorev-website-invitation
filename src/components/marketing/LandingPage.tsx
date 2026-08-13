"use client";

import Link from "next/link";
import { COMPANY, customizeWhatsAppUrl, whatsappUrl } from "@/data/contact";
import { handleHomeHashClick } from "@/lib/scrollToId";
import { CustomWorkPreview } from "./CustomWorkPreview";

export function LandingPage() {
  const wa = whatsappUrl(
    "Hi Protorev Digital, I would like to commission a custom wedding invitation website.",
  );

  return (
    <main className="bg-[#F4EFE7] text-[#1A1210]">
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(201,162,39,0.12), transparent 50%), linear-gradient(180deg, #F8F3EA 0%, #F4EFE7 55%, #EDE6DA 100%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 pb-14 pt-14 text-center lg:pb-20 lg:pt-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#8B6914]">
            Digital wedding invitation websites
          </p>
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-5xl">
            An invitation as memorable as the celebration.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#5C4A42] sm:text-base">
            Protorev Digital designs original wedding invitation websites —
            crafted around your ceremony, culture, language and story. Every
            project is unique.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#custom-work"
              onClick={(e) => handleHomeHashClick(e, "/#custom-work")}
              className="inline-flex min-h-11 items-center rounded-full bg-[#1A1210] px-6 py-3 text-sm font-semibold text-[#F7F4EF]"
            >
              View Custom Work
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-[#C4B5A0] bg-white/70 px-6 py-3 text-sm font-semibold text-[#1A1210]"
            >
              Request Custom Design
            </a>
          </div>
          <p className="mt-6 text-xs tracking-wide text-[#8A7A70]">
            {COMPANY.productLine}
          </p>
        </div>
      </section>

      <section className="border-y border-[#E4D9C8] bg-[#F8F3EA]/80">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-10 gap-y-3 px-5 py-5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[#7A6A60]">
          <span>Multi-faith</span>
          <span>Multi-language</span>
          <span>Website invitations</span>
          <span>Studio concierge</span>
        </div>
      </section>

      <CustomWorkPreview />

      <section className="px-5 py-14 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
          Concierge
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold">
          Ready when you are
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-[#5C4A42]">
          Tell us your ceremony details. We design and deliver a website
          invitation made only for you.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={customizeWhatsAppUrl({ format: "event-page" })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
          >
            WhatsApp Protorev
          </a>
          <a
            href={`mailto:${COMPANY.email}`}
            className="inline-flex min-h-11 items-center rounded-full border border-[#C4B5A0] px-6 py-3 text-sm font-semibold"
          >
            {COMPANY.email}
          </a>
        </div>
      </section>
    </main>
  );
}
