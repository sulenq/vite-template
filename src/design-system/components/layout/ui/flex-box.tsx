// src/design-system/components/layout/ui/flex-box.tsx

import type {
  CenterProps,
  StackProps,
} from "@/design-system/components/layout/types/stack.type";
import {
  Center as ChakraCenter,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
  Spacer as ChakraSpacer,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export const VStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <ChakraVStack ref={ref} align={"stretch"} gap={0} {...props} />;
});

export const HStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <ChakraHStack ref={ref} align={"stretch"} gap={0} {...props} />;
});

export const Spacer = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <ChakraSpacer ref={ref} {...props} />;
});

export const Center = forwardRef<HTMLDivElement, CenterProps>((props, ref) => {
  return <ChakraCenter ref={ref} {...props} />;
});
