// src/design-system/components/icon/types/app-icon.type.ts

import type { IconProps } from "@chakra-ui/react";
import type {
  TablerIcon,
  IconProps as TablerIconProps,
} from "@tabler/icons-react";
import type { LucideIcon, LucideProps } from "lucide-react";

export type AppLucideIconProps = IconProps & {
  icon?: LucideIcon;
  lucideIconProps?: LucideProps;
};

export type AppTablerIconProps = IconProps & {
  icon?: TablerIcon;
  tablerIconProps?: TablerIconProps;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};
