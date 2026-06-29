// src/routes/index.lazy.tsx

import { BrandWatermark } from "@/design-system/components/branding/brand-watermark";
import { Logo } from "@/design-system/components/branding/logo";
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
import { Container } from "@/design-system/components/layout/ui/container";
import { HStack, VStack } from "@/design-system/components/layout/ui/stack";
import { Link } from "@/design-system/components/typography/ui/link";
import { P } from "@/design-system/components/typography/ui/p";
import { SPACING_MD } from "@/design-system/constants/styles";
import { SettingsTrigger } from "@/features/settings/components/settings";
import { getLocale, getLocaleLabel } from "@/libs/i18n/-typed";
import { useLocale } from "@/libs/i18n/locale-provider";
import { IconLanguage } from "@tabler/icons-react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CogIcon } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <VStack minH={"100dvh"} bg={"bg.canvas"}>
      <KeyFeatures />

      <Branding />

      <Typography />

      <FeedbackSection />
    </VStack>
  );
}

const KeyFeatures = () => {
  const { setLocale } = useLocale();

  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Key Features
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={2}>
          <SettingsTrigger modalKey={"settings"} w={"fit"}>
            <IconButton primary>
              <AppLucideIcon
                icon={CogIcon}
                strokeWidth={1.3}
                boxSize={"22px"}
              />
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
      </Container.Body>
    </Container.Root>
  );
};

const Branding = () => {
  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Branding
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={4}>
          <Logo />

          <BrandWatermark />
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};

const Typography = () => {
  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Typography
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={4}>
          <Link to="https://youtube.com" target="_blank">
            youtube.com
          </Link>
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};

const FeedbackSection = () => {
  return (
    <Container.Root w={"full"} p={SPACING_MD}>
      <Container.Body gap={4} p={4}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Feedback
        </P>

        <HStack wrap={"wrap"} align={"center"} justify={"center"} gap={4}>
          <FeedbackNoData />

          <FeedbackAccessDenied />

          <FeedbackNoResult />

          <FeedbackRetry />
        </HStack>
      </Container.Body>
    </Container.Root>
  );
};
