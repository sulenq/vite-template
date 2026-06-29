// src/libs/i18n/type.ts

import type { t } from "@/libs/i18n/-typed";

export type TranslationKey = keyof typeof t;
