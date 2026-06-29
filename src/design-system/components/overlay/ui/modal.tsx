// src/design-system/components/modal/ui/modal.tsx

"use client";

import type { IconButtonProps } from "@/design-system/components/button/types/button.type";
import { IconButton } from "@/design-system/components/button/ui/button";
import type {
  ModalBackdropProps,
  ModalBodyProps,
  ModalCloseTriggerProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalRootProps,
  ModalTriggerProps,
} from "@/design-system/components/overlay/types/modal.type";
import { Dialog } from "@/design-system/components/overlay/ui/dialog";
import { Drawer } from "@/design-system/components/overlay/ui/drawer";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { MODAL_BASE_ZINDEX } from "@/design-system/shared/constants/styles";
import { useIsSmallViewport } from "@/design-system/shared/hooks/use-is-small-viewport";
import { triggerFullscreenAnimation } from "@/design-system/components/overlay/utils/fullscreen-animation-registry";
import { Portal, type DrawerRootProps } from "@chakra-ui/react";
import { IconSquare, IconSquares, IconX } from "@tabler/icons-react";
import { createContext, useContext, useEffect, useState } from "react";

// -----------------------------------------------------------------

export type ModalContextValue = {
  modalKey: string;
  opened: boolean;
  open?: () => void;
  close?: () => void;
  fullscreen: boolean;
  setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModalContext must be used within Modal.Root");
  }

  return context;
}

// -----------------------------------------------------------------

const ModalRoot = (props: ModalRootProps) => {
  // Props
  const {
    children,
    modalKey,
    opened = false,
    open,
    close,
    size = "xs",
    dialogClickOriginAnimation = true,
    drawerPlacement = "bottom",
    drawerSwipeToDismiss = true,
    ...restProps
  } = props;

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  // States
  const [prevViewport, setPrevViewport] = useState(isSmallViewport);
  const [delayedOpened, setDelayedOpened] = useState(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  if (isSmallViewport !== prevViewport) {
    setPrevViewport(isSmallViewport);
    setDelayedOpened(false);
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (opened) {
      const depth = modalKey.split(".").length;
      const delay = depth > 1 ? (depth - 1) * 20 : 50;
      timer = setTimeout(() => {
        setDelayedOpened(true);
      }, delay);
    } else {
      timer = setTimeout(() => {
        setDelayedOpened(false);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [opened, modalKey, isSmallViewport]);

  return (
    <ModalContext.Provider
      value={{
        modalKey,
        opened,
        open,
        close,
        fullscreen,
        setFullscreen,
      }}
    >
      {isSmallViewport ? (
        <Drawer.Root
          modalKey={modalKey}
          open={delayedOpened}
          onClose={close}
          fullscreen={fullscreen}
          size={size as DrawerRootProps["size"]}
          lazyMount
          unmountOnExit
          swipeToDismiss={drawerSwipeToDismiss}
          {...restProps}
          placement={drawerPlacement}
        >
          {children}
        </Drawer.Root>
      ) : (
        <Dialog.Root
          modalKey={modalKey}
          open={delayedOpened}
          onClose={close}
          fullscreen={fullscreen}
          lazyMount
          unmountOnExit
          size={fullscreen ? "full" : size}
          scrollBehavior={"inside"}
          dialogClickOriginAnimation={dialogClickOriginAnimation}
          {...restProps}
          placement={"center"}
        >
          {children}
        </Dialog.Root>
      )}
    </ModalContext.Provider>
  );
};

const ModalTrigger = (props: ModalTriggerProps) => {
  // Contexts
  const { open } = useModalContext();

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Trigger asChild onClick={open} {...props} />;
  }

  return <Dialog.Trigger asChild onClick={open} {...props} />;
};

const ModalBackdrop = (props: ModalBackdropProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Backdrop {...props} />;
  }

  return <Dialog.Backdrop {...props} />;
};

const ModalContent = (props: ModalContentProps) => {
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
  const { modalKey } = useModalContext();
  const isSmallViewport = useIsSmallViewport();

  const zIndex = MODAL_BASE_ZINDEX + modalKey.split(".").length;

  if (isSmallViewport) {
    return (
      <Portal disabled={!portalled} container={portalRef}>
        <Drawer.Positioner zIndex={zIndex} {...positionerProps}>
          {backdrop && <Drawer.Backdrop pointerEvents={"auto"} />}

          <Drawer.Content {...restProps}>{children}</Drawer.Content>
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

const ModalFullscreenButton = (props: IconButtonProps) => {
  // Contexts
  const { modalKey, fullscreen, setFullscreen } = useModalContext();

  return (
    <IconButton
      size={"2xs"}
      variant={"subtle"}
      rounded={"full"}
      onClick={() => {
        const next = !fullscreen;
        triggerFullscreenAnimation(modalKey, next);
        setFullscreen(next);
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

const ModalCloseTrigger = (props: ModalCloseTriggerProps) => {
  // Props
  const { onClick, ...restProps } = props;

  // Contexts
  const { close } = useModalContext();

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return (
      <Drawer.CloseTrigger
        asChild
        {...restProps}
        position={"static"}
        onClick={(event) => {
          close?.();
          onClick?.(event);
        }}
      />
    );
  }

  return (
    <Dialog.CloseTrigger
      asChild
      {...restProps}
      position={"static"}
      onClick={(event) => {
        close?.();
        onClick?.(event);
      }}
    />
  );
};

const ModalCloseButton = (props: IconButtonProps) => {
  return (
    <Modal.CloseTrigger>
      <IconButton size={"2xs"} variant={"subtle"} rounded={"full"} {...props}>
        <AppTablerIcon icon={IconX} boxSize={4} />
      </IconButton>
    </Modal.CloseTrigger>
  );
};

const ModalHeader = (props: ModalHeaderProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Header {...props} />;
  }

  return <Dialog.Header {...props} />;
};

const ModalBody = (props: ModalBodyProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Body {...props} />;
  }

  return <Dialog.Body {...props} />;
};

const ModalFooter = (props: ModalFooterProps) => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  if (isSmallViewport) {
    return <Drawer.Footer {...props} />;
  }
  return <Dialog.Footer {...props} />;
};

export const Modal = {
  Trigger: ModalTrigger,
  Root: ModalRoot,
  Backdrop: ModalBackdrop,
  Content: ModalContent,
  FullscreenButton: ModalFullscreenButton,
  CloseTrigger: ModalCloseTrigger,
  CloseButton: ModalCloseButton,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};
