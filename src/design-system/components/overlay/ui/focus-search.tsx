// src/design-system/components/overlay/ui/focus-search.tsx
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
} from "@/design-system/components/overlay/types/focus-search.type";
import { Modal } from "@/design-system/components/overlay/ui/modal";
import { Kbd } from "@/design-system/components/typography/kbd";
import { P } from "@/design-system/components/typography/ui/p";
import { useQueryParam } from "@/design-system/hooks/use-query-param";
import { useSearch } from "@/design-system/hooks/use-search";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import type {
  SearchIndex,
  SearchIndexItem,
} from "@/design-system/types/search.type";
import { t } from "@/libs/i18n";
import { back } from "@/utils/client/navigation";
import { createContext, useContext, useState } from "react";

type FocusTriggerContextValue = {
  modalKey: string;
  queryKey: string;
  index: SearchIndex;
  onResultSelect?: (result: SearchIndexItem) => void;
};

const FocusTriggerContext = createContext<FocusTriggerContextValue | undefined>(
  undefined,
);

const useFocusTriggerContext = () => {
  const context = useContext(FocusTriggerContext);
  if (!context)
    throw new Error(
      "useFocusTriggerContext must be used within FocusSearch.Root",
    );
  return context;
};

const FocusTriggerRoot = <T,>(props: FocusSearchRootProps<T>) => {
  const { children, modalKey, queryKey, index, onResultSelect } = props;
  const { isOpen, open, close } = usePopModal(modalKey);

  return (
    <FocusTriggerContext.Provider
      value={{
        modalKey,
        queryKey,
        index: index as SearchIndex,
        onResultSelect: onResultSelect as
          | ((result: SearchIndexItem) => void)
          | undefined,
      }}
    >
      <Modal.Root
        modalKey={modalKey}
        opened={isOpen}
        open={open}
        close={close}
        size="sm"
      >
        {children}
      </Modal.Root>
    </FocusTriggerContext.Provider>
  );
};

const FocusSearchResultItem = (props: FocusSearchResultItemProps) => {
  const { result, onResultSelect, ...restProps } = props;
  const { theme } = useThemeStore();

  return (
    <VStack
      gap={2}
      rounded={theme.radii.component}
      p={4}
      cursor="pointer"
      transition="200ms"
      _hover={{ bg: "bg.subtle" }}
      onClick={() => onResultSelect?.(result)}
      {...restProps}
    >
      <P>{result.title}</P>
      <P color="fg.subtle">{result.description}</P>
    </VStack>
  );
};

const FocusSearchBody = () => {
  const { queryKey, index, onResultSelect } = useFocusTriggerContext();
  const { queryValue } = useQueryParam(queryKey);
  const [query, setQuery] = useState<string>(queryValue ?? "");

  const { results, recentResults, addRecent, clearAllRecent } = useSearch(
    queryKey,
    query,
    index,
  );

  const hasQuery = !!query.trim();

  function handleValueChange(value: string) {
    setQuery(value);
  }

  function handleSelect(result: SearchIndexItem) {
    addRecent(result.id);
    onResultSelect?.(result);
    back();
  }

  // function handleClearRecent(result: SearchIndexItem) {
  //   clearRecent(result.id);
  // }

  return (
    <VStack gap={2} py={2}>
      <HStack px={2}>
        <SearchInput
          queryKey={queryKey}
          placeholder={t["settings.search.placeholder"]()}
          onValueChange={handleValueChange}
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
                  minH="250px"
                  justify="center"
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
                    <FocusSearchResultItem
                      key={result.id}
                      result={result}
                      onResultSelect={handleSelect}
                    />
                  ))}
                </>
              )}
            </>
          )}

          {hasQuery && (
            <>
              {results.length === 0 && <FeedbackNoResult query={query} />}
              {results.length > 0 &&
                results.map((result) => (
                  <FocusSearchResultItem
                    key={result.id}
                    result={result}
                    onResultSelect={handleSelect}
                  />
                ))}
            </>
          )}
        </VStack>
      </VScrollContainer>
    </VStack>
  );
};

const FocusSearchFooter = () => (
  <HStack align="center" gap={4}>
    <HStack align="center" gap={2}>
      <Kbd fontSize="sm">↑</Kbd>
      <Kbd fontSize="sm">↓</Kbd>
      <P fontSize="xs" color="fg.subtle">
        {t["common.navigate"]()}
      </P>
    </HStack>
    <HStack align="center" gap={2}>
      <Kbd fontSize="sm">↵</Kbd>
      <P fontSize="xs" color="fg.subtle">
        {t["common.select"]()}
      </P>
    </HStack>
    <HStack align="center" gap={2}>
      <Kbd>Esc</Kbd>
      <P fontSize="xs" color="fg.subtle">
        {t["common.close"]()}
      </P>
    </HStack>
  </HStack>
);

const FocusSearchTrigger = ({ children }: { children: React.ReactNode }) => {
  const { modalKey } = useFocusTriggerContext();
  const { isOpen, open, close } = usePopModal(modalKey);

  return (
    <Modal.Root
      modalKey={modalKey}
      opened={isOpen}
      open={open}
      close={close}
      size="sm"
    >
      <Modal.Trigger>{children}</Modal.Trigger>
      <Modal.Content>
        <Modal.Body display="flex" flexDir="column" p={0}>
          <FocusSearchBody />
        </Modal.Body>
        <Modal.Footer borderTop="1px solid" borderColor="border.subtle">
          <FocusSearchFooter />
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};

export const FocusSearch = {
  Root: FocusTriggerRoot,
  Trigger: FocusSearchTrigger,
  Body: FocusSearchBody,
  Footer: FocusSearchFooter,
};
