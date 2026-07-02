import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  children?: React.ReactNode;
  controlProps?: ChakraCheckbox.ControlProps;
}
