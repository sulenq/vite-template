// src/design-system/components/icon/ui/app-icon.tsx

import {
  LUCIDE_ICON_BASE_ICON_BOX_SIZE,
  TABLER_ICON_BASE_ICON_BOX_SIZE,
} from "@/design-system/constants/styles";
import type {
  AppLucideIconProps,
  AppTablerIconProps,
} from "@/design-system/components/icon/types/app-icon.type";
import { LucideIcon } from "@/design-system/components/icon/ui/lucide-icon";
import { Icon } from "@/design-system/components/icon/ui/icon";

export const AppLucideIcon = (props: AppLucideIconProps) => {
  // Props
  const { icon, lucideIconProps, ...restProps } = props;

  return (
    icon && (
      <Icon boxSize={LUCIDE_ICON_BASE_ICON_BOX_SIZE} {...restProps}>
        <LucideIcon icon={icon} {...lucideIconProps} />
      </Icon>
    )
  );
};

export const AppTablerIcon = (props: AppTablerIconProps) => {
  // Props
  const { icon: TablerIcon, tablerIconProps, ...restProps } = props;

  return (
    TablerIcon && (
      <Icon
        boxSize={TABLER_ICON_BASE_ICON_BOX_SIZE}
        strokeWidth={1.8}
        {...restProps}
      >
        <TablerIcon {...tablerIconProps} />
      </Icon>
    )
  );
};
