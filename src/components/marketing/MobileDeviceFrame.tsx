"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  scrollable?: boolean;
  className?: string;
  label?: string;
};

/** Floating iPhone-style frame — invitation previews stay mobile width. */
export function MobileDeviceFrame({
  children,
  scrollable = true,
  className = "",
  label = "Mobile preview",
}: Props) {
  return (
    <motion.div
      className={`relative mx-auto w-full max-w-[300px] ${className}`}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2.75rem] blur-3xl opacity-50"
        style={{ background: "rgba(196,154,74,0.22)" }}
        aria-hidden
      />
      <div
        className="relative overflow-hidden rounded-[2rem] border-[3px] border-[#141418] bg-[#0a0a0d] shadow-[0_28px_70px_rgba(0,0,0,0.28)]"
        style={{ aspectRatio: "9 / 19.5" }}
        aria-label={label}
      >
        <div className="absolute left-1/2 top-[8px] z-30 h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-[#0a0a0d]" />
        <div
          className={`mobile-preview-root absolute inset-[3px] overflow-hidden rounded-[1.65rem] bg-[#F7F4EF] ${
            scrollable ? "overflow-y-auto overscroll-contain" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
