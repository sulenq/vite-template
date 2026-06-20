// src/design-system/components/layout/ui/container.tsx

"use client";

import type {
  BoxProps,
  StackProps,
} from "@/design-system/components/layout/types/container.type";
import {
  Box as ChakraBox,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <ChakraBox ref={ref} {...props} />;
});

export const VStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <ChakraVStack ref={ref} align="stretch" gap={0} {...props} />;
});

export const HStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <ChakraHStack ref={ref} align="stretch" gap={0} {...props} />;
});
