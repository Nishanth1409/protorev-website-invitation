"""Add designStyle + refresh themes for multi-template system; drop parchment/pattern."""
from pathlib import Path
import re

p = Path(r"D:\Dev\protorev\website-invitation\src\data\invites.ts")
text = p.read_text(encoding="utf-8")

# style assignment by slug
styles = {
    "ananya-arjun": ("royal-night", "Royal Night"),
    "divya-karthik-kn": ("festival-bright", "Festival Bright"),
    "meenakshi-arun-ta": ("garden-bloom", "Garden Bloom"),
    "sravani-venkat-te": ("luxe-marble", "Luxe Marble"),
    "priya-rohan-hi": ("festival-bright", "Festival Bright"),
    "ayesha-omar": ("royal-night", "Royal Night"),
    "grace-daniel": ("luxe-marble", "Luxe Marble"),
    "anna-thomas-ml": ("coastal-mist", "Coastal Mist"),
    "harleen-gurpreet": ("modern-clean", "Modern Clean"),
    "riya-kabir": ("garden-bloom", "Garden Bloom"),
    "maya-leo": ("coastal-mist", "Coastal Mist"),
}

# Insert designStyle after regionLabel if missing
for slug, (sid, label) in styles.items():
    # find slug block start
    m = re.search(rf'slug: "{re.escape(slug)}",[\s\S]*?regionLabel: "[^"]+",', text)
    if not m:
        print("missing slug", slug)
        continue
    end = m.end()
    window = text[m.start(): m.start()+500]
    if "designStyle:" in window:
        text = re.sub(
            rf'(slug: "{re.escape(slug)}",[\s\S]*?)designStyle: "[^"]+",\s*styleLabel: "[^"]+",',
            rf'\1designStyle: "{sid}",\n    styleLabel: "{label}",',
            text,
            count=1,
        )
    else:
        text = text[:end] + f'\n    designStyle: "{sid}",\n    styleLabel: "{label}",' + text[end:]
        print("added style", slug, sid)

# Replace theme blocks: remove pattern, rename parchment->surface if needed
# Fix any theme still using parchment
text = text.replace("parchment:", "surface:")

# Remove pattern lines
text = re.sub(r'\n\s*pattern: "[^"]+",', "", text)

# Per-style color overrides for key invites (theme ink/surface must work on light styles)
# Update specific themes for non-night styles to happy bright palettes

palette_by_style = {
    "garden-bloom": dict(
        bg="#FFF5F7", bgDeep="#F8E9EE", accent="#E85A7A", accentSoft="#F7A8B8",
        text="#4A2A32", muted="#8A6570", card="rgba(255,255,255,0.75)",
        border="rgba(232,90,122,0.28)", particle="#E85A7A", glow="rgba(232,90,122,0.18)",
        surface="#FFF8FA", ink="#3D2430", inkSoft="#7A5A64",
    ),
    "modern-clean": dict(
        bg="#FFFFFF", bgDeep="#F4F4F5", accent="#111111", accentSoft="#444444",
        text="#111111", muted="#666666", card="#FFFFFF",
        border="rgba(0,0,0,0.1)", particle="#111111", glow="rgba(0,0,0,0.06)",
        surface="#FFFFFF", ink="#111111", inkSoft="#666666",
    ),
    "coastal-mist": dict(
        bg="#E8F6F4", bgDeep="#D5EFEC", accent="#2A9D8F", accentSoft="#7BCFC4",
        text="#1F3A36", muted="#5F7F7A", card="rgba(255,255,255,0.8)",
        border="rgba(42,157,143,0.28)", particle="#2A9D8F", glow="rgba(42,157,143,0.16)",
        surface="#F3FBFA", ink="#1F3A36", inkSoft="#5F7F7A",
    ),
    "festival-bright": dict(
        bg="#FFF8E8", bgDeep="#2D1B4E", accent="#FF6B35", accentSoft="#FFD166",
        text="#2D1B4E", muted="#6B4F7A", card="#FFFFFF",
        border="rgba(255,107,53,0.35)", particle="#FF6B35", glow="rgba(255,107,53,0.2)",
        surface="#FFF9F0", ink="#2D1B4E", inkSoft="#6B4F7A",
    ),
    "luxe-marble": dict(
        bg="#F7F4EF", bgDeep="#E8E0D4", accent="#B08D57", accentSoft="#D4B896",
        text="#2C241C", muted="#7A6F63", card="rgba(255,255,255,0.7)",
        border="rgba(176,141,87,0.35)", particle="#B08D57", glow="rgba(176,141,87,0.16)",
        surface="#F9F6F1", ink="#2C241C", inkSoft="#7A6F63",
    ),
    "royal-night": dict(
        bg="#1A1030", bgDeep="#0D0818", accent="#D4AF37", accentSoft="#F0D78C",
        text="#F8F4EA", muted="#C9B8A0", card="rgba(255,255,255,0.06)",
        border="rgba(212,175,55,0.35)", particle="#D4AF37", glow="rgba(212,175,55,0.18)",
        surface="#120C22", ink="#F8F4EA", inkSoft="#C9B8A0",
    ),
}

def theme_block(pal: dict) -> str:
    lines = ["    theme: {"]
    for k, v in pal.items():
        lines.append(f'      {k}: "{v}",')
    lines.append("    },")
    return "\n".join(lines)

# Replace each invite's theme based on its designStyle
for slug, (sid, _label) in styles.items():
    pal = palette_by_style[sid]
    # match from theme: { ... },
    pattern = rf'(slug: "{re.escape(slug)}"[\s\S]*?)(    theme: \{{[\s\S]*?\n    \}},)'
    repl = rf"\1{theme_block(pal)}"
    text2, n = re.subn(pattern, repl, text, count=1)
    if n != 1:
        print("theme replace fail", slug, n)
    else:
        text = text2
        print("theme ok", slug, sid)

p.write_text(text, encoding="utf-8")
print("done")
