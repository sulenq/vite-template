// src/design-system/components/disclosure/ui/dialog.tsx

"use client";

import { forwardRef } from "react";
import { back } from "@/design-system/components/disclosure/utils/navigation";
import { Dialog as ChakraDialog } from "@chakra-ui/react";

const DialogRoot = (props: ChakraDialog.RootProps) => {
  return <ChakraDialog.Root onEscapeKeyDown={back} {...props} />;
};

const DialogTrigger = forwardRef<HTMLButtonElement, ChakraDialog.TriggerProps>(
  (props, ref) => {
    return <ChakraDialog.Trigger ref={ref} {...props} />;
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
    return <ChakraDialog.Content ref={ref} {...props} />;
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
