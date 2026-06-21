// src/design-system/components/feedback-state/feedback-no-data.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { VStack } from "@/design-system/components/layout/ui/container";
import { MIN_H_FEEDBACK_CONTAINER } from "@/design-system/constants/styles";
import { IconHourglassEmpty } from "@tabler/icons-react";

export default function FeedbackNoData(props: FeedbackStateProps) {
  // Props
  const { title, description, icon, children, ...restProps } = props;

  return (
    <VStack
      m={"auto"}
      align={"center"}
      minH={MIN_H_FEEDBACK_CONTAINER}
      justify={"center"}
      {...restProps}
    >
      <FeedbackState
        icon={icon ?? <AppTablerIcon icon={IconHourglassEmpty} />}
        title={title}
        description={description}
        maxW={"300px"}
      />

      {children}
    </VStack>
  );
}
