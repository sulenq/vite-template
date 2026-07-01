// src/design-system/components/data-display/hooks/use-data-table-selection.ts

import { useState } from "react";
import type { FormattedTableRow } from "../types/data-list-table.type";

export function useDataListTableSelection(data: FormattedTableRow[]) {
  const [isAllRowsSelected, setAllRowsSelected] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  function selectAllRows(isChecked: boolean) {
    setAllRowsSelected(!isAllRowsSelected);
    if (!isChecked) {
      setSelectedRows(data.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  }

  function clearSelection() {
    setAllRowsSelected(false);
    setSelectedRows([]);
  }

  function toggleRowSelection(row: FormattedTableRow) {
    setSelectedRows((prev) => {
      const isSelected = prev.includes(row.id);

      if (isSelected) {
        setAllRowsSelected(false);
        return prev.filter((id) => id !== row.id);
      }

      const next = [...prev, row.id];
      if (data.length === next.length) setAllRowsSelected(true);
      return next;
    });
  }

  return {
    isAllRowsSelected,
    selectedRows,
    selectAllRows,
    clearSelection,
    toggleRowSelection,
  };
}
