// src/design-system/components/disclosure/ui/dialog.tsx

"use client";

import { useDisclosureContext } from "@/design-system/components/disclosure/ui/disclosure";
import {
  DIALOG_OFFSET_X_VAR,
  DIALOG_OFFSET_Y_VAR,
  getDialogOffset,
  updateClickOrigin,
  updateDialogOffset,
} from "@/design-system/stores/use-dialog-animation-store";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { Dialog as ChakraDialog } from "@chakra-ui/react";
import { createContext, useContext, useRef } from "react";

// -----------------------------------------------------------------

export type DialogContextValue = {
  clickOriginAnimation: boolean;
};

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialogContext must be used within Dialog.Root");
  }

  return context;
}

interface DialogRootProps extends ChakraDialog.RootProps {
  clickOriginAnimation?: boolean;
}

// -----------------------------------------------------------------

const DialogRoot = (props: DialogRootProps) => {
  // Props
  const { clickOriginAnimation = false, ...restProps } = props;

  // Contexts
  const { close } = useDisclosureContext();

  return (
    <DialogContext.Provider
      value={{
        clickOriginAnimation,
      }}
    >
      <ChakraDialog.Root onEscapeKeyDown={close} {...restProps} />
    </DialogContext.Provider>
  );
};

const DialogTrigger = (props: ChakraDialog.TriggerProps) => {
  // Contexts
  const { dKey } = useDisclosureContext();
  const { clickOriginAnimation } = useDialogContext();

  return (
    <ChakraDialog.Trigger
      onPointerDown={
        clickOriginAnimation
          ? (e) => {
              updateClickOrigin(dKey, e.currentTarget);
            }
          : undefined
      }
      {...props}
    />
  );
};

const DialogBackdrop = (props: ChakraDialog.BackdropProps) => {
  // Contexts
  const { close } = useDisclosureContext();

  return (
    <ChakraDialog.Backdrop pointerEvents={"auto"} onClick={close} {...props} />
  );
};

const DialogPositioner = (props: ChakraDialog.PositionerProps) => {
  return <ChakraDialog.Positioner {...props} />;
};

const DialogContent = (props: ChakraDialog.ContentProps) => {
  // Contexts
  const { dKey, fullscreen } = useDisclosureContext();
  const { clickOriginAnimation } = useDialogContext();

  // Store
  const { theme } = useThemeStore();

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <ChakraDialog.Content
      ref={contentRef}
      overflow={"clip"}
      bg={"bg.canvas"}
      shadow={"md"}
      border={"1px solid"}
      borderColor={"shadowLine"}
      rounded={fullscreen ? 0 : theme.radii.container}
      transition={"200ms"}
      minH={fullscreen ? "full" : 0}
      minW={0}
      {...props}
      onAnimationStart={() => {
        if (!contentRef.current) return;

        updateDialogOffset(dKey);

        const { x, y } = getDialogOffset(dKey);

        contentRef.current.style.setProperty(DIALOG_OFFSET_X_VAR, `${x}px`);

        contentRef.current.style.setProperty(DIALOG_OFFSET_Y_VAR, `${y}px`);
      }}
      _open={{
        animation: clickOriginAnimation
          ? "scale-up-overshoot-from-click-origin"
          : "scale-up-overshoot",
        animationDuration: "slowest",
      }}
      _closed={{
        animation: clickOriginAnimation
          ? "scale-down-to-click-origin"
          : "scale-down",
        animationDuration: "slow",
      }}
    />
  );
};

const DialogCloseTrigger = (props: ChakraDialog.CloseTriggerProps) => {
  return <ChakraDialog.CloseTrigger {...props} />;
};

const DialogHeader = (props: ChakraDialog.TitleProps) => {
  return <ChakraDialog.Title {...props} />;
};

const DialogBody = (props: ChakraDialog.BodyProps) => {
  return <ChakraDialog.Body {...props} />;
};

const DialogFooter = (props: ChakraDialog.FooterProps) => {
  return <ChakraDialog.Footer {...props} />;
};

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Backdrop: DialogBackdrop,
  Positioner: DialogPositioner,
  Content: DialogContent,
  CloseTrigger: DialogCloseTrigger,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
};
