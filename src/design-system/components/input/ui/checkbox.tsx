import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import type { CheckboxRootProps as ChakraCheckboxRootProps } from "@chakra-ui/react";

export interface CheckboxProps extends ChakraCheckboxRootProps {
  children?: React.ReactNode;
}

export const Checkbox = (props: CheckboxProps) => {
  // Props
  const { children, ...restProps } = props;

  return (
    <ChakraCheckbox.Root {...restProps}>
      <ChakraCheckbox.HiddenInput />
      <ChakraCheckbox.Control />
      {children}
    </ChakraCheckbox.Root>
  );
};
