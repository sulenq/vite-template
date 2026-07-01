// src/design-system/components/data-display/ui/data-list-row-options.tsx

import React from "react";
import { EllipsisIcon } from "lucide-react";
import { IconButton } from "@/design-system/components/button/ui/button";
import { VStack } from "@/design-system/components/layout/ui/stack";
import { LucideIcon } from "@/design-system/components/icon/ui/lucide-icon";
import type { DataListRowOptionsProps } from "../types/data-list.type";
import { Menu } from "@chakra-ui/react";

export const DataListRowOptions = (props: DataListRowOptionsProps) => {
  const { row, rowOptions, menuRootProps, ...restProps } = props;

  return (
    <Menu.Root
      lazyMount
      positioning={{
        offset: { crossAxis: 4 },
        hideWhenDetached: true,
      }}
      {...menuRootProps}
    >
      <Menu.Trigger asChild aria-label="row-options">
        <IconButton
          variant="ghost"
          size="xs"
          _open={{ bg: "d0" }}
          {...restProps}
        >
          <LucideIcon icon={EllipsisIcon} />
        </IconButton>
      </Menu.Trigger>
      <Menu.Content minW="140px" mr={1} zIndex={10}>
        <VStack gap={1}>
          {rowOptions?.map((item, index) => {
            const node = item(row);
            if (!node) return null;
            return <React.Fragment key={index}>{node}</React.Fragment>;
          })}
        </VStack>
      </Menu.Content>
    </Menu.Root>
  );
};
