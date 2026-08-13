"use client";

import Link from "next/link";
import { formatInr, pricingPlans } from "@/data/pricing";
import { COMPANY, customizeWhatsAppUrl } from "@/data/contact";
import { TemplateOrCustomize } from "@/components/marketing/TemplateOrCustomize";
import { CustomDesignShowcase } from "@/components/marketing/CustomDesignShowcase";
import { StudioTrust } from "@/components/marketing/StudioTrust";

export function PricingTable({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <div>
      {showHeader && (
        <div className="mx-auto max-w-3xl px-5 pb-8 pt-2 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
            Studio packages
          </p>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
            Clear pricing.{" "}
            <span className="pr-gradient-text">Concierge delivery.</span>
          </h1>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
            Browse themes free. When you are ready, WhatsApp us — we customise
            and deliver. Packages from {formatInr(pricingPlans[0].priceInr)}.
          </p>
          <p className="mt-3 text-base font-bold text-[#25D366]">
            {COMPANY.phoneDisplay}
          </p>
        </div>
      )}

      <section className="mx-auto max-w-6xl px-5">
        <h2 className="mb-3 text-lg font-bold text-[var(--ink)]">
          Customisation packages
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`rounded-3xl border p-5 shadow-[var(--shadow-card)] ${
                plan.highlighted
                  ? "border-[var(--grad-a)] bg-[rgba(91,74,255,0.04)]"
                  : "border-[var(--line)] bg-white"
              }`}
            >
              {plan.badge && (
                <span className="rounded-full bg-[var(--grad-a)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-[var(--ink)]">
                {formatInr(plan.priceInr)}
              </p>
              {plan.compareAtInr && (
                <p className="text-sm text-[var(--ink-mute)] line-through">
                  {formatInr(plan.compareAtInr)}
                </p>
              )}
              <p className="mt-3 text-sm text-[var(--ink-soft)]">{plan.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="pr-gradient-text">✦</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={customizeWhatsAppUrl({
                  format:
                    plan.format === "both" ? "invitation-card" : plan.format,
                  themeName: plan.name,
                })}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full justify-center rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
              >
                WhatsApp to commission
              </a>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-[var(--ink-soft)]">
          Prefer email?{" "}
          <a
            href={`mailto:${COMPANY.email}`}
            className="font-semibold text-[var(--grad-a)]"
          >
            {COMPANY.email}
          </a>
          <br />
          <Link href="/create" className="mt-2 inline-block font-semibold text-[var(--grad-a)]">
            Browse themes first →
          </Link>
        </p>
      </section>

      <StudioTrust />

      <div className="mt-2">
        <CustomDesignShowcase />
      </div>

      <TemplateOrCustomize />
    </div>
  );
}
