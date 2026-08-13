"use client";

import {
  CUSTOM_SHOWCASE,
  customizeEmailUrl,
  customizeWhatsAppUrl,
} from "@/data/contact";

type Props = {
  /** Compact strip for side panels */
  compact?: boolean;
};

/**
 * Shows Protorev’s own custom invitation sample and connects
 * clients to WhatsApp / email for the same level of customisation.
 */
export function CustomDesignShowcase({ compact = false }: Props) {
  const wa = customizeWhatsAppUrl({ format: "event-page" });
  const mail = customizeEmailUrl({ format: "custom invitation website" });

  if (compact) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[#2A0810] text-[#F8F1E3]">
        <div className="border-b border-[#E8C56A]/35 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E8C56A]">
            Our custom work
          </p>
          <p className="mt-1 text-sm font-semibold">{CUSTOM_SHOWCASE.title}</p>
        </div>
        <div className="space-y-3 px-4 py-3">
          <p className="text-xs leading-relaxed text-white/75">
            {CUSTOM_SHOWCASE.blurb}
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={CUSTOM_SHOWCASE.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#E8C56A] px-3 py-2 text-xs font-semibold text-[#2A0810]"
            >
              View live sample →
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#25D366] px-3 py-2 text-xs font-semibold text-white"
            >
              Get one like this
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-6">
      <div className="overflow-hidden rounded-[1.75rem] border border-[#E8C56A]/30 bg-[linear-gradient(145deg,#2A0810,#4A0E18)] text-[#F8F1E3] shadow-[var(--shadow-soft)]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E8C56A]">
              Customisation example · Protorev design only
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {CUSTOM_SHOWCASE.title}
            </h2>
            <p className="mt-2 text-sm text-[#E8C56A]/90">
              {CUSTOM_SHOWCASE.subtitle} · {CUSTOM_SHOWCASE.credit}
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {CUSTOM_SHOWCASE.blurb}
            </p>
            <p className="mt-3 text-xs text-white/55">
              Ready templates live in our studio. This link is separate — a
              finished custom invitation website we designed for a real ceremony
              feel. Ask us to create yours in the same spirit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={CUSTOM_SHOWCASE.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl bg-[#E8C56A] px-5 py-3 text-sm font-semibold text-[#2A0810]"
              >
                Open live custom sample
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
              >
                WhatsApp — customise for me
              </a>
              <a
                href={mail}
                className="inline-flex rounded-2xl border border-white/25 px-5 py-3 text-sm font-semibold text-white"
              >
                Email us
              </a>
            </div>
          </div>

          <a
            href={CUSTOM_SHOWCASE.url}
            target="_blank"
            rel="noreferrer"
            className="relative flex min-h-[220px] flex-col justify-end border-t border-[#E8C56A]/25 p-6 transition hover:bg-black/20 lg:border-l lg:border-t-0 lg:p-8"
            style={{
              background:
                "radial-gradient(circle at 50% 20%, rgba(232,197,106,0.2), transparent 50%), linear-gradient(180deg, #4A0E18, #1a050a)",
            }}
          >
            <div className="absolute inset-x-8 top-8 bottom-16 rounded-2xl border border-[#E8C56A]/40 bg-[#2A0810]/60 p-5 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <p className="text-[10px] tracking-[0.3em] text-[#E8C56A]">
                OPENING BLESSING
              </p>
              <p className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[#F8F1E3]">
                ಶುಭ ವಿವಾಹ
              </p>
              <p className="mt-2 text-xs text-white/60">ಶುಭಮಸ್ತು</p>
              <div className="mx-auto mt-5 h-px w-16 bg-[#E8C56A]/70" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-white/45">
                Tap to view full experience
              </p>
            </div>
            <p className="relative z-10 text-xs font-medium text-[#E8C56A]">
              {CUSTOM_SHOWCASE.formatLabel} →
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
