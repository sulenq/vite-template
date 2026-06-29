// src/design-system/components/feedback/ui/feedback-retry.tsx

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { VStack } from "@/design-system/components/layout/ui/stack";
import { useThemeStore } from "@/design-system/shared/stores/use-theme-store";
import { t } from "@/shared/libs/i18n/-typed";
import { IconAlertTriangle } from "@tabler/icons-react";

interface FeedbackRetryProps extends FeedbackStateProps {
  onRetry?: () => void;
}

export const FeedbackRetry = (props: FeedbackRetryProps) => {
  // Props
  const {
    icon,
    tablerIcon = IconAlertTriangle,
    title = t["common.something_went_wrong"](),
    description = t["common.please_try_again"](),
    onRetry,
    children,
    ...restProps
  } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <FeedbackState
      icon={icon}
      tablerIcon={tablerIcon}
      title={title}
      description={description}
      {...restProps}
    >
      <VStack gap={1}>
        <Button
          className={"clicky"}
          variant={"ghost"}
          colorPalette={theme.colorPalette}
          mx={"auto"}
          size={"sm"}
          onClick={onRetry}
        >
          {t["action.retry"]()}
        </Button>

        {children}
      </VStack>
    </FeedbackState>
  );
};
