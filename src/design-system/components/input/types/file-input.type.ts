// src/design-system/components/input/types/file-input.type.ts

import type { UseFormRegisterReturn } from "react-hook-form";

/**
 * Visual variant for the file input trigger.
 * "button"   - a compact button that opens the native file picker.
 * "dropzone" - a full drag-and-drop area (still supports click-to-browse).
 */
export type FileInputVariant = "button" | "dropzone";

export interface FileInputProps {
  /**
   * Spread directly from RHF's register(), e.g. {...register("attachments")}.
   * FileInput does NOT own the file value — the native input stays the
   * single source of truth (uncontrolled), RHF just listens to it.
   */
  inputProps: UseFormRegisterReturn;

  /**
   * Result of watch() for the same field name. Used ONLY to render the
   * file list — it is a read-only mirror, never fed back into the input.
   */
  files?: FileList | File[] | null;

  variant?: FileInputVariant;
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
}
