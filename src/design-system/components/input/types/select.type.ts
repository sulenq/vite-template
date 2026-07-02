// src/design-system/components/input/types/select.type.ts

import type { SelectRootProps } from "@chakra-ui/react";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  selectOptions: SelectOption[];
  placeholder?: string;
  width?: string | number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
} & Omit<SelectRootProps, "value" | "onValueChange" | "collection">;
