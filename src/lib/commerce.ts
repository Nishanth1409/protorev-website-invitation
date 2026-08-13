"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { PlanId } from "@/data/pricing";
import { getPlan } from "@/data/pricing";

const USER_KEY = "protorev_invite_user_v1";
const USERS_KEY = "protorev_invite_users_db_v1";
const PURCHASES_KEY = "protorev_invite_purchases_v1";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type PurchaseRecord = {
  id: string;
  userId: string;
  planId: PlanId;
  themeId: string;
  amountInr: number;
  createdAt: string;
};

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  emit();
}

function getSnapshot() {
  return JSON.stringify({
    user: readJson<AuthUser | null>(USER_KEY, null),
    purchases: readJson<PurchaseRecord[]>(PURCHASES_KEY, []),
  });
}

function getServerSnapshot() {
  return JSON.stringify({ user: null, purchases: [] });
}

export function useCommerce() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { user, purchases } = useMemo(() => {
    try {
      return JSON.parse(snap) as {
        user: AuthUser | null;
        purchases: PurchaseRecord[];
      };
    } catch {
      return { user: null, purchases: [] as PurchaseRecord[] };
    }
  }, [snap]);

  const registerOrLogin = useCallback(
    (input: { name: string; email: string; phone: string }) => {
      const email = input.email.trim().toLowerCase();
      const phone = input.phone.trim().replace(/\s+/g, "");
      const name = input.name.trim();
      if (!name || !email || !phone) {
        throw new Error("Name, email, and phone are required.");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Enter a valid email address.");
      }
      if (!/^[6-9]\d{9}$/.test(phone.replace(/^\+91/, ""))) {
        // allow +91XXXXXXXXXX or 10-digit Indian mobile
        const digits = phone.replace(/\D/g, "");
        const mobile = digits.length === 12 && digits.startsWith("91")
          ? digits.slice(2)
          : digits;
        if (!/^[6-9]\d{9}$/.test(mobile)) {
          throw new Error("Enter a valid 10-digit Indian mobile number.");
        }
      }

      const users = readJson<AuthUser[]>(USERS_KEY, []);
      const existing = users.find(
        (u) => u.email === email || u.phone.replace(/\D/g, "").endsWith(phone.replace(/\D/g, "").slice(-10)),
      );
      const nextUser: AuthUser = existing
        ? { ...existing, name, email, phone }
        : {
            id: `u_${Date.now()}`,
            name,
            email,
            phone,
            createdAt: new Date().toISOString(),
          };

      const nextUsers = existing
        ? users.map((u) => (u.id === existing.id ? nextUser : u))
        : [...users, nextUser];

      writeJson(USERS_KEY, nextUsers);
      writeJson(USER_KEY, nextUser);
      return nextUser;
    },
    [],
  );

  const logout = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(USER_KEY);
    emit();
  }, []);

  const completePurchase = useCallback(
    (planId: PlanId, themeId: string) => {
      const current = readJson<AuthUser | null>(USER_KEY, null);
      if (!current) throw new Error("Please sign in first.");
      const plan = getPlan(planId);
      if (!plan) throw new Error("Invalid plan.");

      const record: PurchaseRecord = {
        id: `p_${Date.now()}`,
        userId: current.id,
        planId,
        themeId,
        amountInr: plan.priceInr,
        createdAt: new Date().toISOString(),
      };
      const all = readJson<PurchaseRecord[]>(PURCHASES_KEY, []);
      writeJson(PURCHASES_KEY, [record, ...all]);
      return record;
    },
    [],
  );

  const entitlementsForTheme = useCallback(
    (themeId: string) => {
      if (!user) {
        return { png: false, pdf: false, website: false, paid: false };
      }
      const mine = purchases.filter(
        (p) => p.userId === user.id && p.themeId === themeId,
      );
      let png = false;
      let pdf = false;
      let website = false;
      for (const p of mine) {
        const plan = getPlan(p.planId);
        if (!plan) continue;
        png = png || plan.unlocksPng;
        pdf = pdf || plan.unlocksPdf;
        website = website || plan.unlocksWebsite;
      }
      // Complete custom / any custom card also unlocks globally for that user on theme
      return { png, pdf, website, paid: png || pdf || website };
    },
    [user, purchases],
  );

  return {
    user,
    purchases,
    registerOrLogin,
    logout,
    completePurchase,
    entitlementsForTheme,
  };
}

/** Force re-render hook when storage changes from other tabs */
export function useCommerceHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
