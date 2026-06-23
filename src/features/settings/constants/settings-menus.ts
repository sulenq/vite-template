// src/features/settings/constants/settings-nav-items.tsx

import type { SettingsNavitem } from "@/features/settings/types/settings-navs.type";

export const SETTINGS_MENUS = [
  {
    list: ["profile", "account", "privacy", "notification"],
  },

  {
    list: ["appearance", "language", "datetime"],
  },

  {
    list: ["integration", "api"],
  },

  { list: ["support", "about"] },
] as SettingsNavitem[];
