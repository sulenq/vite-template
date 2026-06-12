// src/design-system/components/disclosure/types/disclosure.type.ts

import {
  Dialog as ChakraDialog,
  Drawer as ChakraDrawer,
  type BoxProps,
  type DialogPositionerProps,
} from "@chakra-ui/react";

export interface DisclosureTrigger extends BoxProps {
  dKey: string;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
}

export type DisclosureRootProps = {
  opened?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
  positionerProps?: DialogPositionerProps;
  contentProps?: DisclosureContentProps;
} & (
  | Omit<ChakraDrawer.RootProps, "open">
  | Omit<ChakraDialog.RootProps, "open">
);

export type DisclosureBackdropProps = {} & (
  | ChakraDrawer.BackdropProps
  | ChakraDialog.BackdropProps
);

export type DisclosureContentProps = {} & (
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
