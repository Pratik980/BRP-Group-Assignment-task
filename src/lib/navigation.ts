/** Scroll to a section by id (hash without #), offset for fixed navbar. */
const NAV_SCROLL_OFFSET = 120;

export function scrollToSection(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior });
    }
  });
}

export function ventureSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
