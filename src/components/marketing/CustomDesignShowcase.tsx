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
      <div className="overflow-hidden rounded-2xl border border-(--line) bg-[#0f0f1a] text-white">
        <div className="border-b border-white/10 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A227]">
            Commission this theme
          </p>
          <p className="mt-1 text-sm font-semibold">
            {themeName ? `“${themeName}”` : "Bespoke customisation"}
          </p>
        </div>
        <div className="space-y-3 px-4 py-3">
          <p className="text-xs leading-relaxed text-white/70">
            Share ceremony details on WhatsApp. Our studio designs and delivers
            your finished invitation.
          </p>
          <p className="text-sm font-bold text-[#25D366]">{COMPANY.phoneDisplay}</p>
          <div className="flex flex-wrap gap-2">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#25D366] px-3 py-2 text-xs font-semibold text-white"
            >
              WhatsApp studio
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
    <section className="mx-auto max-w-3xl px-5 py-6" id="customise">
      <div className="overflow-hidden rounded-3xl border border-(--line) bg-white shadow-(--shadow-soft)">
        <div className="p-5 sm:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--grad-a)">
            Concierge customisation
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-(--ink)">
            You choose the look. We finish every detail.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-(--ink-soft)">
            This is our invitation gallery. When a design feels right, message
            our studio with your names, date, venue, photos and language — we
            customise and deliver polished files.
          </p>
          <p className="mt-3 text-base font-bold text-(--ink)">
            {COMPANY.phoneDisplay}
          </p>
          <p className="text-sm text-(--ink-mute)">{COMPANY.email}</p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
            >
              WhatsApp to commission
            </a>
            <a
              href={mail}
              className="inline-flex justify-center rounded-2xl border border-(--line) px-5 py-3 text-sm font-semibold text-(--ink)"
            >
              Email the studio
            </a>
          </div>
        </div>

        <div
          className="border-t border-(--line) p-5 sm:p-7"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(232,197,106,0.15), transparent 50%), linear-gradient(145deg,#2A0810,#4A0E18)",
          }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E8C56A]">
            Studio process
          </p>
          <ol className="mt-4 space-y-4 text-sm text-[#F8F1E3]/90">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8C56A]/20 text-xs font-bold text-[#E8C56A]">
                1
              </span>
              <span>
                <strong className="text-white">Browse</strong> — preview sample
                invitation designs on your phone.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8C56A]/20 text-xs font-bold text-[#E8C56A]">
                2
              </span>
              <span>
                <strong className="text-white">Brief us</strong> — theme name,
                names, date, venue, photos, faith & language.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8C56A]/20 text-xs font-bold text-[#E8C56A]">
                3
              </span>
              <span>
                <strong className="text-white">Receive</strong> — finished
                invitation files, ready to share with guests.
              </span>
            </li>
          </ol>
          <Link
            href="/create"
            className="mt-5 inline-flex w-full justify-center rounded-2xl bg-[#E8C56A] px-5 py-3 text-sm font-semibold text-[#2A0810]"
          >
            Open the gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
