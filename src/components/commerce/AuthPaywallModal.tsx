"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  formatInr,
  getPlan,
  plansForFormat,
  type PlanId,
  type PricingPlan,
} from "@/data/pricing";
import { useCommerce } from "@/lib/commerce";
import { customizeWhatsAppUrl } from "@/data/contact";

type Props = {
  open: boolean;
  onClose: () => void;
  themeId: string;
  themeName: string;
  format: "invitation-card" | "event-page";
  /** After successful purchase of a download plan */
  onUnlocked?: () => void;
  initialIntent?: "png" | "pdf" | "website" | "custom";
};

type Step = "auth" | "plans" | "pay";

export function AuthPaywallModal({
  open,
  onClose,
  themeId,
  themeName,
  format,
  onUnlocked,
  initialIntent = "png",
}: Props) {
  const { user, registerOrLogin, completePurchase } = useCommerce();
  const [step, setStep] = useState<Step>(user ? "plans" : "auth");
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<PlanId | null>(null);
  const [paying, setPaying] = useState(false);

  const plans = useMemo(() => {
    const list = plansForFormat(format);
    if (initialIntent === "custom") {
      return list.filter((p) => p.kind === "custom");
    }
    if (initialIntent === "pdf") {
      return list.filter((p) => p.unlocksPdf || p.kind === "custom");
    }
    if (initialIntent === "website") {
      return list.filter((p) => p.unlocksWebsite || p.kind === "custom");
    }
    return list.filter((p) => p.unlocksPng || p.kind === "custom");
  }, [format, initialIntent]);

  if (!open) return null;

  const selectedPlan = selected ? getPlan(selected) : null;

  const submitAuth = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      registerOrLogin({ name, email, phone });
      setStep("plans");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    }
  };

  const startPay = (plan: PricingPlan) => {
    if (plan.kind === "custom") {
      window.open(
        customizeWhatsAppUrl({
          themeName,
          format,
        }),
        "_blank",
        "noopener,noreferrer",
      );
      return;
    }
    setSelected(plan.id);
    setStep("pay");
  };

  const confirmPay = async () => {
    if (!selected) return;
    setPaying(true);
    setError(null);
    try {
      // Demo checkout — replace with Razorpay/Stripe when keys are ready
      await new Promise((r) => setTimeout(r, 900));
      completePurchase(selected, themeId);
      onUnlocked?.();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 px-3 pb-3 pt-16 sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] border border-[var(--line)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--grad-a)]">
              {step === "auth"
                ? "Sign in to continue"
                : step === "plans"
                  ? "Choose a plan"
                  : "Secure checkout"}
            </p>
            <h2 className="mt-1 text-xl font-bold text-[var(--ink)]">
              {themeName}
            </h2>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              Downloads unlock only after sign-in and payment. Preview stays
              watermarked until then.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--ink-soft)]"
          >
            Close
          </button>
        </div>

        {step === "auth" && (
          <form onSubmit={submitAuth} className="mt-6 space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--ink-mute)]">
              Full name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--grad-a)]"
                placeholder="Your name"
              />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--ink-mute)]">
              Email ID
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--grad-a)]"
                placeholder="you@email.com"
              />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--ink-mute)]">
              Phone number
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-[var(--ink)] outline-none focus:border-[var(--grad-a)]"
                placeholder="10-digit mobile"
              />
            </label>
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            <button
              type="submit"
              className="pr-gradient-btn w-full rounded-2xl px-4 py-3 text-sm font-semibold"
            >
              Continue
            </button>
            <p className="text-[11px] text-[var(--ink-mute)]">
              We use your details for order confirmation and download access on
              this device.
            </p>
          </form>
        )}

        {step === "plans" && (
          <div className="mt-5 space-y-3">
            {user && (
              <p className="rounded-xl bg-[var(--background)] px-3 py-2 text-xs text-[var(--ink-soft)]">
                Signed in as <strong className="text-[var(--ink)]">{user.name}</strong>{" "}
                · {user.email}
              </p>
            )}
            {plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => startPay(plan)}
                className={`w-full rounded-2xl border p-4 text-left transition hover:border-[var(--grad-a)] ${
                  plan.highlighted
                    ? "border-[var(--grad-a)] bg-[rgba(91,74,255,0.04)]"
                    : "border-[var(--line)] bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[var(--ink)]">
                      {plan.name}
                      {plan.badge && (
                        <span className="ml-2 rounded-full bg-[var(--grad-a)] px-2 py-0.5 text-[10px] font-semibold text-white">
                          {plan.badge}
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-[var(--ink-soft)]">{plan.blurb}</p>
                    <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-[var(--ink-mute)]">
                      {plan.kind === "custom" ? "Custom · message us" : "Template · instant unlock"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--ink)]">
                      {formatInr(plan.priceInr)}
                    </p>
                    {plan.compareAtInr && (
                      <p className="text-xs text-[var(--ink-mute)] line-through">
                        {formatInr(plan.compareAtInr)}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
            <button
              type="button"
              onClick={() => setStep("auth")}
              className="text-xs font-medium text-[var(--grad-a)]"
            >
              Switch account
            </button>
          </div>
        )}

        {step === "pay" && selectedPlan && (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--background)] p-4">
              <p className="text-sm font-bold text-[var(--ink)]">{selectedPlan.name}</p>
              <p className="mt-1 text-xs text-[var(--ink-soft)]">{selectedPlan.blurb}</p>
              <p className="mt-3 text-2xl font-bold text-[var(--ink)]">
                {formatInr(selectedPlan.priceInr)}
              </p>
            </div>
            <p className="text-xs text-[var(--ink-soft)]">
              Secure checkout unlocks clean PNG/PDF downloads for{" "}
              <strong>{themeName}</strong> on this device.
            </p>
            {error && <p className="text-xs font-medium text-red-600">{error}</p>}
            <button
              type="button"
              disabled={paying}
              onClick={() => void confirmPay()}
              className="pr-gradient-btn w-full rounded-2xl px-4 py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              {paying ? "Processing…" : `Pay ${formatInr(selectedPlan.priceInr)} & unlock`}
            </button>
            <button
              type="button"
              onClick={() => setStep("plans")}
              className="w-full text-xs font-medium text-[var(--ink-mute)]"
            >
              ← Back to plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
