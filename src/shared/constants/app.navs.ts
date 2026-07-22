// src/shared/constants/app.navs.ts

import type { NavItem } from "@/shared/types/nav.type";
import {
  ClipboardListIcon,
  HouseIcon,
  ReceiptIcon,
  UsersIcon,
} from "lucide-react";

export const APP_NAVS_MAP = {
  home: {
    icon: HouseIcon,
    titleKey: "app.navs.home",
    pathname: "/portal/home",
  },

  users: {
    icon: UsersIcon,
    titleKey: "app.navs.users",
    pathname: "/portal/home",
  },

  reports: {
    icon: ClipboardListIcon,
    titleKey: "app.navs.reports",
    pathname: "/portal/home",
  },
  "reports.analytics": {
    titleKey: "app.navs.analytics",
    pathname: "/portal/reports/analytics",
  },
  "reports.income-statement": {
    titleKey: "app.navs.reports",
    pathname: "/portal/reports/income-statement",
  },

  billing: {
    icon: ReceiptIcon,
    titleKey: "app.navs.billing",
    pathname: "/portal/home",
  },
} as const satisfies Record<string, NavItem>;
