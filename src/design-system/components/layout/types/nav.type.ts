// src/design-system/components/layout/types/nav-list.type.ts

export type Nav = {
  icon?: React.ReactNode;
  label?: string;
  labelKey?: string;
};

export type RouteNav = {
  path?: string;
  backPath?: string;
} & Nav;
