"use client";

import type { StackProps } from "@/design-system/components/layout/types/flex-box.type";
import { PageContainer } from "@/design-system/components/layout/ui/page-container";

export type BasicAppShellProps = StackProps & {};

export const BasicAppShell = (props: BasicAppShellProps) => {
  // Props
  const { ...restProps } = props;

  return <PageContainer {...restProps}></PageContainer>;
};
