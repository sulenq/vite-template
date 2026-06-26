import type { SearchIndexItem } from "@/design-system/types/search.type";

export interface FocusSearchRootProps<T = Record<string, unknown>> {
  children: React.ReactNode;
  modalKey: string;
  queryKey: string;
  queryValue: string;
  queryState: string;
  setQueryState: React.Dispatch<React.SetStateAction<string>>;
  recentResults: SearchIndexItem<T>[];
  addRecent: (id: string) => void;
  clearRecent: (id: string) => void;
  clearAllRecent: () => void;
  results: SearchIndexItem<T>[];
  onResultSelect?: (result: SearchIndexItem<T>) => void;
}

export interface FocusSearchResultItemProps<T = Record<string, unknown>> {
  result: SearchIndexItem<T>;
}

export interface FocusSearchTriggerProps {
  children: React.ReactNode;
}

export interface FocusSearchContentProps {
  children: React.ReactNode;
}
