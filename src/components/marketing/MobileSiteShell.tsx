import type { ReactNode } from "react";

/**
 * Locks the marketing site to a phone-width column on every screen size.
 * Desktop visitors see the same mobile layout centered on a soft backdrop.
 */
export function MobileSiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full bg-[#EDE8E1]">
      <div className="mx-auto flex min-h-full w-full max-w-107.5 flex-col bg-background shadow-[0_0_0_1px_rgba(26,18,16,0.06),0_24px_80px_rgba(26,18,16,0.12)]">
        {children}
      </div>
    </div>
  );
}
