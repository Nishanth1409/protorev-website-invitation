"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Scroll invitation content inside the phone screen */
  scrollable?: boolean;
  className?: string;
  label?: string;
};

/**
 * iPhone-style frame — all invitation previews stay mobile width.
 */
export function MobileDeviceFrame({
  children,
  scrollable = true,
  className = "",
  label = "Mobile preview",
}: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] sm:max-w-[300px] ${className}`}>
      <div
        className="pointer-events-none absolute -inset-5 rounded-[2.75rem] blur-2xl opacity-60"
        style={{ background: "rgba(196,154,74,0.15)" }}
        aria-hidden
      />
      <div
        className="relative overflow-hidden rounded-[2rem] border-[3px] border-[#141418] bg-[#0a0a0d] shadow-[0_28px_70px_rgba(0,0,0,0.28)]"
        style={{ aspectRatio: "9 / 19.5" }}
        aria-label={label}
      >
        <div className="absolute left-1/2 top-0 z-30 h-[22px] w-[36%] -translate-x-1/2 rounded-b-[14px] bg-[#141418]" />
        <div
          className={`mobile-preview-root absolute inset-[3px] overflow-hidden rounded-[1.65rem] bg-[#F7F4EF] ${
            scrollable ? "overflow-y-auto overscroll-contain" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
