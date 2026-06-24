// src/design-system/components/input/ui/search-input.tsx

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import {
  Input,
  type InputProps,
} from "@/design-system/components/input/ui/input";
import { useSearchParam } from "@/design-system/hooks/use-search-param";
import { InputGroup } from "@chakra-ui/react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { forwardRef, useRef } from "react";

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
    const {
      isUrlMode,
      queryValue: urlValue,
      setQueryValue,
      clearQueryValue,
    } = useSearchParam(queryKey);

    // Resolved Values
    const value = isUrlMode ? urlValue : controlledValue;

    // Handlers
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const next = e.currentTarget.value;
      if (isUrlMode) {
        setQueryValue(next);
      } else {
        onValueChange?.(next);
      }
    }

    function handleClear() {
      if (isUrlMode) {
        clearQueryValue();
      } else {
        onValueChange?.("");
      }
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
          value={value ?? ""}
          onChange={handleChange}
        />
      </InputGroup>
    );
  },
);

SearchInput.displayName = "SearchInput";
