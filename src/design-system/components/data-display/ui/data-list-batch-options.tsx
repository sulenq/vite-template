// src/design-system/components/data-display/ui/data-list-batch-options.tsx

import { Separator } from "@/design-system/components/layout/ui/separator";
import { VStack } from "@/design-system/components/layout/ui/stack";
import { Menu } from "@/design-system/components/overlay/ui/menu";
import { P } from "@/design-system/components/typography/ui/p";
import { Fragment } from "react";
import type { DataListBatchOptionsTriggerProps } from "../types/data-list.type";

export const DataListBatchOptionsTrigger = (
  props: DataListBatchOptionsTriggerProps,
) => {
  const {
    children,
    batchOptions,
    selectedRows,
    clearSelectedRows,
    isAllRowsSelected,
    selectAllRows,
    menuRootProps,
  } = props;

  return (
    <Menu.Root
      lazyMount
      positioning={{ offset: { mainAxis: 6 } }}
      {...menuRootProps}
    >
      <Menu.Trigger asChild aria-label={"batch-options"}>
        {children}
      </Menu.Trigger>

      <Menu.Content minW={"140px"}>
        <VStack px={2} py={1}>
          <P fontSize={"xs"} opacity={0.5} fontWeight={500}>
            {selectedRows.length} selected
          </P>
        </VStack>

        <Menu.Item
          value={"select-all"}
          justifyContent={"space-between"}
          closeOnSelect={false}
          onClick={() => selectAllRows(isAllRowsSelected)}
        >
          <P>Select all</P>
        </Menu.Item>

        <Separator px={2} my={1} />

        {batchOptions?.map((item, index) => {
          const node = item(selectedRows, { clearSelectedRows });

          if (!node) return null;

          return <Fragment key={index}>{node}</Fragment>;
        })}
      </Menu.Content>
    </Menu.Root>
  );
};
