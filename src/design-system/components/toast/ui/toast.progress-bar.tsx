import { Box } from "@/design-system/components/layout/ui/box";
import type { ToastRecord } from "@/design-system/components/toast/types/toast.types";

/**
 * Pure CSS animation (scaleX 1 -> 0). Uses a *negative* `animation-delay`
 * computed from `remainingDuration` so the bar always reflects real elapsed
 * time — even if this component gets freshly mounted (e.g. inside an
 * expand/collapse toggle), it picks up exactly where the real timer is,
 * instead of restarting from 100%.
 */
export function ToastProgressBar({ record }: { record: ToastRecord }) {
  if (record.duration === null) return null;

  return (
    <Box
      pos={"absolute"}
      bottom={0}
      left={0}
      h={"2px"}
      w={"full"}
      bg={"bg.emphasized"}
      transformOrigin={"left"}
      animationName={"shrink-x"}
      animationDuration={`${record.duration}ms`}
      animationTimingFunction={"linear"}
      animationFillMode={"forwards"}
      animationPlayState={record.paused ? "paused" : "running"}
    />
  );
}
