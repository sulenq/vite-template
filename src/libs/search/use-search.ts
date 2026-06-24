// src/libs/search/use-search.ts
import MiniSearch from "minisearch";
import { useMemo, useState } from "react";
import type { SearchIndex, SearchIndexItem } from "./types";

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

export function useSearch<T>(index: SearchIndex<T>, namespace: string) {
  const [query, setQuery] = useState("");
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
    if (!query.trim()) return [];
    return miniSearch.search(query) as unknown as (SearchIndexItem<T> & {
      score: number;
    })[];
  }, [miniSearch, query]);

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
    query,
    setQuery,
    results,
    recentResults,
    addRecent,
    clearRecent,
    clearAllRecent,
  };
}
