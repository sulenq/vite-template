// src/features/settings/components/settings.disclosure

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import type { DisclosureTrigger } from "@/design-system/components/disclosure/types/disclosure.type";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import { Box } from "@/design-system/components/layout/container";

interface SettingsDisclosureProps {
  isOpen?: boolean;
}

export const SettingsDisclosure = (props: SettingsDisclosureProps) => {
  // Props
  const { isOpen, ...restProps } = props;

  return (
    <Disclosure.Root opened={isOpen} {...restProps}>
      <Disclosure.Header>
        <Disclosure.CloseButton />
      </Disclosure.Header>

      <Disclosure.Body>
        <ResetPasswordTrigger dKey={"settings.reset-password"}>
          <Button>Reset Passwrod</Button>
        </ResetPasswordTrigger>
      </Disclosure.Body>

      <Disclosure.Footer></Disclosure.Footer>
    </Disclosure.Root>
  );
};

export const SettingsTrigger = (props: DisclosureTrigger) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open } = usePopDisclosure(dKey);

  //   console.log("settings open", isOpen);

  return (
    <>
      <Box w={"fit"} onClick={open} {...restProps}>
        {children}
      </Box>

      <SettingsDisclosure isOpen={isOpen} />
    </>
  );
};

export const ResetPasswordTrigger = (props: DisclosureTrigger) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open } = usePopDisclosure(dKey);

  //   console.log("reset password open", isOpen);

  return (
    <>
      <Box w={"fit"} onClick={open} {...restProps}>
        {children}
      </Box>

      <Disclosure.Root opened={isOpen}>
        <Disclosure.Header></Disclosure.Header>

        <Disclosure.Body>Reset Password Content</Disclosure.Body>

        <Disclosure.Footer></Disclosure.Footer>
      </Disclosure.Root>
    </>
  );
};
