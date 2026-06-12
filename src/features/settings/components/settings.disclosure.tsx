// src/features/settings/components/settings.disclosure

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import {
  Box,
  type StackProps,
} from "@/design-system/components/layout/container";

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
        <SettingsTrigger disclosurePath={"sub"}>
          <Button>Reset Passwrod</Button>
        </SettingsTrigger>
      </Disclosure.Body>

      <Disclosure.Footer></Disclosure.Footer>
    </Disclosure.Root>
  );
};

interface SettingsTrigger extends StackProps {
  disclosurePath: string;
}

export const SettingsTrigger = (props: SettingsTrigger) => {
  // Props
  const { children, disclosurePath, ...restProps } = props;

  // Hooks
  const { isOpen, open } = usePopDisclosure(disclosurePath);

  return (
    <>
      <Box w={"fit"} onClick={open} {...restProps}>
        {children}
      </Box>

      <SettingsDisclosure isOpen={isOpen} />
    </>
  );
};
