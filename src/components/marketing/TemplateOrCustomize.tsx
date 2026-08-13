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
    <section className="mx-auto max-w-3xl px-5 py-8">
      <div className="space-y-4">
        <div className="rounded-3xl border border-(--line) bg-white p-5 shadow-(--shadow-card)">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--grad-a)">
            Step 1
          </p>
          <h3 className="mt-2 text-xl font-bold text-(--ink)">
            Browse the gallery
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-(--ink-soft)">
            Preview invitation cards and guest websites by faith and language.
            Sample names are illustrative — your details are set when we
            customise.
          </p>
          <Link
            href="/create"
            className="pr-gradient-btn mt-4 inline-flex rounded-2xl px-5 py-3 text-sm font-semibold"
          >
            Open theme gallery
          </Link>
        </div>

        <div className="rounded-3xl border border-transparent bg-[linear-gradient(135deg,#0f0f1a,#1e1b4b)] p-5 text-white shadow-(--shadow-soft)">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#A5B4FC]">
            Step 2
          </p>
          <h3 className="mt-2 text-xl font-bold">Commission your design</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Message our studio with the theme you loved. We customise typography,
            photos and blessings — then deliver finished files.
          </p>
          <p className="mt-3 text-base font-bold text-[#25D366]">
            {COMPANY.phoneDisplay}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
            >
              WhatsApp studio
            </a>
            <a
              href={mail}
              className="inline-flex justify-center rounded-2xl border border-white/25 px-5 py-3 text-sm font-semibold text-white"
            >
              Email {COMPANY.name}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
