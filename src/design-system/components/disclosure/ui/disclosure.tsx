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
import {
  updateClickOrigin,
  updateDialogOffset,
} from "@/design-system/components/disclosure/utils/click-origin";
import { back } from "@/design-system/components/disclosure/utils/navigation";
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
    portalled = true,
    portalRef,
    backdrop = true,
    ...restProps
  } = props;

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return (
      <Drawer.Root
        open={opened}
        placement={"bottom"}
        lazyMount
        unmountOnExit
        {...(restProps as ChakraDrawer.RootProps)}
      >
        <Portal disabled={!portalled} container={portalRef}>
          {backdrop && <Drawer.Backdrop />}

          <Drawer.Content>{children}</Drawer.Content>
        </Portal>
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
      lazyMount
      unmountOnExit
      size={"xs"}
      placement={"center"}
      scrollBehavior={"inside"}
      {...(restProps as ChakraDialog.RootProps)}
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

  return (
    <Dialog.Trigger
      {...(props as ChakraDialog.TriggerProps)}
      onPointerDown={(event) => {
        updateClickOrigin(event.currentTarget);
      }}
    />
  );
};

const DisclosureBackdrop = (props: DisclosureBackdropProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Dialog.Backdrop {...(props as ChakraDialog.BackdropProps)} />;
  }

  return <Drawer.Backdrop {...(props as ChakraDrawer.BackdropProps)} />;
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
        {backdrop && <Drawer.Backdrop />}
        <Drawer.Content>{children}</Drawer.Content>
      </Portal>
    );
  }

  return (
    <Portal disabled={!portalled} container={portalRef}>
      {backdrop && (
        <Dialog.Backdrop
          pointerEvents={"auto"}
          onClick={() => {
            back();
          }}
        />
      )}

      <Dialog.Positioner {...positionerProps}>
        <Dialog.Content
          ref={contentRef}
          bg={"bg.body"}
          shadow={"md"}
          onAnimationStart={() => {
            if (contentRef.current) {
              updateDialogOffset();
            }
          }}
          _open={{
            animation: "scale-up-overshoot-from-click-origin",
            animationDuration: "slowest",
          }}
          _closed={{
            animation: "scale-down-to-click-origin",
            animationDuration: "moderate",
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
    <DisclosureCloseTrigger asChild position={"static"}>
      <IconButton size={"xs"} variant={"subtle"} rounded={"full"} {...props}>
        <AppLucideIcon icon={XIcon} />
      </IconButton>
    </DisclosureCloseTrigger>
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
