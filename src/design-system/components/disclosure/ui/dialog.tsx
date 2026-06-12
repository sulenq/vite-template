// src/design-system/components/disclosure/ui/dialog.tsx

"use client";

import { back } from "@/design-system/components/disclosure/utils/navigation";
import { Dialog as ChakraDialog } from "@chakra-ui/react";

export const DialogRoot = (props: ChakraDialog.RootProps) => {
  return <ChakraDialog.Root onEscapeKeyDown={back} {...props} />;
};

const DialogContent = (props: ChakraDialog.ContentProps) => {
  return <ChakraDialog.Content {...props} />;
};

const DialogBackdrop = (props: ChakraDialog.BackdropProps) => {
  return <ChakraDialog.Backdrop {...props} />;
};

const DialogTitle = (props: ChakraDialog.TitleProps) => {
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
  Backdrop: DialogBackdrop,
  Title: DialogTitle,
  Body: DialogBody,
  Content: DialogContent,
  Footer: DialogFooter,
};
