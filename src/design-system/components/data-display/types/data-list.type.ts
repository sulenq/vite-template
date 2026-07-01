// src/design-system/components/data-display/types/data-list.type.ts
import type { ReactNode } from "react";
import type { IconButtonProps } from "@/design-system/components/button/types/button.type";
import type { MenuRootProps, StackProps } from "@chakra-ui/react";
import type { FormattedTableRow } from "./data-list-table.type";

// -----------------------------------------------------------------
// Row Options

export type RowOptionsTableOptionGenerator = (
  row: FormattedTableRow,
) => ReactNode;

export type DataListRowOptionsProps = {
  row: FormattedTableRow;
  rowOptions?: RowOptionsTableOptionGenerator[];
  menuRootProps?: Omit<MenuRootProps, "children">;
} & IconButtonProps;

// -----------------------------------------------------------------
// Batch Options

export type BatchOptionsTableOptionGenerator = (
  selectedRows: string[],
  helpers: { clearSelectedRows: () => void },
) => ReactNode;

export type DataListBatchOptionsProps = {
  selectedRows: string[];
  clearSelectedRows: () => void;
  batchOptions?: BatchOptionsTableOptionGenerator[];
  isAllRowsSelected: boolean;
  handleSelectAllRows: (isChecked: boolean) => void;
  menuRootProps?: Omit<MenuRootProps, "children">;
} & IconButtonProps;

// -----------------------------------------------------------------
// Footer

export type DataListFooterProps = {
  borderless?: boolean;
  currentDataLength?: number;
  totalData?: number;
  limit: number;
  setLimit: (limit: number) => void;
  page: number;
  setPage: (page: number) => void;
  totalPage?: number;
} & Omit<StackProps, "page">;

// -----------------------------------------------------------------
// Limitation

export type DataListLimitationProps = {
  limit: number;
  setLimit: (limit: number) => void;
  options?: number[];
};

// -----------------------------------------------------------------
// Pagination

export type DataListPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPage?: number;
};
