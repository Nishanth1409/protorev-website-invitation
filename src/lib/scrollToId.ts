/** Smooth-scroll to an element by id and sync the URL hash. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  if (typeof history !== "undefined") {
    const next = `#${id}`;
    if (window.location.hash !== next) {
      history.pushState(null, "", next);
    } else {
      history.replaceState(null, "", next);
    }
  }
  return true;
}

/** Handle /#section links when already on the home page (Next.js often skips scroll). */
export function handleHomeHashClick(
  event: { preventDefault: () => void },
  href: string,
) {
  if (!href.startsWith("/#") && !href.startsWith("#")) return;
  const id = href.replace(/^\/?#/, "");
  if (!id) return;
  const onHome =
    typeof window !== "undefined" &&
    (window.location.pathname === "/" || window.location.pathname === "");
  if (!onHome && href.startsWith("/#")) return; // let Next navigate from other pages
  event.preventDefault();
  scrollToId(id);
}
