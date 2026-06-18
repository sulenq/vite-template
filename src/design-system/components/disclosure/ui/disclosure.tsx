// src/design-system/components/disclosure/ui/disclosure.tsx

"use client";

import type { ButtonProps } from "@/design-system/components/button/types/button.type";
import { IconButton } from "@/design-system/components/button/ui/button";
import type {
  DisclosureBackdropProps,
  DisclosureBodyProps,
  DisclosureCloseTriggerProps,
  DisclosureContentProps,
  DisclosureFooterProps,
  DisclosureHeaderProps,
  DisclosureRootProps,
  DisclosureTriggerProps,
} from "@/design-system/components/disclosure/types/disclosure.type";
import { Dialog } from "@/design-system/components/disclosure/ui/dialog";
import { Drawer } from "@/design-system/components/disclosure/ui/drawer";
import { updateDialogOffset } from "@/design-system/components/disclosure/utils/click-origin";
import { closeDisclosure } from "@/design-system/components/disclosure/utils/navigation";
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import {
  Dialog as ChakraDialog,
  Drawer as ChakraDrawer,
  Portal,
} from "@chakra-ui/react";
import { XIcon } from "lucide-react";
import { useRef } from "react";

const DisclosureRoot = (props: DisclosureRootProps) => {
  // Props
  const {
    children,
    opened = false,
    open,
    close,
    clickOriginAnimation = false,
    ...restProps
  } = props;

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return (
      <Drawer.Root
        open={opened}
        onOpenChange={(e) => {
          if (e.open) {
            open();
          } else {
            close();
          }
        }}
        placement={"bottom"}
        lazyMount
        unmountOnExit
        {...(restProps as ChakraDrawer.RootProps)}
      >
        {children}
      </Drawer.Root>
    );
  }

  return (
    <Dialog.Root
      open={opened}
      onOpenChange={(e) => {
        if (e.open) {
          open();
        } else {
          close();
        }
      }}
      clickOriginAnimation={clickOriginAnimation}
      size={"xs"}
      scrollBehavior={"inside"}
      lazyMount
      unmountOnExit
      {...(restProps as ChakraDialog.RootProps)}
      placement={"center"}
    >
      {children}
    </Dialog.Root>
  );
};

const DisclosureTrigger = (props: DisclosureTriggerProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Trigger {...(props as ChakraDrawer.TriggerProps)} />;
  }

  return <Dialog.Trigger {...(props as ChakraDialog.TriggerProps)} />;
};

const DisclosureBackdrop = (props: DisclosureBackdropProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Backdrop {...(props as ChakraDrawer.BackdropProps)} />;
  }

  return <Dialog.Backdrop {...(props as ChakraDialog.BackdropProps)} />;
};

const DisclosureContent = (props: DisclosureContentProps) => {
  // Props
  const {
    children,
    portalled = true,
    portalRef,
    backdrop = true,
    positionerProps,
    ...restProps
  } = props;

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <Drawer.Positioner {...positionerProps}>
          {backdrop && (
            <Drawer.Backdrop pointerEvents={"auto"} onClick={closeDisclosure} />
          )}

          <Drawer.Content>{children}</Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    );
  }

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <Dialog.Positioner {...positionerProps}>
        {backdrop && (
          <Dialog.Backdrop pointerEvents={"auto"} onClick={closeDisclosure} />
        )}

        <Dialog.Content
          ref={contentRef}
          overflow={"clip"}
          bg={"bg.body"}
          border={"1px solid"}
          borderColor={"border.subtle"}
          transition={"200ms"}
          onAnimationStart={() => {
            if (contentRef.current) {
              updateDialogOffset(contentRef.current);
            }
          }}
          {...restProps}
        >
          {children}
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};

const DisclosureCloseTrigger = (props: DisclosureCloseTriggerProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return (
      <Drawer.CloseTrigger {...(props as ChakraDrawer.CloseTriggerProps)} />
    );
  }

  return <Dialog.CloseTrigger {...(props as ChakraDialog.CloseTriggerProps)} />;
};

const DisclosureCloseButton = (props: ButtonProps) => {
  return (
    <IconButton
      minW={"28px"}
      h={"28px"}
      size={"xs"}
      variant={"subtle"}
      rounded={"full"}
      {...props}
      onClick={closeDisclosure}
    >
      <AppLucideIcon icon={XIcon} />
    </IconButton>
  );
};

const DisclosureHeader = (props: DisclosureHeaderProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Header {...(props as ChakraDrawer.HeaderProps)} />;
  }

  return <Dialog.Header {...(props as ChakraDialog.HeaderProps)} />;
};

const DisclosureBody = (props: DisclosureBodyProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Body {...(props as ChakraDrawer.BodyProps)} />;
  }

  return <Dialog.Body {...(props as ChakraDialog.BodyProps)} />;
};

const DisclosureFooter = (props: DisclosureFooterProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Footer {...(props as ChakraDrawer.FooterProps)} />;
  }
  return <Dialog.Footer {...(props as ChakraDialog.FooterProps)} />;
};

export const Disclosure = {
  Trigger: DisclosureTrigger,
  Root: DisclosureRoot,
  Backdrop: DisclosureBackdrop,
  Content: DisclosureContent,
  CloseTrigger: DisclosureCloseTrigger,
  CloseButton: DisclosureCloseButton,
  Header: DisclosureHeader,
  Body: DisclosureBody,
  Footer: DisclosureFooter,
};
