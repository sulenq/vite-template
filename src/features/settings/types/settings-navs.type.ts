// src/features/settings/types/settings-navs.type.ts

import type { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";
import type { TranslationKey } from "@/libs/i18n/type";

export type SettingNavKey = keyof typeof SETTINGS_NAVS;

export type GroupLabelKey = Extract<
  TranslationKey,
  `settings.group.${string}.title`
>;

export type SettingsNavGroupItem = {
  label?: string;
  labelKey?: GroupLabelKey;
  list: SettingNavKey[];
};
