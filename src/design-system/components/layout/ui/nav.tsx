// src/design-system/components/layout/nav-list.tsx

"use client";

import type { ButtonProps } from "@/design-system/components/button/types/button.type";
import { Button } from "@/design-system/components/button/ui/button";

interface NavProps extends ButtonProps {}

export const Nav = (props: NavProps) => {
  // Props
  const { children, ...restProps } = props;

  return (
    <Button
      justifyContent={"start"}
      gap={3}
      variant={"ghost"}
      px={2}
      {...restProps}
    >
      {children}
    </Button>
  );
};
