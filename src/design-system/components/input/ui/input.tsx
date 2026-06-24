// src/design-system/components/input/ui/input.tsx

"use client";

import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { Input as ChakraInput } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface InputProps extends ChakraInputProps {}

export const Input = forwardRef<HTMLInputElement, ChakraInputProps>(
  (props, ref) => {
    // Store
    const { theme } = useThemeStore();

    return <ChakraInput rounded={theme.radii.component} ref={ref} {...props} />;
  },
);
