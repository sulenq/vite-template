// src/features/settings/components/settings.disclosure

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import type { PopDisclosureTriggerProps } from "@/design-system/components/disclosure/types/disclosure.type";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/p";
import { SettingsNavs } from "@/features/settings/components/settings.navs";
import { SettingsView } from "@/features/settings/components/settings.view";
import {
  ChevronLeftIcon,
  MaximizeIcon,
  MinimizeIcon,
  SearchIcon,
} from "lucide-react";
import React, { createContext, useContext, useState } from "react";

export type SettingsContextValue = {
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useSettingsContext() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettingsContext must be used within SettingsContent");
  }

  return context;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

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
        opened={isOpen}
        open={open}
        close={close}
        clickOriginAnimation
        size={isFullscreen ? "full" : "xl"}
      >
        <Disclosure.Trigger asChild {...restProps}>
          {children}
        </Disclosure.Trigger>

        <Disclosure.Content overflowY={"auto"}>
          <Disclosure.Body overflowY={"auto"} p={0}>
            <SettingsContent />
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure.Root>
    </SettingsContext.Provider>
  );
};

const SettingsContent = () => {
  // Contexts
  const { isFullscreen, setIsFullscreen } = useSettingsContext();

  return (
    <HStack maxH={isFullscreen ? "" : "500px"} overflowY={"auto"}>
      <VStack overflowY={"auto"} bg={"bg.body"}>
        <HStack align={"center"} justify={"space-between"} p={2}>
          <IconButton>
            <AppLucideIcon icon={SearchIcon} />
          </IconButton>

          <P textAlign={"center"}>Settings</P>

          {/* <IconButton>
            <AppLucideIcon icon={EllipsisIcon} />
          </IconButton> */}

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

          <HStack justify={"end"} gap={2} w={"32px"} pr={1}>
            <IconButton
              minW={"28px"}
              h={"28px"}
              size={"xs"}
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
              <AppLucideIcon
                icon={isFullscreen ? MinimizeIcon : MaximizeIcon}
                boxSize={4}
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

        <SettingsView />
      </VStack>
    </HStack>
  );
};

export const Settings = {
  Trigger: SettingsTrigger,
  Content: SettingsContent,
};
