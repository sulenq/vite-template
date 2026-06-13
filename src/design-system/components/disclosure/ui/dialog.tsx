// src/design-system/components/disclosure/ui/dialog.tsx

"use client";

import { back } from "@/design-system/components/disclosure/utils/navigation";
import { Dialog as ChakraDialog } from "@chakra-ui/react";

const DialogRoot = (props: ChakraDialog.RootProps) => {
  return <ChakraDialog.Root onEscapeKeyDown={back} {...props} />;
};

const DialogTrigger = (props: ChakraDialog.TriggerProps) => {
  return <ChakraDialog.Trigger {...props} />;
};

const DialogBackdrop = (props: ChakraDialog.BackdropProps) => {
  return <ChakraDialog.Backdrop {...props} />;
};

const DialogPositioner = (props: ChakraDialog.PositionerProps) => {
  return <ChakraDialog.Positioner {...props} />;
};

const DialogContent = (props: ChakraDialog.ContentProps) => {
  return <ChakraDialog.Content {...props} />;
};

const DialogCloseTrigger = (props: ChakraDialog.CloseTriggerProps) => {
  return <ChakraDialog.CloseTrigger {...props} />;
};

const DialogHeader = (props: ChakraDialog.HeaderProps) => {
  return <ChakraDialog.Title {...props} />;
};

const DialogBody = (props: ChakraDialog.BodyProps) => {
  return <ChakraDialog.Body {...props} />;
};

const DialogFooter = (props: ChakraDialog.FooterProps) => {
  return <ChakraDialog.Footer {...props} />;
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
