// src/design-system/components/feedback-state/feedback-no-data.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { VStack } from "@/design-system/components/layout/ui/container";
import { MIN_H_FEEDBACK_CONTAINER } from "@/design-system/constants/styles";
import { t } from "@/libs/i18n";
import { IconHourglassEmpty } from "@tabler/icons-react";

export const FeedbackNoData = (props: FeedbackStateProps) => {
  // Props
  const {
    icon,
    tablerIcon = IconHourglassEmpty,
    title = t["common.no_data"](),
    description,
    children,
    ...restProps
  } = props;

  return (
    <VStack
      align={"center"}
      justify={"center"}
      minH={MIN_H_FEEDBACK_CONTAINER}
      m={"auto"}
      {...restProps}
    >
      <FeedbackState
        icon={icon}
        tablerIcon={tablerIcon}
        title={title}
        description={description}
        maxW={"300px"}
      />

      {children}
    </VStack>
  );
};
