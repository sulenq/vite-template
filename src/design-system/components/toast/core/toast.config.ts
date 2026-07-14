export const DEFAULT_TOAST_GROUP = "__default__";

export type ToastEngineConfig = {
  /** Default auto-dismiss duration in ms. */
  defaultDuration: number;
  /** Max toasts rendered "on top" per group before the rest collapse into the stack. */
  maxVisiblePerGroup: number;
  /** Newest toast rendered above or below older ones within a group. */
  newestOnTop: boolean;
  duplicateStrategy: "replace" | "ignore" | "throw";
  historyStorageKey: string;
  /** Max entries kept in history before oldest are pruned. */
  historyLimit: number;
  /** Time-to-live for a history entry, in ms. `null` = never expires. */
  historyTTL: number | null;
  /** Whether toast-item renders a "removed from history" indicator by default. */
  showDeletedFromHistoryIndicator: boolean;
};

const DEFAULT_TOAST_CONFIG: ToastEngineConfig = {
  defaultDuration: 20000, // TODO: change default duration to 5000
  maxVisiblePerGroup: 3,
  newestOnTop: true,
  duplicateStrategy: "replace",
  historyStorageKey: "design-system:toast-history",
  historyLimit: 200,
  historyTTL: 1000 * 60 * 60 * 24, // 1 day
  showDeletedFromHistoryIndicator: false,
};

let currentConfig: ToastEngineConfig = { ...DEFAULT_TOAST_CONFIG };

/** Call once at app bootstrap to override defaults — not meant to be called per-toast. */
export function configureToast(overrides: Partial<ToastEngineConfig>): void {
  currentConfig = { ...currentConfig, ...overrides };
}

export function getToastConfig(): ToastEngineConfig {
  return currentConfig;
}
