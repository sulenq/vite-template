import type { ToastRecord } from "@/design-system/components/toast/types/toast.types";

/**
 * Pure CSS animation (scaleX 1 -> 0) instead of a JS-driven interval.
 * `animation-play-state` freezes the visual at whatever point it was at when
 * paused — the real countdown accuracy lives in the manager's timer, this is
 * purely presentational.
 */
export function ToastProgressBar({ record }: { record: ToastRecord }) {
  if (record.duration === null) return null; // persistent toast, no progress to show

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: "3px",
        width: "100%",
        transformOrigin: "left",
        background: "currentColor",
        opacity: 0.4,
        animationName: "toast-progress-shrink",
        animationDuration: `${record.duration}ms`,
        animationTimingFunction: "linear",
        animationFillMode: "forwards",
        animationPlayState: record.paused ? "paused" : "running",
      }}
    />
  );
}
