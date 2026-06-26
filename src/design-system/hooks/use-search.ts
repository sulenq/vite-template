// src/libs/search/use-search.ts
import MiniSearch from "minisearch";
import { useMemo, useState } from "react";
import type { SearchIndex, SearchIndexItem } from "../types/search.type";

const RECENT_KEY = "search:recent";
const MAX_RECENT = 5;

function loadRecent(namespace: string): string[] {
  try {
    return JSON.parse(
      localStorage.getItem(`${RECENT_KEY}:${namespace}`) ?? "[]",
    );
  } catch {
    return [];
  }
}

function saveRecent(namespace: string, ids: string[]) {
  localStorage.setItem(`${RECENT_KEY}:${namespace}`, JSON.stringify(ids));
}

export function useSearch<T>(
  namespace: string,
  // queryValue: string,
  index: SearchIndex<T>,
) {
  const [queryState, setQueryState] = useState("");
  const [recentIds, setRecentIds] = useState<string[]>(() =>
    loadRecent(namespace),
  );

  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<SearchIndexItem<T>>({
      fields: ["title", "description", "keywords"],
      storeFields: ["title", "description", "data"],
      searchOptions: {
        boost: { title: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    });
    ms.addAll(index);
    return ms;
  }, [index]);

  const results = useMemo(() => {
    if (!queryState.trim()) return [];
    return miniSearch.search(queryState) as unknown as (SearchIndexItem<T> & {
      score: number;
    })[];
  }, [miniSearch, queryState]);

  const recentResults = useMemo(() => {
    return recentIds
      .map((id) => index.find((item) => item.id === id))
      .filter(Boolean) as SearchIndexItem<T>[];
  }, [recentIds, index]);

  function addRecent(id: string) {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((r) => r !== id)].slice(0, MAX_RECENT);
      saveRecent(namespace, next);
      return next;
    });
  }

  function clearRecent(id: string) {
    setRecentIds((prev) => {
      const next = prev.filter((r) => r !== id);
      saveRecent(namespace, next);
      return next;
    });
  }

  function clearAllRecent() {
    setRecentIds([]);
    saveRecent(namespace, []);
  }

  return {
    queryState,
    setQueryState,
    recentResults,
    addRecent,
    clearRecent,
    clearAllRecent,
    results,
  };
}
