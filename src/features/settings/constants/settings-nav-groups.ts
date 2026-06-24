// src/features/settings/constants/settings-nav-groups.tsx

import type { SettingsNavGroupItem } from "@/features/settings/types/settings-navs.type";

export const SETTINGS_NAV_GROUPS: readonly SettingsNavGroupItem[] = [
  {
    labelKey: "settings.group.account.title",
    list: ["profile", "account", "privacy", "notification"],
  },

  {
    labelKey: "settings.group.preferences.title",
    list: ["appearance", "language", "datetime"],
  },

  {
    labelKey: "settings.group.system.title",
    list: ["integration", "advanced"],
  },

  {
    labelKey: "settings.group.help.title",
    list: ["support", "about"],
  },
];
