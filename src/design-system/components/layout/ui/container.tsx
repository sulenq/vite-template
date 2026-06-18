"use client";

import {
  Box as ChakraBox,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
  type BoxProps as ChakraBoxProps,
  type StackProps as ChakraStackProps,
} from "@chakra-ui/react";
import { forwardRef } from "react";

export interface BoxProps extends ChakraBoxProps {}

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <ChakraBox ref={ref} {...props} />;
});

export interface StackProps extends ChakraStackProps {}

export const VStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <ChakraVStack ref={ref} align="stretch" gap={0} {...props} />;
});

export const HStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  return <ChakraHStack ref={ref} align="stretch" gap={0} {...props} />;
});
