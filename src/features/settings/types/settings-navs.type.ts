import type { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";

export type SettingNavKey = keyof typeof SETTINGS_NAVS;

export type SettingsNavitem = SettingNavKey | "divider";
