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
};

/** Live preview page — phone only, sticky actions below. */
export function MobilePreviewPage({
  children,
  themeName,
  subtitle,
  whatsAppHref,
  emailHref,
  backHref = "/create",
}: Props) {
  return (
    <div className="min-h-[calc(100svh-4rem)] bg-[#F7F4EF]">
      <div className="mx-auto max-w-lg px-4 pb-36 pt-6">
        <Link
          href={backHref}
          className="text-xs font-medium text-[#7A6A60] hover:text-[#1A1210]"
        >
          ← All designs
        </Link>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[#1A1210]">
          {themeName}
        </h1>
        {subtitle && (
          <p className="mt-1 text-xs text-[#5C4A42]">{subtitle}</p>
        )}

        <div className="mt-6 flex justify-center">
          <MobileDeviceFrame scrollable label={`Preview ${themeName}`}>
            {children}
          </MobileDeviceFrame>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#8A7A70]">
          Sample preview · We customise names, photos & language for you
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8DFD4] bg-white/95 px-4 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg flex-col gap-2">
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white"
          >
            Customize design · WhatsApp
          </a>
          {emailHref && (
            <a
              href={emailHref}
              className="flex w-full items-center justify-center rounded-full border border-[#D9CFC4] py-3 text-sm font-semibold text-[#1A1210]"
            >
              Email details
            </a>
          )}
          <p className="text-center text-[10px] text-[#8A7A70]">
            {COMPANY.phoneDisplay} · Protorev Digital
          </p>
        </div>
      </div>
    </div>
  );
}
