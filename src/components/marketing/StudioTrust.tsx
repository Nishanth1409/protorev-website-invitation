"use client";

import Link from "next/link";
import { COMPANY, whatsappUrl } from "@/data/contact";

const included = [
  {
    title: "Mobile-first design",
    body: "Every invitation is crafted for the phone — where guests actually open it.",
  },
  {
    title: "Faith & language care",
    body: "Hindu, Muslim, Christian, Sikh, Jain & interfaith — with respectful regional wording.",
  },
  {
    title: "Concierge delivery",
    body: "Share your details on WhatsApp. We design, revise, and deliver finished files.",
  },
  {
    title: "Share in one tap",
    body: "Cards for WhatsApp & print, or a guest website with events, map and RSVP.",
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Choose a design",
    body: "Browse our curated gallery and shortlist the look that matches your celebration.",
  },
  {
    n: "02",
    title: "Share your story",
    body: "Send names, date, venue, photos, faith and languages on WhatsApp.",
  },
  {
    n: "03",
    title: "Receive your invite",
    body: "We customise the design and deliver polished files ready to share with guests.",
  },
] as const;

/** Trust + process — premium wedding studio voice. */
export function StudioTrust() {
  return (
    <div className="space-y-14 px-5 py-12">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
          Why families choose us
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1210]">
          A studio experience, not a template shop
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#5C4A42]">
          {COMPANY.productLine}. Preview designs here, then let our team finish
          every detail for your ceremony.
        </p>
        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          {included.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#E8DFD4] bg-white/80 px-5 py-5"
            >
              <h3 className="text-sm font-semibold text-[#1A1210]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C4A42]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
          How it works
        </p>
        <h2 className="mt-3 text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1210]">
          Three quiet steps to your invite
        </h2>
        <ol className="mt-8 space-y-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex gap-4 rounded-2xl border border-[#E8DFD4] bg-white/70 px-5 py-4"
            >
              <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#8B6914]">
                {step.n}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[#1A1210]">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#5C4A42]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link
            href="/create"
            className="rounded-full bg-[#1A1210] px-5 py-3 text-sm font-semibold text-[#F7F4EF]"
          >
            Browse the gallery
          </Link>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
          >
            WhatsApp {COMPANY.phoneDisplay}
          </a>
        </div>
      </section>
    </div>
  );
}
