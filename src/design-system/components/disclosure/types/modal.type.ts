// src/design-system/components/disclosure/types/modal.type.ts

import {
  Dialog as ChakraDialog,
  Drawer as ChakraDrawer,
  type DialogPositionerProps,
} from "@chakra-ui/react";

export type PopModalTriggerProps = {
  dKey: string;
} & ModalTriggerProps;

export type ModalRootProps = {
  dKey: string;
  opened: boolean;
  open: () => void;
  close: () => void;
  clickOriginAnimation?: boolean;
} & (
  | Omit<ChakraDrawer.RootProps, "open" | "placement">
  | Omit<ChakraDialog.RootProps, "open" | "placement">
);

export type ModalTriggerProps = {} & (
  | ChakraDrawer.TriggerProps
  | ChakraDialog.TriggerProps
);

export type ModalBackdropProps = {} & (
  | ChakraDrawer.BackdropProps
  | ChakraDialog.BackdropProps
);

export type ModalContentProps = {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
  positionerProps?: DialogPositionerProps;
} & (ChakraDrawer.ContentProps | ChakraDialog.ContentProps);

export type ModalCloseTriggerProps = {} & (
  | ChakraDrawer.ContentProps
  | ChakraDialog.ContentProps
);

export type ModalHeaderProps = {} & (
  | ChakraDrawer.HeaderProps
  | ChakraDialog.HeaderProps
);

export type ModalBodyProps = {} & (
  | ChakraDrawer.BodyProps
  | ChakraDialog.BodyProps
);

export type ModalFooterProps = {} & (
  | ChakraDrawer.FooterProps
  | ChakraDialog.FooterProps
);
