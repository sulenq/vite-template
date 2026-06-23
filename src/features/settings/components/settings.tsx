// src/features/settings/components/settings

"use client";

import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";
import type { PopModalTriggerProps } from "@/design-system/components/overlay/types/modal.type";
import { Modal } from "@/design-system/components/overlay/ui/modal";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { SettingsActivePage } from "@/features/settings/components/settings.active-page";
import { SettingsActivePageBody } from "@/features/settings/components/settings.active-page.body";
import { SettingsActivePageHeader } from "@/features/settings/components/settings.active-page.header";
import { SettingsMenuBody } from "@/features/settings/components/settings.menu.body";
import { SettingsMenuHeader } from "@/features/settings/components/settings.menu.header";
import { RootRoute } from "@/routes/-typed";

export const SettingsTrigger = (props: PopModalTriggerProps) => {
  // Props
  const { children, modalKey, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopModal(modalKey);
  const isSmallViewport = useIsSmallViewport();

  return (
    <Modal.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={isSmallViewport ? "full" : "2xl"}
      clickOriginAnimation
      drawerPlacement={"end"}
    >
      <Modal.Trigger {...restProps}>{children}</Modal.Trigger>

      <Modal.Content
        display={"flex"}
        flexDir={"column"}
        overflowY={"auto"}
        maxH={!isSmallViewport ? "600px" : "full"}
      >
        <Modal.Body
          display={"flex"}
          flexDir={"column"}
          overflowY={"auto"}
          p={0}
        >
          <SettingsView />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

const SettingsView = () => {
  // Hooks
  const { activeSettingNavKey } = RootRoute.useSearch();
  const isSmallViewport = useIsSmallViewport();

  // Derived Values
  const shouldShowSettingMenu =
    (isSmallViewport && !activeSettingNavKey) || !isSmallViewport;
  const shouldShowSettingsActivePage =
    (isSmallViewport && activeSettingNavKey) || !isSmallViewport;

  return (
    <HStack flex={1} overflowY={"auto"}>
      {shouldShowSettingMenu && (
        <VStack
          overflowY={"auto"}
          minW={["full", null, "250px"]}
          bg={isSmallViewport ? "bg.canvas" : "bg.body"}
        >
          <SettingsMenuHeader />

          <SettingsMenuBody p={2} />
        </VStack>
      )}

      {shouldShowSettingsActivePage && <SettingsActivePage />}
    </HStack>
  );
};

export const Settings = {
  Trigger: SettingsTrigger,
  MenuHeader: SettingsMenuHeader,
  MenuBody: SettingsMenuBody,
  ActivePageHeader: SettingsActivePageHeader,
  ActivePageBody: SettingsActivePageBody,
};
