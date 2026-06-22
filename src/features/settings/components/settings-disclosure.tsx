// src/features/settings/components/settings-disclosure

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import type { PopDisclosureTriggerProps } from "@/design-system/components/disclosure/types/disclosure.type";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/p";
import {
  DISCLOSURE_CONTROL_CONTAINER_SPACING_R,
  DISCLOSURE_CONTROL_CONTAINER_W,
  HEADER_H,
} from "@/design-system/constants/styles";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { SettingsActivePage } from "@/features/settings/components/settings-active-page";
import { SettingsMenu } from "@/features/settings/components/settings-menu";
import { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";
import { RootRoute } from "@/routes/typed";
import { back } from "@/utils/client/nanvigation";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";

const SettingsTrigger = (props: PopDisclosureTriggerProps) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopDisclosure(dKey);
  const isSmallViewport = useIsSmallViewport();

  return (
    <Disclosure.Root
      dKey={dKey}
      opened={isOpen}
      open={open}
      close={close}
      clickOriginAnimation
      size={isSmallViewport ? "full" : "2xl"}
    >
      <Disclosure.Trigger {...restProps}>{children}</Disclosure.Trigger>

      <Disclosure.Content
        display={"flex"}
        flexDir={"column"}
        overflowY={"auto"}
        maxH={!isSmallViewport ? "600px" : "full"}
      >
        <Disclosure.Body
          display={"flex"}
          flexDir={"column"}
          overflowY={"auto"}
          p={0}
        >
          <SettingsView />
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure.Root>
  );
};

const SettingsView = () => {
  // Hooks
  const { currentSettingNavKey } = RootRoute.useSearch();
  const isSmallViewport = useIsSmallViewport();

  // Derived Values
  const shouldShowSettingMenu =
    (isSmallViewport && !currentSettingNavKey) || !isSmallViewport;
  const shouldShowSettingPage =
    (isSmallViewport && currentSettingNavKey) || !isSmallViewport;

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
            <HStack w={DISCLOSURE_CONTROL_CONTAINER_W}>
              {isSmallViewport && (
                <IconButton onClick={back}>
                  <AppTablerIcon icon={IconChevronLeft} />
                </IconButton>
              )}
            </HStack>

            <P fontWeight={"semibold"} textAlign={"center"}>
              {currentSettingNavKey &&
                SETTINGS_NAVS[currentSettingNavKey].label}
            </P>

            <HStack
              justify={"end"}
              gap={3}
              w={DISCLOSURE_CONTROL_CONTAINER_W}
              pr={DISCLOSURE_CONTROL_CONTAINER_SPACING_R}
            >
              {!isSmallViewport && (
                <>
                  <Disclosure.FullscreenButton />

                  <Disclosure.CloseButton />
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

export const Settings = {
  Trigger: SettingsTrigger,
  View: SettingsView,
};
