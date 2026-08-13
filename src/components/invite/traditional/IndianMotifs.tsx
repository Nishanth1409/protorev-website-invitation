"use client";

/** Traditional Indian invitation ornaments — regional wedding card art. */

export function MangoToran({ color }: { color: string }) {
  return (
    <svg className="h-8 w-full" viewBox="0 0 400 32" preserveAspectRatio="none" aria-hidden>
      <path
        d="M0 16 Q25 4 50 16 T100 16 T150 16 T200 16 T250 16 T300 16 T350 16 T400 16"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      {Array.from({ length: 13 }).map((_, i) => (
        <g key={i} transform={`translate(${15 + i * 29}, 8)`}>
          <ellipse cx="8" cy="10" rx="7" ry="4" fill={color} opacity="0.75" />
          <path d="M8 14 L8 22" stroke={color} strokeWidth="1" />
          <circle cx="8" cy="6" r="2.5" fill={color} opacity="0.9" />
        </g>
      ))}
    </svg>
  );
}

export function KairiCorner({ color, flip }: { color: string; flip?: "x" | "y" | "xy" }) {
  const scale =
    flip === "x"
      ? "scale(-1,1)"
      : flip === "y"
        ? "scale(1,-1)"
        : flip === "xy"
          ? "scale(-1,-1)"
          : undefined;
  return (
    <svg
      className="h-16 w-16"
      viewBox="0 0 64 64"
      style={{ transform: scale, transformOrigin: "center" }}
      aria-hidden
    >
      <path
        d="M4 4 C20 4 28 12 32 28 C36 12 44 4 60 4 C44 8 36 16 32 32 C28 16 20 8 4 4 Z"
        fill={color}
        opacity="0.55"
      />
      <path
        d="M8 8 C18 10 24 16 28 28 C24 18 18 12 8 10 Z"
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.8"
      />
      <circle cx="32" cy="32" r="3" fill={color} opacity="0.6" />
    </svg>
  );
}

export function KolamCorner({ color, flip }: { color: string; flip?: "x" | "y" | "xy" }) {
  const scale =
    flip === "x"
      ? "scale(-1,1)"
      : flip === "y"
        ? "scale(1,-1)"
        : flip === "xy"
          ? "scale(-1,-1)"
          : undefined;
  return (
    <svg
      className="h-14 w-14"
      viewBox="0 0 56 56"
      style={{ transform: scale, transformOrigin: "center" }}
      aria-hidden
    >
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x = 28 + Math.cos(a) * 18;
        const y = 28 + Math.sin(a) * 18;
        return <circle key={i} cx={x} cy={y} r="2.2" fill={color} opacity="0.7" />;
      })}
      <circle cx="28" cy="28" r="4" fill="none" stroke={color} strokeWidth="1" />
      <path
        d="M28 8 L28 20 M28 36 L28 48 M8 28 L20 28 M36 28 L48 28"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.65"
      />
      <path
        d="M14 14 L22 22 M34 34 L42 42 M42 14 L34 22 M22 34 L14 42"
        stroke={color}
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  );
}

