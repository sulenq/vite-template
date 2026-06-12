// src/design-system/components/disclosure/ui/disclosure.tsx

"use client";

import { SM_SCREEN_BREAKPOINT } from "@/design-system/chakra/constants/styles";
import type { ButtonProps } from "@/design-system/components/button/types/button.type";
import { IconButton } from "@/design-system/components/button/ui/button";
import type {
  DisclosureBackdropProps,
  DisclosureBodyProps,
  DisclosureFooterProps,
  DisclosureHeaderProps,
  DisclosureRootProps,
} from "@/design-system/components/disclosure/types/disclosure.type";
import { Dialog } from "@/design-system/components/disclosure/ui/dialog";
import { Drawer } from "@/design-system/components/disclosure/ui/drawer";
import { back } from "@/design-system/components/disclosure/utils/navigation";
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { useViewport } from "@/design-system/hooks/use-viewport";
import {
  Dialog as ChakraDialog,
  Drawer as ChakraDrawer,
  DialogBackdrop,
  DialogContent,
  DialogPositioner,
  DrawerContent,
  Portal,
} from "@chakra-ui/react";
import { XIcon } from "lucide-react";

const DisclosureRoot = (props: DisclosureRootProps) => {
  // Props
  const {
    children,
    opened,
    portalled = true,
    portalRef,
    backdrop = true,
    positionerProps,
    contentProps,
    ...restProps
  } = props;

  // Hooks
  const viewport = useViewport();
  const isSmallViewport = viewport.width < parseInt(SM_SCREEN_BREAKPOINT, 10);

  return isSmallViewport ? (
    <Drawer.Root
      open={opened}
      placement={"bottom"}
      lazyMount
      unmountOnExit
      {...(restProps as ChakraDrawer.RootProps)}
    >
      <DrawerContent>{children}</DrawerContent>
    </Drawer.Root>
  ) : (
    <Dialog.Root
      open={opened}
      placement={"center"}
      scrollBehavior={"inside"}
      lazyMount
      unmountOnExit
      {...(restProps as ChakraDialog.RootProps)}
    >
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && <DialogBackdrop />}

        <DialogPositioner {...positionerProps}>
          <DialogContent {...contentProps}>{children}</DialogContent>
        </DialogPositioner>
      </Portal>
    </Dialog.Root>
  );
};

const DisclosureBackdrop = (props: DisclosureBackdropProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Backdrop {...(props as ChakraDrawer.BackdropProps)} />
  ) : (
    <Dialog.Backdrop {...(props as ChakraDialog.BackdropProps)} />
  );
};

const DisclosureCloseButon = (props: ButtonProps) => {
  const { ...restProps } = props;

  return (
    <IconButton onClick={back} {...restProps}>
      <AppLucideIcon icon={XIcon} />
    </IconButton>
  );
};

const DisclosureHeader = (props: DisclosureHeaderProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Header {...(props as ChakraDrawer.HeaderProps)} />
  ) : (
    <Dialog.Header {...(props as ChakraDialog.HeaderProps)} />
  );
};

const DisclosureBody = (props: DisclosureBodyProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Body {...(props as ChakraDrawer.BodyProps)} />
  ) : (
    <Dialog.Body {...(props as ChakraDialog.BodyProps)} />
  );
};

const DisclosureFooter = (props: DisclosureFooterProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Footer {...(props as ChakraDrawer.FooterProps)} />
  ) : (
    <Dialog.Footer {...(props as ChakraDialog.FooterProps)} />
  );
};

export const Disclosure = {
  Root: DisclosureRoot,
  Backdrop: DisclosureBackdrop,
  CloseButton: DisclosureCloseButon,
  Header: DisclosureHeader,
  Body: DisclosureBody,
  Footer: DisclosureFooter,
};
