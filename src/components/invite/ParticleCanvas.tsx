"use client";

import { useEffect, useRef } from "react";

type Props = {
  color: string;
  active: boolean;
  mode?: "petals" | "sparks";
};

/** Soft floating petals / lantern sparks — festive but calm. */
export function ParticleCanvas({ color, active, mode = "petals" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const count = mode === "petals" ? 28 : 40;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: mode === "petals" ? 3 + Math.random() * 5 : 0.8 + Math.random() * 1.6,
      s: 0.08 + Math.random() * 0.22,
      a: 0.12 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.25,
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.01,
    }));

    const resize = () => {
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const drawPetal = (x: number, y: number, r: number, rot: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.55, r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        p.y -= p.s * 0.0018;
        p.x += p.drift * 0.0009 + Math.sin(p.y * 8) * 0.0003;
        p.rot += p.spin;
        if (p.y < -0.08) {
          p.y = 1.08;
          p.x = Math.random();
        }
        const x = p.x * window.innerWidth;
        const y = p.y * window.innerHeight;
        if (mode === "petals") {
          drawPetal(x, y, p.r, p.rot, p.a);
        } else {
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.globalAlpha = p.a;
          ctx.arc(x, y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active, color, mode]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-10"
      aria-hidden
    />
  );
}
