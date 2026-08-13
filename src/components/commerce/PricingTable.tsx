"use client";

import { formatInr, pricingPlans } from "@/data/pricing";
import { COMPANY, whatsappUrl } from "@/data/contact";

const btnPrimary =
  "mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#5b4aff_0%,#8b5cf6_50%,#06b6d4_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(91,74,255,0.35)] transition hover:brightness-105";

export function PricingTable({ showHeader = true }: { showHeader?: boolean }) {
  const fromPrice = Math.min(...pricingPlans.map((p) => p.priceInr));

  return (
    <div>
      {showHeader && (
        <div className="mx-auto max-w-3xl px-5 pb-8 pt-2 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#5b4aff]">
            Simple packages
          </p>
          <h1 className="mt-3 font-brand text-2xl font-bold tracking-tight text-[#0f0f1a] sm:text-3xl">
            Beginner prices. Grown-up care.
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#4a4a6a]">
            We&apos;re just starting out — so our packages stay fair and clear.
            PDF &amp; image, invitation website, or a short handcrafted video.
            From {formatInr(fromPrice)}.
          </p>
        </div>
      )}

      <section className="mx-auto max-w-5xl px-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`rounded-3xl border p-5 ${
                plan.highlighted
                  ? "border-[#5b4aff]/40 bg-white shadow-[0_12px_40px_rgba(91,74,255,0.12)] ring-1 ring-[#5b4aff]/20"
                  : "border-[#e8e8f0] bg-white/90 shadow-[0_8px_30px_rgba(15,15,26,0.04)]"
              }`}
            >
              {plan.badge && (
                <span className="rounded-full bg-[linear-gradient(135deg,#5b4aff_0%,#8b5cf6_50%,#06b6d4_100%)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="mt-3 text-lg font-semibold text-[#0f0f1a]">
                {plan.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-semibold text-[#0f0f1a]">
                  {formatInr(plan.priceInr)}
                </p>
                {plan.compareAtInr ? (
                  <p className="text-sm text-[#8888aa] line-through">
                    {formatInr(plan.compareAtInr)}
                  </p>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-[#4a4a6a]">{plan.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#4a4a6a]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[#5b4aff]">✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappUrl(
                  `Hi Protorev Digital, I would like to commission the ${plan.name} package (${formatInr(plan.priceInr)}). Please share next steps.`,
                )}
                target="_blank"
                rel="noreferrer"
                className={btnPrimary}
              >
                WhatsApp Protorev
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[#4a4a6a]">
          Need a combination? WhatsApp us — we can bundle packages.
          <br />
          <a href="/#custom-work" className="font-semibold text-[#5b4aff]">
            View custom work →
          </a>
          {" · "}
          <a
            href={`mailto:${COMPANY.email}`}
            className="font-semibold text-[#0f0f1a]"
          >
            {COMPANY.email}
          </a>
        </p>
      </section>
    </div>
  );
}
