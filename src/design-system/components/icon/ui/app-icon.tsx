// src/design-system/components/icon/ui/app-icon

import { BASE_ICON_BOX_SIZE } from "@/design-system/chakra/constants/styles";
import type { AppLucideIconProps } from "@/design-system/components/icon/types/app-icon.type";
import { LucideIcon } from "@/design-system/components/icon/ui/lucide-icon";
import { Icon } from "@chakra-ui/react";

export const AppLucideIcon = (props: AppLucideIconProps) => {
  // Props
  const { icon, lucideIconProps, ...restProps } = props;

  return (
    icon && (
      <Icon boxSize={BASE_ICON_BOX_SIZE} {...restProps}>
        <LucideIcon icon={icon} {...lucideIconProps} />
      </Icon>
    )
  );
};

// TODO: Implement AppTablerIcon
export const AppTablerIcon = () => {};
