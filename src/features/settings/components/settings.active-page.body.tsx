// src/feature/settings/components/settings-active-page.tsx

"use client";

import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { VStack } from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { HEADER_H } from "@/design-system/constants/styles";
import { SETTINGS_PAGES } from "@/features/settings/constants/settings-pages";
import { t } from "@/libs/i18n";
import { RootRoute } from "@/routes/-typed";
import { useState } from "react";

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
