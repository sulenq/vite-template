import { useVisibleToastStore } from "@/design-system/components/toast/stores/visible-toast.store";
import { getToastConfig } from "@/design-system/components/toast/core/toast-config";
import type { ToastRecord } from "@/design-system/components/toast/types/toast.types";

export type ToastGroupStack = {
  group: string;
  /** Records ordered per `newestOnTop` config. */
  ordered: ToastRecord[];
};

function orderRecords(records: ToastRecord[], newestOnTop: boolean): ToastRecord[] {
  const sorted = [...records].sort((a, b) => a.createdAt - b.createdAt);
  return newestOnTop ? sorted.reverse() : sorted;
}

/** Returns every group as a ready-to-render stack. */
export function useVisibleToastGroups(): ToastGroupStack[] {
  const entries = useVisibleToastStore((state) => state.entries);
  const { newestOnTop } = getToastConfig();

  return Object.entries(entries).map(([group, records]) => ({
    group,
    ordered: orderRecords(records, newestOnTop),
  }));
}

/** Single-group variant, useful when a consumer only renders one known group. */
export function useVisibleToastGroup(group: string): ToastGroupStack {
  const records = useVisibleToastStore((state) => state.entries[group] ?? []);
  const { newestOnTop } = getToastConfig();
  return { group, ordered: orderRecords(records, newestOnTop) };
}
