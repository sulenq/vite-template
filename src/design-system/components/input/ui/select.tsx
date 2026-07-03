// src/design-system/components/input/ui/select.tsx

import type { SelectProps } from "@/design-system/components/input/types/select.type";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import {
  Select as ChakraSelect,
  Portal,
  createListCollection,
} from "@chakra-ui/react";

export default function Select(props: SelectProps) {
  // Props
  const {
    value,
    onValueChange,
    selectOptions = [],
    placeholder = "Select option",
    size = "md",
    portalled = true,
    portalRef,
    ...restProps
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // States
  const collection = createListCollection({
    items: selectOptions,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  return (
    <ChakraSelect.Root
      collection={collection}
      size={size}
      value={value ? [value] : undefined}
      colorPalette={"neutral"}
      onValueChange={(e) => {
        if (e.value[0]) {
          onValueChange?.(e.value[0]);
        }
      }}
      {...restProps}
    >
      <ChakraSelect.HiddenSelect />

      <ChakraSelect.Control>
        <ChakraSelect.Trigger
          rounded={theme.radii.component}
          cursor={"pointer"}
        >
          <ChakraSelect.ValueText
            fontSize={props?.fontSize}
            placeholder={placeholder}
          />
        </ChakraSelect.Trigger>

        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator boxSize={5} color={props?.color} />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>

      <Portal container={portalRef} disabled={!portalled}>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content
            gap={1}
            minW={"80px"}
            bg={"bg.body"}
            rounded={theme?.radii.container}
            border={"1px solid {colors.border.subtle}"}
            shadow={"sm"}
          >
            {collection.items.map((item) => (
              <ChakraSelect.Item
                item={item}
                key={item.value}
                px={2}
                py={1.5}
                rounded={theme?.radii.component}
                cursor={"pointer"}
                _hover={{
                  bg: "bg.subtle",
                }}
                _selected={{
                  bg: "bg.subtle",
                }}
              >
                {item.label}

                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
}
