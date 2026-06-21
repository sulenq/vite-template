// src/design-system/components/feedback/ui/feedback-retry.tsx

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { VStack } from "@/design-system/components/layout/ui/container";
import { MIN_H_FEEDBACK_CONTAINER } from "@/design-system/constants/styles";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { IconCircleX } from "@tabler/icons-react";

interface FeedbackRetryProps extends FeedbackStateProps {
  onRetry?: () => void;
}

export default function FeedbackRetry(props: FeedbackRetryProps) {
  // Props
  const { title, description, icon, onRetry, children, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <VStack
      m={"auto"}
      minH={MIN_H_FEEDBACK_CONTAINER}
      justify={"center"}
      {...restProps}
    >
      <FeedbackState
        icon={icon ?? <AppTablerIcon icon={IconCircleX} />}
        title={title}
        description={description}
        maxW={"300px"}
      />

      <VStack gap={1}>
        <Button
          className={"clicky"}
          variant={"ghost"}
          colorPalette={theme.colorPalette}
          mx={"auto"}
          size={"sm"}
          onClick={onRetry}
        >
          Retry
        </Button>

        {children}
      </VStack>
    </VStack>
  );
}
