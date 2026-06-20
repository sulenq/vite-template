// src/design-system/components/layout/ui/divider.tsx

"use client";

import type { BoxProps } from "@/design-system/components/layout/types/container.type";
import { Box } from "@/design-system/components/layout/ui/container";

interface DividerProps extends BoxProps {
  orientation?: "horizontal" | "vertical";
}

export function Divider(props: DividerProps) {
  const { orientation = "horizontal", ...restProps } = props;

  if (orientation === "vertical") {
    return (
      <Box
        w={"1px"}
        h={"full"}
        bg={"border.subtle"}
        flexShrink={0}
        {...restProps}
      />
    );
  }

  return (
    <Box
      h={"1px"}
      w={"full"}
      bg={"border.subtle"}
      flexShrink={0}
      {...restProps}
    />
  );
}
