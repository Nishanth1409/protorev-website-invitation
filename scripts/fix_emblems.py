from pathlib import Path
import re

p = Path(r"D:\Dev\protorev\website-invitation\src\data\invites.ts")
text = p.read_text(encoding="utf-8")
emblems = {
    "hindu": "ॐ",
    "muslim": "☪",
    "christian": "✝",
    "sikh": "☬",
    "jain": "🪷",
    "interfaith": "✧",
}

m = re.search(r"export const invites: WeddingInvite\[\] = \[(.*)\n\];", text, re.S)
if not m:
    raise SystemExit("no array")

body = m.group(1)
# split objects on pattern: slug start
chunks = re.split(r"(?=\n  \{\n    slug:)", body)
fixed_chunks = []
for chunk in chunks:
    if "slug:" not in chunk:
        fixed_chunks.append(chunk)
        continue
    faith_m = re.search(r'faith: "([^"]+)"', chunk)
    faith = faith_m.group(1) if faith_m else "hindu"
    e = emblems.get(faith, "✦")
    if "emblem:" in chunk:
        chunk = re.sub(r'emblem: "[^"]+",', f'emblem: "{e}",', chunk, count=1)
    else:
        chunk = re.sub(
            r"(coverSubtitle:)",
            f'emblem: "{e}",\n    \\1',
            chunk,
            count=1,
        )
    fixed_chunks.append(chunk)

new_body = "".join(fixed_chunks)
text = text[: m.start(1)] + new_body + text[m.end(1) :]
p.write_text(text, encoding="utf-8")

for line in p.read_text(encoding="utf-8").splitlines():
    s = line.strip()
    if s.startswith("slug:") or s.startswith("faith:") or s.startswith("emblem:"):
        print(s)
