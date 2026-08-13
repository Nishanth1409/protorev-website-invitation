"use client";

import { useRef, useState } from "react";
import type { WeddingInvite } from "@/data/types";
import { MusicToggle } from "./MusicToggle";
import { PrintableInvitationCard } from "./PrintableInvitationCard";
import { defaultMusic, musicByMood } from "@/data/music";
import { getCreateTheme } from "@/data/themes";
import { TemplateOrCustomize } from "@/components/marketing/TemplateOrCustomize";
import { languageMeta } from "@/data/types";
import { AuthPaywallModal } from "@/components/commerce/AuthPaywallModal";
import { useCommerce } from "@/lib/commerce";
import { formatInr } from "@/data/pricing";
import Link from "next/link";

type Props = {
  invite: WeddingInvite;
};

function resolveMusic(invite: WeddingInvite) {
  if (invite.music) return invite.music;
  if (invite.themeId) {
    const theme = getCreateTheme(invite.themeId);
    if (theme) return musicByMood[theme.musicMood];
  }
  return defaultMusic;
}

/**
 * Invitation card studio with:
 * - Watermarked preview until purchase
 * - Sign-in (email + phone) then pay to unlock PNG/PDF
 * - Soft anti-capture on unpaid preview
 */
export function InvitationCardExperience({ invite }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const protectRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paywall, setPaywall] = useState(false);
  const [intent, setIntent] = useState<"png" | "pdf" | "custom">("png");
  const { user, entitlementsForTheme, logout } = useCommerce();

  const themeId = invite.themeId ?? invite.slug;
  const entitlements = entitlementsForTheme(themeId);
  const unlockedPng = entitlements.png;
  const unlockedPdf = entitlements.pdf;
  const isUnlocked = unlockedPng || unlockedPdf;

  const t = invite.theme;
  const music = resolveMusic(invite);
  const fileBase = `${invite.bride.split(" ")[0]}-${invite.groom.split(" ")[0]}-invite`
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/gi, "-");

  const openGate = (next: "png" | "pdf" | "custom") => {
    setIntent(next);
    setPaywall(true);
  };

  const captureClean = async () => {
    const el = cardRef.current;
    if (!el) throw new Error("Card not ready");
    // Temporarily hide watermark for export only when unlocked
    const marks = el.querySelectorAll("[data-preview-mark]");
    marks.forEach((n) => ((n as HTMLElement).style.visibility = "hidden"));
    try {
      const html2canvas = (await import("html2canvas")).default;
      return await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
    } finally {
      marks.forEach((n) => ((n as HTMLElement).style.visibility = "visible"));
    }
  };

  const downloadPng = async () => {
    if (!unlockedPng) {
      openGate("png");
      return;
    }
    setError(null);
    setBusy("png");
    try {
      const canvas = await captureClean();
      const link = document.createElement("a");
      link.download = `${fileBase}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      setError("Could not export PNG. Try again.");
    } finally {
      setBusy(null);
    }
  };

  const downloadPdf = async () => {
    if (!unlockedPdf) {
      openGate("pdf");
      return;
    }
    setError(null);
    setBusy("pdf");
    try {
      const canvas = await captureClean();
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: [5, 7],
      });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, 5, 7);
      pdf.save(`${fileBase}.pdf`);
    } catch {
      setError("Could not export PDF. Try again.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div
      className="invite-viewport relative min-h-[calc(100svh-4rem)]"
      lang={invite.language}
      style={{
        background: `radial-gradient(circle at 20% 0%, ${t.glow}, transparent 40%), ${t.bgDeep}`,
      }}
    >
      <MusicToggle music={music} accent={t.accent} enabled />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px] lg:items-start lg:px-6 lg:py-12">
        <div className="flex justify-center">
          <div
            ref={protectRef}
            className="invite-protect relative w-full max-w-[420px] select-none rounded-[1.5rem] p-3 sm:p-5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${t.border}`,
            }}
            onContextMenu={(e) => {
              if (!isUnlocked) e.preventDefault();
            }}
            onDragStart={(e) => {
              if (!isUnlocked) e.preventDefault();
            }}
          >
            <PrintableInvitationCard
              ref={cardRef}
              invite={invite}
              watermarked={!isUnlocked}
            />

            {/* Extra click shield for unpaid previews */}
            {!isUnlocked && (
              <div
                className="absolute inset-0 z-30 cursor-not-allowed"
                title="Preview only — purchase to download"
                onClick={() => openGate("png")}
                onContextMenu={(e) => e.preventDefault()}
              />
            )}
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-[var(--line)] bg-white/95 p-5 shadow-[var(--shadow-soft)] backdrop-blur sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--grad-a)]">
            Invitation card
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[var(--ink)]">
            {isUnlocked ? "Your files are unlocked" : "Preview locked for download"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            {isUnlocked
              ? "Clean PNG/PDF available for this theme on this account."
              : "Sign in with email & phone, then pay to download. Screenshots of the preview stay watermarked."}
          </p>

          {user ? (
            <p className="mt-3 rounded-xl bg-[var(--background)] px-3 py-2 text-xs text-[var(--ink-soft)]">
              Signed in: <strong className="text-[var(--ink)]">{user.name}</strong>
              <button
                type="button"
                onClick={logout}
                className="ml-2 text-[var(--grad-a)]"
              >
                Log out
              </button>
            </p>
          ) : (
            <p className="mt-3 text-xs text-[var(--ink-mute)]">
              Not signed in · From {formatInr(799)} for PNG unlock
            </p>
          )}

          <div className="mt-5 space-y-3">
            <button
              type="button"
              disabled={!!busy}
              onClick={() => void downloadPng()}
              className="pr-gradient-btn flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              {busy === "png"
                ? "Preparing PNG…"
                : unlockedPng
                  ? "Download PNG photo"
                  : "Sign in & pay · PNG"}
            </button>
            <button
              type="button"
              disabled={!!busy}
              onClick={() => void downloadPdf()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[var(--line)] bg-white px-4 py-3.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--grad-a)] disabled:opacity-60"
            >
              {busy === "pdf"
                ? "Preparing PDF…"
                : unlockedPdf
                  ? "Download PDF"
                  : "Sign in & pay · PDF"}
            </button>
            <Link
              href="/pricing"
              className="flex w-full items-center justify-center rounded-2xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--ink-soft)]"
            >
              View full price table
            </Link>
          </div>

          {error && (
            <p className="mt-3 text-xs font-medium text-red-600">{error}</p>
          )}

          <ul className="mt-6 space-y-2 text-xs text-[var(--ink-soft)]">
            <li>• Free: watermarked preview only</li>
            <li>• Paid: clean PNG / PDF after sign-in</li>
            <li>• Custom design costs more — and looks uniquely yours</li>
          </ul>

          <div className="mt-5">
            <TemplateOrCustomize
              compact
              themeName={invite.styleLabel}
              format="invitation-card"
              faith={invite.faithLabel}
              languages={languageMeta[invite.language].label}
            />
          </div>
        </aside>
      </div>

      <AuthPaywallModal
        open={paywall}
        onClose={() => setPaywall(false)}
        themeId={themeId}
        themeName={invite.styleLabel}
        format="invitation-card"
        initialIntent={intent}
        onUnlocked={() => setError(null)}
      />
    </div>
  );
}
