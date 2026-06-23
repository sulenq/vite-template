// src/design-system/components/feedback/ui/feedback-forbidden.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { VStack } from "@/design-system/components/layout/ui/container";
import { MIN_H_FEEDBACK_CONTAINER } from "@/design-system/constants/styles";
import { t } from "@/libs/i18n";
import { IconForbid } from "@tabler/icons-react";

export const FeedbackForbidden = (props: FeedbackStateProps) => {
  // Props
  const {
    icon,
    tablerIcon = IconForbid,
    title = t["common.forbidden"](),
    description = t["common.dont_have_access"](),
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
