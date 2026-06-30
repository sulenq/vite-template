// src/design-system/hooks/use-is-small-viewport.ts

import { SM_SCREEN_BREAKPOINT } from "@/design-system/constants/styles";
import { useViewport } from "@/design-system/hooks/use-viewport";

export const useIsSmallViewport = () => {
  // Hooks
  const viewport = useViewport();

  return viewport.width < parseInt(SM_SCREEN_BREAKPOINT);
};
