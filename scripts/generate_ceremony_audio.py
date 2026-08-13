"""Generate calm ceremonial ambient loops per faith (royalty-free synthesis)."""
from __future__ import annotations

import math
import struct
import wave
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "public" / "audio"
RATE = 22050
DUR = 28.0  # seconds


def env(t: float, dur: float) -> float:
    attack = min(1.0, t / 1.8)
    release = min(1.0, (dur - t) / 2.2)
    return max(0.0, attack * release)


def tone(freq: float, t: float, vib=0.0) -> float:
    if freq <= 0:
        return 0.0
    f = freq * (1.0 + vib * math.sin(2 * math.pi * 0.18 * t))
    # soft additive "instrument"
    return (
        0.55 * math.sin(2 * math.pi * f * t)
        + 0.25 * math.sin(2 * math.pi * f * 2 * t)
        + 0.12 * math.sin(2 * math.pi * f * 3 * t)
        + 0.08 * math.sin(2 * math.pi * f * 0.5 * t)
    )


def write_wav(name: str, samples: list[float]) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    with wave.open(str(path), "w") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        frames = bytearray()
        for s in samples:
            v = max(-1.0, min(1.0, s))
            frames += struct.pack("<h", int(v * 30000))
        w.writeframes(frames)
    return path


def build(root: float, scale_ratios: list[float], tempo: float, warmth: float) -> list[float]:
    n = int(RATE * DUR)
    out = [0.0] * n
    # drone Sa + Pa
    pa = root * 1.5
    melody = [root * r for r in scale_ratios]
    step = max(0.55, tempo)

    for i in range(n):
        t = i / RATE
        e = env(t, DUR)
        # calm drone
        d = 0.22 * tone(root, t, 0.0015) + 0.14 * tone(pa, t, 0.001)
        # soft melody notes cycling
        idx = int(t / step) % len(melody)
        local = t % step
        note_env = math.sin(math.pi * min(1.0, local / step)) ** 1.4
        m = warmth * note_env * tone(melody[idx], t, 0.0025)
        # very soft sparkle
        spark = 0.03 * math.sin(2 * math.pi * (root * 4.0) * t) * (0.5 + 0.5 * math.sin(t * 0.7))
        out[i] = e * (d + m + spark)
    # normalize
    peak = max(abs(x) for x in out) or 1.0
    return [x / peak * 0.85 for x in out]


TRACKS = {
    # soft shehnai-like raga feel (Bhairav-ish calm)
    "hindu-ceremony.wav": (196.0, [1.0, 16 / 15, 5 / 4, 4 / 3, 3 / 2, 8 / 5, 15 / 8], 1.35, 0.18),
    # soft modal / hijaz-inspired calm
    "muslim-ceremony.wav": (174.61, [1.0, 16 / 15, 5 / 4, 45 / 32, 3 / 2, 8 / 5, 15 / 8], 1.5, 0.16),
    # hymn-like major calm
    "christian-ceremony.wav": (261.63, [1.0, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 5 / 3, 15 / 8], 1.7, 0.17),
    # warm shabad-like
    "sikh-ceremony.wav": (185.0, [1.0, 9 / 8, 6 / 5, 4 / 3, 3 / 2, 8 / 5, 9 / 5], 1.45, 0.17),
    # very still / ahimsa calm
    "jain-ceremony.wav": (207.65, [1.0, 9 / 8, 5 / 4, 3 / 2, 5 / 3], 1.9, 0.12),
    # contemporary soft
    "interfaith-ceremony.wav": (220.0, [1.0, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 15 / 8], 1.55, 0.16),
    # south indian soft (shared for regional hindu)
    "kannada-ceremony.wav": (200.0, [1.0, 9 / 8, 5 / 4, 4 / 3, 3 / 2, 27 / 16, 15 / 8], 1.4, 0.17),
    "tamil-ceremony.wav": (192.0, [1.0, 16 / 15, 5 / 4, 4 / 3, 3 / 2, 8 / 5, 15 / 8], 1.42, 0.17),
    "telugu-ceremony.wav": (188.0, [1.0, 9 / 8, 6 / 5, 4 / 3, 3 / 2, 5 / 3, 15 / 8], 1.38, 0.17),
}


def main() -> None:
    for name, (root, ratios, tempo, warmth) in TRACKS.items():
        samples = build(root, ratios, tempo, warmth)
        path = write_wav(name, samples)
        print("wrote", path, "samples", len(samples))


if __name__ == "__main__":
    main()
