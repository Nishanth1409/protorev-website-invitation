"use client";

import Link from "next/link";
import {
  COMPANY,
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
 * Two clear paths: edit a template card yourself, or order custom via WhatsApp.
 */
export function TemplateOrCustomize({
  themeName,
  format = "invitation-card",
  faith,
  languages,
  compact = false,
}: Props) {
  const wa = customizeWhatsAppUrl({ themeName, format, faith, languages });
  const mail = customizeEmailUrl({ themeName, format });

  if (compact) {
    return (
      <CustomDesignShowcase
        compact
        themeName={themeName}
        faith={faith}
        languages={languages}
      />
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[1.75rem] border border-[var(--line)] bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--grad-a)]">
            Do it yourself
          </p>
          <h3 className="mt-2 text-2xl font-bold text-[var(--ink)]">
            Edit an example card
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            Choose a design, set faith & languages, edit names and date, preview
            instantly, then sign in and download clean PNG or PDF for WhatsApp
            and print.
          </p>
          <Link
            href="/create"
            className="pr-gradient-btn mt-5 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
          >
            Browse example cards
          </Link>
        </div>

        <div className="rounded-[1.75rem] border border-transparent bg-[linear-gradient(135deg,#0f0f1a,#1e1b4b)] p-6 text-white shadow-[var(--shadow-soft)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A5B4FC]">
            We design for you
          </p>
          <h3 className="mt-2 text-2xl font-bold">Custom invitation order</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Need photos, family wording, or a unique layout? Message our customer
            service — we craft print-ready invitation cards for your ceremony.
          </p>
          <p className="mt-4 text-lg font-bold text-[#25D366]">
            {COMPANY.phoneDisplay}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
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
