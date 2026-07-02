import type {
  CheckIndicatorProps,
  DotIndicatorProps,
  RadioIndicatorProps,
} from "@/design-system/components/feedback/types/indicator.type";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { Circle } from "@/design-system/components/layout/ui/box";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { IconCheck } from "@tabler/icons-react";

export const DotIndicator = (props: DotIndicatorProps) => {
  // Props
  const { checked = false, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <Circle
      aspectRatio={1}
      w={"6px"}
      bg={checked ? `${theme.colorPalette}.solid` : "border.muted"}
      {...restProps}
    />
  );
};

export const CheckIndicator = (props: CheckIndicatorProps) => {
  // Props
  const { checked = false, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  if (!checked) return null;

  return (
    <AppTablerIcon
      icon={IconCheck}
      boxSize={4}
      color={`${theme.colorPalette}.solid`}
      {...restProps}
    />
  );
};

export const RadioIndicator = (props: RadioIndicatorProps) => {
  // Props
  const { checked = false, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <Circle
      w={"14px"}
      h={"14px"}
      bg={checked ? `${theme.colorPalette}.muted` : ""}
      border={checked ? "3px solid" : "1px solid"}
      borderColor={checked ? `${theme.colorPalette}.solid` : "border.muted"}
      cursor={"pointer"}
      transition={"200ms"}
      {...restProps}
    />
  );
};
