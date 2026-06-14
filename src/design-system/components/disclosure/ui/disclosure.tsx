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
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { XIcon } from "lucide-react";
import {
  Drawer as ChakraDrawer,
  Dialog as ChakraDialog,
} from "@chakra-ui/react";

const DisclosureRoot = (props: DisclosureRootProps) => {
  const {
    children,
    opened = false,
    open,
    close,
    clickOriginAnimation = false,
    ...restProps
  } = props;

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
      {...(restProps as ChakraDialog.RootProps)}
    >
      {children}
    </Dialog.Root>
  );
};

const DisclosureTrigger = (props: DisclosureTriggerProps) => {
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Trigger {...props} />;
  }

  return <Dialog.Trigger {...props} />;
};

const DisclosureBackdrop = (props: DisclosureBackdropProps) => {
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Backdrop {...props} />;
  }

  return <Dialog.Backdrop {...props} />;
};

const DisclosureContent = (props: DisclosureContentProps) => {
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Content {...props} />;
  }

  return <Dialog.Content {...props} />;
};

const DisclosureCloseTrigger = (props: DisclosureCloseTriggerProps) => {
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.CloseTrigger {...props} />;
  }

  return <Dialog.CloseTrigger {...props} />;
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
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Header {...props} />;
  }

  return <Dialog.Header {...props} />;
};

const DisclosureBody = (props: DisclosureBodyProps) => {
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Body {...props} />;
  }

  return <Dialog.Body {...props} />;
};

const DisclosureFooter = (props: DisclosureFooterProps) => {
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Footer {...props} />;
  }
  return <Dialog.Footer {...props} />;
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
