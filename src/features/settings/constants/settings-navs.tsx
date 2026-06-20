// src/features/settings/constants/settings-navs.tsx

import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type { Nav } from "@/design-system/components/layout/types/nav.type";
import {
  IconBell,
  IconClock,
  IconHelpCircle,
  IconInfoCircle,
  IconKey,
  IconLanguage,
  IconLock,
  IconPlug,
  IconSun,
  IconUser,
  IconUserCircle,
} from "@tabler/icons-react";

export const SETTINGS_NAVS = {
  profile: {
    icon: <AppTablerIcon icon={IconUser} />,
    label: "Profile",
  },
  account: {
    icon: <AppTablerIcon icon={IconUserCircle} />,
    label: "Account",
  },
  privacy: {
    icon: <AppTablerIcon icon={IconLock} />,
    label: "Privacy",
  },
  notifications: {
    icon: <AppTablerIcon icon={IconBell} />,
    label: "Notifications",
  },
  appearance: {
    icon: <AppTablerIcon icon={IconSun} />,
    label: "Appearance",
  },
  language: {
    icon: <AppTablerIcon icon={IconLanguage} />,
    label: "Language",
  },
  datetime: {
    icon: <AppTablerIcon icon={IconClock} />,
    label: "Date & Time",
  },
  integrations: {
    icon: <AppTablerIcon icon={IconPlug} />,
    label: "Integrations",
  },
  api: {
    icon: <AppTablerIcon icon={IconKey} />,
    label: "API",
  },
  support: {
    icon: <AppTablerIcon icon={IconHelpCircle} />,
    label: "Support",
  },
  about: {
    icon: <AppTablerIcon icon={IconInfoCircle} />,
    label: "About",
  },
} satisfies Record<string, Nav>;
