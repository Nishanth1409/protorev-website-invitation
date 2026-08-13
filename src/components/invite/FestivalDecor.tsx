"use client";

/** Decorative festival ornaments inspired by traditional invitation webs. */

export function LaceToran({ color }: { color: string }) {
  return (
    <svg className="h-7 w-full" viewBox="0 0 400 28" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 8 Q20 22 40 8 T80 8 T120 8 T160 8 T200 8 T240 8 T280 8 T320 8 T360 8 T400 8"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        opacity="0.85"
      />
      <path
        d="M0 14 Q20 26 40 14 T80 14 T120 14 T160 14 T200 14 T240 14 T280 14 T320 14 T360 14 T400 14"
        fill="none"
        stroke={color}
        strokeWidth="1"
        opacity="0.55"
      />
      {Array.from({ length: 11 }).map((_, i) => (
        <circle key={i} cx={20 + i * 36} cy={20} r="2.2" fill={color} opacity="0.7" />
      ))}
    </svg>
  );
}

export function MandalaWatermark({ color }: { color: string }) {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 opacity-[0.07]"
      viewBox="0 0 200 200"
      aria-hidden
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="70" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="50" fill="none" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="30" fill="none" stroke={color} strokeWidth="1" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12;
        const x2 = 100 + Math.cos(a) * 90;
        const y2 = 100 + Math.sin(a) * 90;
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="0.8"
          />
        );
      })}
    </svg>
  );
}

export function HangingHearts({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute right-4 top-2 flex gap-3" aria-hidden>
      {[18, 14, 11].map((size, i) => (
        <svg
          key={i}
          width={size}
          height={size + 18}
          viewBox="0 0 20 38"
          className="invite-swing"
          style={{ animationDelay: `${i * 0.35}s` }}
        >
          <line x1="10" y1="0" x2="10" y2="14" stroke={color} strokeWidth="1" />
          <path
            d="M10 34c-4.5-3.8-8-7.2-8-11.2C2 19.2 5 17 7.8 17c1.5 0 2.8.7 3.2 1.8C11.4 17.7 12.7 17 14.2 17 17 17 20 19.2 20 22.8 20 26.8 16.5 30.2 10 34Z"
            fill={color}
            opacity="0.85"
          />
        </svg>
      ))}
    </div>
  );
}

export function FaithEmblem({
  emblem,
  accent,
}: {
  emblem: string;
  accent: string;
}) {
  return (
    <div
      className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
      style={{
        border: `1.5px solid ${accent}`,
        boxShadow: `0 0 0 6px rgba(255,255,255,0.04), 0 0 30px ${accent}33`,
      }}
    >
      <span className="text-3xl" style={{ color: accent }}>
        {emblem}
      </span>
    </div>
  );
}

export function RitualHands({ accent }: { accent: string }) {
  return (
    <svg className="mx-auto my-6 h-28 w-44" viewBox="0 0 180 110" aria-hidden>
      <ellipse cx="62" cy="70" rx="34" ry="18" fill={accent} opacity="0.2" />
      <ellipse cx="118" cy="62" rx="34" ry="18" fill={accent} opacity="0.35" />
      <path
        d="M30 78c8-18 22-30 38-30 10 0 18 5 22 12 6-10 18-16 30-14 16 3 28 18 32 34"
        fill="none"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="95" cy="58" r="3" fill={accent} />
      <circle cx="108" cy="52" r="2.2" fill={accent} opacity="0.8" />
      <path
        d="M100 40c8-10 22-8 26 2"
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
        opacity="0.7"
      />
    </svg>
  );
}

export function CoupleFigures({ accent, ink }: { accent: string; ink: string }) {
  return (
    <div className="relative mx-auto my-6 flex h-36 w-56 items-end justify-center gap-6" aria-hidden>
      {/* Groom */}
      <svg width="70" height="120" viewBox="0 0 70 120">
        <circle cx="35" cy="22" r="12" fill={ink} opacity="0.85" />
        <path d="M18 48c4-10 30-10 34 0l6 52H12l6-52Z" fill={accent} opacity="0.55" />
        <path d="M22 55c6-4 20-4 26 0" stroke={ink} strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M28 70h14" stroke={ink} strokeWidth="1.2" opacity="0.4" />
      </svg>
      {/* Bride */}
      <svg width="78" height="120" viewBox="0 0 78 120">
        <circle cx="39" cy="22" r="12" fill={ink} opacity="0.85" />
        <path d="M14 50c8-12 42-12 50 0l8 50H6l8-50Z" fill={accent} opacity="0.4" />
        <path d="M20 58c10-8 28-8 38 0" stroke={ink} strokeWidth="1.4" fill="none" opacity="0.45" />
        <circle cx="39" cy="48" r="2" fill={accent} />
      </svg>
    </div>
  );
}

export function MonogramSeal({
  monogram,
  accent,
  ink,
}: {
  monogram: string;
  accent: string;
  ink: string;
}) {
  const letters = monogram.slice(0, 2).split("");
  return (
    <div
      className="relative mx-auto my-6 flex h-28 w-28 items-center justify-center rounded-full"
      style={{ border: `2px solid ${ink}`, boxShadow: `0 0 0 6px ${accent}22` }}
    >
      <span className="font-[family-name:var(--font-script)] text-4xl" style={{ color: accent }}>
        {letters[0]}
      </span>
      <span className="mx-1 text-lg" style={{ color: ink }}>
        ❤
      </span>
      <span className="font-[family-name:var(--font-script)] text-4xl" style={{ color: accent }}>
        {letters[1] || letters[0]}
      </span>
      <svg
        className="pointer-events-none absolute -right-3 top-2 h-8 w-8 opacity-70"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          d="M4 14c4-8 12-10 16-4-6 2-10 8-12 12-2-4-4-6-4-8Z"
          fill={accent}
        />
      </svg>
    </div>
  );
}
