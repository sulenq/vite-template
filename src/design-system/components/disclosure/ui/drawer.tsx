// src/design-system/components/disclosure/ui/drawer.tsx

"use client";

import { forwardRef } from "react";
import { back } from "@/design-system/components/disclosure/utils/navigation";
import { Drawer as ChakraDrawer } from "@chakra-ui/react";

const DrawerRoot = (props: ChakraDrawer.RootProps) => {
  return <ChakraDrawer.Root onEscapeKeyDown={back} {...props} />;
};

const DrawerTrigger = forwardRef<HTMLButtonElement, ChakraDrawer.TriggerProps>(
  (props, ref) => {
    return <ChakraDrawer.Trigger ref={ref} {...props} />;
  },
);
DrawerTrigger.displayName = "DrawerTrigger";

const DrawerBackdrop = forwardRef<HTMLDivElement, ChakraDrawer.BackdropProps>(
  (props, ref) => {
    return <ChakraDrawer.Backdrop ref={ref} {...props} />;
  },
);
DrawerBackdrop.displayName = "DrawerBackdrop";

const DrawerPositioner = forwardRef<
  HTMLDivElement,
  ChakraDrawer.PositionerProps
>((props, ref) => {
  return <ChakraDrawer.Positioner ref={ref} {...props} />;
});
DrawerPositioner.displayName = "DrawerPositioner";

const DrawerContent = forwardRef<HTMLDivElement, ChakraDrawer.ContentProps>(
  (props, ref) => {
    return <ChakraDrawer.Content ref={ref} {...props} />;
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
