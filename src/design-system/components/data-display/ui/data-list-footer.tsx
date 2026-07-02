// src/design-system/components/data-display/ui/data-list-footer.tsx

import { HStack, VStack } from "@/design-system/components/layout/ui/stack";
import { P } from "@/design-system/components/typography/ui/p";
import { DataListPerPage } from "./data-list-per-page";
import { DataListPagination } from "./data-list-pagination";
import type { DataListFooterProps } from "../types/data-list.type";
import { useThemeStore } from "@/design-system/stores/use-theme-store";

const formatDataLengthText = (
  currentDataLength?: number,
  totalData?: number,
) => {
  const current = currentDataLength != null ? String(currentDataLength) : "?";
  const total = totalData != null ? String(totalData) : "?";
  return `${current} / ${total} items`;
};

export const DataListFooter = (props: DataListFooterProps) => {
  // Props
  const {
    currentDataLength,
    totalData,
    perPage,
    setPerPage,
    page,
    setPage,
    totalPage,
    ...restProps
  } = props;

  // Stores
  const { theme } = useThemeStore();

  const dataLengthText = formatDataLengthText(currentDataLength, totalData);

  return (
    <VStack
      justify={"center"}
      gap={2}
      minH={"50px"}
      p={2}
      pt={"7px"}
      zIndex={4}
      bg={"bg.body"}
      roundedBottom={theme.radii.container}
      borderTop={"1px solid {colors.border.subtle}"}
      shadow={"md"}
      {...restProps}
    >
      <HStack wrap={"wrap"} align="center" w={"full"} justify={"space-between"}>
        <HStack align="start">
          <DataListPerPage perPage={perPage} setPerPage={setPerPage} />
        </HStack>

        <HStack align="center" gapX={3} px={["10px", null, 0]}>
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
