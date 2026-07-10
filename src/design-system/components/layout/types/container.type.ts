// src/design-system/components/layout/types/container.type.ts

import type { StackProps } from "@/design-system/components/layout/types/stack.type";

export type ContainerRootProps = StackProps & {
  withContext?: boolean;
};

export type ContainerHeaderProps = StackProps;

export type ContainerBodyProps = StackProps;

export type ContainerContextValue = {
  dimension: {
    width: number;
    height: number;
  };
  isValidDimension: boolean;
  isSmContainer: boolean;
};
