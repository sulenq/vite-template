// src/design-system/components/feedback/types/feedback.type.ts

import type { StackProps } from "@/design-system/components/layout/types/stack.type";
import type { TablerIcon } from "@tabler/icons-react";

export interface FeedbackStateProps extends StackProps {
  icon?: React.ReactNode;
  tablerIcon?: TablerIcon;
  title?: string;
  description?: string;
}
