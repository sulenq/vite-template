// src/design-system/components/data-display/hooks/use-data-table-sort.ts

import { useMemo, useState } from "react";
import type {
  DataListTableSortConfig,
  DataListTableSortHandler,
  FormattedTableRow,
} from "@/design-system/components/data-display/types/data-list-table.type";

const sortHandlers: Record<string, DataListTableSortHandler> = {
  string: (aValue, bValue, direction) =>
    direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue)),

  number: (aValue, bValue, direction) =>
    direction === "asc"
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue),

  date: (aValue, bValue, direction) => {
    const dateA = aValue ? new Date(aValue as string).getTime() : NaN;
    const dateB = bValue ? new Date(bValue as string).getTime() : NaN;

    if (isNaN(dateA) && isNaN(dateB)) return 0;
    if (isNaN(dateA)) return direction === "asc" ? 1 : -1;
    if (isNaN(dateB)) return direction === "asc" ? -1 : 1;

    return direction === "asc" ? dateA - dateB : dateB - dateA;
  },

  time: (aValue, bValue, direction) =>
    direction === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue)),
};

export function useDataListTableSort(
  formattedRows: FormattedTableRow[],
  initialcolumnIndex?: number,
  initialDirection: "asc" | "desc" = "asc",
) {
  const [sortConfig, setSortConfigState] = useState<DataListTableSortConfig>({
    columnIndex: initialcolumnIndex,
    direction: initialDirection,
  });

  function toggleSort(columnIndex: number) {
    setSortConfigState((prev) => {
      if (prev.columnIndex === columnIndex) {
        if (prev.direction === "asc") {
          return { columnIndex: columnIndex, direction: "desc" };
        }
        return { columnIndex: undefined, direction: "asc" };
      }
      return { columnIndex: columnIndex, direction: "asc" };
    });
  }

  const sortedRows = useMemo(() => {
    const columnIndex = sortConfig.columnIndex;

    if (columnIndex == null) return formattedRows;

    const dataType =
      formattedRows[0]?.columns[columnIndex]?.dataType || "string";
    const sort = sortHandlers[dataType] || sortHandlers.string;

    return [...formattedRows].sort((a, b) => {
      const aValue = a.columns[columnIndex]?.value ?? "";
      const bValue = b.columns[columnIndex]?.value ?? "";
      return sort(aValue, bValue, sortConfig.direction);
    });
  }, [formattedRows, sortConfig]);

  return { sortConfig, toggleSort, sortedRows };
}
