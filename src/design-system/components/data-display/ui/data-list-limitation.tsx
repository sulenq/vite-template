// src/design-system/components/data-display/ui/data-list-limitation.tsx

import type { DataListLimitationProps } from "@/design-system/components/data-display/types/data-list.type";
import Select from "@/design-system/components/input/ui/select";

const DEFAULT_LIMIT_OPTIONS = [20, 40, 60, 100];

export const DataListLimitation = ({
  limit,
  setLimit,
  options = DEFAULT_LIMIT_OPTIONS,
}: DataListLimitationProps) => {
  return (
    <Select
      size={"sm"}
      value={String(limit)}
      onValueChange={(value) => setLimit(Number(value))}
      selectOptions={options.map((option) => ({
        label: `${option} / page`,
        value: String(option),
      }))}
    />
  );
};
