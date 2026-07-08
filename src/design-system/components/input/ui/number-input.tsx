// src/design-system/components/input/ui/number-input.tsx

import { IconButton } from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type {
  NumberInputProps,
  SteppedNumberInputProps,
} from "@/design-system/components/input/types/number-input.type";
import { HStack } from "@/design-system/components/layout/ui/stack";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

export const NumberInput = (props: NumberInputProps) => {
  // Props
  const { placeholder, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <ChakraNumberInput.Root {...restProps}>
      <ChakraNumberInput.Control />

      <ChakraNumberInput.Input
        placeholder={placeholder}
        rounded={theme.radii.component}
      />
    </ChakraNumberInput.Root>
  );
};

export const SteppedNumberInput = (props: SteppedNumberInputProps) => {
  // Props
  const { placeholder, size, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <ChakraNumberInput.Root size={size} w={"min"} {...restProps}>
      <HStack align={"center"} gap={2}>
        <ChakraNumberInput.DecrementTrigger asChild>
          <IconButton flex={0} variant={"outline"} size={size}>
            <AppTablerIcon icon={IconMinus} />
          </IconButton>
        </ChakraNumberInput.DecrementTrigger>

        <ChakraNumberInput.Input
          placeholder={placeholder}
          flex={1}
          minW={"calc(24px + 3ch)"}
          textAlign={"center"}
          rounded={theme.radii.component}
        />

        <ChakraNumberInput.IncrementTrigger asChild>
          <IconButton flex={0} variant={"outline"} size={size}>
            <AppTablerIcon icon={IconPlus} />
          </IconButton>
        </ChakraNumberInput.IncrementTrigger>
      </HStack>
    </ChakraNumberInput.Root>
  );
};
