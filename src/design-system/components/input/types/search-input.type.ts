// src/design-system/components/input/types/search-input.type.ts

import type { InputProps } from "@/design-system/components/input/ui/input";

export interface SearchInputProps extends InputProps {
  queryKey?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}
