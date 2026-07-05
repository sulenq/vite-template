import type { InputProps as ChakraInputProps } from "@chakra-ui/react";

export type InputProps = ChakraInputProps;

export type SearchInputProps = {
  queryKey?: string;
  value?: string;
  onValueChange?: (value: string) => void;
} & InputProps;
