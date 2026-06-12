// src/design-system/components/button/ui/button.tsx

"use client";

import { forwardRef } from "react";
import {
  Button as ChakraButton,
  IconButton as ChakraIconButton,
} from "@chakra-ui/react";
import { MAIN_BUTTON_SIZE } from "@/design-system/chakra/constants/styles";
import type {
  ButtonProps,
  IconButtonProps,
} from "@/design-system/components/button/types/button.type";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return (
      <ChakraButton
        ref={ref}
        size={MAIN_BUTTON_SIZE}
        colorPalette={"neutral"}
        fontWeight={"normal"}
        {...props}
      />
    );
  },
);

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function Button(props, ref) {
    return (
      <ChakraIconButton
        ref={ref}
        size={MAIN_BUTTON_SIZE}
        colorPalette={"neutral"}
        {...props}
      />
    );
  },
);
