// src/features/settings/hooks/use-settings-nav-search.ts

import { useSearch } from "@/design-system/hooks/use-search";
import { useSettingsNavIndex } from "@/features/settings/utils/settings.nav-index";
import { useEffect } from "react";

export const SETTINGS_SEARCH_QUERY_KEY = "settings-search-query";

type UseSettingsNavSearchProps = {
  queryValue: string;
};

export function useSettingsNavSearch(props: UseSettingsNavSearchProps) {
  // Props
  const { queryValue } = props;

  // Hooks
  const index = useSettingsNavIndex();
  const searchHooks = useSearch(SETTINGS_SEARCH_QUERY_KEY, index);
  const setQueryState = searchHooks.setQueryState;

  useEffect(() => {
    if (queryValue) setQueryState(queryValue);
  }, [queryValue, setQueryState]);

  return searchHooks;
}
