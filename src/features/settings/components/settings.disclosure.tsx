// src/features/settings/components/settings.disclosure

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import type { PopDisclosureTriggerProps } from "@/design-system/components/disclosure/types/disclosure.type";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import { HStack } from "@/design-system/components/layout/container";

const SettingsTrigger = (props: PopDisclosureTriggerProps) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopDisclosure(dKey);

  return (
    <Disclosure.Root
      opened={isOpen}
      open={open}
      close={close}
      clickOriginAnimation
      size={"xl"}
    >
      <Disclosure.Trigger asChild {...restProps}>
        {children}
      </Disclosure.Trigger>

      <Disclosure.Content>
        <Disclosure.Body>
          <HStack className="debug" h={"500px"}>
            <SettingsTrigger2 dKey="settings.settings2" mt={"auto"}>
              <Button>Settings 2</Button>
            </SettingsTrigger2>
          </HStack>
        </Disclosure.Body>

        <Disclosure.Footer></Disclosure.Footer>
      </Disclosure.Content>
    </Disclosure.Root>
  );
};

export const SettingsTrigger2 = (props: PopDisclosureTriggerProps) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopDisclosure(dKey);

  return (
    <Disclosure.Root opened={isOpen} open={open} close={close} size={"sm"}>
      <Disclosure.Trigger asChild {...restProps}>
        {children}
      </Disclosure.Trigger>

      <Disclosure.Content>
        <Disclosure.Body minH={"500px"}>
          Nested 2
          <SettingsTrigger3 dKey="settings.settings2.settings3">
            <Button>Settings 3</Button>
          </SettingsTrigger3>
        </Disclosure.Body>

        <Disclosure.Footer></Disclosure.Footer>
      </Disclosure.Content>
    </Disclosure.Root>
  );
};

export const SettingsTrigger3 = (props: PopDisclosureTriggerProps) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopDisclosure(dKey);

  return (
    <Disclosure.Root opened={isOpen} open={open} close={close}>
      <Disclosure.Trigger asChild {...restProps}>
        {children}
      </Disclosure.Trigger>

      <Disclosure.Content>
        <Disclosure.Body minH={"200px"}>Nested 3</Disclosure.Body>

        <Disclosure.Footer></Disclosure.Footer>
      </Disclosure.Content>
    </Disclosure.Root>
  );
};

export const Settings = {
  Trigger: SettingsTrigger,
};
