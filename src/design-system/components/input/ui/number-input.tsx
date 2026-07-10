// src/design-system/components/input/ui/number-input.tsx

import { useRef } from "react";

import { IconButton } from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type {
  NumberInputProps,
  SteppedNumberInputProps,
} from "@/design-system/components/input/types/number-input.type";
import { HStack } from "@/design-system/components/layout/ui/flex-box";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { dispatchNativeInputEvent } from "@/shared/utils/dom/dispatch-native-input-event";
import { mergeRefs } from "@/shared/utils/react/merge-refs";
import { cssCalc } from "@/shared/utils/style/css-calc";
import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { VISUALLY_HIDDEN_INPUT_STYLE } from "@/design-system/constants/css-preset";

// `valueAsNumber` is NaN while the input is empty (Number("") === NaN).
function toSyncValue(valueAsNumber: number): string {
  return Number.isNaN(valueAsNumber) ? "" : String(valueAsNumber);
}

export const NumberInput = (props: NumberInputProps) => {
  // Props
  const { placeholder, inputProps, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  // Dedicated node for RHF — decoupled from the visible input, so whatever
  // Ark renders there (raw digits or a formatOptions-formatted string like
  // "€45.00") never touches what register()/getValues() reads. Must be
  // type="text" (visually hidden), NOT type="hidden" — React doesn't wire up
  // its synthetic event/value-tracking system the same way for type="hidden".
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  return (
    <ChakraNumberInput.Root
      {...restProps}
      onValueChange={(details) => {
        restProps.onValueChange?.({
          value: details.valueAsNumber,
          formattedValue: details.value,
        });
        if (hiddenInputRef.current) {
          dispatchNativeInputEvent(
            hiddenInputRef.current,
            toSyncValue(details.valueAsNumber),
          );
        }
      }}
    >
      <input
        type={"text"}
        style={VISUALLY_HIDDEN_INPUT_STYLE}
        tabIndex={-1}
        aria-hidden
        {...inputProps}
        ref={mergeRefs(hiddenInputRef, inputProps?.ref)}
      />
      <ChakraNumberInput.Input
        placeholder={placeholder}
        rounded={theme.radii.component}
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
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  return (
    <ChakraNumberInput.Root
      size={size}
      w={"min"}
      {...restProps}
      onValueChange={(details) => {
        restProps.onValueChange?.({
          value: details.valueAsNumber,
          formattedValue: details.value,
        });
        if (hiddenInputRef.current) {
          dispatchNativeInputEvent(
            hiddenInputRef.current,
            toSyncValue(details.valueAsNumber),
          );
        }
      }}
    >
      <input
        type={"text"}
        style={VISUALLY_HIDDEN_INPUT_STYLE}
        tabIndex={-1}
        aria-hidden
        {...inputProps}
        ref={mergeRefs(hiddenInputRef, inputProps?.ref)}
      />
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
