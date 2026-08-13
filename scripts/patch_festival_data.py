"""Patch invites.ts: add festival parchment fields, emblems, extra copy keys."""
from pathlib import Path
import re

p = Path(r"D:\Dev\protorev\website-invitation\src\data\invites.ts")
text = p.read_text(encoding="utf-8")

extra_en = """
  scrollCelebrate: "Scroll to Celebrate With Us",
  meetCouple: "Meet the Couple",
  youAreInvited: "You Are Invited",
  openingTitle: "Shubha Vivaha",
"""
extra_kn = """
  scrollCelebrate: "ನಮ್ಮೊಂದಿಗೆ ಆಚರಿಸಲು ಸ್ಕ್ರಾಲ್ ಮಾಡಿ",
  meetCouple: "ದಂಪತಿಗಳನ್ನು ಭೇಟಿ ಮಾಡಿ",
  youAreInvited: "ನಿಮಗೆ ಆಹ್ವಾನ",
  openingTitle: "ಶುಭವಿವಾಹ",
"""
extra_ta = """
  scrollCelebrate: "கொண்டாட கீழே செல்லவும்",
  meetCouple: "தம்பதியை சந்தியுங்கள்",
  youAreInvited: "நீங்கள் அழைக்கப்படுகிறீர்கள்",
  openingTitle: "சுப திருமணம்",
"""
extra_te = """
  scrollCelebrate: "వేడుకకు క్రిందికి స్క్రోల్ చేయండి",
  meetCouple: "దంపతులను కలవండి",
  youAreInvited: "మీకు ఆహ్వానం",
  openingTitle: "శుభవివాహం",
"""
extra_hi = """
  scrollCelebrate: "उत्सव के लिए नीचे स्क्रॉल करें",
  meetCouple: "दंपति से मिलें",
  youAreInvited: "आप आमंत्रित हैं",
  openingTitle: "शुभ विवाह",
"""
extra_ml = """
  scrollCelebrate: "ആഘോഷിക്കാൻ താഴേക്ക് സ്ക്രോൾ ചെയ്യുക",
  meetCouple: "ദമ്പതികളെ കണ്ടുമുട്ടുക",
  youAreInvited: "നിങ്ങൾ ക്ഷണിക്കപ്പെട്ടിരിക്കുന്നു",
  openingTitle: "ശുഭ വിവാഹം",
"""

# Inject before closing of each copy object (before `};` after seconds)
def inject_copy(block_name: str, extra: str, src: str) -> str:
    # find const xxCopy: InviteCopy = { ... };
    m = re.search(rf"(const {block_name}: InviteCopy = \{{)(.*?)(\n\}});", src, re.S)
    if not m:
        raise SystemExit(f"missing {block_name}")
    body = m.group(2)
    if "scrollCelebrate" in body:
        return src
    body = body.rstrip() + "\n" + extra
    return src[: m.start()] + m.group(1) + body + m.group(3) + src[m.end() :]

text = inject_copy("enCopy", extra_en, text)
text = inject_copy("knCopy", extra_kn, text)
text = inject_copy("taCopy", extra_ta, text)
text = inject_copy("teCopy", extra_te, text)
text = inject_copy("hiCopy", extra_hi, text)
text = inject_copy("mlCopy", extra_ml, text)

# Add parchment + ink to every theme block missing them
theme_patch = re.compile(
    r"(particle: \"#[A-Fa-f0-9]+\",\n\s*glow: \"[^\"]+\",\n)(\s*\},)",
    re.M,
)

def add_parchment(m: re.Match) -> str:
    return (
        m.group(1)
        + "      parchment: \"#FDF8F0\",\n"
        + "      ink: \"#4A2A28\",\n"
        + "      inkSoft: \"#7A5A52\",\n"
        + m.group(2)
    )

if "parchment:" not in text:
    text, n = theme_patch.subn(add_parchment, text)
    print("themes patched", n)
else:
    print("themes already have parchment")

# Add emblem per invite based on faith — insert before theme: or coverSubtitle
# Better: insert after coverSubtitle line

emblems = {
    "hindu": "ॐ",
    "muslim": "☪",
    "christian": "✝",
    "sikh": "☬",
    "jain": "🪷",
    "interfaith": "✧",
}

# For each invite object, if emblem missing, add after faith: line we can use faith field nearby
# Insert before `theme:` when emblem not present in object

parts = []
idx = 0
for m in re.finditer(r"\{\s*slug: \"([^\"]+)\",\s*faith: \"([^\"]+)\"", text):
    pass

# Simpler approach: before every `coverSubtitle:` add emblem if not already in preceding 800 chars
out = []
last = 0
for m in re.finditer(r"\n(\s*)coverSubtitle:", text):
    start = m.start()
    chunk = text[max(0, start - 900) : start]
    out.append(text[last:start])
    if "emblem:" not in chunk:
        faith_m = re.search(r'faith: \"([^\"]+)\"', chunk)
        faith = faith_m.group(1) if faith_m else "hindu"
        indent = m.group(1)
        out.append(f"\n{indent}emblem: \"{emblems.get(faith, '✦')}\",")
    last = start
out.append(text[last:])
text = "".join(out)

p.write_text(text, encoding="utf-8")
print("done")
