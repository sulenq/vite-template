// src/design-system/components/data-display/types/data-list.type.ts
import type { FormattedListItem } from "@/design-system/components/data-display/types/data-list-table.type";
import type { MenuRootProps, StackProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type DataListItemActionsGenerator<T = Record<string, unknown>> = (
  item: FormattedListItem<T>,
  index: number,
) => ReactNode;

export type DataListItemActionsTriggerProps<T = Record<string, unknown>> = {
  item: FormattedListItem<T>;
  itemActions?: DataListItemActionsGenerator[];
  contextedTrigger?: boolean;
} & MenuRootProps;

export type DataListBatchActionsGenerator = (
  selectedItems: string[],
  helpers: { clearSelectedItems: () => void },
) => ReactNode;

export type DataListBatchActionsTriggerProps = {
  selectedItems: string[];
  clearSelectedItems: () => void;
  batchActions?: DataListBatchActionsGenerator[];
  isAllItemsSelected: boolean;
  selectAllItems: (isChecked: boolean) => void;
  menuRootProps?: Omit<MenuRootProps, "children">;
} & MenuRootProps;

export type DataListFooterProps = {
  currentDataLength?: number;
  totalData?: number;
  perPage: number;
  setPerPage?: (perPage: number) => void;
  page: number;
  setPage?: (page: number) => void;
  totalPage?: number;
} & Omit<StackProps, "page">;

export type DataListPerPageProps = {
  perPage: number;
  setPerPage?: (perPage: number) => void;
  options?: number[];
};

export type DataListPaginationProps = {
  page: number;
  setPage?: (page: number) => void;
  totalPage?: number;
};
