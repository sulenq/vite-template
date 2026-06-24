// src/routes/index.lazy.tsx

import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import { FeedbackAccessDenied } from "@/design-system/components/feedback/ui/feedback-access-denied";
import { FeedbackNoData } from "@/design-system/components/feedback/ui/feedback-no-data";
import { FeedbackNoResult } from "@/design-system/components/feedback/ui/feedback-no-result";
import { FeedbackRetry } from "@/design-system/components/feedback/ui/feedback-retry";
import {
  AppLucideIcon,
  AppTablerIcon,
} from "@/design-system/components/icon/ui/app-icon";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { SettingsTrigger } from "@/features/settings/components/settings";
import { getLocale, getLocaleLabel, t } from "@/libs/i18n";
import { useLocale } from "@/libs/i18n/locale-provider";
import { IconLanguage } from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CogIcon } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <VStack gap={4} minH={"100dvh"} bg={"bg.canvas"} p={4}>
      <KeyFeatures />

      <FeedbackSection />
    </VStack>
  );
}

const KeyFeatures = () => {
  const { setLocale } = useLocale();

  return (
    <ItemContainer w={"full"}>
      <P fontWeight={"semibold"}>{t["demo.features.title"]()}</P>

      <HStack wrap={"wrap"} align={"center"} gap={2}>
        <SettingsTrigger modalKey={"settings"} w={"fit"}>
          <IconButton>
            <AppLucideIcon icon={CogIcon} strokeWidth={1.3} boxSize={"22px"} />
          </IconButton>
        </SettingsTrigger>

        <ColorModeToggleButton />

        <Button
          onClick={() => {
            setLocale(getLocale() === "id" ? "en" : "id");
          }}
        >
          <AppTablerIcon icon={IconLanguage} />
          {getLocaleLabel(getLocale())}
        </Button>
      </HStack>
    </ItemContainer>
  );
};

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
      <P fontWeight={"semibold"}>{t["demo.feedback.title"]()}</P>

      <HStack wrap={"wrap"}>
        <FeedbackNoData />

        <FeedbackAccessDenied />

        <FeedbackNoResult />

        <FeedbackRetry />
      </HStack>
    </ItemContainer>
  );
};
