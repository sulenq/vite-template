// src/design-system/components/feedback/ui/feedback-not-found.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import { VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/p";

export default function FeedbackNotFound(props: FeedbackStateProps) {
  // Props
  const { children, ...restProps } = props;

  return (
    <VStack
      m={"auto"}
      minH={"100px"}
      justify={"center"}
      align={"center"}
      color={"fg.subtle"}
      gap={1}
      {...restProps}
    >
      <P textAlign={"center"}>Not Found</P>

      {children}
    </VStack>
  );
}
