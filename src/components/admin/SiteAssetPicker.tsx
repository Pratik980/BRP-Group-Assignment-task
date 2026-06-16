import { cn } from "@/lib/utils";
import type { SiteAsset } from "@/lib/cms/site-assets";

type SiteAssetPickerProps = {
  assets: SiteAsset[];
  value: string;
  onSelect: (url: string) => void;
  label?: string;
};

export function SiteAssetPicker({
  assets,
  value,
  onSelect,
  label = "Choose from site library",
}: SiteAssetPickerProps) {
  if (assets.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {assets.map((asset) => {
          const selected = value === asset.url;
          return (
            <button
              key={asset.id}
              type="button"
              onClick={() => onSelect(asset.url)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-colors",
                selected
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border/60 hover:bg-muted/50",
              )}
              title={asset.label}
            >
              <img src={asset.url} alt="" className="h-10 w-10 object-contain" />
              <span className="line-clamp-2 text-[9px] leading-tight text-muted-foreground">
                {asset.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
