// src/features/settings/hooks/use-settings-nav-search.ts

import { useSearch } from "@/libs/search/use-search";
import { useSettingsNavIndex } from "@/features/settings/utils/settings.nav-index";

export const SETTINGS_SEARCH_QUERY_KEY = "settings-search-query";

export function useSettingsNavSearch() {
  const index = useSettingsNavIndex();
  return useSearch(index, SETTINGS_SEARCH_QUERY_KEY);
}
