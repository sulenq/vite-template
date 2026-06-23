// src/features/settings/constants/settings-navs.tsx

import type { Nav } from "@/design-system/components/layout/types/nav.type";
import {
  IconAdjustmentsHorizontal,
  IconBell,
  IconClock,
  IconDeviceDesktop,
  IconHelpCircle,
  IconInfoCircle,
  IconLanguage,
  IconLock,
  IconPlug,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";

export const SETTINGS_NAVS = {
  profile: {
    icon: IconUser,
  },
  account: {
    icon: IconUserCircle,
  },
  privacy: {
    icon: IconLock,
  },
  notification: {
    icon: IconBell,
  },
  appearance: {
    icon: IconDeviceDesktop,
  },
  language: {
    icon: IconLanguage,
  },
  datetime: {
    icon: IconClock,
  },
  integration: {
    icon: IconPlug,
  },
  advanced: {
    icon: IconAdjustmentsHorizontal,
  },
  support: {
    icon: IconHelpCircle,
  },
  about: {
    icon: IconInfoCircle,
  },
} satisfies Record<string, Nav>;
