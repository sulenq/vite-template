"use client";

import { chakraSystem } from "@/chakra/chakra-system";
import { ChakraProvider } from "@chakra-ui/react";

// -----------------------------------------------------------------

export function ChakraSystemProvider({ children }: React.PropsWithChildren) {
  return <ChakraProvider value={chakraSystem}>{children}</ChakraProvider>;
}
