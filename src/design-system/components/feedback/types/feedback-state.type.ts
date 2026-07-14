// src/design-system/components/feedback/types/feedback-state.type.ts

import type { StackProps } from "@/design-system/components/layout/types/flex-box.type";
import type { ReactNode, TablerIcon } from "@tabler/icons-react";

export type FeedbackStateProps = StackProps & {
  icon?: ReactNode;
  tablerIcon?: TablerIcon;
  title?: string;
  description?: string;
};

export type NoResultStateProps = FeedbackStateProps & {
  icon?: ReactNode;
  tablerIcon?: TablerIcon;
  query?: string;
};

export type RetryStateProps = FeedbackStateProps & {
  onRetry?: () => void;
};
