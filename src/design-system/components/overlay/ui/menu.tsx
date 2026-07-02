// src/design-system/components/overlay/ui/menu.tsx

import { Box } from "@/design-system/components/layout/ui/box";
import type {
  MenuContentProps,
  MenuItemProps,
  MenuRootProps,
  MenuTriggerProps,
} from "@/design-system/components/overlay/types/menu.type";
import { Portal } from "@/design-system/components/utilities/portal";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { Menu as ChakraMenu } from "@chakra-ui/react";

const MenuRoot = (props: MenuRootProps) => {
  const { positioning, ...restProps } = props;

  return (
    <ChakraMenu.Root
      positioning={{ hideWhenDetached: true, ...positioning }}
      {...restProps}
    />
  );
};

const MenuTrigger = (props: MenuTriggerProps) => {
  return <ChakraMenu.Trigger {...props} />;
};

const MenuContent = (props: MenuContentProps) => {
  // Props
  const { portalled = true, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <Portal disabled={!portalled}>
      <ChakraMenu.Positioner>
        <ChakraMenu.Content
          bg={"bg.body"}
          rounded={theme.radii.container}
          border={"1px solid"}
          borderColor={"border.subtle"}
          shadow={"md"}
          {...restProps}
        />
      </ChakraMenu.Positioner>
    </Portal>
  );
};

const MenuItem = (props: MenuItemProps) => {
  // Props
  const { disabled, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <Box cursor={disabled ? "not-allowed" : undefined}>
      <ChakraMenu.Item
        disabled={disabled}
        rounded={theme.radii.component}
        cursor={"pointer"}
        pointerEvents={disabled ? "none" : "auto"}
        userSelect={"none"}
        {...restProps}
      />
    </Box>
  );
};

export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
};
