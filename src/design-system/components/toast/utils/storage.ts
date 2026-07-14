import type { HistoryEntry, StoredHistoryShape } from "@/design-system/components/toast/types/toast.types";

export const HISTORY_STORAGE_VERSION = 1;

/**
 * Each migration takes the shape at `version - 1` and returns the shape at
 * `version`. Add entries here when `StoredHistoryShape` changes — never
 * mutate old migrations, they must stay valid for old persisted data.
 */
const migrations: Record<number, (data: StoredHistoryShape) => StoredHistoryShape> = {
  // Example for the future:
  // 2: (data) => ({ ...data, version: 2, entries: data.entries.map(...) }),
};

function migrate(data: StoredHistoryShape): StoredHistoryShape {
  let current = data;
  while (current.version < HISTORY_STORAGE_VERSION) {
    const next = migrations[current.version + 1];
    if (!next) break; // no migration path defined, stop and use what we have
    current = next(current);
  }
  return current;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadHistory(storageKey: string): HistoryEntry[] {
  if (!isBrowser()) return [];

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as StoredHistoryShape;
    return migrate(parsed).entries;
  } catch {
    // Corrupted payload — fail safe by starting fresh rather than throwing.
    return [];
  }
}

export function saveHistory(storageKey: string, entries: HistoryEntry[]): void {
  if (!isBrowser()) return;

  const payload: StoredHistoryShape = { version: HISTORY_STORAGE_VERSION, entries };

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch {
    // Quota exceeded or unavailable — degrade silently, this write just won't persist.
  }
}