export function TempleGopuram({ color, cream }: { color: string; cream: string }) {
  return (
    <svg className="mx-auto h-14 w-28" viewBox="0 0 112 56" aria-hidden>
      <path d="M56 4 L68 20 L44 20 Z" fill={color} opacity="0.85" />
      <path d="M56 10 L62 18 L50 18 Z" fill={cream} opacity="0.9" />
      <rect x="38" y="20" width="36" height="28" fill={color} opacity="0.7" />
      <rect x="46" y="28" width="8" height="14" fill={cream} opacity="0.35" />
      <rect x="58" y="28" width="8" height="14" fill={cream} opacity="0.35" />
      <path d="M32 48 H80" stroke={color} strokeWidth="2" />
      <path d="M24 52 H88" stroke={color} strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export function BrassLampPair({ color }: { color: string }) {
  return (
    <div className="flex items-end justify-center gap-6" aria-hidden>
      {[0, 1].map((i) => (
        <svg key={i} width="28" height="40" viewBox="0 0 28 40">
          <ellipse cx="14" cy="32" rx="10" ry="4" fill={color} opacity="0.35" />
          <path d="M8 32 C8 22 20 22 20 32" fill={color} opacity="0.55" />
          <path d="M14 18 C18 14 22 18 20 24 C16 26 12 24 14 18" fill={color} opacity="0.85" />
          <ellipse cx="14" cy="16" rx="3" ry="5" fill="#FFB703" opacity="0.9" />
        </svg>
      ))}
    </div>
  );
}

export function IslamicGeometryFrame({ color }: { color: string }) {
  return (
    <svg className="pointer-events-none absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)]" viewBox="0 0 200 280" preserveAspectRatio="none" aria-hidden>
      <rect x="2" y="2" width="196" height="276" fill="none" stroke={color} strokeWidth="1.2" />
      <rect x="8" y="8" width="184" height="264" fill="none" stroke={color} strokeWidth="0.6" opacity="0.6" />
      {Array.from({ length: 12 }).map((_, i) => {
        const t = i / 12;
        return (
          <polygon
            key={i}
            points={`${100 + Math.cos(t * Math.PI * 2) * 88},${140 + Math.sin(t * Math.PI * 2) * 120} ${100 + Math.cos((t + 0.04) * Math.PI * 2) * 92},${140 + Math.sin((t + 0.04) * Math.PI * 2) * 125} ${100 + Math.cos((t + 0.08) * Math.PI * 2) * 88},${140 + Math.sin((t + 0.08) * Math.PI * 2) * 120}`}
            fill={color}
            opacity="0.25"
          />
        );
      })}
    </svg>
  );
}

export function KhandaEmblem({ color, accent }: { color: string; accent: string }) {
  return (
    <svg className="mx-auto h-12 w-12" viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="20" fill="none" stroke={accent} strokeWidth="1.5" />
      <path d="M24 8 V40 M16 16 L32 32 M32 16 L16 32" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="4" fill={accent} />
    </svg>
  );
}

export function RingBorder({ gold, cream }: { gold: string; cream: string }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-2 border-2" style={{ borderColor: gold }} />
      <div className="pointer-events-none absolute inset-4 border" style={{ borderColor: `${gold}88` }} />
      <div className="pointer-events-none absolute inset-6 border" style={{ borderColor: cream, opacity: 0.25 }} />
      <div className="pointer-events-none absolute inset-x-6 top-6 h-px" style={{ background: gold, opacity: 0.5 }} />
      <div className="pointer-events-none absolute inset-x-6 bottom-6 h-px" style={{ background: gold, opacity: 0.5 }} />
    </>
  );
}

export function PaisleySideStrip({ color, side }: { color: string; side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute ${side === "left" ? "left-1" : "right-1"} inset-y-8 w-3 opacity-60`}
      style={{
        background: `repeating-linear-gradient(${side === "left" ? "180deg" : "0deg"}, ${color} 0 6px, transparent 6px 12px)`,
      }}
      aria-hidden
    />
  );
}

export function GaneshaMedallion({ gold, cream }: { gold: string; cream: string }) {
  return (
    <div
      className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full"
      style={{
        border: `2px solid ${gold}`,
        background: `radial-gradient(circle at 50% 30%, ${gold}33, transparent 70%)`,
        color: cream,
      }}
      aria-hidden
    >
      <svg viewBox="0 0 40 40" className="h-10 w-10">
        <ellipse cx="20" cy="22" rx="12" ry="11" fill={gold} opacity="0.35" />
        <circle cx="20" cy="14" r="7" fill={gold} opacity="0.55" />
        <path d="M28 12 C32 8 36 10 34 16" stroke={gold} strokeWidth="1.5" fill="none" />
        <circle cx="17" cy="13" r="1.2" fill={cream} />
        <circle cx="23" cy="13" r="1.2" fill={cream} />
      </svg>
    </div>
  );
}

export function EventMiniRow({
  events,
  gold,
  cream,
}: {
  events: { title: string; dateLabel: string }[];
  gold: string;
  cream: string;
}) {
  const slice = events.slice(0, 3);
  if (slice.length === 0) return null;
  return (
    <div className="mt-3 grid gap-1.5">
      {slice.map((e) => (
        <div
          key={e.title}
          className="flex items-center justify-between rounded border px-2 py-1 text-[8px]"
          style={{ borderColor: `${gold}55`, color: cream }}
        >
          <span>{e.title}</span>
          <span style={{ color: gold }}>{e.dateLabel}</span>
        </div>
      ))}
    </div>
  );
}
