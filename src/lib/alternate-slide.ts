export const slideEase = [0.22, 1, 0.36, 1] as const;

const SLIDE_OFFSET = 72;

type SlideOptions = {
  reduceMotion?: boolean | null;
  margin?: string;
  duration?: number;
};

export function alternateSlideIn(
  index: number,
  { reduceMotion = false, margin = "-80px", duration = 0.85 }: SlideOptions = {},
) {
  const viewport = { once: true, margin } as const;
  const transition = { duration, ease: slideEase } as const;

  if (reduceMotion) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport,
      transition: { ...transition, duration: 0.5 },
    };
  }

  const fromLeft = index % 2 === 0;
  return {
    initial: { opacity: 0, x: fromLeft ? -SLIDE_OFFSET : SLIDE_OFFSET },
    whileInView: { opacity: 1, x: 0 },
    viewport,
    transition,
  };
}

/** Image/text pairs: visual enters from its column side, copy from the opposite. */
export function splitSlideIn(
  index: number,
  part: "visual" | "content",
  { reduceMotion = false, margin = "-80px", duration = 0.85 }: SlideOptions = {},
) {
  const viewport = { once: true, margin } as const;
  const transition = { duration, ease: slideEase } as const;

  if (reduceMotion) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport,
      transition: { ...transition, duration: 0.5 },
    };
  }

  const even = index % 2 === 0;
  const fromLeft = even ? part === "visual" : part === "content";

  return {
    initial: { opacity: 0, x: fromLeft ? -SLIDE_OFFSET : SLIDE_OFFSET },
    whileInView: { opacity: 1, x: 0 },
    viewport,
    transition,
  };
}
