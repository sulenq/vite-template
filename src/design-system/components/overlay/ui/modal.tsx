// src/design-system/components/overlay/ui/modal.tsx

"use client";

import type { IconButtonProps } from "@/design-system/components/button/types/button.type";
import { IconButton } from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type { DialogRootProps } from "@/design-system/components/overlay/types/dialog.type";
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
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { type DrawerRootProps } from "@chakra-ui/react";
import { IconX } from "@tabler/icons-react";
import { createContext, useContext, useMemo, useRef } from "react";

export type ModalContextValue = {
  modalKey: string;
  opened: boolean;
  open?: () => void;
  close?: () => void;
  isSmallViewport: boolean;
  initialFocusRef: React.RefObject<HTMLButtonElement | null>;
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

  // Refs
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  const contextValue = useMemo<ModalContextValue>(
    () => ({
      modalKey,
      opened,
      open,
      close,
      isSmallViewport,
      initialFocusRef,
    }),
    [modalKey, opened, open, close, isSmallViewport],
  );
  return (
    <ModalContext.Provider value={contextValue}>
      {isSmallViewport ? (
        <Drawer.Root
          modalKey={modalKey}
          opened={opened}
          open={open}
          close={close}
          size={size as DrawerRootProps["size"]}
          swipeToDismiss={drawerSwipeToDismiss}
          {...restProps}
          placement={drawerPlacement}
          initialFocusEl={() => initialFocusRef.current}
        >
          {children}
        </Drawer.Root>
      ) : (
        <Dialog.Root
          modalKey={modalKey}
          opened={opened}
          open={open}
          close={close}
          clickOriginAnimation={dialogClickOriginAnimation}
          size={size as DialogRootProps["size"]}
          {...restProps}
          initialFocusEl={() => initialFocusRef.current}
        >
          {children}
        </Dialog.Root>
      )}
    </ModalContext.Provider>
  );
};

const ModalTrigger = (props: ModalTriggerProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Trigger asChild {...props} />;
  }

  return <Dialog.Trigger asChild {...props} />;
};

const ModalBackdrop = (props: ModalBackdropProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Backdrop {...props} />;
  }

  return <Dialog.Backdrop {...props} />;
};

const ModalContent = (props: ModalContentProps) => {
  const { isSmallViewport, initialFocusRef } = useModalContext();

  const sentinel = (
    <button
      ref={initialFocusRef}
      type={"button"}
      tabIndex={-1}
      aria-hidden
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );

  if (isSmallViewport) {
    return (
      <Drawer.Content {...props}>
        {sentinel}
        {props.children}
      </Drawer.Content>
    );
  }

  return (
    <Dialog.Content {...props}>
      {sentinel}
      {props.children}
    </Dialog.Content>
  );
};

const ModalCloseTrigger = (props: ModalCloseTriggerProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.CloseTrigger asChild {...props} pos={"static"} />;
  }

  return <Dialog.CloseTrigger asChild {...props} pos={"static"} />;
};

const ModalCloseButton = (props: IconButtonProps) => {
  return (
    <Modal.CloseTrigger>
      <IconButton
        size={"2xs"}
        variant={"subtle"}
        bg={"an1"}
        rounded={"full"}
        {...props}
      >
        <AppTablerIcon icon={IconX} boxSize={4} />
      </IconButton>
    </Modal.CloseTrigger>
  );
};

const ModalHeader = (props: ModalHeaderProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Header {...props} />;
  }

  return <Dialog.Header {...props} />;
};

const ModalBody = (props: ModalBodyProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

  if (isSmallViewport) {
    return <Drawer.Body {...props} />;
  }

  return <Dialog.Body {...props} />;
};

const ModalFooter = (props: ModalFooterProps) => {
  // Contexts
  const { isSmallViewport } = useModalContext();

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
  CloseTrigger: ModalCloseTrigger,
  CloseButton: ModalCloseButton,
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
};
