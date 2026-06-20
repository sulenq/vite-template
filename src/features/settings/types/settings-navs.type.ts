import type { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";

export type SettingsNavKey = keyof typeof SETTINGS_NAVS;

export type SettingsNavitem = SettingsNavKey | "divider";
