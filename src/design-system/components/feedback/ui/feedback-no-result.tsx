// src/design-system/components/feedback/ui/feedback-not-found.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import FeedbackState from "@/design-system/components/feedback/ui/feedback-state";
import { P } from "@/design-system/components/typography/ui/p";
import { t } from "@/libs/i18n";
import { IconMoodPuzzled, type TablerIcon } from "@tabler/icons-react";

export interface FeedbackNoResult {
  icon?: React.ReactNode;
  tablerIcon?: TablerIcon;
  query?: string;
}

export const FeedbackNoResult = (
  props: FeedbackNoResult & FeedbackStateProps,
) => {
  // Props
  const {
    icon,
    tablerIcon = IconMoodPuzzled,
    title = t["common.no_results_found_for"](),
    query = "...",
    children,
    ...restProps
  } = props;

  return (
    <FeedbackState
      icon={icon}
      tablerIcon={tablerIcon}
      title={title}
      {...restProps}
    >
      <P
        textAlign={"center"}
        fontWeight={"semibold"}
        color={"fg.muted"}
        mt={-2}
      >
        {`"${query}"`}
      </P>

      {children}
    </FeedbackState>
  );
};
