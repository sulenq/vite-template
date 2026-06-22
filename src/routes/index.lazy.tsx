// src/routes/index.lazy.tsx

import { resolveSemanticColor } from "@/design-system/chakra/utils/chakra-system-resolver";
import { IconButton } from "@/design-system/components/button/ui/button";
import { FeedbackEmptyData } from "@/design-system/components/feedback/ui/feedback-empty-data";
import { FeedbackForbidden } from "@/design-system/components/feedback/ui/feedback-forbidden";
import { FeedbackNotFound } from "@/design-system/components/feedback/ui/feedback-not-found";
import { FeedbackRetry } from "@/design-system/components/feedback/ui/feedback-retry";
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { SettingsTrigger } from "@/features/settings/components/settings-modal";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  console.log(resolveSemanticColor("bg.subtle", "dark"));

  return (
    <VStack gap={4} minH={"100dvh"} bg={"bg.canvas"} p={4}>
      <ItemContainer w={"full"}>
        <P fontWeight={"semibold"}>Key Features</P>

        <SettingsTrigger modalKey={"settings"} w={"fit"}>
          <IconButton size={"2xl"}>
            <AppLucideIcon icon={SettingsIcon} />
          </IconButton>
        </SettingsTrigger>
      </ItemContainer>

      <FeedbackSection />
    </VStack>
  );
}

const ItemContainer = (props: StackProps) => {
  // Store
  const { theme } = useThemeStore();

  return (
    <VStack
      align={"center"}
      gap={4}
      w={"fit"}
      h={"fit"}
      bg={"bg.body"}
      p={4}
      rounded={theme.radii.container}
      shadow={"md"}
      {...props}
    />
  );
};

const FeedbackSection = () => {
  return (
    <ItemContainer w={"full"}>
      <P fontWeight={"semibold"}>Feedback</P>

      <HStack wrap={"wrap"}>
        <FeedbackEmptyData />

        <FeedbackForbidden />

        <FeedbackNotFound />

        <FeedbackRetry />
      </HStack>
    </ItemContainer>
  );
};
