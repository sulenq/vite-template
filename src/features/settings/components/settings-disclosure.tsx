// src/features/settings/components/settings.disclosure

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import type { PopDisclosureTriggerProps } from "@/design-system/components/disclosure/types/disclosure.type";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import {
  AppLucideIcon,
  AppTablerIcon,
} from "@/design-system/components/icon/ui/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/p";
import {
  DISCLOSURE_CONTROL_CONTAINER_SPACING_R,
  DISCLOSURE_CONTROL_CONTAINER_W,
} from "@/design-system/constants/styles";
import { SettingsPageNavs } from "@/features/settings/components/settings-page-navs";
import { SettingsPageContent } from "@/features/settings/components/settings-page-content";
import { IconSearch } from "@tabler/icons-react";
import { ChevronLeftIcon } from "lucide-react";

const SettingsTrigger = (props: PopDisclosureTriggerProps) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopDisclosure(dKey);

  return (
    <Disclosure.Root
      dKey={dKey}
      opened={isOpen}
      open={open}
      close={close}
      clickOriginAnimation
      size={"2xl"}
    >
      <Disclosure.Trigger {...restProps}>{children}</Disclosure.Trigger>

      <Disclosure.Content
        display={"flex"}
        flexDir={"column"}
        overflowY={"auto"}
        maxH={"600px"}
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
  return (
    <HStack flex={1} overflowY={"auto"}>
      <VStack overflowY={"auto"} bg={"bg.body"}>
        {/* Nav Header */}
        <HStack align={"center"} justify={"space-between"} p={2}>
          <IconButton>
            <AppTablerIcon icon={IconSearch} />
          </IconButton>

          <P textAlign={"center"}>Settings</P>

          <ColorModeToggleButton />
        </HStack>

        <SettingsPageNavs p={2} />
      </VStack>

      <VStack flex={1} overflowY={"auto"} bg={"bg.canvas"}>
        {/* Tab Header */}
        <HStack align={"center"} justify={"space-between"} p={2}>
          <HStack w={DISCLOSURE_CONTROL_CONTAINER_W}>
            <IconButton>
              <AppLucideIcon icon={ChevronLeftIcon} />
            </IconButton>
          </HStack>

          <P fontWeight={"semibold"} textAlign={"center"}>
            Profile
          </P>

          <HStack
            justify={"end"}
            gap={3}
            w={DISCLOSURE_CONTROL_CONTAINER_W}
            pr={DISCLOSURE_CONTROL_CONTAINER_SPACING_R}
          >
            <Disclosure.FullscreenButton />

            <Disclosure.CloseButton />
          </HStack>
        </HStack>

        <SettingsPageContent />
      </VStack>
    </HStack>
  );
};

export const Settings = {
  Trigger: SettingsTrigger,
  View: SettingsView,
};
