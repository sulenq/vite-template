// src/design-system/components/input/ui/number-input.tsx

import { useRef } from "react";

import { IconButton } from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type {
  NumberInputProps,
  SteppedNumberInputProps,
} from "@/design-system/components/input/types/number-input.type";
import { HStack } from "@/design-system/components/layout/ui/stack";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { dispatchNativeInputEvent } from "@/shared/utils/dom/dispatch-native-input-event";
import { mergeRefs } from "@/shared/utils/react/merge-refs";
import { cssCalc } from "@/shared/utils/style/css-calc";
import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

function toSyncValue(valueAsNumber: number): string {
  return Number.isNaN(valueAsNumber) ? "" : String(valueAsNumber);
}

export const NumberInput = (props: NumberInputProps) => {
  // Props
  const { placeholder, inputProps, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  const internalRef = useRef<HTMLInputElement>(null);

  return (
    <ChakraNumberInput.Root
      {...restProps}
      onValueChange={(details) => {
        restProps.onValueChange?.(details);

        if (internalRef.current) {
          dispatchNativeInputEvent(
            internalRef.current,
            toSyncValue(details.valueAsNumber),
          );
        }
      }}
    >
      <ChakraNumberInput.Input
        placeholder={placeholder}
        rounded={theme.radii.component}
        {...inputProps}
        ref={mergeRefs(internalRef, inputProps?.ref)}
      />

      <ChakraNumberInput.Control>
        <ChakraNumberInput.IncrementTrigger
          roundedTopRight={cssCalc(`${theme.radii.component} - 1px`)}
        />
        <ChakraNumberInput.DecrementTrigger
          roundedBottomRight={cssCalc(`${theme.radii.component} - 1px`)}
        />
      </ChakraNumberInput.Control>
    </ChakraNumberInput.Root>
  );
};

export const SteppedNumberInput = (props: SteppedNumberInputProps) => {
  // Props
  const { placeholder, size, inputProps, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  const internalRef = useRef<HTMLInputElement>(null);

  return (
    <ChakraNumberInput.Root
      size={size}
      w={"min"}
      {...restProps}
      onValueChange={(details) => {
        restProps.onValueChange?.(details);
        if (internalRef.current) {
          dispatchNativeInputEvent(
            internalRef.current,
            toSyncValue(details.valueAsNumber),
          );
        }
      }}
    >
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
          {...inputProps}
          ref={mergeRefs(internalRef, inputProps?.ref)}
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
