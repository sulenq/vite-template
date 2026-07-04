// src/design-system/components/overlay/types/dialog.type.ts

import { Dialog as ChakraDialog } from "@chakra-ui/react";

export type DialogRootProps = {
  modalKey: string;
  opened: boolean;
  open: () => void;
  close: () => void;
  clickOriginAnimation?: boolean;
} & Omit<ChakraDialog.RootProps, "open">;

export type DialogContentProps = {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
} & ChakraDialog.ContentProps;
