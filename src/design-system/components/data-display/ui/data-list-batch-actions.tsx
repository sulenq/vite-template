// src/design-system/components/data-display/ui/data-list-batch-actions.tsx

import { CheckIndicator } from "@/design-system/components/feedback/ui/indicator";
import { Separator } from "@/design-system/components/layout/ui/separator";
import { VStack } from "@/design-system/components/layout/ui/stack";
import { Menu } from "@/design-system/components/overlay/ui/menu";
import { P } from "@/design-system/components/typography/ui/p";
import { Fragment } from "react";
import type { DataListBatchActionsTriggerProps } from "../types/data-list.type";
import { Checkbox } from "@/design-system/components/input/ui/checkbox";

export const DataListBatchActionsTrigger = (
  props: DataListBatchActionsTriggerProps,
) => {
  const {
    children,
    batchActions,
    selectedItems,
    clearSelectedItems,
    isAllItemsSelected,
    selectAllItems,
    triggerActionBarMode = true,
    ...restProps
  } = props;

  if (triggerActionBarMode) {
    return (
      <Checkbox
        checked={isAllItemsSelected}
        onCheckedChange={() => {
          selectAllItems(isAllItemsSelected);
        }}
        size={"sm"}
        variant={"subtle"}
      />
    );
  }

  return (
    <Menu.Root
      lazyMount
      positioning={{ offset: { mainAxis: 6 } }}
      {...restProps}
    >
      <Menu.Trigger aria-label={"batch-actions"}>{children}</Menu.Trigger>

      <Menu.Content minW={"140px"}>
        <VStack px={2} py={1}>
          <P fontSize={"xs"} opacity={0.5} fontWeight={500}>
            {selectedItems.length} selected
          </P>
        </VStack>

        <Menu.Item
          value={"select-all"}
          justifyContent={"space-between"}
          closeOnSelect={false}
          onClick={() => selectAllItems(isAllItemsSelected)}
        >
          <P>Select all</P>

          <CheckIndicator checked={isAllItemsSelected} />
        </Menu.Item>

        <Separator px={2} my={1} />

        {batchActions?.map((item, index) => {
          const node = item(selectedItems, { clearSelectedItems });

          if (!node) return null;

          return <Fragment key={index}>{node}</Fragment>;
        })}
      </Menu.Content>
    </Menu.Root>
  );
};
