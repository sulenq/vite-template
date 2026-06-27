// src/design-system/components/input/ui/search-input.tsx

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import {
  Input,
  type InputProps,
} from "@/design-system/components/input/ui/input";
import { useQueryParam } from "@/design-system/hooks/use-query-param";
import { InputGroup } from "@chakra-ui/react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { forwardRef, useRef, useState } from "react";

interface SearchInputProps extends InputProps {
  queryKey?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ queryKey, value: controlledValue, onValueChange, ...restProps }, ref) => {
    // Refs
    const internalRef = useRef<HTMLInputElement | null>(null);

    // Hooks
    const { isUrlMode, queryValue, setQueryValue, clearQueryValue } =
      useQueryParam(queryKey);

    // States
    const [value, setValue] = useState<string>(
      isUrlMode ? (queryValue ?? "") : (controlledValue ?? ""),
    );

    // Handlers
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const next = e.currentTarget.value;
      setValue(next);
      setQueryValue(next);
      onValueChange?.(next);
    }

    function handleClear() {
      setValue("");
      clearQueryValue();
      onValueChange?.("");
      internalRef.current?.focus();
    }

    return (
      <InputGroup
        startElement={<AppTablerIcon icon={IconSearch} />}
        endElement={
          value ? (
            <IconButton size="xs" onClick={handleClear} me="-2">
              <AppTablerIcon icon={IconX} />
            </IconButton>
          ) : undefined
        }
      >
        <Input
          {...restProps}
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          value={value}
          onChange={handleChange}
        />
      </InputGroup>
    );
  },
);

SearchInput.displayName = "SearchInput";
