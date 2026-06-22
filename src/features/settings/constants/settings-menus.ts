// src/features/settings/constants/settings-nav-items.tsx

import type { SettingsNavitem } from "@/features/settings/types/settings-navs.type";

export const SETTINGS_MENUS = [
  "profile",
  "account",
  "privacy",
  "notification",

  "separator",

  "appearance",
  "language",
  "datetime",

  "separator",

  "integration",
  "api",

  "separator",

  "support",
  "about",
] as const satisfies readonly SettingsNavitem[];
