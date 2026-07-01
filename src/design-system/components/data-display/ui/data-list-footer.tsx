// src/design-system/components/data-display/ui/data-list-footer.tsx

import { HStack, VStack } from "@/design-system/components/layout/ui/stack";
import { P } from "@/design-system/components/typography/ui/p";
import { DataListLimitation } from "./data-list-limitation";
import { DataListPagination } from "./data-list-pagination";
import type { DataListFooterProps } from "../types/data-list.type";

const formatDataLengthText = (
  currentDataLength?: number,
  totalData?: number,
) => {
  const current = currentDataLength != null ? String(currentDataLength) : "?";
  const total = totalData != null ? String(totalData) : "?";
  return `${current} / ${total} items`;
};

export const DataListFooter = (props: DataListFooterProps) => {
  const {
    borderless = false,
    currentDataLength,
    totalData,
    limit,
    setLimit,
    page,
    setPage,
    totalPage,
    ...restProps
  } = props;

  const dataLengthText = formatDataLengthText(currentDataLength, totalData);

  return (
    <VStack
      p={3}
      gap={2}
      borderTop={borderless ? "none" : "1px solid"}
      borderColor="border.muted"
      {...restProps}
    >
      <HStack align="center" w="full" justify="space-between">
        <HStack align="start">
          <DataListLimitation limit={limit} setLimit={setLimit} />
        </HStack>

        <HStack align="center" gapX={3}>
          <P color="fg.subtle" whiteSpace="nowrap">
            {dataLengthText}
          </P>

          <DataListPagination
            page={page}
            setPage={setPage}
            totalPage={totalPage}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};
