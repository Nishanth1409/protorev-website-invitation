"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MobileDeviceFrame } from "./MobileDeviceFrame";
import { COMPANY } from "@/data/contact";

type Props = {
  children: ReactNode;
  themeName: string;
  subtitle?: string;
  whatsAppHref: string;
  emailHref?: string;
  backHref?: string;
  /** When parent already shows title / style controls */
  hidePageHeader?: boolean;
};

/** Live preview shell — phone frame on desktop, full-bleed invitation on mobile. */
export function MobilePreviewPage({
  children,
  themeName,
  subtitle,
  whatsAppHref,
  emailHref,
  backHref = "/create",
  hidePageHeader = false,
}: Props) {
  return (
    <div className="min-h-screen bg-[#F4EFE7]">
      <div
        className={`mx-auto max-w-lg px-4 pb-40 md:pb-36 ${
          hidePageHeader ? "pt-2 md:pt-4" : "pt-4 md:pt-6"
        }`}
      >
        {!hidePageHeader && (
          <>
            <Link
              href={backHref}
              className="inline-flex min-h-11 items-center text-xs font-medium text-[#7A6A60] hover:text-[#1A1210]"
            >
              ← All invitations
            </Link>
            <h1 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#1A1210]">
              {themeName}
            </h1>
            {subtitle && (
              <p className="mt-1 text-xs text-[#5C4A42]">{subtitle}</p>
            )}
          </>
        )}

        <div
          className={`flex justify-center rounded-[2rem] px-2 py-6 md:px-4 md:py-10 ${
            hidePageHeader ? "mt-2" : "mt-6"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.16), transparent 62%)",
          }}
        >
          <MobileDeviceFrame scrollable label={`Preview ${themeName}`}>
            {children}
          </MobileDeviceFrame>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#8A7A70]">
          Sample preview · Customised by Protorev Digital
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E4D9C8] bg-[#F8F3EA]/96 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg flex-col gap-2">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 w-full items-center justify-center rounded-full bg-[#1A1210] py-3.5 text-sm font-semibold text-[#F7F4EF]"
          >
            Customize This Design
          </a>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 w-full items-center justify-center rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white"
          >
            WhatsApp Protorev
          </a>
          {emailHref && (
            <a
              href={emailHref}
              className="flex min-h-11 w-full items-center justify-center rounded-full border border-[#D9CFC4] py-3 text-sm font-semibold text-[#1A1210]"
            >
              Email {COMPANY.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
