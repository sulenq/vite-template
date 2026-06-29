import { SM_SCREEN_BREAKPOINT } from "@/design-system/shared/constants/styles";
import { useViewport } from "@/design-system/shared/hooks/use-viewport";

export const useIsSmallViewport = () => {
  // Hooks
  const viewport = useViewport();

  return viewport.width < parseInt(SM_SCREEN_BREAKPOINT);
};
