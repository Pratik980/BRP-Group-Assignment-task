import { MEDIA_MAX_UPLOAD_WIDTH, MEDIA_WEBP_QUALITY } from "@/lib/media/constants";

const SKIP_TYPES = new Set(["image/svg+xml", "image/gif"]);

export async function compressImageForUpload(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || SKIP_TYPES.has(file.type)) {
    return file;
  }

  if (typeof createImageBitmap !== "function" || typeof document === "undefined") {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MEDIA_MAX_UPLOAD_WIDTH / Math.max(bitmap.width, 1));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/webp", MEDIA_WEBP_QUALITY);
    });

    if (!blob || blob.size >= file.size) {
      return file;
    }

    const baseName = file.name.replace(/\.[^.]+$/, "") || "upload";
    return new File([blob], `${baseName}.webp`, { type: "image/webp", lastModified: Date.now() });
  } catch {
    return file;
  }
}
