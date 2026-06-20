// src/design-system/components/disclosure/ui/disclosure.tsx

"use client";

import type { IconButtonProps } from "@/design-system/components/button/types/button.type";
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
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { DISCLOSURE_BASE_ZINDEX } from "@/design-system/constants/styles";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import {
  Dialog as ChakraDialog,
  Drawer as ChakraDrawer,
  Portal,
} from "@chakra-ui/react";
import { IconSquare, IconSquares, IconX } from "@tabler/icons-react";
import { createContext, useContext, useEffect, useState } from "react";

// -----------------------------------------------------------------

export type DisclosureContextValue = {
  dKey: string;
  opened: boolean;
  open: () => void;
  close: () => void;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DisclosureContext = createContext<DisclosureContextValue | null>(
  null,
);

export function useDisclosureContext() {
  const context = useContext(DisclosureContext);

  if (!context) {
    throw new Error("useDisclosureContext must be used within Disclosure.Root");
  }

  return context;
}

// -----------------------------------------------------------------

const DisclosureRoot = (props: DisclosureRootProps) => {
  // Props
  const {
    children,
    dKey,
    opened = false,
    open,
    close,
    clickOriginAnimation = false,
    size = "xs",
    ...restProps
  } = props;

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  // States
  const [delayedOpened, setDelayedOpened] = useState(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (opened) {
      const depth = dKey.split(".").length;
      const delay = depth > 1 ? (depth - 1) * 20 : 0;
      timer = setTimeout(() => {
        setDelayedOpened(true);
      }, delay);
    } else {
      timer = setTimeout(() => {
        setDelayedOpened(false);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [opened, dKey]);

  return (
    <DisclosureContext.Provider
      value={{
        dKey,
        opened,
        open,
        close,
        fullscreen,
        setFullscreen,
      }}
    >
      {isSmallViewport ? (
        <Drawer.Root
          open={delayedOpened}
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
      ) : (
        <Dialog.Root
          lazyMount
          unmountOnExit
          open={delayedOpened}
          size={fullscreen ? "full" : size}
          scrollBehavior={"inside"}
          clickOriginAnimation={clickOriginAnimation}
          {...(restProps as ChakraDialog.RootProps)}
          placement={"center"}
        >
          {children}
        </Dialog.Root>
      )}
    </DisclosureContext.Provider>
  );
};

const DisclosureTrigger = (props: DisclosureTriggerProps) => {
  // Contexts
  const { open } = useDisclosureContext();

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return (
      <Drawer.Trigger
        asChild
        onClick={open}
        {...(props as ChakraDrawer.TriggerProps)}
      />
    );
  }

  return (
    <Dialog.Trigger
      asChild
      onClick={open}
      {...(props as ChakraDialog.TriggerProps)}
    />
  );
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

  // Hooks
  const { dKey } = useDisclosureContext();
  const isSmallViewport = useIsSmallViewport();

  const zIndex = DISCLOSURE_BASE_ZINDEX + dKey.split(".").length;

  if (isSmallViewport) {
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <Drawer.Positioner zIndex={zIndex} {...positionerProps}>
          {backdrop && <Drawer.Backdrop pointerEvents={"auto"} />}

          <Drawer.Content>{children}</Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    );
  }

  return (
    <Portal disabled={!portalled} container={portalRef}>
      <Dialog.Positioner zIndex={zIndex} {...positionerProps}>
        {backdrop && <Dialog.Backdrop pointerEvents={"auto"} />}

        <Dialog.Content {...restProps}>{children}</Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
};

const DisclosureFullscreenButton = (props: IconButtonProps) => {
  // Contexts
  const { fullscreen, setFullscreen } = useDisclosureContext();

  return (
    <IconButton
      size={"2xs"}
      variant={"subtle"}
      rounded={"full"}
      onClick={() => {
        setFullscreen((ps) => !ps);
      }}
      {...props}
    >
      <AppTablerIcon
        icon={fullscreen ? IconSquares : IconSquare}
        transform={"scaleX(-1)"}
        boxSize={3.5}
      />
    </IconButton>
  );
};

const DisclosureCloseTrigger = (props: DisclosureCloseTriggerProps) => {
  // Props
  const { onClick, ...restProps } = props;

  // Contexts
  const { close } = useDisclosureContext();

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return (
      <Drawer.CloseTrigger
        asChild
        {...(restProps as ChakraDrawer.CloseTriggerProps)}
        position={"static"}
        onClick={(event) => {
          close();
          onClick?.(event);
        }}
      />
    );
  }

  return (
    <Dialog.CloseTrigger
      asChild
      {...(restProps as ChakraDialog.CloseTriggerProps)}
      position={"static"}
      onClick={(event) => {
        console.log("close clicked");
        close();
        onClick?.(event);
      }}
    />
  );
};

const DisclosureCloseButton = (props: IconButtonProps) => {
  return (
    <Disclosure.CloseTrigger>
      <IconButton size={"2xs"} variant={"subtle"} rounded={"full"} {...props}>
        <AppTablerIcon icon={IconX} boxSize={4} />
      </IconButton>
    </Disclosure.CloseTrigger>
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
  FullscreenButton: DisclosureFullscreenButton,
  CloseTrigger: DisclosureCloseTrigger,
  CloseButton: DisclosureCloseButton,
  Header: DisclosureHeader,
  Body: DisclosureBody,
  Footer: DisclosureFooter,
};
