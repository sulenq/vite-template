// src/design-system/hooks/use-search-param.ts

import { RootRoute } from "@/routes/-typed";
import { useNavigate } from "@tanstack/react-router";

export function useSearchParam(queryKey?: string) {
  const navigate = useNavigate();
  const search = RootRoute.useSearch() as Record<string, string | undefined>;

  const isUrlMode = queryKey !== undefined;
  const queryValue = isUrlMode ? (search?.[queryKey] ?? "") : undefined;

  function setQueryValue(next: string) {
    if (!queryKey) return;
    navigate({
      to: ".",
      search: (prev) => {
        const updated = { ...prev } as typeof prev;
        if (next) {
          (updated as Record<string, unknown>)[queryKey] = next;
        } else {
          delete (updated as Record<string, unknown>)[queryKey];
        }
        return updated;
      },
      replace: true,
    });
  }

  function clearQueryValue() {
    setQueryValue("");
  }

  return { isUrlMode, queryValue, setQueryValue, clearQueryValue };
}
