// src/features/settings/constants/settings-nav-items.tsx

import type { SettingsNavitem } from "@/features/settings/types/settings-navs.type";

export const SETTINGS_MENUS = [
  "profile",
  "account",
  "privacy",
  "notification",

  "divider",

  "appearance",
  "language",
  "datetime",

  "divider",

  "integration",
  "api",

  "divider",

  "support",
  "about",
] as const satisfies readonly SettingsNavitem[];
