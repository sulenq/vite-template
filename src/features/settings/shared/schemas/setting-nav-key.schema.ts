// src/features/settings/schemas/settings-nav-key.schema.ts

import { z } from "zod";
import { SETTINGS_NAVS } from "@/features/settings/shared/constants/settings.navs";
import type { SettingNavKey } from "@/features/settings/shared/types/settings-navs.type";

export const settingsNavKeySchema = z.enum(
  Object.keys(SETTINGS_NAVS) as [SettingNavKey, ...SettingNavKey[]],
);
