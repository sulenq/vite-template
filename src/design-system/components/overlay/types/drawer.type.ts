import { Drawer as ChakraDrawer } from "@chakra-ui/react";

export type DrawerRootProps = {
  modalKey: string;
  opened: boolean;
  open: () => void;
  close: () => void;
  swipeToDismiss?: boolean;
} & Omit<ChakraDrawer.RootProps, "open">;

export type DrawerContentProps = {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement | null>;
  backdrop?: boolean;
} & ChakraDrawer.ContentProps;
