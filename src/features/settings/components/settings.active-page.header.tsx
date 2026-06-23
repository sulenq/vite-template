// src/feature/settings/components/settings.active-page.header.tsx

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { HStack } from "@/design-system/components/layout/ui/container";
import { Modal } from "@/design-system/components/overlay/ui/modal";
import { P } from "@/design-system/components/typography/ui/p";
import {
  HEADER_H,
  MODAL_CONTROL_CONTAINER_SPACING_R,
  MODAL_CONTROL_CONTAINER_W,
} from "@/design-system/constants/styles";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { t } from "@/libs/i18n";
import { RootRoute } from "@/routes/-typed";
import { back } from "@/utils/client/navigation";
import { IconChevronLeft } from "@tabler/icons-react";

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
