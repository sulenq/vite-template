// src/design-system/components/feedback/ui/feedback-state.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import { VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/p";

const FeedbackState = (props: FeedbackStateProps) => {
  // Props
  const { icon, title, description, children, ...restProps } = props;

  // States
  const isTitleString = typeof title === "string";
  const isDescriptionString = typeof description === "string";

  return (
    <VStack align={"center"} gap={1} p={4} {...restProps}>
      {icon}

      {isTitleString && (
        <P textAlign={"center"} fontWeight={"semibold"}>
          {title}
        </P>
      )}

      {!isTitleString && title}

      {isDescriptionString && (
        <P maxW={"300px"} textAlign={"center"} color={"fg.subtle"}>
          {description}
        </P>
      )}

      {!isDescriptionString && description}

      {children}
    </VStack>
  );
};

export default FeedbackState;
