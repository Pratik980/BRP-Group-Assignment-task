import { cn } from "@/lib/utils";

export type ThemeBackdropVariant = "hero" | "section" | "subtle" | "footer" | "page";

type ThemeBackdropProps = {
  variant?: ThemeBackdropVariant;
  className?: string;
};

/** Shared BRP aurora / gradient layers — keeps pages from looking flat or vacant. */
export function ThemeBackdrop({ variant = "section", className }: ThemeBackdropProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {variant === "hero" && (
        <>
          <div className="absolute inset-0 aurora-bg opacity-30" />
          <div className="absolute -left-16 top-20 h-80 w-80 max-sm:h-52 max-sm:w-52 rounded-full bg-gradient-to-tr from-primary/10 to-accent/15 blur-3xl animate-pulse-glow" />
          <div className="absolute -right-20 top-32 h-96 w-96 max-sm:h-60 max-sm:w-60 rounded-full bg-gradient-to-br from-indigo-500/10 to-sky-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-0 h-64 w-[min(900px,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,oklch(0.42_0.11_275/0.12),transparent_70%)]" />
        </>
      )}

      {variant === "section" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.42_0.11_275/0.07),transparent_72%)]" />
          <div className="absolute -bottom-24 left-1/4 h-72 w-72 max-sm:h-48 max-sm:w-48 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute top-12 right-1/4 h-64 w-64 max-sm:h-44 max-sm:w-44 rounded-full bg-accent/10 blur-3xl" />
        </>
      )}

      {variant === "subtle" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/25 via-transparent to-secondary/20" />
          <div className="absolute inset-0 aurora-bg opacity-[0.18]" />
          <div className="absolute -left-10 bottom-0 h-48 w-48 max-sm:h-32 max-sm:w-32 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-10 top-10 h-56 w-56 max-sm:h-36 max-sm:w-36 rounded-full bg-accent/8 blur-3xl" />
        </>
      )}

      {variant === "footer" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-background to-background" />
          <div className="absolute inset-0 aurora-bg opacity-15" />
          <div className="absolute bottom-0 left-1/2 h-40 w-[min(800px,100%)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,oklch(0.42_0.11_275/0.08),transparent_70%)]" />
        </>
      )}

      {variant === "page" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
          <div className="absolute inset-0 aurora-bg opacity-20" />
          <div className="absolute -left-24 top-32 h-96 w-96 max-sm:h-56 max-sm:w-56 rounded-full bg-primary/6 blur-3xl" />
          <div className="absolute -right-24 top-64 h-80 w-80 max-sm:h-52 max-sm:w-52 rounded-full bg-accent/8 blur-3xl" />
        </>
      )}
    </div>
  );
}
