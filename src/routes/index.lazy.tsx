// src/routes/index.lazy.tsx

import { IconButton } from "@/design-system/components/button/ui/button";
import { FeedbackEmptyData } from "@/design-system/components/feedback/ui/feedback-empty-data";
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { SettingsTrigger } from "@/features/settings/components/settings-disclosure";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

const ItemContainer = (props: StackProps) => {
  // Store
  const { theme } = useThemeStore();

  return (
    <VStack
      gap={4}
      w={"fit"}
      h={"fit"}
      p={4}
      rounded={theme.radii.container}
      shadow={"md"}
      {...props}
    />
  );
};

function RouteComponent() {
  return (
    <HStack wrap={"wrap"} gap={4} p={4}>
      <ItemContainer w={"full"}>
        <P fontWeight={"semibold"}>Features</P>

        <SettingsTrigger dKey={"settings"} w={"fit"}>
          <IconButton size={"2xl"}>
            <AppLucideIcon icon={SettingsIcon} />
          </IconButton>
        </SettingsTrigger>
      </ItemContainer>

      <ItemContainer w={"full"}>
        <P fontWeight={"semibold"}>Feedback</P>

        <FeedbackEmptyData />
      </ItemContainer>
    </HStack>
  );
}
