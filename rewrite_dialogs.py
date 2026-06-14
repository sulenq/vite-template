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
    return (
      <ChakraDialog.Backdrop
        ref={ref}
        zIndex={zIndex}
        {...props}
        _open={{
          ...(props._open as any),
          animationDuration: disableEntranceAnimation
            ? "0s"
            : (props._open as any)?.animationDuration,
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
  const zIndex = 1400 + depth * 10;
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
    const zIndex = 1400 + depth * 10;
    const internalRef = useRef<HTMLDivElement>(null);

    return (
      <Portal disabled={!portalled} container={portalRef as any}>
        {backdrop && (
          <ChakraDialog.Backdrop
            pointerEvents={"auto"}
            onClick={back}
            zIndex={zIndex}
            _open={{
              animationDuration: disableEntranceAnimation ? "0s" : undefined,
            }}
          />
        )}
        <ChakraDialog.Positioner zIndex={zIndex} {...positionerProps}>
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
              animationDuration: disableEntranceAnimation
                ? "0s"
                : clickOriginAnimation
                  ? "600ms"
                  : "slowest",
              ...(props._open as any),
            }}
            _closed={{
              animation: clickOriginAnimation
                ? "scale-down-to-click-origin"
                : "scale-down",
              animationDuration: clickOriginAnimation ? "slower" : "slow",
              ...(props._closed as any),
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
    return (
      <ChakraDrawer.Backdrop
        ref={ref}
        zIndex={zIndex}
        {...props}
        _open={{
          ...(props._open as any),
          animationDuration: disableEntranceAnimation
            ? "0s"
            : (props._open as any)?.animationDuration,
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
  const zIndex = 1400 + depth * 10;
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
    const zIndex = 1400 + depth * 10;

    return (
      <Portal disabled={!portalled} container={portalRef as any}>
        {backdrop && (
          <ChakraDrawer.Backdrop
            pointerEvents={"auto"}
            onClick={back}
            zIndex={zIndex}
            _open={{
              animationDuration: disableEntranceAnimation ? "0s" : undefined,
            }}
          />
        )}
        <ChakraDrawer.Positioner zIndex={zIndex} {...positionerProps}>
          <ChakraDrawer.Content
            ref={ref}
            {...restProps}
            _open={{
              ...(props._open as any),
              animationDuration: disableEntranceAnimation
                ? "0s"
                : (props._open as any)?.animationDuration,
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

DISCLOSURE_CODE = """// src/design-system/components/disclosure/ui/disclosure.tsx

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
        {...restProps}
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
      {...restProps}
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
"""

with open('/home/sulenq/-_-/Works/vite-template/src/design-system/components/disclosure/ui/dialog.tsx', 'w') as f:
    f.write(DIALOG_CODE)

with open('/home/sulenq/-_-/Works/vite-template/src/design-system/components/disclosure/ui/drawer.tsx', 'w') as f:
    f.write(DRAWER_CODE)

with open('/home/sulenq/-_-/Works/vite-template/src/design-system/components/disclosure/ui/disclosure.tsx', 'w') as f:
    f.write(DISCLOSURE_CODE)

