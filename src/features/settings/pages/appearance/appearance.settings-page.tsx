// src/features/settings/pages/profile/appearance.settings-page.tsx

"use client";

import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { VStack } from "@/design-system/components/layout/ui/container";

interface AppearanceSettingsPageProps extends StackProps {}

export const AppearanceSettingsPage = (props: AppearanceSettingsPageProps) => {
  // Props
  const { ...restProps } = props;

  return <VStack {...restProps}>Appearance Settings Page</VStack>;
};
