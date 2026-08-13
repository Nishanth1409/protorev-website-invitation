"use client";

import { useEffect, useState } from "react";

/**
 * Top-of-page brand gradient progress line (protorevdigital.com style).
 * Grows left → right as the user scrolls. No right-side scrollbar chrome.
 */
export function ScrollProgressLine() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left transition-[width] duration-75 ease-out"
        style={{
          width: `${progress * 100}%`,
          background:
            "linear-gradient(90deg, #5b4aff 0%, #8b5cf6 50%, #06b6d4 100%)",
          boxShadow: "0 0 12px rgba(91, 74, 255, 0.45)",
        }}
      />
    </div>
  );
}
