// src/design-system/components/disclosure/ui/drawer.tsx

"use client";

import { useDisclosureContext } from "@/design-system/components/disclosure/ui/disclosure";
import { Box } from "@/design-system/components/layout/ui/container";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { Drawer as ChakraDrawer } from "@chakra-ui/react";
import { createContext, useContext, useRef, type TouchEvent } from "react";

type GestureMode = "drag" | "scroll" | null;

type DrawerContextValue = {
  placement: ChakraDrawer.RootProps["placement"];
  swipeToDismiss: boolean;
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

const DrawerRoot = (
  props: ChakraDrawer.RootProps & { swipeToDismiss?: boolean },
) => {
  const { close } = useDisclosureContext();

  const placement = props?.placement;

  const swipeToDismiss = props.swipeToDismiss ?? true;

  return (
    <DrawerContext.Provider
      value={{
        placement,
        swipeToDismiss,
      }}
    >
      <ChakraDrawer.Root onEscapeKeyDown={close} {...props} />
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = (props: ChakraDrawer.TriggerProps) => {
  return <ChakraDrawer.Trigger {...props} />;
};

const DrawerBackdrop = (props: ChakraDrawer.BackdropProps) => {
  const { close } = useDisclosureContext();

  return (
    <ChakraDrawer.Backdrop pointerEvents="auto" onClick={close} {...props} />
  );
};

const DrawerPositioner = (props: ChakraDrawer.PositionerProps) => {
  return <ChakraDrawer.Positioner {...props} />;
};

const DrawerContent = (props: ChakraDrawer.ContentProps) => {
  const { children, ...restProps } = props;

  const { close } = useDisclosureContext();
  const { theme } = useThemeStore();
  const { placement, swipeToDismiss } = useDrawerContext();

  const startYRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const offsetYRef = useRef<number>(0);

  const modeRef = useRef<GestureMode>(null);
  const scrollElRef = useRef<HTMLElement | null>(null);

  const contentRef = useRef<HTMLDivElement | null>(null);

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
        close();
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
      rounded={theme.radii.container}
      bg="bg.body"
      {...restProps}
    >
      {swipeToDismiss && (
        <Box
          w="100px"
          h="4px"
          rounded="full"
          bg="bg.muted"
          my={1.5}
          mx="auto"
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
  return <ChakraDrawer.Header {...props} />;
};

const DrawerBody = (props: ChakraDrawer.BodyProps) => {
  return <ChakraDrawer.Body {...props} />;
};

const DrawerFooter = (props: ChakraDrawer.FooterProps) => {
  return <ChakraDrawer.Footer {...props} />;
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
