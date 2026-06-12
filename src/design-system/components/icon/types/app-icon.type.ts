// src/design-system/components/icon/types/app-icon.type.ts

import type { IconProps } from "@chakra-ui/react";
import type { LucideIcon, LucideProps } from "lucide-react";

export interface AppLucideIconProps extends IconProps {
  icon?: LucideIcon;
  lucideIconProps?: LucideProps;
}
