// src/design-system/components/input/ui/fieldset.tsx

import { forwardRef } from "react";
import { Fieldset as ChakraFieldset } from "@chakra-ui/react";

export type FieldsetProps = {
  legend?: React.ReactNode;
} & ChakraFieldset.RootProps;

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  function Fieldset(props, ref) {
    const { legend, children, ...restProps } = props;

    return (
      <ChakraFieldset.Root ref={ref} gap={4} {...restProps}>
        {legend && <ChakraFieldset.Legend>{legend}</ChakraFieldset.Legend>}

        <ChakraFieldset.Content>{children}</ChakraFieldset.Content>
      </ChakraFieldset.Root>
    );
  },
);

Fieldset.displayName = "Fieldset";
