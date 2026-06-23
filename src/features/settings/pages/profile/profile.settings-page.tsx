// src/features/settings/pages/profile/profile.settings-page.tsx

"use client";

import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { VStack } from "@/design-system/components/layout/ui/container";

interface ProfileSettingsPageProps extends StackProps {}

export const ProfileSettingsPage = (props: ProfileSettingsPageProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <VStack className="debug" flex={1} {...restProps}>
      ProfileSettingsPage
    </VStack>
  );
};
