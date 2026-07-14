// src/design-system/components/icon/ui/app-icon.tsx

import type { AppIconProps } from "@/design-system/components/icon/types/app-icon.type";
import { Icon } from "@/design-system/components/icon/ui/icon";

export const AppIcon = (props: AppIconProps) => {
  // Props
  const { icon: IconComponent, size = "md", boxSize, ...restProps } = props;

  // Constants
  const sizes = {
    xs: 3,
    sm: 4,
    md: 5,
    lg: 6,
    xl: 7,
  };

  return (
    <Icon boxSize={boxSize ?? sizes[size as keyof typeof sizes]} {...restProps}>
      <IconComponent />
    </Icon>
  );
};
