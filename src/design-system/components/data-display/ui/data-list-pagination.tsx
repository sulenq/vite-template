// src/design-system/components/data-display/ui/data-list-pagination.tsx

import { IconButton } from "@/design-system/components/button/ui/button";
import { LucideIcon } from "@/design-system/components/icon/ui/lucide-icon";
import { HStack } from "@/design-system/components/layout/ui/stack";
import { P } from "@/design-system/components/typography/ui/p";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { DataListPaginationProps } from "../types/data-list.type";

export const DataListPagination = ({
  page,
  setPage,
  totalPage,
}: DataListPaginationProps) => {
  // Derived Values
  const canGoPrev = page > 1;
  const canGoNext = totalPage ? page < totalPage : true;

  return (
    <HStack align="center" gap={2}>
      <IconButton
        variant={"ghost"}
        size={"xs"}
        disabled={!canGoPrev}
        onClick={() => setPage(page - 1)}
      >
        <LucideIcon icon={ChevronLeftIcon} />
      </IconButton>

      <P whiteSpace="nowrap">
        {page} {totalPage ? `/ ${totalPage}` : ""}
      </P>

      <IconButton
        variant={"ghost"}
        size={"xs"}
        disabled={!canGoNext}
        onClick={() => setPage(page + 1)}
      >
        <LucideIcon icon={ChevronRightIcon} />
      </IconButton>
    </HStack>
  );
};
