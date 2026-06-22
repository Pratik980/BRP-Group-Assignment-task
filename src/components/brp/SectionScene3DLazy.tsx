import { lazy, Suspense, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SectionSceneVariant = "community" | "career";

const FALLBACK_CLASS = "bg-gradient-to-br from-primary/6 via-transparent to-accent/5";

function SectionScene3DFallback({ className }: { className?: string }) {
  return <div className={cn(className, FALLBACK_CLASS)} aria-hidden />;
}

const SectionScene3D = lazy(() =>
  import("./SectionScene3D").then((m) => ({ default: m.SectionScene3D })),
);

export function SectionScene3DLazy({
  variant = "community",
  className,
}: {
  variant?: SectionSceneVariant;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    const run = () => {
      if (!cancelled) setShouldMount(true);
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(run, { timeout: 1400 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    } else {
      const timer = setTimeout(run, 500);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !shouldMount) {
    return <SectionScene3DFallback className={className} />;
  }

  return (
    <Suspense fallback={<SectionScene3DFallback className={className} />}>
      <SectionScene3D variant={variant} className={className} />
    </Suspense>
  );
}
