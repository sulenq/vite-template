// src/design-system/components/layout/types/container.type.ts

import type { StackProps } from "@/design-system/components/layout/types/stack.type";

export interface ContainerRootProps extends StackProps {
  withContext?: boolean;
}

export interface ContainerHeaderProps extends StackProps {}

export interface ContainerBodyProps extends StackProps {}
