"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  collectionMeta,
  collectionOrder,
  flagshipsByGroup,
  getFlagshipCategory,
  getFlagshipMeta,
  type CollectionGroup,
} from "@/data/flagship";
import { getCreateTheme } from "@/data/themes";
import { customizeWhatsAppUrl } from "@/data/contact";
import { getArtDirection } from "@/data/artDirection";
import { PhoneMockup } from "./PhoneMockup";

export function CreateHub() {
  return (
    <main className="bg-[#F4EFE7] pb-24">
      <section className="mx-auto max-w-3xl px-5 pb-14 pt-16 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8B6914]">
          Invitation studio
        </p>
        <h1 className="mt-4 font-display text-[1.85rem] font-semibold leading-[1.12] text-[#1A1210] sm:text-4xl">
          Designs with distinct art direction
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#5C4A42]">
          Demo looks for inspiration. Preview on your phone, then commission a
          design created uniquely for your celebration.
        </p>
      </section>

      <div id="collections" className="mx-auto max-w-xl space-y-24 px-5">
        {collectionOrder.map((group) => (
          <CollectionSection key={group} group={group} />
        ))}
      </div>

      <section className="mx-auto mt-20 max-w-md px-5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
          Custom design
        </p>
        <h2 className="mt-3 font-display text-xl font-semibold">
          Request something bespoke
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#5C4A42]">
          Share your ceremony, culture and story — we compose the invitation.
        </p>
        <a
          href={customizeWhatsAppUrl({})}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white"
        >
          WhatsApp Protorev
        </a>
      </section>
    </main>
  );
}

function CollectionSection({ group }: { group: CollectionGroup }) {
  const items = flagshipsByGroup(group);
  const meta = collectionMeta[group];
  if (!items.length) return null;

  return (
    <section id={group}>
      <div className="mb-12 text-center">
        <h2 className="font-display text-2xl font-semibold text-[#1A1210]">
          {meta.label}
        </h2>
        <p className="mt-2 text-sm text-[#5C4A42]">{meta.blurb}</p>
      </div>
      <div className="space-y-20">
        {items.map((item, i) => (
          <FlagshipCard key={item.id} id={item.id} index={i} />
        ))}
      </div>
    </section>
  );
}

function FlagshipCard({ id, index }: { id: string; index: number }) {
  const theme = getCreateTheme(id);
  const meta = getFlagshipMeta(id);
  const art = getArtDirection(id);
  if (!theme || !meta) return null;

  const category = getFlagshipCategory(id);
  const previewHref = `/create/${theme.id}?faith=${meta.defaultFaith}&langs=en&ready=1`;
  const wa = customizeWhatsAppUrl({
    themeName: meta.title,
    format: theme.format,
  });

  const glow = art?.palette.glow ?? theme.theme.glow;
  const shell = art?.palette.shellDeep ?? theme.theme.bgDeep;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 3) * 0.06 }}
      className="flex flex-col items-center text-center"
    >
      <div
        className="w-full max-w-[320px] rounded-4xl px-3 pb-8 pt-10"
        style={{
          background: `radial-gradient(ellipse at 50% 22%, ${glow}, transparent 55%), linear-gradient(180deg, ${shell}18, transparent 70%)`,
        }}
      >
        <PhoneMockup theme={theme} />
      </div>

      <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B6914]">
        {category}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-[#1A1210]">
        {meta.title}
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#5C4A42]">
        {meta.tagline}
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          href={previewHref}
          className="inline-flex min-h-11 items-center rounded-full bg-[#1A1210] px-6 py-2.5 text-xs font-semibold text-[#F7F4EF]"
        >
          Live Preview
        </Link>
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center rounded-full border border-[#C4B5A0] bg-white/90 px-6 py-2.5 text-xs font-semibold text-[#1A1210]"
        >
          Customize This Design
        </a>
      </div>
    </motion.article>
  );
}
