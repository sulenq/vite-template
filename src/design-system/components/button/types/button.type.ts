// src/design-system/components/button/types/button.type.ts

import type {
  ButtonProps as ChakraButtonProps,
  IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react";

export interface ButtonProps extends ChakraButtonProps {}

export interface IconButtonProps extends ButtonProps, ChakraIconButtonProps {}
