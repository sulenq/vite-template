// src/design-system/components/disclosure/ui/disclosure.tsx

"use client";

import { SM_SCREEN_BREAKPOINT } from "@/design-system/chakra/constants/styles";
import { Dialog } from "@/design-system/components/disclosure/ui/dialog";
import { Drawer } from "@/design-system/components/disclosure/ui/drawer";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { useViewport } from "@/design-system/hooks/use-viewport";
import { Drawer as ChakraDrawer } from "@chakra-ui/react";
import { Dialog as ChakraDialog } from "@chakra-ui/react";

type DisclosureRootProps = {} & (
  | ChakraDrawer.RootProps
  | ChakraDialog.RootProps
);

const DisclosureRoot = ({ children, ...props }: DisclosureRootProps) => {
  // Hooks
  const viewport = useViewport();
  const isSmallViewport = viewport.width < parseInt(SM_SCREEN_BREAKPOINT, 10);

  return isSmallViewport ? (
    <Drawer.Root placement={"bottom"} {...(props as ChakraDrawer.RootProps)}>
      {children}
    </Drawer.Root>
  ) : (
    <Dialog.Root
      placement={"center"}
      scrollBehavior={"inside"}
      {...(props as ChakraDialog.RootProps)}
    >
      {children}
    </Dialog.Root>
  );
};

type DisclosureBackdropProps = {} & (
  | ChakraDrawer.BackdropProps
  | ChakraDialog.BackdropProps
);

const DisclosureBackdrop = ({ ...props }: DisclosureBackdropProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Backdrop {...(props as ChakraDrawer.BackdropProps)} />
  ) : (
    <Dialog.Backdrop {...(props as ChakraDialog.BackdropProps)} />
  );
};

type DisclosureContentProps = {} & (
  | ChakraDrawer.ContentProps
  | ChakraDialog.ContentProps
);

const DisclosureContent = ({ ...props }: DisclosureContentProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Content {...(props as ChakraDrawer.ContentProps)} />
  ) : (
    <Dialog.Content {...(props as ChakraDialog.ContentProps)} />
  );
};

type DisclosureTitleProps = {} & (
  | ChakraDrawer.TitleProps
  | ChakraDialog.TitleProps
);

const DisclosureTitle = ({ ...props }: DisclosureTitleProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Title {...(props as ChakraDrawer.TitleProps)} />
  ) : (
    <Dialog.Title {...(props as ChakraDialog.TitleProps)} />
  );
};

type DisclosureBodyProps = {} & (
  | ChakraDrawer.BodyProps
  | ChakraDialog.BodyProps
);

const DisclosureBody = ({ ...props }: DisclosureBodyProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Body {...(props as ChakraDrawer.BodyProps)} />
  ) : (
    <Dialog.Body {...(props as ChakraDialog.BodyProps)} />
  );
};

type DisclosureFooterProps = {} & (
  | ChakraDrawer.FooterProps
  | ChakraDialog.FooterProps
);

const DisclosureFooter = ({ ...props }: DisclosureFooterProps) => {
  const isSmallViewport = useIsSmallViewport();

  return isSmallViewport ? (
    <Drawer.Footer {...(props as ChakraDrawer.FooterProps)} />
  ) : (
    <Dialog.Footer {...(props as ChakraDialog.FooterProps)} />
  );
};

export const Disclosure = {
  Root: DisclosureRoot,
  Backdrop: DisclosureBackdrop,
  Content: DisclosureContent,
  Title: DisclosureTitle,
  Body: DisclosureBody,
  Footer: DisclosureFooter,
};
