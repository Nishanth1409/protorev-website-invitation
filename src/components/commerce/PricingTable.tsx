"use client";

import Link from "next/link";
import { formatInr, pricingPlans } from "@/data/pricing";
import { COMPANY, customizeWhatsAppUrl } from "@/data/contact";
import { TemplateOrCustomize } from "@/components/marketing/TemplateOrCustomize";
import { CustomDesignShowcase } from "@/components/marketing/CustomDesignShowcase";

export function PricingTable({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <div>
      {showHeader && (
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
            How pricing works
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--ink)] md:text-5xl">
            Browse themes.{" "}
            <span className="pr-gradient-text">We customise for you.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--ink-soft)]">
            No login. No payment on this website. No self-download.
            Choose a theme, WhatsApp us your details — we design and deliver
            your invitation. Starting from {formatInr(pricingPlans[0].priceInr)}.
          </p>
          <p className="mt-4 text-lg font-bold text-[#25D366]">
            {COMPANY.phoneDisplay}
          </p>
        </div>
      )}

      <section className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">
          Customisation packages
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`rounded-3xl border p-6 shadow-[var(--shadow-card)] ${
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
                className="mt-6 inline-flex w-full justify-center rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
              >
                WhatsApp to order
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
          {" · "}
          <Link href="/create" className="font-semibold text-[var(--grad-a)]">
            Browse themes first →
          </Link>
        </p>
      </section>

      <div className="mt-10">
        <CustomDesignShowcase />
      </div>

      <TemplateOrCustomize />
    </div>
  );
}
