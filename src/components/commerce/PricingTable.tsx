"use client";

import { formatInr, pricingPlans } from "@/data/pricing";
import { COMPANY, whatsappUrl } from "@/data/contact";

export function PricingTable({ showHeader = true }: { showHeader?: boolean }) {
  const fromPrice = Math.min(...pricingPlans.map((p) => p.priceInr));

  return (
    <div>
      {showHeader && (
        <div className="mx-auto max-w-3xl px-5 pb-8 pt-2 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
            Packages
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[#1A1210] sm:text-3xl">
            Affordable custom invitations
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#5C4A42]">
            Clear packages for every share style — PDF &amp; image, invitation
            website, or a short handcrafted animated video. From{" "}
            {formatInr(fromPrice)}.
          </p>
        </div>
      )}

      <section className="mx-auto max-w-5xl px-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`rounded-[1.5rem] border p-5 ${
                plan.highlighted
                  ? "border-[#1A1210] bg-white shadow-[0_12px_40px_rgba(26,18,16,0.08)]"
                  : "border-[#E4D9C8] bg-white/80"
              }`}
            >
              {plan.badge && (
                <span className="rounded-full bg-[#1A1210] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="mt-3 text-lg font-semibold text-[#1A1210]">
                {plan.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-3xl font-semibold text-[#1A1210]">
                  {formatInr(plan.priceInr)}
                </p>
                {plan.compareAtInr ? (
                  <p className="text-sm text-[#8A7A70] line-through">
                    {formatInr(plan.compareAtInr)}
                  </p>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-[#5C4A42]">{plan.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#5C4A42]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[#8B6914]">✦</span>
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
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
              >
                WhatsApp Protorev
              </a>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-[#5C4A42]">
          Need a combination? WhatsApp us — we can bundle packages.
          <br />
          <a href="/#custom-work" className="font-semibold text-[#1A1210]">
            View custom work →
          </a>
          {" · "}
          <a href={`mailto:${COMPANY.email}`} className="font-semibold">
            {COMPANY.email}
          </a>
        </p>
      </section>
    </div>
  );
}
