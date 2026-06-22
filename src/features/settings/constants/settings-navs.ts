// src/features/settings/constants/settings-navs.tsx

import type { Nav } from "@/design-system/components/layout/types/nav.type";
import {
  IconBell,
  IconClock,
  IconDeviceDesktop,
  IconHelpCircle,
  IconInfoCircle,
  IconKey,
  IconLanguage,
  IconLock,
  IconPlug,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";

export const SETTINGS_NAVS = {
  profile: {
    icon: IconUser,
    label: "Profile",
  },
  account: {
    icon: IconUserCircle,
    label: "Account",
  },
  privacy: {
    icon: IconLock,
    label: "Privacy",
  },
  notification: {
    icon: IconBell,
    label: "Notification",
  },
  appearance: {
    icon: IconDeviceDesktop,
    label: "Appearance",
  },
  language: {
    icon: IconLanguage,
    label: "Language",
  },
  datetime: {
    icon: IconClock,
    label: "Date & Time",
  },
  integration: {
    icon: IconPlug,
    label: "Integration",
  },
  api: {
    icon: IconKey,
    label: "API",
  },
  support: {
    icon: IconHelpCircle,
    label: "Support",
  },
  about: {
    icon: IconInfoCircle,
    label: "About",
  },
} satisfies Record<string, Nav>;
