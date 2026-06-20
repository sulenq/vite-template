//src/feature/settings/components/settings.view.tsx

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { Box, VStack } from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { Route } from "@/routes/__root";
import { useSearch } from "@tanstack/react-router";

interface SettingsViewProps extends StackProps {}

export const SettingsPageContent = (props: SettingsViewProps) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const { settingsPage } = useSearch({
    from: Route.fullPath,
  });

  console.log(settingsPage);

  return (
    <VScrollContainer align={"center"} p={4} {...restProps}>
      <VStack gap={4} w={"full"} maxW={"600px"}>
        <ResetPassword />

        <Box
          w={"full"}
          h={"200px"}
          bg={"bg.body"}
          shadow={"md"}
          rounded={"md"}
        />

        <Box
          w={"full"}
          h={"200px"}
          bg={"bg.body"}
          shadow={"md"}
          rounded={"md"}
        />

        <Box
          w={"full"}
          h={"400px"}
          bg={"bg.body"}
          shadow={"md"}
          rounded={"md"}
        />
      </VStack>
    </VScrollContainer>
  );
};

export const ResetPassword = () => {
  // Hooks
  const { isOpen, open, close } = usePopDisclosure("settings.reset-password");

  return (
    <Disclosure.Root
      dKey="settings.reset-password"
      opened={isOpen}
      open={open}
      close={close}
      clickOriginAnimation
    >
      <Disclosure.Trigger>
        <Button>Reset Password</Button>
      </Disclosure.Trigger>

      <Disclosure.Content>
        <Disclosure.Body></Disclosure.Body>

        <Disclosure.Footer>
          <Button>Cancel</Button>

          <ResetPasswordConfirmation />
        </Disclosure.Footer>
      </Disclosure.Content>
    </Disclosure.Root>
  );
};

export const ResetPasswordConfirmation = () => {
  // Hooks
  const { isOpen, open, close } = usePopDisclosure(
    "settings.reset-password.confirmation",
  );

  return (
    <Disclosure.Root
      dKey="settings.reset-password.confirmation"
      opened={isOpen}
      open={open}
      close={close}
      clickOriginAnimation
    >
      <Disclosure.Trigger>
        <Button>Reset</Button>
      </Disclosure.Trigger>

      <Disclosure.Content>
        <Disclosure.Body>Reset Password Confirmation Content</Disclosure.Body>

        <Disclosure.Footer>
          <Button>Cancel</Button>

          <Button>Reset</Button>
        </Disclosure.Footer>
      </Disclosure.Content>
    </Disclosure.Root>
  );
};
