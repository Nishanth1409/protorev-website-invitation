"use client";

import Link from "next/link";
import {
  COMPANY,
  customizeEmailUrl,
  customizeWhatsAppUrl,
} from "@/data/contact";

type Props = {
  compact?: boolean;
  themeName?: string;
  faith?: string;
  languages?: string;
};

/**
 * Custom invitation orders — WhatsApp / email / phone.
 * Ready templates are in /create; this is for fully bespoke card work.
 */
export function CustomDesignShowcase({
  compact = false,
  themeName,
  faith,
  languages,
}: Props) {
  const wa = customizeWhatsAppUrl({
    themeName,
    format: "invitation-card",
    faith,
    languages,
  });
  const mail = customizeEmailUrl({ themeName, format: "invitation-card" });

  if (compact) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[#0f0f1a] text-white">
        <div className="border-b border-white/10 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A5B4FC]">
            Need it fully custom?
          </p>
          <p className="mt-1 text-sm font-semibold">We design your card for you</p>
        </div>
        <div className="space-y-3 px-4 py-3">
          <p className="text-xs leading-relaxed text-white/70">
            Photos, family wording, regional blessings — message our team. Same
            quality as a print-shop invite.
          </p>
          <p className="text-sm font-bold text-[#25D366]">{COMPANY.phoneDisplay}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#25D366] px-3 py-2 text-xs font-semibold text-white"
            >
              WhatsApp us
            </a>
            <a
              href={mail}
              className="rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold text-white"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-6" id="customise">
      <div className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[var(--shadow-soft)]">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
              Custom invitation cards
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              Want us to design it for you?
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--ink-soft)] sm:text-base">
              Pick a template above to edit and download yourself — or contact
              our customer service for a fully customised invitation card. We
              handle photos, blessings, languages, and print-ready PNG/PDF files.
            </p>
            <p className="mt-4 text-lg font-bold text-[var(--ink)]">
              {COMPANY.phoneDisplay}
            </p>
            <p className="text-sm text-[var(--ink-mute)]">{COMPANY.email}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
              >
                WhatsApp — order custom card
              </a>
              <a
                href={mail}
                className="inline-flex rounded-2xl border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--ink)]"
              >
                Email us
              </a>
              <a
                href={COMPANY.site}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--ink-soft)]"
              >
                protorevdigital.com
              </a>
            </div>
          </div>

          <div
            className="flex flex-col justify-center border-t border-[var(--line)] p-6 lg:border-l lg:border-t-0 lg:p-10"
            style={{
              background:
                "radial-gradient(circle at 30% 20%, rgba(232,197,106,0.15), transparent 50%), linear-gradient(145deg,#2A0810,#4A0E18)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E8C56A]">
              How it works
            </p>
            <ol className="mt-4 space-y-4 text-sm text-[#F8F1E3]/90">
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8C56A]/20 text-xs font-bold text-[#E8C56A]">
                  1
                </span>
                <span>
                  <strong className="text-white">Use a template</strong> — choose
                  a design, set faith & language, edit names, download PNG/PDF.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8C56A]/20 text-xs font-bold text-[#E8C56A]">
                  2
                </span>
                <span>
                  <strong className="text-white">Or message us</strong> — share
                  your details on WhatsApp. We design and deliver print-ready files.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8C56A]/20 text-xs font-bold text-[#E8C56A]">
                  3
                </span>
                <span>
                  Share on WhatsApp, print at a local shop, or send to family —
                  your choice.
                </span>
              </li>
            </ol>
            <Link
              href="/create"
              className="mt-6 inline-flex w-fit rounded-2xl bg-[#E8C56A] px-5 py-3 text-sm font-semibold text-[#2A0810]"
            >
              Browse example cards →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
