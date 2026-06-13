// src/design-system/components/disclosure/ui/drawer.tsx

"use client";

import { back } from "@/design-system/components/disclosure/utils/navigation";
import { Drawer as ChakraDrawer } from "@chakra-ui/react";

const DrawerRoot = (props: ChakraDrawer.RootProps) => {
  return <ChakraDrawer.Root onEscapeKeyDown={back} {...props} />;
};

const DrawerTrigger = (props: ChakraDrawer.TriggerProps) => {
  return <ChakraDrawer.Trigger {...props} />;
};

const DrawerBackdrop = (props: ChakraDrawer.BackdropProps) => {
  return <ChakraDrawer.Backdrop {...props} />;
};

const DrawerPositioner = (props: ChakraDrawer.PositionerProps) => {
  return <ChakraDrawer.Positioner {...props} />;
};

const DrawerContent = (props: ChakraDrawer.ContentProps) => {
  return <ChakraDrawer.Content {...props} />;
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
