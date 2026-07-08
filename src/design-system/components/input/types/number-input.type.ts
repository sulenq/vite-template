// src/design-system/components/input/types/number-input.type.ts

import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";

export type NumberInputProps = ChakraNumberInput.RootProps & {
  placeholder?: string;
};

export type SteppedNumberInputProps = ChakraNumberInput.RootProps & {
  placeholder?: string;
};
