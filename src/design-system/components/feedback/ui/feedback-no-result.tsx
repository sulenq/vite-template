// src/design-system/components/feedback/ui/feedback-not-found.tsx

"use client";

import type { FeedbackStateProps } from "@/design-system/components/feedback/types/feedback.type";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { VStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/ui/p";
import { MIN_H_FEEDBACK_CONTAINER } from "@/design-system/constants/styles";
import { t } from "@/libs/i18n";
import { IconMoodPuzzled, type TablerIcon } from "@tabler/icons-react";

export interface FeedbackNotResult {
  icon?: React.ReactNode;
  tablerIcon?: TablerIcon;
  query?: string;
}

export const FeedbackNotResult = (
  props: FeedbackNotResult & FeedbackStateProps,
) => {
  // Props
  const {
    icon,
    tablerIcon = IconMoodPuzzled,
    query = "...",
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
      <VStack align={"center"} maxW={"300px"} p={4}>
        {tablerIcon ? (
          <AppTablerIcon
            icon={tablerIcon}
            boxSize={9}
            strokeWidth={1.5}
            color={"fg.subtle"}
            mb={4}
          />
        ) : (
          icon
        )}

        <P textAlign={"center"}>{t["common.no_results_found_for"]()}</P>

        <P fontWeight={"semibold"} textAlign={"center"}>{`"${query}"`}</P>
      </VStack>

      {children}
    </VStack>
  );
};
