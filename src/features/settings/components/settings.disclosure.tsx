// src/features/settings/components/settings.disclosure

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import { usePopDisclosure } from "@/design-system/components/disclosure/hooks/use-pop-disclosure";
import type { PopDisclosureTriggerProps } from "@/design-system/components/disclosure/types/disclosure.type";
import { Disclosure } from "@/design-system/components/disclosure/ui/disclosure";
import { HStack, VStack } from "@/design-system/components/layout/container";

const SettingsTrigger = (props: PopDisclosureTriggerProps) => {
  // Props
  const { children, dKey, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopDisclosure(dKey);

  return (
    <Disclosure.Root opened={isOpen} open={open} close={close} size={"xl"}>
      <Disclosure.Trigger asChild {...restProps}>
        {children}
      </Disclosure.Trigger>

      <Disclosure.Content>
        <Disclosure.Body>
          <HStack className="debug" h={"500px"}>
            <SettingsTrigger2 dKey="settings.settings2" mt={"auto"}>
              <Button>Buka untuk dibeliin jajan di luar</Button>
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

      <Disclosure.Content portalled={false}>
        <Disclosure.Body minH={"500px"}>
          Nasi apa yang gak pernah dimakan sama orang, tapi kalau disebut bikin
          adem?
          <HStack>
            <VStack flexShrink={0}></VStack>

            <VStack flexShrink={0}>
              <HStack></HStack>
            </VStack>
          </HStack>
        </Disclosure.Body>

        <Disclosure.Footer></Disclosure.Footer>
      </Disclosure.Content>
    </Disclosure.Root>
  );
};

export const Settings = {
  Trigger: SettingsTrigger,
};
