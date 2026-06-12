// src/design-system/components/icon/ui/lucide-icon.tsx

"use client";

import { type LucideIcon, type LucideProps } from "lucide-react";

interface LucideIconProps extends LucideProps {
  icon?: LucideIcon;
}

export function LucideIcon(props: LucideIconProps) {
  // Props
  const {
    icon: LucideIcon,
    size = 24,
    strokeWidth = 1.75,
    ...restProps
  } = props;

  return (
    LucideIcon && (
      <LucideIcon size={size} strokeWidth={strokeWidth} {...restProps} />
    )
  );
}
