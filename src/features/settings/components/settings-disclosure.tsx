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
import { DISCLOSURE_CONTROL_CONTAINER_SPACING_R } from "@/design-system/constants/styles";
import { SettingsNavs } from "@/features/settings/components/settings-navs";
import { SettingsTabContent } from "@/features/settings/components/settings-tab-content";
import { IconSearch, IconSquare, IconSquares } from "@tabler/icons-react";
import { ChevronLeftIcon } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

export type SettingsContextValue = {
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettingsContext must be used within SettingsContent");
  }

  return context;
}

const SettingsTrigger = (props: PopDisclosureTriggerProps) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopDisclosure(dKey);

  // States
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  return (
    <SettingsContext.Provider
      value={{
        isFullscreen,
        setIsFullscreen,
      }}
    >
      <Disclosure.Root
        dKey={dKey}
        opened={isOpen}
        open={open}
        close={close}
        clickOriginAnimation
        size={isFullscreen ? "full" : "xl"}
      >
        <Disclosure.Trigger asChild {...restProps}>
          {children}
        </Disclosure.Trigger>

        <Disclosure.Content
          display={"flex"}
          flexDir={"column"}
          overflowY={"auto"}
          maxW={isFullscreen ? "full" : "1000px"}
          maxH={isFullscreen ? "100svh" : "600px"}
          minH={isFullscreen ? "100svh" : ""}
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
    </SettingsContext.Provider>
  );
};

const SettingsView = () => {
  // Contexts
  const { isFullscreen, setIsFullscreen } = useSettingsContext();

  return (
    <HStack overflowY={"auto"}>
      <VStack overflowY={"auto"} bg={"bg.body"}>
        <HStack align={"center"} justify={"space-between"} p={2}>
          <IconButton>
            <AppTablerIcon icon={IconSearch} />
          </IconButton>

          <P textAlign={"center"}>Settings</P>

          <ColorModeToggleButton />
        </HStack>

        <SettingsNavs p={2} />
      </VStack>

      <VStack flex={1} overflowY={"auto"} bg={"bg.canvas"}>
        <HStack align={"center"} justify={"space-between"} p={2}>
          <HStack w={"32px"}>
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
            minW={"32px"}
            pr={DISCLOSURE_CONTROL_CONTAINER_SPACING_R}
          >
            <IconButton
              size={"2xs"}
              variant={"subtle"}
              bg={"an2"}
              _hover={{
                bg: "an3",
              }}
              rounded={"full"}
              onClick={() => {
                setIsFullscreen((ps) => !ps);
              }}
            >
              <AppTablerIcon
                icon={isFullscreen ? IconSquares : IconSquare}
                transform={"scaleX(-1)"}
                boxSize={3}
              />
            </IconButton>

            <Disclosure.CloseButton
              bg={"an2"}
              _hover={{
                bg: "an3",
              }}
            />
          </HStack>
        </HStack>

        <SettingsTabContent />
      </VStack>
    </HStack>
  );
};

export const Settings = {
  Trigger: SettingsTrigger,
  View: SettingsView,
};
