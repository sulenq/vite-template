import os

DIALOG_CODE = """// src/design-system/components/disclosure/ui/dialog.tsx

"use client";

import { forwardRef, createContext, useContext, useState, useRef } from "react";
import { back } from "@/design-system/components/disclosure/utils/navigation";
import { updateClickOrigin, updateDialogOffset } from "@/design-system/components/disclosure/utils/click-origin";
import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";

export type DialogContextValue = {
  depth: number;
  disableEntranceAnimation: boolean;
  clickOriginAnimation: boolean;
};

export const DialogContext = createContext<DialogContextValue>({
  depth: 0,
  disableEntranceAnimation: false,
  clickOriginAnimation: false,
});

export function useDialogContext() {
  return useContext(DialogContext);
}

export type DialogRootProps = ChakraDialog.RootProps & {
  clickOriginAnimation?: boolean;
};

const DialogRoot = (props: DialogRootProps) => {
  const { clickOriginAnimation = false, ...restProps } = props;
  const parentContext = useContext(DialogContext);
  const depth = parentContext ? parentContext.depth + 1 : 0;

  const [disableEntranceAnimation, setDisableEntranceAnimation] = useState(
    !!props.open || !!props.defaultOpen,
  );

  if (!props.open && disableEntranceAnimation) {
    setDisableEntranceAnimation(false);
  }

  return (
    <DialogContext.Provider value={{ depth, disableEntranceAnimation, clickOriginAnimation }}>
      <ChakraDialog.Root 
        onEscapeKeyDown={back} 
        size={"xs"} 
        scrollBehavior={"inside"} 
        lazyMount 
        unmountOnExit 
        placement={"center"} 
        {...restProps} 
      />
    </DialogContext.Provider>
  );
};

const DialogTrigger = forwardRef<HTMLButtonElement, ChakraDialog.TriggerProps>(
  (props, ref) => {
    const { clickOriginAnimation } = useDialogContext();
    return (
      <ChakraDialog.Trigger 
        ref={ref} 
        onPointerDown={
          clickOriginAnimation
            ? (e) => updateClickOrigin(e.currentTarget)
            : undefined
        }
        {...props} 
      />
    );
  },
);
DialogTrigger.displayName = "DialogTrigger";

const DialogBackdrop = forwardRef<HTMLDivElement, ChakraDialog.BackdropProps>(
  (props, ref) => {
    const { disableEntranceAnimation, depth } = useDialogContext();
    const zIndex = 1400 + depth * 10;
    
    const openStyle = (typeof props._open === "object" && props._open !== null) ? props._open : {};
    const animationDuration = disableEntranceAnimation ? "0s" : (openStyle as { animationDuration?: string }).animationDuration;
    
    return (
      <ChakraDialog.Backdrop
        ref={ref}
        zIndex={zIndex}
        {...props}
        _open={{
          ...openStyle,
          animationDuration,
        }}
      />
    );
  },
);
DialogBackdrop.displayName = "DialogBackdrop";

const DialogPositioner = forwardRef<
  HTMLDivElement,
  ChakraDialog.PositionerProps
>((props, ref) => {
  const { depth } = useDialogContext();
  const zIndex = 1400 + depth * 10 + 1; // Explicitly higher than Backdrop
  return <ChakraDialog.Positioner ref={ref} zIndex={zIndex} {...props} />;
});
DialogPositioner.displayName = "DialogPositioner";

export type DialogContentProps = ChakraDialog.ContentProps & {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
  positionerProps?: ChakraDialog.PositionerProps;
};

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  (props, ref) => {
    const {
      portalled = true,
      portalRef,
      backdrop = true,
      positionerProps,
      ...restProps
    } = props;

    const { disableEntranceAnimation, clickOriginAnimation, depth } = useDialogContext();
    const backdropZIndex = 1400 + depth * 10;
    const positionerZIndex = 1400 + depth * 10 + 1; // Explicitly higher
    const internalRef = useRef<HTMLDivElement>(null);

    const openStyle = (typeof props._open === "object" && props._open !== null) ? props._open : {};
    const closedStyle = (typeof props._closed === "object" && props._closed !== null) ? props._closed : {};

    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && (
          <ChakraDialog.Backdrop
            pointerEvents={"auto"}
            onClick={back}
            zIndex={backdropZIndex}
            _open={{
              animationDuration: disableEntranceAnimation ? "0s" : undefined,
            }}
          />
        )}
        <ChakraDialog.Positioner zIndex={positionerZIndex} {...positionerProps}>
          <ChakraDialog.Content
            ref={(node) => {
              internalRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            bg={"bg.body"}
            shadow={"md"}
            onAnimationStart={(e) => {
              if (internalRef.current) {
                updateDialogOffset(internalRef.current);
              }
              if (props.onAnimationStart) props.onAnimationStart(e);
            }}
            {...restProps}
            _open={{
              animation: clickOriginAnimation
                ? "scale-up-overshoot-from-click-origin"
                : "scale-up-overshoot",
              ...openStyle,
              animationDuration: disableEntranceAnimation
                ? "0s"
                : (openStyle as { animationDuration?: string }).animationDuration || (clickOriginAnimation
                  ? "600ms"
                  : "slowest"),
            }}
            _closed={{
              animation: clickOriginAnimation
                ? "scale-down-to-click-origin"
                : "scale-down",
              ...closedStyle,
              animationDuration: (closedStyle as { animationDuration?: string }).animationDuration || (clickOriginAnimation ? "slower" : "slow"),
            }}
          />
        </ChakraDialog.Positioner>
      </Portal>
    );
  },
);
DialogContent.displayName = "DialogContent";

const DialogCloseTrigger = forwardRef<
  HTMLButtonElement,
  ChakraDialog.CloseTriggerProps
>((props, ref) => {
  return <ChakraDialog.CloseTrigger ref={ref} {...props} />;
});
DialogCloseTrigger.displayName = "DialogCloseTrigger";

const DialogHeader = forwardRef<HTMLHeadingElement, ChakraDialog.TitleProps>(
  (props, ref) => {
    return <ChakraDialog.Title ref={ref} {...props} />;
  },
);
DialogHeader.displayName = "DialogHeader";

const DialogBody = forwardRef<HTMLDivElement, ChakraDialog.BodyProps>(
  (props, ref) => {
    return <ChakraDialog.Body ref={ref} {...props} />;
  },
);
DialogBody.displayName = "DialogBody";

const DialogFooter = forwardRef<HTMLDivElement, ChakraDialog.FooterProps>(
  (props, ref) => {
    return <ChakraDialog.Footer ref={ref} {...props} />;
  },
);
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
"""

