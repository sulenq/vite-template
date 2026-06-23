// src/feature/settings/components/settings.active-page.tsx

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { Modal } from "@/design-system/components/overlay/ui/modal";
import { P } from "@/design-system/components/typography/ui/p";
import {
  HEADER_H,
  MODAL_CONTROL_CONTAINER_SPACING_R,
  MODAL_CONTROL_CONTAINER_W,
} from "@/design-system/constants/styles";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { SETTINGS_PAGES } from "@/features/settings/constants/settings-pages";
import { t } from "@/libs/i18n";
import { RootRoute } from "@/routes/-typed";
import { back } from "@/utils/client/navigation";
import { IconChevronLeft } from "@tabler/icons-react";
import { useState } from "react";

export const SettingsActivePage = () => {
  return (
    <VStack flex={1} overflowY={"auto"} bg={"bg.canvas"}>
      <SettingsActivePageHeader />

      <SettingsActivePageBody />
    </VStack>
  );
};

export interface SettingsActivePageHeader extends StackProps {
  title?: string;
}

export const SettingsActivePageHeader = (props: SettingsActivePageHeader) => {
  // Props
  const { title, ...restProps } = props;

  // Hooks
  const { activeSettingNavKey } = RootRoute.useSearch();
  const isSmallViewport = useIsSmallViewport();

  // Resolved Values
  const resolvedTitle =
    title ||
    (activeSettingNavKey ? t[`settings.${activeSettingNavKey}.label`]() : "");

  return (
    <HStack
      align={"center"}
      justify={"space-between"}
      h={HEADER_H}
      p={2}
      {...restProps}
    >
      <HStack w={MODAL_CONTROL_CONTAINER_W}>
        {isSmallViewport && (
          <IconButton onClick={back}>
            <AppTablerIcon icon={IconChevronLeft} />
          </IconButton>
        )}
      </HStack>

      <P fontWeight={"semibold"} textAlign={"center"}>
        {resolvedTitle}
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
  );
};

interface SettingsViewProps extends StackProps {}

export const SettingsActivePageBody = (props: SettingsViewProps) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const { activeSettingNavKey } = RootRoute.useSearch();

  // States
  const [displayKey, setDisplayKey] = useState(activeSettingNavKey);

  // Derived Values
  const ActiveSettingPage = displayKey ? SETTINGS_PAGES[displayKey] : null;

  // Handle nav key changes
  if (activeSettingNavKey && activeSettingNavKey !== displayKey) {
    setDisplayKey(activeSettingNavKey);
  }

  return (
    <VScrollContainer flex={1} align={"center"} p={4} {...restProps}>
      <VStack flex={1} gap={4} w={"full"} maxW={"600px"}>
        {ActiveSettingPage && <ActiveSettingPage />}

        {!ActiveSettingPage && (
          <FeedbackState
            title={t["settings.index.title"]()}
            description={t["settings.index.description"]()}
            pb={HEADER_H}
            m={"auto"}
          />
        )}
      </VStack>
    </VScrollContainer>
  );
};
