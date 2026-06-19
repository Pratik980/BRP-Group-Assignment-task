import type { ImgHTMLAttributes } from "react";

type LazyImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** LCP / above-the-fold image — eager load with high fetch priority */
  priority?: boolean;
};

export function LazyImage({ priority = false, loading, decoding, fetchPriority, ...props }: LazyImageProps) {
  return (
    <img
      {...props}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={fetchPriority ?? (priority ? "high" : undefined)}
    />
  );
}
