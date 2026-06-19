// src/design-system/components/disclosure/ui/dialog.tsx

"use client";

import { useDisclosureContext } from "@/design-system/components/disclosure/ui/disclosure";
import { closeDisclosure } from "@/design-system/components/disclosure/utils/navigation";
import {
  DIALOG_OFFSET_X_VAR,
  DIALOG_OFFSET_Y_VAR,
  updateClickOrigin,
  updateDialogOffset,
  getDialogOffset,
} from "@/design-system/stores/use-dialog-animation-store";
import { Dialog as ChakraDialog } from "@chakra-ui/react";
import { createContext, forwardRef, useContext, useRef } from "react";

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
      <ChakraDialog.Root onEscapeKeyDown={closeDisclosure} {...restProps} />
    </DialogAnimationContext.Provider>
  );
};

const DialogTrigger = forwardRef<HTMLButtonElement, ChakraDialog.TriggerProps>(
  (props, ref) => {
    // Contexts
    const { dKey } = useDisclosureContext();
    const { clickOriginAnimation } = useDialogAnimationContext();

    return (
      <ChakraDialog.Trigger
        ref={ref}
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
    const { dKey } = useDisclosureContext();
    const { clickOriginAnimation } = useDialogAnimationContext();

    // Refs
    const contentRef = useRef<HTMLDivElement>(null);

    return (
      <ChakraDialog.Content
        ref={(node) => {
          contentRef.current = node;

          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        bg={"bg.body"}
        shadow={"md"}
        // tabIndex={-1} memastikan focus-trap selalu punya elemen yang bisa difokus
        tabIndex={-1}
        onAnimationStart={() => {
          if (!clickOriginAnimation || !contentRef.current) return;

          // Hitung offset dari click origin ke viewport center,
          // lalu set CSS var langsung ke element sebelum keyframe jalan
          updateDialogOffset(dKey);
          const { x, y } = getDialogOffset(dKey);
          contentRef.current.style.setProperty(DIALOG_OFFSET_X_VAR, `${x}px`);
          contentRef.current.style.setProperty(DIALOG_OFFSET_Y_VAR, `${y}px`);
        }}
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
