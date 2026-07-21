// src/shared/constants/app.navs.ts

import type { NavItem } from "@/shared/types/nav.type";
import {
  ChartLineIcon,
  ClipboardListIcon,
  HouseIcon,
  ReceiptIcon,
  UsersIcon,
} from "lucide-react";

export const APP_NAVS_MAP = {
  home: {
    icon: HouseIcon,
    titleKey: "app.nav.home",
  },
  users: {
    icon: UsersIcon,
    titleKey: "app.nav.users",
  },
  analytics: {
    icon: ChartLineIcon,
    titleKey: "app.nav.analytics",
  },
  reports: {
    icon: ClipboardListIcon,
    titleKey: "app.nav.reports",
  },
  billing: {
    icon: ReceiptIcon,
    titleKey: "app.nav.billing",
  },
} as const satisfies Record<string, NavItem>;
