//src/design-system/components/overlay/ui/focus-search.tsx

"use client";

import { SearchInput } from "@/design-system/components/input/ui/search-input";
import { HStack } from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";
import { Modal } from "@/design-system/components/overlay/ui/modal";
import { Kbd } from "@/design-system/components/typography/kbd";
import { P } from "@/design-system/components/typography/ui/p";
import { t } from "@/libs/i18n";

interface FocusSearchProps {
  children: React.ReactNode;
  modalKey: string;
  queryKey: string;
  results: React.ReactNode;
}

export const FocusSearchTrigger = (props: FocusSearchProps) => {
  // Props
  const { children, modalKey, queryKey, results, ...restProps } = props;

  // Hooks
  const { isOpen, open, close } = usePopModal(modalKey);

  return (
    <Modal.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size={"sm"}
      {...restProps}
    >
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content>
        <Modal.Body display={"flex"} flexDir={"column"} p={0}>
          <HStack p={2}>
            <SearchInput
              queryKey={queryKey}
              placeholder={t["settings.search.placeholder"]()}
            />
          </HStack>

          <VScrollContainer p={2}>{results}</VScrollContainer>
        </Modal.Body>

        <Modal.Footer borderTop={"1px solid"} borderColor={"border.subtle"}>
          <HStack align={"center"} gap={4}>
            <HStack align={"center"} gap={2}>
              <Kbd fontSize={"sm"}>↑</Kbd>
              <Kbd fontSize={"sm"}>↓</Kbd>

              <P fontSize={"xs"} color={"fg.subtle"}>
                {t["common.navigate"]()}
              </P>
            </HStack>

            <HStack align={"center"} gap={2}>
              <Kbd fontSize={"sm"}>↵</Kbd>

              <P fontSize={"xs"} color={"fg.subtle"}>
                {t["common.select"]()}
              </P>
            </HStack>

            <HStack align={"center"} gap={2}>
              <Kbd>Esc</Kbd>

              <P fontSize={"xs"} color={"fg.subtle"}>
                {t["common.close"]()}
              </P>
            </HStack>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};
