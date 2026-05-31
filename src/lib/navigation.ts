/** Scroll to a section by id (hash without #). */
export function scrollToSection(hash: string, behavior: ScrollBehavior = "smooth") {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior, block: "start" });
    }
  });
}

export function ventureSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
