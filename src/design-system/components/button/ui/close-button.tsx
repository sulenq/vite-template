// src/design-system/components/button/ui/close-button.tsx

"use client";

import type { IconButtonProps } from "@/design-system/components/button/types/button.type";
import { IconButton } from "@/design-system/components/button/ui/button";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { IconX } from "@tabler/icons-react";
import { forwardRef } from "react";

export const CloseButton = forwardRef<
  HTMLButtonElement,
  IconButtonProps & { boxSize?: number | string }
>(function CloseButton(props, ref) {
  // Props
  const { boxSize, ...restProps } = props;

  return (
    <IconButton ref={ref} {...restProps}>
      <AppIcon icon={IconX} boxSize={boxSize} />
    </IconButton>
  );
});
