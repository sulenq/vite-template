// src/design-system/components/disclosure/ui/disclosure.tsx

"use client";

import { SM_SCREEN_BREAKPOINT } from "@/design-system/chakra/constants/styles";
import { Dialog } from "@/design-system/components/disclosure/ui/dialog";
import { Drawer } from "@/design-system/components/disclosure/ui/drawer";
import { useViewport } from "@/design-system/hooks/use-viewport";
import type { DialogRootProps, DrawerRootProps } from "@chakra-ui/react";

type DisclosureRootProps = {} & (DrawerRootProps | DialogRootProps);

const DisclosureRoot = ({ children, ...props }: DisclosureRootProps) => {
  // Hooks
  const viewport = useViewport();
  const iss = viewport.width < parseInt(SM_SCREEN_BREAKPOINT, 10);

  return iss ? (
    <Drawer.Root placement={"bottom"} {...(props as DrawerRootProps)}>
      {children}
    </Drawer.Root>
  ) : (
    <Dialog.Root
      placement={"center"}
      scrollBehavior={"inside"}
      {...(props as DialogRootProps)}
    >
      {children}
    </Dialog.Root>
  );
};

export const Disclosure = {
  Root: DisclosureRoot,
};
