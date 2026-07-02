// src/design-system/components/data-display/ui/data-list-per-page.tsx

import { Button } from "@/design-system/components/button/ui/button";
import type { DataListPerPageProps } from "@/design-system/components/data-display/types/data-list.type";
import { RadioIndicator } from "@/design-system/components/feedback/ui/indicator";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { Menu } from "@/design-system/components/overlay/ui/menu";
import { Span } from "@/design-system/components/typography/ui/span";
import { IconChevronDown } from "@tabler/icons-react";

const DEFAULT_LIMIT_OPTIONS = [20, 40, 60, 100];

export const DataListPerPage = (props: DataListPerPageProps) => {
  // Props
  const { perPage, setPerPage, options = DEFAULT_LIMIT_OPTIONS } = props;

  return (
    <Menu.Root>
      <Menu.Trigger>
        <Button size={"xs"}>
          {perPage} <Span color={"fg.subtle"}>/ page</Span>
          <AppTablerIcon icon={IconChevronDown} size={"sm"} mb={-1} />
        </Button>
      </Menu.Trigger>

      <Menu.Content>
        {options.map((option) => {
          return (
            <Menu.Item
              key={option}
              value={String(option)}
              onClick={() => {
                setPerPage?.(option);
              }}
            >
              <RadioIndicator checked={perPage === option} size={"sm"} />

              {option}
            </Menu.Item>
          );
        })}
      </Menu.Content>
    </Menu.Root>
  );
};
