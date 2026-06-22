// src/feature/settings/components/current-setting-page.tsx

"use client";

import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { VStack } from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { HEADER_H } from "@/design-system/constants/styles";
import { SETTINGS_CONTENTS } from "@/features/settings/constants/settings-contents";
import { RootRoute } from "@/routes/typed";
import { IconSettings } from "@tabler/icons-react";
import { useState } from "react";

interface SettingsViewProps extends StackProps {}

export const SettingsActivePage = (props: SettingsViewProps) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const { currentSettingNavKey } = RootRoute.useSearch();

  // States
  const [displayKey, setDisplayKey] = useState(currentSettingNavKey);

  if (currentSettingNavKey && currentSettingNavKey !== displayKey) {
    setDisplayKey(currentSettingNavKey);
  }

  return (
    <VScrollContainer flex={1} align={"center"} p={4} {...restProps}>
      <VStack flex={1} gap={4} w={"full"} maxW={"600px"}>
        {displayKey && SETTINGS_CONTENTS[displayKey]}
        {!displayKey && (
          <FeedbackState
            tablerIcon={IconSettings}
            description={"Please select setting menu"}
            pb={HEADER_H}
            m={"auto"}
          />
        )}
      </VStack>
    </VScrollContainer>
  );
};
