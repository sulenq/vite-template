export const DEFAULT_TOAST_GROUP = "System";

/** Mirrors Chakra's placement naming so it feels familiar. */
export type ToastPlacement =
  | "top-start"
  | "top"
  | "top-end"
  | "bottom-start"
  | "bottom"
  | "bottom-end";

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
  /**
   * How long (ms) a toast stays in `status: "leaving"` before it's actually
   * removed from the store. Match this to your own CSS exit-transition
   * duration — if your transition is longer than this, the toast will pop
   * out abruptly instead of finishing the animation.
   */
  leaveAnimationDuration: number;
  /** Where the `<Toaster />` renders on screen. */
  placement: ToastPlacement;
};

const DEFAULT_TOAST_CONFIG: ToastEngineConfig = {
  defaultDuration: 5000,
  // defaultDuration: null,
  maxVisiblePerGroup: 3,
  newestOnTop: true,
  duplicateStrategy: "replace",
  historyStorageKey: "design-system:toast-history",
  historyLimit: 200,
  historyTTL: 1000 * 60 * 60 * 24 * 30, // 30 days
  showDeletedFromHistoryIndicator: false,
  leaveAnimationDuration: 300,
  placement: "top",
};

let currentConfig: ToastEngineConfig = { ...DEFAULT_TOAST_CONFIG };

/** Call once at app bootstrap to override defaults — not meant to be called per-toast. */
export function configureToast(overrides: Partial<ToastEngineConfig>): void {
  currentConfig = { ...currentConfig, ...overrides };
}

export function getToastConfig(): ToastEngineConfig {
  return currentConfig;
}
