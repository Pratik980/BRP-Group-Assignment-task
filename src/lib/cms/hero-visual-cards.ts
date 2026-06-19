export type HeroVisualCard = {
  title?: string;
  image?: string;
  bgColor?: string;
};

/** Slot order matches the hexagonal NETWORK_NODES layout in Hero.tsx */
export const DEFAULT_HERO_VISUAL_CARDS: HeroVisualCard[] = [
  { title: "Small Heaven School", image: "/site-assets/shs.webp" },
  { title: "Satin Leaf Investment", image: "/site-assets/satin-leaf.webp" },
  { title: "B.R.P. Ventures", image: "/site-assets/logo-BRP.webp" },
  { title: "BRP Tours & Travels", image: "/site-assets/Brp-tours-and-travel.webp" },
  { title: "Reddot", image: "/site-assets/reddot.webp" },
  { title: "Cloud Axis", image: "" },
];
