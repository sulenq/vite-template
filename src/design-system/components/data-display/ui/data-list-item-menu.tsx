// src/design-system/components/data-display/ui/data-list-item-options.tsx

import { VStack } from "@/design-system/components/layout/ui/stack";
import { Menu } from "@/design-system/components/overlay/ui/menu";
import React from "react";
import type { DataListItemOptionsProps } from "../types/data-list.type";

export const DataListItemActionsTrigger = (props: DataListItemOptionsProps) => {
  // Props
  const { children, row, itemActions, menuRootProps } = props;

  return (
    <Menu.Root
      lazyMount
      positioning={{
        offset: { crossAxis: 4 },
        hideWhenDetached: true,
      }}
      {...menuRootProps}
    >
      <Menu.Trigger asChild aria-label={"row-options"}>
        {children}
      </Menu.Trigger>

      <Menu.Content minW={"140px"}>
        <VStack gap={1}>
          {itemActions?.map((item, index) => {
            const node = item(row, index);

            if (!node) return null;

            return <React.Fragment key={index}>{node}</React.Fragment>;
          })}
        </VStack>
      </Menu.Content>
    </Menu.Root>
  );
};
