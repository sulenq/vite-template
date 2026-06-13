import type { IconButtonProps } from "@/design-system/components/button/types/button.type";
import { IconButton } from "@/design-system/components/button/ui/button";
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import { useColorMode } from "@/design-system/hooks/use-color-mode";
import { MoonIcon, SunIcon } from "lucide-react";

interface ColorModeToggleButtonProps extends IconButtonProps {}

export const ColorModeToggleButton = (props: ColorModeToggleButtonProps) => {
  // Hooks
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton {...props} onClick={toggleColorMode}>
      <AppLucideIcon icon={colorMode === "light" ? SunIcon : MoonIcon} />
    </IconButton>
  );
};
