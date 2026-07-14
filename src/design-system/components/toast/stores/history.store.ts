import { create } from "zustand";
import type { HistoryEntry } from "@/design-system/components/toast/types/toast.types";
import { getToastConfig } from "@/design-system/components/toast/core/toast.config";
import {
  loadHistory,
  saveHistory,
} from "@/design-system/components/toast/utils/storage";
import { useVisibleToastStore } from "@/design-system/components/toast/stores/visible-toast.store";

type HistoryState = {
  entries: HistoryEntry[];
};

type HistoryActions = {
  add: (entry: HistoryEntry) => void;
  markRead: (historyEntryId: string) => void;
  markAllRead: () => void;
  /** Soft-deletes one entry and flags the still-visible toast (if any) as removed-from-history. */
  deleteOne: (historyEntryId: string) => void;
  deleteMany: (historyEntryIds: string[]) => void;
  clear: () => void;
  /**
   * Filters expired + soft-deleted entries out AND prunes expired ones from
   * state (lazy delete on read). Pass `{ includeDeleted: true }` for audit views.
   */
  getAll: (options?: { includeDeleted?: boolean }) => HistoryEntry[];
};

export type HistoryStore = HistoryState & HistoryActions;

function isExpired(entry: HistoryEntry, ttl: number | null): boolean {
  if (ttl === null) return false;
  return Date.now() - entry.createdAt > ttl;
}

function syncDeletedFlagToVisibleToast(toastId: string): void {
  if (useVisibleToastStore.getState().find(toastId)) {
    useVisibleToastStore.getState().markDeletedFromHistory(toastId);
  }
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  entries: loadHistory(getToastConfig().historyStorageKey),

  add: (entry) =>
    set((state) => {
      const { historyLimit } = getToastConfig();
      const next = [...state.entries, entry];
      return {
        entries:
          next.length > historyLimit
            ? next.slice(next.length - historyLimit)
            : next,
      };
    }),

  markRead: (historyEntryId) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.historyEntryId === historyEntryId
          ? { ...entry, read: true }
          : entry,
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      entries: state.entries.map((entry) => ({ ...entry, read: true })),
    })),

  deleteOne: (historyEntryId) => {
    const entry = get().entries.find(
      (item) => item.historyEntryId === historyEntryId,
    );
    set((state) => ({
      entries: state.entries.map((item) =>
        item.historyEntryId === historyEntryId
          ? { ...item, deletedFromHistory: true }
          : item,
      ),
    }));
    if (entry) syncDeletedFlagToVisibleToast(entry.toastId);
  },

  deleteMany: (historyEntryIds) => {
    const idSet = new Set(historyEntryIds);
    const toastIds = new Set(
      get()
        .entries.filter((entry) => idSet.has(entry.historyEntryId))
        .map((entry) => entry.toastId),
    );
    set((state) => ({
      entries: state.entries.map((entry) =>
        idSet.has(entry.historyEntryId)
          ? { ...entry, deletedFromHistory: true }
          : entry,
      ),
    }));
    toastIds.forEach(syncDeletedFlagToVisibleToast);
  },

  clear: () => {
    const toastIds = new Set(get().entries.map((entry) => entry.toastId));
    set({ entries: [] });
    toastIds.forEach(syncDeletedFlagToVisibleToast);
  },

  getAll: (options) => {
    const { historyTTL } = getToastConfig();
    const state = get();
    const notExpired = state.entries.filter(
      (entry) => !isExpired(entry, historyTTL),
    );

    if (notExpired.length !== state.entries.length)
      set({ entries: notExpired });

    return options?.includeDeleted
      ? notExpired
      : notExpired.filter((entry) => !entry.deletedFromHistory);
  },
}));

// Persist on every mutation. Lives here (not a separate plugin file) since
// history persistence isn't optional — it's a first-class requirement of
// this store, not a pluggable extension.
useHistoryStore.subscribe((state) => {
  saveHistory(getToastConfig().historyStorageKey, state.entries);
});
