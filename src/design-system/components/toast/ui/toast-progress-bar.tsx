import type { ToastRecord } from "@/design-system/components/toast/types/toast.types";

/**
 * Pure CSS animation (scaleX 1 -> 0). Uses a *negative* `animation-delay`
 * computed from `remainingDuration` so the bar always reflects real elapsed
 * time — even if this component gets freshly mounted (e.g. inside an
 * expand/collapse toggle), it picks up exactly where the real timer is,
 * instead of restarting from 100%.
 */
export function ToastProgressBar({ record }: { record: ToastRecord }) {
  if (record.duration === null) return null; // persistent toast, no progress to show

  const remaining = record.remainingDuration ?? record.duration;
  const elapsedMs = record.duration - remaining;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 2,
        width: "100%",
        transformOrigin: "left",
        background: "currentColor",
        opacity: 0.4,
        animationName: "toast-progress-shrink",
        animationDuration: `${record.duration}ms`,
        animationDelay: `-${elapsedMs}ms`,
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
        animationPlayState: record.paused ? "paused" : "running",
      }}
    />
  );
}
