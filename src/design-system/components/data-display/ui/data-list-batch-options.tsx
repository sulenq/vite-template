// src/design-system/components/data-display/ui/data-list-batch-options.tsx

import { Fragment } from "react";
import { ListChecksIcon } from "lucide-react";
import { P } from "@/design-system/components/typography/ui/p";
import { VStack } from "@/design-system/components/layout/ui/stack";
import { LucideIcon } from "@/design-system/components/icon/ui/lucide-icon";
import { Separator } from "@/design-system/components/layout/ui/separator";
import { Box, Menu } from "@chakra-ui/react";
import type { DataListBatchOptionsProps } from "../types/data-list.type";
import { IconButton } from "@/design-system/components/button/ui/button";

export const DataListBatchOptions = (props: DataListBatchOptionsProps) => {
  const {
    children,
    selectedRows,
    clearSelectedRows,
    batchOptions,
    isAllRowsSelected,
    handleSelectAllRows,
    menuRootProps,
    ...restProps
  } = props;

  return (
    <Menu.Root
      lazyMount
      positioning={{ offset: { mainAxis: 6 } }}
      {...menuRootProps}
    >
      <Menu.Trigger asChild aria-label="batch-options">
        <IconButton
          variant="ghost"
          size="xs"
          _open={{ bg: "d0" }}
          {...restProps}
        >
          <LucideIcon icon={ListChecksIcon} />

          {children}
        </IconButton>
      </Menu.Trigger>

      <Menu.Content minW="140px" zIndex={10}>
        <VStack px={3} py={1}>
          <P fontSize="sm" opacity={0.5} fontWeight={500}>
            {selectedRows.length} selected
          </P>
        </VStack>

        <Menu.Item
          value="select-all"
          justifyContent="space-between"
          onClick={() => handleSelectAllRows(isAllRowsSelected)}
          closeOnSelect={false}
        >
          <P>Select all</P>
        </Menu.Item>

        <Box px={2} my={1}>
          <Separator />
        </Box>

        {batchOptions?.map((item, index) => {
          const node = item(selectedRows, { clearSelectedRows });
          if (!node) return null;
          return <Fragment key={index}>{node}</Fragment>;
        })}
      </Menu.Content>
    </Menu.Root>
  );
};
