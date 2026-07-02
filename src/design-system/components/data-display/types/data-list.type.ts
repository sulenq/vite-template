// src/design-system/components/data-display/types/data-list.type.ts
import type { IconButtonProps } from "@/design-system/components/button/types/button.type";
import type { FormattedTableRow } from "@/design-system/components/data-display/types/data-list-table.type";
import type { MenuRootProps, StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type DataListItemOptionsGenerator<T = Record<string, unknown>> = (
  row: FormattedTableRow<T>,
  index: number,
) => ReactNode;

export type DataListItemOptionsProps<T = Record<string, unknown>> = {
  row: FormattedTableRow<T>;
  rowOptions?: DataListItemOptionsGenerator[];
  menuRootProps?: Omit<MenuRootProps, "children">;
} & IconButtonProps;

export type DataListBatchOptionsGenerator = (
  selectedRows: string[],
  helpers: { clearSelectedRows: () => void },
) => ReactNode;

export type DataListBatchOptionsTriggerProps = {
  selectedRows: string[];
  clearSelectedRows: () => void;
  batchOptions?: DataListBatchOptionsGenerator[];
  isAllRowsSelected: boolean;
  selectAllRows: (isChecked: boolean) => void;
  menuRootProps?: Omit<MenuRootProps, "children">;
} & IconButtonProps;

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

export type DataListLimitationProps = {
  limit: number;
  setLimit: (limit: number) => void;
  options?: number[];
};

export type DataListPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPage?: number;
};
