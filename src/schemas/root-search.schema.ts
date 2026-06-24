// src/routes/schemas/root-search.schema.ts

import { z } from "zod";
import { modalSchema } from "@/design-system/components/overlay/schemas/modal.schema";
import { settingsNavKeySchema } from "@/features/settings/schemas/setting-nav-key.schema";
import { searchInputQuerySchema } from "@/design-system/components/input/schemas/search-input.schema";

export const rootSearchSchema = z.object({
  activeModalKey: modalSchema.optional(),
  activeSettingNavKey: settingsNavKeySchema.optional(),
  search: searchInputQuerySchema,
});
