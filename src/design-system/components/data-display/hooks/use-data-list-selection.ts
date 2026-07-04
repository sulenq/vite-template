// src/design-system/components/data-display/hooks/use-data-list-selection.ts

import { useState } from "react";
import type { FormattedListItem } from "../types/data-list-table.type";

export function useDataListSelection(data: FormattedListItem[]) {
  const [isAllItemsSelected, setAllItemsSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  function selectAllItems(isChecked: boolean) {
    setAllItemsSelected(!isAllItemsSelected);
    if (!isChecked) {
      setSelectedItems(data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  }

  function clearSelectedItems() {
    setAllItemsSelected(false);
    setSelectedItems([]);
  }

  function toggleItemSelection(item: FormattedListItem) {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(item.id);

      if (isSelected) {
        setAllItemsSelected(false);
        return prev.filter((id) => id !== item.id);
      }

      const next = [...prev, item.id];
      if (data.length === next.length) setAllItemsSelected(true);
      return next;
    });
  }

  return {
    isAllItemsSelected,
    selectedItems,
    selectAllItems,
    clearSelectedItems,
    toggleItemSelection,
  };
}
