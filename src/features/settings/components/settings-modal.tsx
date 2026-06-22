// src/features/settings/components/settings-modal

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import { usePopModal } from "@/design-system/components/overlay/modal/hooks/use-pop-modal";
import type { PopModalTriggerProps } from "@/design-system/components/overlay/modal/types/modal.type";
import { Modal } from "@/design-system/components/overlay/modal/ui/modal";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/p";
import {
  MODAL_CONTROL_CONTAINER_SPACING_R,
  MODAL_CONTROL_CONTAINER_W,
  HEADER_H,
} from "@/design-system/constants/styles";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { SettingsActivePage } from "@/features/settings/components/settings-active-page";
import { SettingsMenu } from "@/features/settings/components/settings-menu";
import { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";
import { RootRoute } from "@/routes/typed";
import { back } from "@/utils/client/nanvigation";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";

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
  const shouldShowSettingPage =
    (isSmallViewport && activeSettingNavKey) || !isSmallViewport;

  return (
    <HStack flex={1} overflowY={"auto"}>
      {shouldShowSettingMenu && (
        <VStack
          overflowY={"auto"}
          minW={["full", null, "250px"]}
          bg={"bg.body"}
        >
          {/* Menu Header */}
          <HStack align={"center"} justify={"space-between"} h={HEADER_H} p={2}>
            <HStack w={"40px"}>
              <IconButton>
                <AppTablerIcon icon={IconSearch} />
              </IconButton>
            </HStack>

            <P fontWeight={"semibold"} textAlign={"center"}>
              Settings
            </P>

            <HStack w={"40px"}>
              <ColorModeToggleButton />
            </HStack>
          </HStack>

          <SettingsMenu p={2} />
        </VStack>
      )}

      {shouldShowSettingPage && (
        <VStack flex={1} overflowY={"auto"} bg={"bg.canvas"}>
          {/* Tab Header */}
          <HStack align={"center"} justify={"space-between"} h={HEADER_H} p={2}>
            <HStack w={MODAL_CONTROL_CONTAINER_W}>
              {isSmallViewport && (
                <IconButton onClick={back}>
                  <AppTablerIcon icon={IconChevronLeft} />
                </IconButton>
              )}
            </HStack>

            <P fontWeight={"semibold"} textAlign={"center"}>
              {activeSettingNavKey && SETTINGS_NAVS[activeSettingNavKey].label}
            </P>

            <HStack
              justify={"end"}
              gap={3}
              w={MODAL_CONTROL_CONTAINER_W}
              pr={MODAL_CONTROL_CONTAINER_SPACING_R}
            >
              {!isSmallViewport && (
                <>
                  <Modal.FullscreenButton />

                  <Modal.CloseButton />
                </>
              )}
            </HStack>
          </HStack>

          <SettingsActivePage />
        </VStack>
      )}
    </HStack>
  );
};
