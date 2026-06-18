// src/design-system/components/button/ui/button.tsx

"use client";

import { forwardRef } from "react";
import {
  Button as ChakraButton,
  IconButton as ChakraIconButton,
} from "@chakra-ui/react";
import { MAIN_BUTTON_SIZE } from "@/design-system/constants/styles";
import type {
  ButtonProps,
  IconButtonProps,
} from "@/design-system/components/button/types/button.type";
import { useThemeStore } from "@/design-system/stores/use-theme-store";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    // Store
    const { theme } = useThemeStore();

    return (
      <ChakraButton
        ref={ref}
        size={MAIN_BUTTON_SIZE}
        variant={"ghost"}
        colorPalette={"neutral"}
        fontWeight={"normal"}
        rounded={theme.radii.component}
        {...props}
      />
    );
  },
);

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function Button(props, ref) {
    // Store
    const { theme } = useThemeStore();

    return (
      <ChakraIconButton
        ref={ref}
        size={MAIN_BUTTON_SIZE}
        variant={"ghost"}
        colorPalette={"neutral"}
        rounded={theme.radii.component}
        {...props}
      />
    );
  },
);
