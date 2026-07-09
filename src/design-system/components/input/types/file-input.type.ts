// src/design-system/components/input/types/file-input.type.ts

import type { AppTablerIconProps } from "@/design-system/components/icon/types/app-icon.type";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface FileInputProps {
  inputProps: UseFormRegisterReturn;
  files?: FileList | File[] | null;
  variant?: FileInputVariant;
  accept?: string;
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
}

export type FileInputVariant = "button" | "dropzone";

export type FileIconProps = AppTablerIconProps & {
  mimeType: string;
};
