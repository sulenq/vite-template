// src/design-system/components/disclosure/types/disclosure.type.ts

import {
  Dialog as ChakraDialog,
  Drawer as ChakraDrawer,
  type DialogPositionerProps,
} from "@chakra-ui/react";

export type PopDisclosureTriggerProps = {
  dKey: string;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
} & DisclosureTriggerProps;

export type DisclosureRootProps = {
  opened?: boolean;
  open: () => void;
  close: () => void;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
  positionerProps?: DialogPositionerProps;
  contentProps?: DisclosureContentProps;
} & (
  | Omit<ChakraDrawer.RootProps, "open">
  | Omit<ChakraDialog.RootProps, "open">
);

export type DisclosureTriggerProps = {} & (
  | ChakraDrawer.TriggerProps
  | ChakraDialog.TriggerProps
);

export type DisclosureBackdropProps = {} & (
  | ChakraDrawer.BackdropProps
  | ChakraDialog.BackdropProps
);

export type DisclosureContentProps = {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
  positionerProps?: DialogPositionerProps;
} & (ChakraDrawer.ContentProps | ChakraDialog.ContentProps);

export type DisclosureCloseTriggerProps = {} & (
  | ChakraDrawer.ContentProps
  | ChakraDialog.ContentProps
);

export type DisclosureHeaderProps = {} & (
  | ChakraDrawer.HeaderProps
  | ChakraDialog.HeaderProps
);

export type DisclosureBodyProps = {} & (
  | ChakraDrawer.BodyProps
  | ChakraDialog.BodyProps
);

export type DisclosureFooterProps = {} & (
  | ChakraDrawer.FooterProps
  | ChakraDialog.FooterProps
);
