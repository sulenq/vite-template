"use client";

import type { DataListBatchActionBarProps } from "@/design-system/components/data-display/types/data-list.type";
import { ActionBar } from "@/design-system/components/overlay/ui/action-bar";
import { P } from "@/design-system/components/typography/ui/p";
import { Portal } from "@/design-system/components/utilities/portal";
import { isEmptyArray } from "@/shared/utils/data/array";
import { Fragment } from "react";

export const DataListBatchActionBar = (props: DataListBatchActionBarProps) => {
  // Props
  const { batchActions, selectedItems, clearSelectedItems, ...restProps } =
    props;

  // Derived Values
  const isChecked = !isEmptyArray(selectedItems);

  return (
    <ActionBar.Root open={isChecked} {...restProps}>
      <Portal>
        <ActionBar.Positioner zIndex={4}>
          <ActionBar.Content>
            <P px={4} color={"fg.muted"}>
              {selectedItems.length} selected
            </P>

            <ActionBar.Separator />

            {batchActions?.map((item, index) => {
              const node = item(selectedItems, { clearSelectedItems });

              if (!node) return null;

              return <Fragment key={index}>{node}</Fragment>;
            })}
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>
  );
};
