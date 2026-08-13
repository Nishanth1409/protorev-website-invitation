"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COMPANY, whatsappUrl } from "@/data/contact";
import { handleHomeHashClick, scrollToId } from "@/lib/scrollToId";
import { BrandLogo } from "./BrandLogo";
import { ScrollProgressLine } from "./ScrollProgressLine";

const WA = whatsappUrl();

const nav = [
  { href: "/#custom-work", label: "Custom Work", id: "custom-work" },
  { href: "/#custom-work", label: "Styles We Create", id: "styles" },
  { href: "/pricing", label: "Packages", id: "packages" },
  { href: "/#contact", label: "Contact", id: "contact" },
] as const;

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#5b4aff_0%,#8b5cf6_50%,#06b6d4_100%)] px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-[0_4px_24px_rgba(91,74,255,0.35)] transition hover:brightness-105";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const run = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id) window.setTimeout(() => scrollToId(id), 50);
    };
    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);

  return (
    <>
      <ScrollProgressLine />
      <header className="sticky top-0 z-50 border-b border-[#e8e8f0]/90 bg-[#f8f8fc]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <BrandLogo variant="light" size="header" />

          <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-wide text-[#4a4a6a] md:flex">
            {nav.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleHomeHashClick(e, item.href)}
                className="transition hover:text-[#0f0f1a]"
              >
                {item.label}
              </Link>
            ))}
            <a href={WA} target="_blank" rel="noreferrer" className={btnPrimary}>
              Let&apos;s Talk →
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e8e8f0] bg-white text-[#0f0f1a] md:hidden"
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
          <div className="border-t border-[#e8e8f0] bg-[#f8f8fc] px-5 py-4 md:hidden">
            <nav className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    handleHomeHashClick(e, item.href);
                    setOpen(false);
                  }}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[#0f0f1a]"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className={`${btnPrimary} mt-2 w-full`}
              >
                Let&apos;s Talk →
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="mt-auto scroll-mt-24 bg-[#0f0f1a] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <BrandLogo
            variant="dark"
            size="footer"
            href={COMPANY.site}
            external
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            New creators taking flight — digital wedding invitations made with
            curiosity, culture, and care. We show our real work, then craft
            yours.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Studio
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            <li>
              <Link
                href="/#custom-work"
                onClick={(e) => handleHomeHashClick(e, "/#custom-work")}
                className="hover:text-white"
              >
                Custom Work
              </Link>
            </li>
            <li>
              <Link
                href="/#custom-work"
                onClick={(e) => handleHomeHashClick(e, "/#custom-work")}
                className="hover:text-white"
              >
                Styles We Create
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white">
                Packages
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Company
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            <li>
              <a
                href={`${COMPANY.site}#about`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href={COMPANY.site}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                protorevdigital.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Get In Touch
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
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
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        {" · "}
        <Link href="/terms" className="hover:text-white/70">
          Terms
        </Link>
      </div>
    </footer>
  );
}
