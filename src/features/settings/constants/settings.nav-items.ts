// src/features/settings/constants/settings-nav-items.tsx

import type { SettingsNavitem } from "@/features/settings/types/settings-navs.type";

export const SETTINGS_NAV_ITEMS = [
  "profile",
  "account",
  "privacy",
  "notifications",

  "divider",

  "appearance",
  "language",
  "datetime",

  "divider",

  "integrations",
  "api",

  "divider",

  "support",
  "about",
] as const satisfies readonly SettingsNavitem[];
