// src/shared/utils/data/file.ts

export function isImageFile(mimeType?: string): boolean {
  return mimeType?.startsWith("image/") ?? false;
}
