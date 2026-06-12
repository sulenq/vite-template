"use client";

import {
  HStack as ChakraHStack,
  VStack as ChakraVStack,
  Box as ChakraBox,
  type StackProps as ChakraStackProps,
  type BoxProps as ChakraBoxProps,
} from "@chakra-ui/react";

export interface BoxProps extends ChakraBoxProps {}

export const Box = (props: BoxProps) => {
  return <ChakraBox {...props} />;
};

export interface StackProps extends ChakraStackProps {}

export function VStack(props: StackProps) {
  return <ChakraVStack align={"stretch"} gap={0} {...props} />;
}

export function HStack(props: StackProps) {
  return <ChakraHStack align={"stretch"} gap={0} {...props} />;
}
