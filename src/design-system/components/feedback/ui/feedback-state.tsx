// src/design-system/components/feedback/ui/feedback-state.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/ui/p";

const FeedbackState = (props: FeedbackStateProps) => {
  // Props
  const { icon, tablerIcon, title, description, children, ...restProps } =
    props;

  // States
  const isTitleString = typeof title === "string";
  const isDescriptionString = typeof description === "string";

  return (
    <VStack align={"center"} gap={4} p={4} {...restProps}>
      {tablerIcon ? (
        <AppTablerIcon
          icon={tablerIcon}
          boxSize={9}
          strokeWidth={1.5}
          color={"fg.subtle"}
        />
      ) : (
        icon
      )}

      <VStack align={"center"} gap={2} maxW={"300px"}>
        {isTitleString && (
          <P textAlign={"center"} fontWeight={"medium"}>
            {title}
          </P>
        )}

        {!isTitleString && title}

        {isDescriptionString && (
          <P textAlign={"center"} color={"fg.subtle"}>
            {description}
          </P>
        )}

        {!isDescriptionString && description}
      </VStack>

      {children}
    </VStack>
  );
};

export default FeedbackState;
