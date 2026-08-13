"use client";

import Link from "next/link";
import { useState } from "react";
import { COMPANY, whatsappUrl } from "@/data/contact";
import { BrandLogo } from "./BrandLogo";

const SITE = COMPANY.site;
const WA = whatsappUrl();

const nav = [
  { href: "/create", label: "Example cards" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#customise", label: "Custom order" },
] as const;

const footerInvites = [
  { href: "/create", label: "Example cards" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#customise", label: "Custom order" },
] as const;

const footerCompany = [
  { href: `${SITE}#about`, label: "About Us", external: true },
  { href: `${SITE}#work`, label: "Our Work", external: true },
  { href: `${SITE}#process`, label: "Process", external: true },
  { href: SITE, label: "Company site", external: true },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6 sm:py-3.5">
        <BrandLogo variant="light" size="header" />

        <nav className="hidden items-center gap-7 text-sm font-medium text-[var(--ink-soft)] md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[var(--ink)]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="pr-gradient-btn inline-flex items-center rounded-full px-5 py-2.5 text-xs font-semibold tracking-wide"
          >
            WhatsApp {COMPANY.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] text-[var(--ink)] md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--background)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="pr-gradient-btn mt-2 inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold"
            >
              WhatsApp us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#0B0C15] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <BrandLogo variant="dark" size="footer" href={SITE} external />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            We build digital experiences that elevate brands — including
            multi-faith wedding invitations crafted for every sacred vow.
          </p>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7EB7F2]">
            Where creativity meets code
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Invitations</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            {footerInvites.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            {footerCompany.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Get In Touch</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            <li>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                WhatsApp {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="transition hover:text-white"
              >
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={SITE}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-white"
              >
                www.protorevdigital.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-white/35">
            Wedding invitation studio · Demo couples are fictional
          </p>
        </div>
      </div>
    </footer>
  );
}
