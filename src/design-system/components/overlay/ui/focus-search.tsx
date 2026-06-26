//src/design-system/components/overlay/ui/focus-search.tsx

"use client";

import { FeedbackNoResult } from "@/design-system/components/feedback/ui/feedback-no-result";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { SearchInput } from "@/design-system/components/input/ui/search-input";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { usePopModal } from "@/design-system/components/overlay/hooks/use-pop-modal";
import type {
  FocusSearchResultItemProps,
  FocusSearchRootProps,
  FocusSearchTriggerProps,
} from "@/design-system/components/overlay/types/focus-search.type";
import { Modal } from "@/design-system/components/overlay/ui/modal";
import { Kbd } from "@/design-system/components/typography/kbd";
import { P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { t } from "@/libs/i18n";
import type { SearchIndexItem } from "@/design-system/types/search.type";
import { createContext, useContext } from "react";

export type FocusTriggerContextValue<T = Record<string, unknown>> = {
  modalKey: string;
  queryKey: string;
  queryValue: string;
  queryState: string;
  setQueryState: React.Dispatch<React.SetStateAction<string>>;
  recentResults: SearchIndexItem<T>[];
  addRecent: (id: string) => void;
  clearRecent: (id: string) => void;
  clearAllRecent: () => void;
  results: SearchIndexItem<T>[];
  onResultSelect?: (result: SearchIndexItem<T>) => void;
};

const FocusTriggerContext = createContext<FocusTriggerContextValue | undefined>(
  undefined,
);

export const useFocusTriggerContext = () => {
  const context = useContext(FocusTriggerContext);

  if (!context) {
    throw new Error(
      "useFocusTriggerContext must be used within FocusTrigger.Root",
    );
  }

  return context;
};

const FocusTriggerRoot = (props: FocusSearchRootProps) => {
  // Props
  const {
    children,
    modalKey,
    queryKey,
    queryValue,
    queryState,
    setQueryState,
    recentResults,
    addRecent,
    clearRecent,
    clearAllRecent,
    results,
    onResultSelect,
  } = props;

  // Hooks
  const { isOpen, open, close } = usePopModal(modalKey);

  return (
    <FocusTriggerContext.Provider
      value={{
        modalKey,
        queryKey,
        queryValue,
        queryState,
        setQueryState,
        recentResults,
        addRecent,
        clearRecent,
        clearAllRecent,
        results,
        onResultSelect,
      }}
    >
      <Modal.Root
        modalKey={modalKey}
        opened={isOpen}
        open={open}
        close={close}
        size={"sm"}
      >
        {children}
      </Modal.Root>
    </FocusTriggerContext.Provider>
  );
};

const FocusSearchResultItem = (props: FocusSearchResultItemProps) => {
  // Props
  const { result, ...restProps } = props;

  // Contexts
  const { addRecent, onResultSelect } = useFocusTriggerContext();

  // Store
  const { theme } = useThemeStore();

  return (
    <VStack
      key={result.id}
      gap={2}
      rounded={theme.radii.component}
      p={4}
      cursor="pointer"
      transition="200ms"
      _hover={{ bg: "bg.subtle" }}
      onClick={() => {
        setTimeout(() => {
          addRecent(result.id);
        }, 200);
        onResultSelect?.(result);
      }}
      {...restProps}
    >
      <P>{result.title}</P>

      <P color="fg.subtle">{result.description}</P>
    </VStack>
  );
};

export const FocusSearchTrigger = (props: FocusSearchTriggerProps) => {
  // Props
  const { children, ...restProps } = props;

  // Contexts
  const { modalKey } = useFocusTriggerContext();

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
          <FocusSearchBody />
        </Modal.Body>

        <Modal.Footer borderTop={"1px solid"} borderColor={"border.subtle"}>
          <FocusSearchFooter />
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

const FocusSearchBody = () => {
  // Contexts
  const { queryKey, queryValue, recentResults, clearAllRecent, results } =
    useFocusTriggerContext();

  // Derived Values
  const hasQuery = !!queryValue?.trim();

  return (
    <VStack gap={2} py={2}>
      <HStack px={2}>
        <SearchInput
          queryKey={queryKey}
          placeholder={t["settings.search.placeholder"]()}
        />
      </HStack>

      <VScrollContainer px={2}>
        <VStack gap={1}>
          {!hasQuery && (
            <>
              {recentResults.length === 0 && (
                <FeedbackState
                  title={t["settings.search.empty.title"]()}
                  description={t["settings.search.empty.description"]()}
                  minH={"250px"}
                  justify={"center"}
                />
              )}

              {recentResults.length > 0 && (
                <>
                  <HStack justify="space-between" px={4} mt={2}>
                    <P fontSize="xs" color="fg.subtle">
                      {t["common.recent"]()}
                    </P>

                    <P
                      fontSize="xs"
                      color="fg.subtle"
                      cursor="pointer"
                      onClick={clearAllRecent}
                    >
                      {t["common.clear_all"]()}
                    </P>
                  </HStack>

                  {recentResults.map((result) => (
                    <FocusSearchResultItem key={result.id} result={result} />
                  ))}
                </>
              )}
            </>
          )}

          {hasQuery && (
            <>
              {results.length === 0 && <FeedbackNoResult query={queryValue} />}

              {results.length > 0 &&
                results.map((result) => (
                  <FocusSearchResultItem key={result.id} result={result} />
                ))}
            </>
          )}
        </VStack>
      </VScrollContainer>
    </VStack>
  );
};

const FocusSearchFooter = () => {
  return (
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
  );
};

export const FocusSearch = {
  Root: FocusTriggerRoot,
  Trigger: FocusSearchTrigger,
  Body: FocusSearchBody,
  Footer: FocusSearchFooter,
};
