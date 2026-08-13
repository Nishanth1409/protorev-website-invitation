"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * First-party showcase of Protorev custom website invitation craft.
 * Hosted on this site so phone/laptop previews actually render
 * (external Canva links cannot be embedded in iframes).
 */
export function OpeningBlessingInvite() {
  return (
    <div className="min-h-full bg-[#F7F0E4] text-[#3D2415]">
      {/* Opening cover */}
      <section
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(184,134,11,0.18), transparent 55%), linear-gradient(180deg, #2A1010 0%, #4A1818 45%, #1A0808 100%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <Image
            src="/art/cards/temple-gold.png"
            alt=""
            fill
            className="object-cover opacity-40"
            sizes="390px"
            priority
          />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#E8C56A]">
            Opening blessing
          </p>
          <p
            className="mt-6 invite-blessing text-2xl text-[#F7F0E4]"
            lang="hi"
          >
            ॐ शुभ विवाह
          </p>
          <p className="invite-meta mt-3 text-[11px] tracking-[0.22em] text-[#D4AF6A]">
            Shri Ganeshaya Namaha
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-[#E8C56A] to-transparent" />
          <p className="invite-script mt-8 text-xl text-[#E8C56A]">
            The wedding of
          </p>
          <h1 className="invite-name mt-3 text-3xl leading-tight text-[#F7F0E4]">
            Ananya
          </h1>
          <p className="invite-script my-1 text-lg text-[#E8C56A]">&</p>
          <h1 className="invite-name text-3xl leading-tight text-[#F7F0E4]">
            Arjun
          </h1>
          <p className="mt-8 text-sm tracking-[0.18em] text-[#E8C56A]/90">
            14 · 11 · 2026
          </p>
          <p className="mt-2 text-xs text-white/55">Bengaluru</p>
        </div>
      </section>

      {/* Blessing */}
      <section className="px-6 py-14 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
          With blessings
        </p>
        <p className="invite-blessing mx-auto mt-5 max-w-sm text-lg leading-relaxed text-[#6B1E2A]">
          Two souls. One sacred fire. One lifelong vow under divine grace.
        </p>
        <div className="relative mx-auto mt-8 h-28 w-40 overflow-hidden rounded-full ring-1 ring-[#B8860B]/40">
          <Image
            src="/motifs/diyas.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      </section>

      {/* Events */}
      <section className="border-t border-[#E4D9C8] bg-[#F8F3EA] px-6 py-12">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
          Celebrations
        </p>
        <ul className="mx-auto mt-6 max-w-sm space-y-4">
          {[
            { title: "Mehendi", date: "12 Nov · 4:00 PM" },
            { title: "Haldi", date: "13 Nov · 10:00 AM" },
            { title: "Vivah Ceremony", date: "14 Nov · 6:30 PM" },
            { title: "Reception", date: "15 Nov · 7:00 PM" },
          ].map((e) => (
            <li
              key={e.title}
              className="flex items-center justify-between border-b border-[#E4D9C8] pb-3"
            >
              <span className="invite-name text-sm text-[#3D2415]">
                {e.title}
              </span>
              <span className="text-[11px] text-[#8B6914]">{e.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Venue */}
      <section className="px-6 py-12 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8B6914]">
          Venue
        </p>
        <h2 className="invite-name mt-4 text-xl text-[#3D2415]">
          Lotus Courtyard
        </h2>
        <p className="mt-2 text-sm text-[#6B4E3D]">
          The Grand Orchid · Bengaluru
        </p>
      </section>

      {/* Closing */}
      <section
        className="px-6 py-14 text-center"
        style={{
          background:
            "linear-gradient(180deg, #F7F0E4 0%, #2A1010 100%)",
        }}
      >
        <p className="invite-blessing text-lg text-[#6B1E2A]">
          Your presence is our blessing
        </p>
        <p className="mt-8 text-[9px] uppercase tracking-[0.22em] text-[#8B6914]/80">
          Invitation Studio · Protorev Digital
        </p>
      </section>
    </div>
  );
}

/** Lightweight animated hint for standalone page open */
export function OpeningBlessingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-svh"
    >
      <OpeningBlessingInvite />
    </motion.div>
  );
}
