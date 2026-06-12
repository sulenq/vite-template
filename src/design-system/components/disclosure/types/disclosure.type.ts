// src/design-system/components/disclosure/types/disclosure.type.ts

import {
  Dialog as ChakraDialog,
  Drawer as ChakraDrawer,
} from "@chakra-ui/react";

export type DisclosureRootProps = {} & (
  | ChakraDrawer.RootProps
  | ChakraDialog.RootProps
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
