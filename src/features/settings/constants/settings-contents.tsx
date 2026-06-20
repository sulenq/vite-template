// src/features/settings/constants/settings-contents.tsx

import type { SettingNavKey } from "@/features/settings/types/settings-navs.type";

export const SETTINGS_CONTENTS = {
  profile: <>Profile</>,
  account: <>Account</>,
  privacy: <>Privacy</>,
  notification: <>Notification</>,
  appearance: <>Appearance</>,
  language: <>Language</>,
  datetime: <>Date Time</>,
  integration: <>Integration</>,
  api: <>API</>,
  support: <>Support</>,
  about: <>About</>,
} as const satisfies Record<SettingNavKey, React.ReactNode>;
