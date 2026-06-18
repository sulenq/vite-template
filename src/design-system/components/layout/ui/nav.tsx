// src/design-system/components/layout/nav-list.tsx

"use client";

import type { ButtonProps } from "@/design-system/components/button/types/button.type";
import { Button } from "@/design-system/components/button/ui/button";

interface NavItemProps extends ButtonProps {}

export const NavItem = (props: NavItemProps) => {
  // Props
  const { children, ...restProps } = props;

  return (
    <Button justifyContent={"start"} px={2} variant={"ghost"} {...restProps}>
      {children}
    </Button>
  );
};
