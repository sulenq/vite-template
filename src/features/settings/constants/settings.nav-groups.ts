// src/features/settings/constants/settings.nav-groups.ts

import type { SettingNavKey } from "@/features/settings/types/settings-navs.type";
import type { NavGroupItem } from "@/shared/types/nav.type";

export const SETTINGS_NAV_GROUPS: NavGroupItem<SettingNavKey>[] = [
  {
    titleKey: "settings.group.account.title",
    list: ["profile", "account", "privacy", "notification"],
  },

  {
    titleKey: "settings.group.preferences.title",
    list: ["appearance", "language", "datetime"],
  },

  {
    titleKey: "settings.group.system.title",
    list: ["integration", "advanced"],
  },

  {
    titleKey: "settings.group.help.title",
    list: ["support", "about"],
  },
];
