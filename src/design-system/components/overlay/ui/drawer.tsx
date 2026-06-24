// src/design-system/components/modal/ui/drawer.tsx

"use client";

import { Box } from "@/design-system/components/layout/ui/container";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { Drawer as ChakraDrawer } from "@chakra-ui/react";
import { createContext, useContext, useRef, type TouchEvent } from "react";

type GestureMode = "drag" | "scroll" | null;

type DrawerContextValue = {
  modalKey: string;
  size: ChakraDrawer.RootProps["size"];
  placement: ChakraDrawer.RootProps["placement"];
  swipeToDismiss: boolean;
  fullscreen: boolean;
  onClose?: () => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawerContext(): DrawerContextValue {
  const ctx = useContext(DrawerContext);

  if (!ctx) {
    throw new Error("useDrawerContext must be used within DrawerRoot");
  }

  return ctx;
}

function getScrollableAncestor(el: HTMLElement | null): HTMLElement | null {
  let current: HTMLElement | null = el;

  while (current) {
    const style = window.getComputedStyle(current);

    const canScroll =
      /(auto|scroll)/.test(style.overflowY) &&
      current.scrollHeight > current.clientHeight;

    if (canScroll) return current;

    current = current.parentElement;
  }

  return null;
}

interface DrawerRootProps extends ChakraDrawer.RootProps {
  modalKey?: string;
  swipeToDismiss?: boolean;
  fullscreen?: boolean;
  onClose?: () => void;
}

const DrawerRoot = (props: DrawerRootProps) => {
  // Props
  const {
    modalKey = "drawer",
    size = "sm",
    placement = "bottom",
    swipeToDismiss = true,
    fullscreen = false,
    onClose,
    ...restProps
  } = props;

  return (
    <DrawerContext.Provider
      value={{
        modalKey,
        size,
        placement,
        swipeToDismiss,
        fullscreen,
        onClose,
      }}
    >
      <ChakraDrawer.Root
        size={size}
        placement={placement}
        onEscapeKeyDown={onClose}
        {...restProps}
      />
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = (props: ChakraDrawer.TriggerProps) => {
  return <ChakraDrawer.Trigger asChild {...props} />;
};

const DrawerBackdrop = (props: ChakraDrawer.BackdropProps) => {
  const { onClose } = useDrawerContext();

  return (
    <ChakraDrawer.Backdrop pointerEvents="auto" onClick={onClose} {...props} />
  );
};

const DrawerPositioner = (props: ChakraDrawer.PositionerProps) => {
  return <ChakraDrawer.Positioner {...props} />;
};

const DrawerContent = (props: ChakraDrawer.ContentProps) => {
  // Props
  const { children, ...restProps } = props;

  // Contexts
  const { onClose, fullscreen, size, placement, swipeToDismiss } =
    useDrawerContext();
  const { theme } = useThemeStore();

  // Refs
  const startYRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);

  const modeRef = useRef<GestureMode>(null);
  const scrollElRef = useRef<HTMLElement | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const rounded = {
    start: {
      roundedRight: theme.radii.container,
    },
    end: {
      roundedLeft: theme.radii.container,
    },
    top: {
      roundedBottom: theme.radii.container,
    },
    bottom: {
      roundedTop: theme.radii.container,
    },
  };

  // Handlers
  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    startYRef.current = event.touches[0].clientY;
    startTimeRef.current = performance.now();

    modeRef.current = null;
    scrollElRef.current = getScrollableAncestor(target);
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    if (!contentRef.current) return;
    if (!swipeToDismiss) return;

    const currentY = event.touches[0].clientY;
    const deltaY = currentY - startYRef.current;

    if (modeRef.current === null) {
      const scrollEl = scrollElRef.current;

      const canScroll =
        scrollEl !== null && scrollEl.scrollTop > 0 && deltaY > 0;

      if (canScroll) {
        modeRef.current = "scroll";
        return;
      }

      modeRef.current = "drag";
    }

    if (modeRef.current === "scroll") return;

    const offset = Math.max(0, deltaY);
    offsetYRef.current = offset;

    contentRef.current.style.transition = "none";
    contentRef.current.style.transform = `translateY(${offset}px)`;
  }

  function handleTouchEnd() {
    if (!contentRef.current) return;
    if (!swipeToDismiss) return;

    const elapsed = performance.now() - startTimeRef.current;
    const velocity = elapsed > 0 ? offsetYRef.current / elapsed : 0;
    const height = contentRef.current.offsetHeight;

    const shouldClose = offsetYRef.current > height * 0.3 || velocity > 0.8;

    contentRef.current.style.transition = "transform 200ms ease";

    if (shouldClose) {
      contentRef.current.style.transform = `translateY(${height}px)`;

      window.setTimeout(() => {
        onClose?.();
      }, 200);
    } else {
      contentRef.current.style.transform = "translateY(0)";
    }

    offsetYRef.current = 0;
    modeRef.current = null;
    scrollElRef.current = null;
  }

  return (
    <ChakraDrawer.Content
      ref={contentRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-placement={placement}
      {...(fullscreen || size === "full"
        ? { rounded: 0 }
        : rounded[placement as keyof typeof rounded])}
      bg={"bg.body"}
      {...restProps}
    >
      {swipeToDismiss && (
        <Box
          w={"80px"}
          h={"4px"}
          rounded={"full"}
          bg={"bg.muted"}
          my={1.5}
          mx={"auto"}
        />
      )}

      {children}
    </ChakraDrawer.Content>
  );
};

const DrawerCloseTrigger = (props: ChakraDrawer.CloseTriggerProps) => {
  return <ChakraDrawer.CloseTrigger {...props} />;
};

const DrawerHeader = (props: ChakraDrawer.HeaderProps) => {
  return <ChakraDrawer.Header p={4} {...props} />;
};

const DrawerBody = (props: ChakraDrawer.BodyProps) => {
  return <ChakraDrawer.Body p={4} {...props} />;
};

const DrawerFooter = (props: ChakraDrawer.FooterProps) => {
  return <ChakraDrawer.Footer justifyContent={"stretch"} p={4} {...props} />;
};

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
