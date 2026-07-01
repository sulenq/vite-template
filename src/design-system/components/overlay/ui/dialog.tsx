// src/design-system/components/overlay/ui/dialog.tsx

"use client";

import {
  DIALOG_OFFSET_X_VAR,
  DIALOG_OFFSET_Y_VAR,
  getDialogOffset,
  updateClickOrigin,
  updateDialogOffset,
} from "@/design-system/components/overlay/stores/use-dialog-animation-store";
import {
  registerFullscreenAnimator,
  unregisterFullscreenAnimator,
} from "@/design-system/components/overlay/utils/fullscreen-animation-registry";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { Dialog as ChakraDialog } from "@chakra-ui/react";
import { createContext, useContext, useLayoutEffect, useRef } from "react";

// -----------------------------------------------------------------

export type DialogContextValue = {
  modalKey: string;
  size: ChakraDialog.RootProps["size"];
  dialogClickOriginAnimation: boolean;
  fullscreen: boolean;
  onClose?: () => void;
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
  modalKey?: string;
  onClose?: () => void;
  fullscreen?: boolean;
  dialogClickOriginAnimation?: boolean;
}

// -----------------------------------------------------------------

const DialogRoot = (props: DialogRootProps) => {
  // Props
  const {
    modalKey = "dialog",
    size = "xs",
    dialogClickOriginAnimation = false,
    fullscreen = false,
    onClose,
    ...restProps
  } = props;

  return (
    <DialogContext.Provider
      value={{
        modalKey,
        size,
        dialogClickOriginAnimation,
        fullscreen,
        onClose,
      }}
    >
      <ChakraDialog.Root size={size} onEscapeKeyDown={onClose} {...restProps} />
    </DialogContext.Provider>
  );
};

const DialogTrigger = (props: ChakraDialog.TriggerProps) => {
  // Contexts
  const { modalKey, dialogClickOriginAnimation } = useDialogContext();

  return (
    <ChakraDialog.Trigger
      asChild
      onPointerDown={
        dialogClickOriginAnimation
          ? (e) => {
              updateClickOrigin(modalKey, e.currentTarget);
            }
          : undefined
      }
      {...props}
    />
  );
};

const DialogBackdrop = (props: ChakraDialog.BackdropProps) => {
  // Contexts
  const { onClose } = useDialogContext();

  return (
    <ChakraDialog.Backdrop
      pointerEvents={"auto"}
      onClick={onClose}
      {...props}
    />
  );
};

const DialogPositioner = (props: ChakraDialog.PositionerProps) => {
  return <ChakraDialog.Positioner {...props} />;
};

const DialogContent = (props: ChakraDialog.ContentProps) => {
  // Contexts
  const { modalKey, fullscreen, size, dialogClickOriginAnimation } =
    useDialogContext();

  // Store
  const { theme } = useThemeStore();

  // Refs
  const contentRef = useRef<HTMLDivElement>(null);

  // Derived Values
  const isFullscreen = fullscreen || size === "full";

  useLayoutEffect(() => {
    let currentAnimation: Animation | null = null;

    registerFullscreenAnimator(modalKey, (next) => {
      const el = contentRef.current;
      if (!el) return;

      // cancel fullscreen animation
      // currentAnimation?.cancel();

      currentAnimation = el.animate(
        next
          ? [
              {
                filter: "blur(5px)",
                transform: "scale(0.96)",
              },
              {
                filter: "blur(0px)",
                transform: "scale(1)",
              },
            ]
          : [
              {
                filter: "blur(5px)",
                transform: "scale(1.04)",
              },
              {
                filter: "blur(0px)",
                transform: "scale(1)",
              },
            ],
        {
          duration: 300,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      );

      currentAnimation.onfinish = () => {
        currentAnimation?.cancel();
        currentAnimation = null;
      };
    });

    return () => {
      currentAnimation?.cancel();
      unregisterFullscreenAnimator(modalKey);
    };
  }, [modalKey]);

  return (
    <ChakraDialog.Content
      ref={contentRef}
      overflow={"clip"}
      bg={"bg.canvas"}
      shadow={"md"}
      border={"1px solid"}
      borderColor={"shadowLine"}
      rounded={isFullscreen ? 0 : theme.radii.container}
      onAnimationStart={() => {
        if (!contentRef.current) return;
        updateDialogOffset(modalKey);
        const { x, y } = getDialogOffset(modalKey);
        contentRef.current.style.setProperty(DIALOG_OFFSET_X_VAR, `${x}px`);
        contentRef.current.style.setProperty(DIALOG_OFFSET_Y_VAR, `${y}px`);
      }}
      {...props}
      _open={{
        animation: dialogClickOriginAnimation
          ? "scale-up-overshoot-from-click-origin"
          : "scale-up-overshoot",
        animationDuration: "slower",
      }}
      _closed={{
        animation: dialogClickOriginAnimation
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
  return <ChakraDialog.Header p={4} {...props} />;
};

const DialogBody = (props: ChakraDialog.BodyProps) => {
  return <ChakraDialog.Body p={4} {...props} />;
};

const DialogFooter = (props: ChakraDialog.FooterProps) => {
  return <ChakraDialog.Footer justifyContent={"stretch"} p={4} {...props} />;
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