DRAWER_CODE = """// src/design-system/components/disclosure/ui/drawer.tsx

"use client";

import { forwardRef, createContext, useContext, useState } from "react";
import { back } from "@/design-system/components/disclosure/utils/navigation";
import { Drawer as ChakraDrawer, Portal } from "@chakra-ui/react";

export type DrawerContextValue = {
  depth: number;
  disableEntranceAnimation: boolean;
};

export const DrawerContext = createContext<DrawerContextValue>({
  depth: 0,
  disableEntranceAnimation: false,
});

export function useDrawerContext() {
  return useContext(DrawerContext);
}

const DrawerRoot = (props: ChakraDrawer.RootProps) => {
  const parentContext = useContext(DrawerContext);
  const depth = parentContext ? parentContext.depth + 1 : 0;

  const [disableEntranceAnimation, setDisableEntranceAnimation] = useState(
    !!props.open || !!props.defaultOpen,
  );

  if (!props.open && disableEntranceAnimation) {
    setDisableEntranceAnimation(false);
  }

  return (
    <DrawerContext.Provider value={{ depth, disableEntranceAnimation }}>
      <ChakraDrawer.Root 
        onEscapeKeyDown={back} 
        placement={"bottom"} 
        lazyMount 
        unmountOnExit 
        {...props} 
      />
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = forwardRef<HTMLButtonElement, ChakraDrawer.TriggerProps>(
  (props, ref) => {
    return <ChakraDrawer.Trigger ref={ref} {...props} />;
  },
);
DrawerTrigger.displayName = "DrawerTrigger";

const DrawerBackdrop = forwardRef<HTMLDivElement, ChakraDrawer.BackdropProps>(
  (props, ref) => {
    const { disableEntranceAnimation, depth } = useDrawerContext();
    const zIndex = 1400 + depth * 10;
    
    const openStyle = (typeof props._open === "object" && props._open !== null) ? props._open : {};
    const animationDuration = disableEntranceAnimation ? "0s" : (openStyle as { animationDuration?: string }).animationDuration;
    
    return (
      <ChakraDrawer.Backdrop
        ref={ref}
        zIndex={zIndex}
        {...props}
        _open={{
          ...openStyle,
          animationDuration,
        }}
      />
    );
  },
);
DrawerBackdrop.displayName = "DrawerBackdrop";

const DrawerPositioner = forwardRef<
  HTMLDivElement,
  ChakraDrawer.PositionerProps
>((props, ref) => {
  const { depth } = useDrawerContext();
  const zIndex = 1400 + depth * 10 + 1; // Explicitly higher than Backdrop
  return <ChakraDrawer.Positioner ref={ref} zIndex={zIndex} {...props} />;
});
DrawerPositioner.displayName = "DrawerPositioner";

export type DrawerContentProps = ChakraDrawer.ContentProps & {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
  positionerProps?: ChakraDrawer.PositionerProps;
};

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  (props, ref) => {
    const {
      portalled = true,
      portalRef,
      backdrop = true,
      positionerProps,
      ...restProps
    } = props;

    const { disableEntranceAnimation, depth } = useDrawerContext();
    const backdropZIndex = 1400 + depth * 10;
    const positionerZIndex = 1400 + depth * 10 + 1; // Explicitly higher
    
    const openStyle = (typeof props._open === "object" && props._open !== null) ? props._open : {};

    return (
      <Portal disabled={!portalled} container={portalRef}>
        {backdrop && (
          <ChakraDrawer.Backdrop
            pointerEvents={"auto"}
            onClick={back}
            zIndex={backdropZIndex}
            _open={{
              animationDuration: disableEntranceAnimation ? "0s" : undefined,
            }}
          />
        )}
        <ChakraDrawer.Positioner zIndex={positionerZIndex} {...positionerProps}>
          <ChakraDrawer.Content
            ref={ref}
            {...restProps}
            _open={{
              ...openStyle,
              animationDuration: disableEntranceAnimation
                ? "0s"
                : (openStyle as { animationDuration?: string }).animationDuration,
            }}
          />
        </ChakraDrawer.Positioner>
      </Portal>
    );
  },
);
DrawerContent.displayName = "DrawerContent";

const DrawerCloseTrigger = forwardRef<
  HTMLButtonElement,
  ChakraDrawer.CloseTriggerProps
>((props, ref) => {
  return <ChakraDrawer.CloseTrigger ref={ref} {...props} />;
});
DrawerCloseTrigger.displayName = "DrawerCloseTrigger";

const DrawerHeader = forwardRef<HTMLDivElement, ChakraDrawer.HeaderProps>(
  (props, ref) => {
    return <ChakraDrawer.Header ref={ref} {...props} />;
  },
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerBody = forwardRef<HTMLDivElement, ChakraDrawer.BodyProps>(
  (props, ref) => {
    return <ChakraDrawer.Body ref={ref} {...props} />;
  },
);
DrawerBody.displayName = "DrawerBody";

const DrawerFooter = forwardRef<HTMLDivElement, ChakraDrawer.FooterProps>(
  (props, ref) => {
    return <ChakraDrawer.Footer ref={ref} {...props} />;
  },
);
DrawerFooter.displayName = "DrawerFooter";

export const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Backdrop: DrawerBackdrop,
  Positioner: DrawerPositioner,
  Content: DrawerContent,
  CloseTrigger: DrawerCloseTrigger,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
};
"""

with open('/home/sulenq/-_-/Works/vite-template/src/design-system/components/disclosure/ui/dialog.tsx', 'w') as f:
    f.write(DIALOG_CODE)

with open('/home/sulenq/-_-/Works/vite-template/src/design-system/components/disclosure/ui/drawer.tsx', 'w') as f:
    f.write(DRAWER_CODE)

