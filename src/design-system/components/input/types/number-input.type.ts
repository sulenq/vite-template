// src/design-system/components/input/types/number-input.type.ts

import type { ComponentPropsWithRef } from "react";

import { NumberInput as ChakraNumberInput } from "@chakra-ui/react";

export type NumberInputProps = NumberInputRootProps & {
  placeholder?: string;
  inputProps?: NumberInputInputProps;
  onValueChange?: (details: { value: number; formattedValue: string }) => void;
};

export type SteppedNumberInputProps = NumberInputRootProps & {
  placeholder?: string;
  size?: NumberInputRootProps["size"];
  inputProps?: NumberInputInputProps;
  onValueChange?: (details: { value: number; formattedValue: string }) => void;
};

export type NumberInputHiddenSyncProps = {
  value: string;
  inputProps?: NumberInputInputProps;
};

type NumberInputRootProps = Omit<ChakraNumberInput.RootProps, "onValueChange">;

type NumberInputInputProps = ComponentPropsWithRef<"input">;
