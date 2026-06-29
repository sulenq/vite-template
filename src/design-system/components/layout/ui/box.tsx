// src/design-system/components/layout/ui/box.tsx

import type { BoxProps } from "@/design-system/components/layout/types/box.type";
import { Box as ChakraBox } from "@chakra-ui/react";
import { forwardRef } from "react";

export const Box = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return <ChakraBox ref={ref} {...props} />;
});
