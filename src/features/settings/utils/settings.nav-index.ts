// src/features/settings/utils/settings.nav-index.ts

import { SETTINGS_NAVS } from "@/features/settings/constants/settings.navs";
import { t } from "@/libs/i18n";
import type { SearchIndex } from "@/libs/search/types";
import type {
  SettingNav,
  SettingNavKey,
} from "@/features/settings/types/settings-navs.type";
import { useMemo } from "react";

export type SettingsNavSearchData = {
  navKey: SettingNavKey;
};

export function useSettingsNavIndex(): SearchIndex<SettingsNavSearchData> {
  return useMemo(
    () =>
      (Object.entries(SETTINGS_NAVS) as [SettingNavKey, SettingNav][]).map(
        ([navKey, nav]) => ({
          id: navKey,
          title: nav.titleKey
            ? t[nav.titleKey as keyof typeof t]({} as never)
            : navKey,
          description: nav.descriptionKey
            ? t[nav.descriptionKey as keyof typeof t]({} as never)
            : "",
          keywords: nav.keywords,
          data: { navKey },
        }),
      ),
    [],
  );
}
