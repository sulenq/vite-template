"use client";

import {
  Stack as ChakraStack,
  HStack as ChakraHStack,
  VStack as ChakraVStack,
  Flex as ChakraFlex,
  type StackProps,
} from "@chakra-ui/react";

// -----------------------------------------------------------------

export function Stack(props: StackProps) {
  // vertical stack align strecth
  return <ChakraStack gap={0} {...props} />;
}

// -----------------------------------------------------------------

export function VStack(props: StackProps) {
  // vertical stack align center
  return <ChakraVStack gap={0} {...props} />;
}

// -----------------------------------------------------------------

export function HStack(props: StackProps) {
  // horizontal stack align center
  return <ChakraHStack gap={0} {...props} />;
}

// -----------------------------------------------------------------

export function Flex(props: StackProps) {
  // horizontal stack align start
  return <ChakraFlex gap={0} {...props} />;
}
