"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  scrollable?: boolean;
  className?: string;
  label?: string;
  /** Force phone frame even on small screens */
  forceFrame?: boolean;
};

function subscribeMobile(cb: () => void) {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getMobileSnapshot() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Desktop: invitation inside realistic phone frame (~390×844).
 * Mobile: invitation fills viewport — no chrome frame.
 */
export function MobileDeviceFrame({
  children,
  scrollable = true,
  className = "",
  label = "Mobile preview",
  forceFrame = false,
}: Props) {
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerSnapshot,
  );
  const reduceMotion = useReducedMotion();
  const showFrame = forceFrame || !isMobile;

  if (!showFrame) {
    return (
      <div
        className={`mobile-preview-root min-h-[100svh] w-full bg-[#F7F4EF] ${className}`}
        aria-label={label}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`relative mx-auto w-full max-w-[320px] ${className}`}
      animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2.75rem] opacity-40 blur-3xl motion-reduce:hidden"
        style={{ background: "rgba(184,134,11,0.18)" }}
        aria-hidden
      />
      <div
        className="relative overflow-hidden rounded-[2.15rem] border-[3px] border-[#1c1c1f] bg-[#0a0a0d] shadow-[0_30px_70px_rgba(0,0,0,0.28)]"
        style={{ width: "100%", aspectRatio: "390 / 844" }}
        aria-label={label}
      >
        <div className="absolute left-1/2 top-[10px] z-30 h-[24px] w-[32%] -translate-x-1/2 rounded-full bg-[#0a0a0d]" />
        <div
          className={`mobile-preview-root absolute inset-[3px] overflow-hidden rounded-[1.85rem] bg-[#F7F4EF] ${
            scrollable ? "overflow-y-auto overscroll-contain" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
