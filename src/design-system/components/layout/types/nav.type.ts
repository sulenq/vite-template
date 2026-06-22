// src/design-system/components/layout/types/nav-list.type.ts

import type { TablerIcon } from "@tabler/icons-react";

export type Nav = {
  icon?: TablerIcon;
  label?: string;
  labelKey?: string;
};

export type RouteNav = {
  path?: string;
  backPath?: string;
} & Nav;
