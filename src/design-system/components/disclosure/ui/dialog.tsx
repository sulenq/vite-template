// src/design-system/components/disclosure/ui/dialog.tsx

"use client";

import { forwardRef, useRef } from "react";
import { back } from "@/design-system/components/disclosure/utils/navigation";
import { Dialog as ChakraDialog } from "@chakra-ui/react";
import { createContext, useContext } from "react";
import {
  updateClickOrigin,
  updateDialogOffset,
} from "@/design-system/components/disclosure/utils/click-origin";

export type DialogAnimationContextValue = {
  clickOriginAnimation: boolean;
};

export const DialogAnimationContext =
  createContext<DialogAnimationContextValue | null>(null);

export function useDialogAnimationContext() {
  const context = useContext(DialogAnimationContext);

  if (!context) {
    throw new Error(
      "useDialogAnimationContext must be used within Dialog.Root",
    );
  }

  return context;
}

interface DialogRootProps extends ChakraDialog.RootProps {
  clickOriginAnimation?: boolean;
}

const DialogRoot = (props: DialogRootProps) => {
  // Props
  const { clickOriginAnimation = false, ...restProps } = props;

  return (
    <DialogAnimationContext.Provider
      value={{
        clickOriginAnimation,
      }}
    >
      <ChakraDialog.Root onEscapeKeyDown={back} {...restProps} />
    </DialogAnimationContext.Provider>
  );
};

const DialogTrigger = forwardRef<HTMLButtonElement, ChakraDialog.TriggerProps>(
  (props, ref) => {
    // Contexts
    const { clickOriginAnimation } = useDialogAnimationContext();

    return (
      <ChakraDialog.Trigger
        ref={ref}
        onPointerDown={
          clickOriginAnimation
            ? (e) => {
                updateClickOrigin(e.currentTarget);
              }
            : undefined
        }
        {...props}
      />
    );
  },
);

const DialogBackdrop = forwardRef<HTMLDivElement, ChakraDialog.BackdropProps>(
  (props, ref) => {
    return <ChakraDialog.Backdrop ref={ref} {...props} />;
  },
);

const DialogPositioner = forwardRef<
  HTMLDivElement,
  ChakraDialog.PositionerProps
>((props, ref) => {
  return <ChakraDialog.Positioner ref={ref} {...props} />;
});

const DialogContent = forwardRef<HTMLDivElement, ChakraDialog.ContentProps>(
  (props, ref) => {
    // Contexts
    const { clickOriginAnimation } = useDialogAnimationContext();

    // Refs
    const contentRef = useRef<HTMLDivElement>(null);

    return (
      <ChakraDialog.Content
        ref={ref}
        onAnimationStart={() => {
          if (contentRef.current) {
            updateDialogOffset(contentRef.current);
          }
        }}
        bg={"bg.body"}
        shadow={"md"}
        {...props}
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
  },
);

const DialogCloseTrigger = forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>((props, ref) => {
  return <ChakraDialog.CloseTrigger ref={ref} {...props} />;
});

const DialogHeader = forwardRef<HTMLHeadingElement, ChakraDialog.TitleProps>(
  (props, ref) => {
    return <ChakraDialog.Title ref={ref} {...props} />;
  },
);

const DialogBody = forwardRef<HTMLDivElement, ChakraDialog.BodyProps>(
  (props, ref) => {
    return <ChakraDialog.Body ref={ref} {...props} />;
  },
);

const DialogFooter = forwardRef<HTMLDivElement, ChakraDialog.FooterProps>(
  (props, ref) => {
    return <ChakraDialog.Footer ref={ref} {...props} />;
  },
);

DialogTrigger.displayName = "DialogTrigger";
DialogBackdrop.displayName = "DialogBackdrop";
DialogPositioner.displayName = "DialogPositioner";
DialogContent.displayName = "DialogContent";
DialogCloseTrigger.displayName = "DialogCloseTrigger";
DialogHeader.displayName = "DialogHeader";
DialogBody.displayName = "DialogBody";
DialogFooter.displayName = "DialogFooter";

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
