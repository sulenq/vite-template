// src/design-system/components/disclosure/ui/drawer.tsx

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
