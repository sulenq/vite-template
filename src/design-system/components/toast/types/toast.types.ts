import type { StackProps } from "@/design-system/components/layout/types/flex-box.type";
import type { ReactNode } from "react";

export type ToastVariant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "custom";

export type ToastStatus = "entering" | "visible" | "leaving";

export type DuplicateStrategy = "replace" | "ignore" | "throw";

export type DismissedReason =
  | "timeout"
  | "manual"
  | "closeAll"
  | "replaced"
  | "unknown";

export type ToastAction = {
  label: string;
  onClick: (id: string) => void;
};

export type ToastStackProps<TItem> = {
  groupLabel: string;
  items: TItem[];
  getId: (item: TItem) => string;
  maxVisible: number;
  renderItem: ({
    item,
    index,
    expanded,
  }: {
    item: TItem;
    index: number;
    expanded?: boolean;
  }) => ReactNode;
  onCloseAll?: () => void;
};

export type ToastItemProps = StackProps & {
  record: ToastRecord;
  index: number;
  expanded?: boolean;
};

/** Custom renderer receives the fully resolved record, fully replacing the default UI. */
export type ToastRenderer = (record: ToastRecord) => ReactNode;

export type ToastLifecycleHandlers = {
  onShow?: (record: ToastRecord) => void;
  onUpdate?: (record: ToastRecord) => void;
  onClose?: (record: ToastRecord, reason: DismissedReason) => void;
  onRemove?: (record: ToastRecord) => void;
  onExpire?: (record: ToastRecord) => void;
};

/**
 * Public-facing options accepted by `toast.create()` / helper methods.
 * `group` is optional here — the manager resolves it to `DEFAULT_TOAST_GROUP`
 * before it ever reaches the store.
 */
export type ToastOptions = ToastLifecycleHandlers & {
  id?: string;
  group?: string;
  variant?: ToastVariant;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ToastAction[];
  metadata?: Record<string, unknown>;
  /** ms. `null` = persistent (never auto-dismiss). Defaults from config. */
  duration?: number | null;
  duplicateStrategy?: DuplicateStrategy;
  renderer?: ToastRenderer;
};

/**
 * Internal, fully-resolved record living inside `visible-toast.store`.
 * Every optional field from `ToastOptions` is resolved here.
 */
export type ToastRecord = Omit<ToastOptions, "group" | "duration"> & {
  id: string;
  group: string;
  variant: ToastVariant;
  duration: number | null;
  status: ToastStatus;
  createdAt: number;
  remainingDuration: number | null;
  paused: boolean;
  isDeletedFromHistory: boolean;
};

export type UpdateToastOptions = Omit<ToastOptions, "id" | "group">;

/**
 * Append-only snapshot. Every `create()` and `update()` call produces a new
 * entry — history is a versioned log, not a mutable mirror of the toast.
 */
export type HistoryEntry = {
  /** Unique per snapshot. Never reused, never mutated after creation. */
  historyEntryId: string;
  /** Links back to the originating toast; many entries can share this. */
  toastId: string;
  /** Increments per `toastId`, starting at 1 on the initial `create()`. */
  version: number;
  group: string;
  variant: ToastVariant;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actions?: ToastAction[];
  metadata?: Record<string, unknown>;
  source: "create" | "update";
  createdAt: number;
  closedAt: number | null;
  expiresAt: number | null;
  read: boolean;
  dismissedReason: DismissedReason | null;
  isUpdate: boolean;
  /** Soft-delete flag. Entry stays for audit purposes; UI decides whether to hide it. */
  deletedFromHistory: boolean;
};

export type StoredHistoryShape = {
  version: number;
  entries: HistoryEntry[];
};

/** Internal event map — used by `core/event-bus.ts` for both built-in wiring and external listeners. */
export type ToastEventMap = {
  show: ToastRecord;
  update: ToastRecord;
  close: { record: ToastRecord; reason: DismissedReason };
  remove: { id: string };
  expire: ToastRecord;
};

export type ToastEventName = keyof ToastEventMap;

export type ToastEventListener<TEvent extends ToastEventName> = (
  payload: ToastEventMap[TEvent],
) => void;

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
  showProgressBar: boolean;
};
