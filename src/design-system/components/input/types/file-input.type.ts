import type { AppTablerIconProps } from "@/design-system/components/icon/types/app-icon.type";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface FileInputExistingItem {
  id: string;
  name: string;
  url?: string;
  mimeType?: string;
  markedForDelete?: boolean;
}

export interface FileInputProps {
  inputProps: UseFormRegisterReturn;
  files?: FileList | File[] | null;
  maxFiles?: number;
  existingFiles?: FileInputExistingItem[];
  onToggleDeleteExisting?: (id: string) => void;

  variant?: FileInputVariant;
  accept?: string;
  disabled?: boolean;
  label?: string;
}

export type FileInputVariant = "button" | "dropzone";

export type FileIconProps = AppTablerIconProps & {
  mimeType: string;
};
