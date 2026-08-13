"use client";

import Link from "next/link";
import { useState } from "react";
import { COMPANY, whatsappUrl } from "@/data/contact";
import { BrandLogo } from "./BrandLogo";

const SITE = COMPANY.site;
const WA = whatsappUrl();

const nav = [
  { href: "/create", label: "Themes" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#customise", label: "Order" },
] as const;

const footerInvites = [
  { href: "/create", label: "Theme gallery" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#customise", label: "Order via WhatsApp" },
] as const;

const footerCompany = [
  { href: `${SITE}#about`, label: "About Us", external: true },
  { href: `${SITE}#work`, label: "Our Work", external: true },
  { href: SITE, label: "Company site", external: true },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DFD4] bg-[#F7F4EF]/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-5 py-3">
        <BrandLogo variant="light" size="header" />

        <nav className="hidden items-center gap-6 text-sm font-medium text-[#5C4A42] md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#1A1210]">
              {item.label}
            </Link>
          ))}
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#1A1210] px-4 py-2 text-xs font-semibold text-[#F7F4EF]"
          >
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9CFC4] text-[#1A1210] md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-[#E8DFD4] bg-[#F7F4EF] px-5 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[#1A1210]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
            >
              WhatsApp {COMPANY.phoneDisplay}
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
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo variant="dark" size="footer" href={SITE} external />
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Floating mobile invitation experiences — choose a theme, WhatsApp us,
            we customise and deliver.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Invitations</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {footerInvites.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            {footerCompany.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/65">
            <li>
              <a href={WA} target="_blank" rel="noreferrer" className="hover:text-white">
                WhatsApp {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/45">
        © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
      </div>
    </footer>
  );
}
