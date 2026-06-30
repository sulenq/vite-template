// src/design-system/components/typography/ui/span.tsx

import { Span as ChakraSpan } from "@chakra-ui/react";
import type { SpanProps as ChakraSpanProps } from "@chakra-ui/react";

export interface SpanProps extends ChakraSpanProps {}

export const Span = (props: SpanProps) => {
  return <ChakraSpan {...props} />;
};
