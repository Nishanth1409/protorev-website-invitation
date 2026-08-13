"use client";

import Link from "next/link";
import {
  COMPANY,
  CUSTOM_SHOWCASE,
  customizeEmailUrl,
  customizeWhatsAppUrl,
} from "@/data/contact";
import { CustomDesignShowcase } from "./CustomDesignShowcase";

type Props = {
  themeName?: string;
  format?: "invitation-card" | "event-page" | string;
  faith?: string;
  languages?: string;
  compact?: boolean;
};

/**
 * Clear client path: use a ready template OR request a custom design
 * (with Protorev’s own custom sample linked for proof).
 */
export function TemplateOrCustomize({
  themeName,
  format,
  faith,
  languages,
  compact = false,
}: Props) {
  const wa = customizeWhatsAppUrl({ themeName, format, faith, languages });
  const mail = customizeEmailUrl({ themeName, format });

  if (compact) {
    return (
      <div className="space-y-3">
        <CustomDesignShowcase compact />
        <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--grad-a)]">
            Want the same custom quality?
          </p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            That sample is our design. Message us with your faith, languages, and
            photos — we craft yours the same way.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
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
              className="rounded-xl border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--ink)]"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--grad-a)]">
            Option 1
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[var(--ink)]">
            Use a ready template
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            Pick from our studio catalog, choose faith & languages, preview
            instantly, then sign in and download cards as PNG/PDF — or share an
            event website theme.
          </p>
          <Link
            href="/create"
            className="pr-gradient-btn mt-5 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
          >
            Browse templates
          </Link>
        </div>

        <div className="rounded-[1.75rem] border border-transparent bg-[linear-gradient(135deg,#0f0f1a,#1e1b4b)] p-6 text-white shadow-[var(--shadow-soft)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A5B4FC]">
            Option 2
          </p>
          <h3 className="mt-2 text-2xl font-bold">Get it customised</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            See our live custom sample first — then message us for a design made
            only for your wedding (photos, blessing cover, languages, family
            details).
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={CUSTOM_SHOWCASE.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-2xl bg-[#E8C56A] px-5 py-3 text-sm font-semibold text-[#2A0810]"
            >
              View our custom sample
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
            >
              WhatsApp us
            </a>
            <a
              href={mail}
              className="inline-flex rounded-2xl border border-white/25 px-5 py-3 text-sm font-semibold text-white"
            >
              Email {COMPANY.name}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
