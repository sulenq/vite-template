//src/features/settings/components/settings.search.tsx

"use client";

import { FeedbackNoResult } from "@/design-system/components/feedback/ui/feedback-no-result";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { HStack, VStack } from "@/design-system/components/layout/ui/container";
import { FocusSearchTrigger } from "@/design-system/components/overlay/ui/focus-search";
import { P } from "@/design-system/components/typography/ui/p";
import { useSearchParam } from "@/design-system/hooks/use-search-param";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { useSettingsNavSearch } from "@/features/settings/hooks/use-settings-nav-search";
import { t } from "@/libs/i18n";
import { useEffect } from "react";

export interface SettingsSearchTriggerProps {
  children: React.ReactNode;
  modalKey: string;
  queryKey: string;
}

export const SettingsSearchTrigger = (props: SettingsSearchTriggerProps) => {
  // Props
  const { children, modalKey, queryKey, ...restProps } = props;

  return (
    <FocusSearchTrigger
      modalKey={modalKey}
      queryKey={queryKey}
      results={<SettingsSearchResults queryKey={queryKey} />}
      {...restProps}
    >
      {children}
    </FocusSearchTrigger>
  );
};

interface SettingsSearchResultsProps {
  queryKey: string;
}

const SettingsSearchResults = (props: SettingsSearchResultsProps) => {
  // Props
  const { queryKey } = props;

  // Store
  const { theme } = useThemeStore();

  // Hooks
  const {
    recentResults,
    addRecent,
    clearRecent,
    clearAllRecent,
    setQuery,
    results,
  } = useSettingsNavSearch();
  const { queryValue } = useSearchParam(queryKey);

  // Derived Values
  const hasQuery = !!queryValue?.trim();

  useEffect(() => {
    setQuery(queryValue ?? "");
  }, [queryValue, setQuery]);

  return (
    <VStack gap={1}>
      {!hasQuery && recentResults.length === 0 && (
        <FeedbackState
          title={t["settings.search.empty.title"]()}
          description={t["settings.search.empty.description"]()}
          minH={"250px"}
          justify={"center"}
        />
      )}

      {!hasQuery && recentResults.length > 0 && (
        <>
          <HStack justify="space-between" px={4}>
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
            <VStack
              key={result.id}
              gap={2}
              rounded={theme.radii.component}
              p={4}
              cursor="pointer"
              transition="200ms"
              _hover={{ bg: "bg.subtle" }}
              onClick={() => clearRecent(result.id)}
            >
              <P>{result.title}</P>
              <P color="fg.subtle">{result.description}</P>
            </VStack>
          ))}
        </>
      )}

      {hasQuery &&
        results.length > 0 &&
        results.map((result) => (
          <VStack
            key={result.id}
            gap={2}
            rounded={theme.radii.component}
            p={4}
            cursor="pointer"
            transition="200ms"
            _hover={{ bg: "bg.subtle" }}
            onClick={() => addRecent(result.id)}
          >
            <P>{result.title}</P>
            <P color="fg.subtle">{result.description}</P>
          </VStack>
        ))}

      {hasQuery && results.length === 0 && (
        <FeedbackNoResult query={queryValue ?? ""} />
      )}
    </VStack>
  );
};
