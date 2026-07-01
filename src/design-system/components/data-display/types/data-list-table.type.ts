// src/design-system/components/data-display/types/data-table.type.ts

import type { StackProps } from "@/design-system/components/layout/types/stack.type";

export type DataListTableRootProps = {
  children: React.ReactNode;
  headers: FormattedTableHeader[];
  rows: FormattedTableRow[];
  initialSortColumnIndex?: number;
  initialSortOrder?: "asc" | "desc";
  batchOptions?: BatchOptionsTableOptionGenerator[];
  rowOptions?: RowOptionsTableOptionGenerator[];
} & Omit<StackProps, "page">;

export type DataListTableHeaderProps = {} & StackProps;

export type DataListTableBodyProps = {} & StackProps; // Unused type

export type DataListTableSortIconProps = {
  active: boolean;
  direction: "asc" | "desc";
};

// -----------------------------------------------------------------

export type DataListTableColumnDataType = "string" | "number" | "date" | "time";

export type DataListTableSortDirection = "asc" | "desc";

export type DataListTableSortConfig = {
  columnIdx?: number;
  direction: DataListTableSortDirection;
};

export type DataListTableSortHandler = (
  aValue: unknown,
  bValue: unknown,
  direction: DataListTableSortDirection,
) => number;

export type FormattedTableHeader = {
  th: React.ReactNode;
  sortable?: boolean;
  align?: "start" | "center" | "end";
  dataType?: DataListTableColumnDataType;
  headerProps?: Record<string, unknown>;
};

export type FormattedTableColumn = {
  td: React.ReactNode;
  value?: unknown;
  align?: "start" | "center" | "end";
  dataType?: DataListTableColumnDataType;
  dim?: boolean;
  bodyProps?: Record<string, unknown>;
};

export type FormattedTableRow = {
  id: string; // must be real row data id from DB
  columns: FormattedTableColumn[];
  dim?: boolean;
};

export type RowOptionsTableOptionGenerator = (
  row: FormattedTableRow,
) => React.ReactNode | null | false;

export type BatchOptionsTableOptionGenerator = (
  selectedRowIds: string[],
) => React.ReactNode | null | false;
