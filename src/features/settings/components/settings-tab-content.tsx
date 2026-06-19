//src/feature/settings/components/settings.view.tsx

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import {
  Box,
  VStack,
  type StackProps,
} from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";

interface SettingsViewProps extends StackProps {}

export const SettingsTabContent = (props: SettingsViewProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <VScrollContainer align={"center"} p={4} {...restProps}>
      <VStack gap={4} w={"full"} maxW={"500px"}>
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
  const { isOpen, open, close } = usePopDisclosure(
    "settings.reset-password-drawer",
  );

  return (
    <Disclosure.Root
      dKey="settings.reset-password-drawer"
      opened={isOpen}
      open={open}
      close={close}
      clickOriginAnimation
    >
      <Disclosure.Trigger>
        <Button>Reset Password</Button>
      </Disclosure.Trigger>

      <Disclosure.Content>
        <Disclosure.Body>Reset Password Content</Disclosure.Body>

        <Disclosure.Footer>
          <Button>Reset</Button>
        </Disclosure.Footer>
      </Disclosure.Content>
    </Disclosure.Root>
  );
};
