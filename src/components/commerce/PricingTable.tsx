"use client";

import Link from "next/link";
import { formatInr, pricingPlans } from "@/data/pricing";
import { customizeWhatsAppUrl, CUSTOM_SHOWCASE } from "@/data/contact";
import { TemplateOrCustomize } from "@/components/marketing/TemplateOrCustomize";
import { CustomDesignShowcase } from "@/components/marketing/CustomDesignShowcase";

export function PricingTable({ showHeader = true }: { showHeader?: boolean }) {
  const templates = pricingPlans.filter((p) => p.kind === "template");
  const customs = pricingPlans.filter((p) => p.kind === "custom");

  return (
    <div>
      {showHeader && (
        <div className="mx-auto max-w-3xl px-6 pb-10 pt-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--grad-a)]">
            Simple pricing
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--ink)] md:text-5xl">
            Startup prices.{" "}
            <span className="pr-gradient-text">Made for every family.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--ink-soft)]">
            We keep costs low on purpose — local couples, small towns, big
            celebrations. Templates from ₹99. Custom work stays reachable.
            Sign in + pay before clean PNG/PDF downloads.
          </p>
        </div>
      )}

      <section className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-xl font-bold text-[var(--ink)]">
          Ready templates
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {templates.map((plan) => (
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
              <Link
                href="/create"
                className="pr-gradient-btn mt-6 inline-flex w-full justify-center rounded-2xl px-4 py-3 text-sm font-semibold"
              >
                Choose template
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-6">
        <h2 className="mb-2 text-xl font-bold text-[var(--ink)]">
          Customisation (still budget-friendly)
        </h2>
        <p className="mb-4 max-w-2xl text-sm text-[var(--ink-soft)]">
          Need something uniquely yours? Custom stays within reach for local
          families — see our live sample, then message us.
        </p>
        <div className="mb-6">
          <a
            href={CUSTOM_SHOWCASE.url}
            target="_blank"
            rel="noreferrer"
            className="pr-gradient-text text-sm font-semibold"
          >
            View our custom sample — {CUSTOM_SHOWCASE.title} →
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {customs.map((plan) => (
            <article
              key={plan.id}
              className={`rounded-3xl border p-6 text-white shadow-[var(--shadow-soft)] ${
                plan.highlighted
                  ? "border-transparent bg-[linear-gradient(145deg,#0f0f1a,#312e81)]"
                  : "border-[var(--line)] bg-[#111827]"
              }`}
            >
              {plan.badge && (
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide">
                  {plan.badge}
                </span>
              )}
              <h3 className="mt-3 text-lg font-bold">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold">{formatInr(plan.priceInr)}</p>
              {plan.compareAtInr && (
                <p className="text-sm text-white/50 line-through">
                  {formatInr(plan.compareAtInr)}
                </p>
              )}
              <p className="mt-3 text-sm text-white/75">{plan.blurb}</p>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {plan.features.map((f) => (
                  <li key={f}>✦ {f}</li>
                ))}
              </ul>
              <div className="mt-6 space-y-2">
                <a
                  href={CUSTOM_SHOWCASE.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full justify-center rounded-2xl bg-[#E8C56A] px-4 py-3 text-sm font-semibold text-[#2A0810]"
                >
                  See custom sample
                </a>
                <a
                  href={customizeWhatsAppUrl({
                    format: plan.format === "both" ? "both" : plan.format,
                    themeName: plan.name,
                  })}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full justify-center rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white"
                >
                  Message to customise
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <CustomDesignShowcase />
      </div>

      <TemplateOrCustomize />
    </div>
  );
}
