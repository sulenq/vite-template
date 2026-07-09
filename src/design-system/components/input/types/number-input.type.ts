// src/design-system/components/input/types/number-input.type.ts

import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";
import type { ComponentPropsWithRef } from "react";

type NumberInputInputProps = ComponentPropsWithRef<
  typeof ChakraNumberInput.Input
>;

export type NumberInputProps = ChakraNumberInput.RootProps & {
  placeholder?: string;
  inputProps?: NumberInputInputProps;
};

export type SteppedNumberInputProps = ChakraNumberInput.RootProps & {
  placeholder?: string;
  inputProps?: NumberInputInputProps;
};
