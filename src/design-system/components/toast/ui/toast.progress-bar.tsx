// src/design-system/components/toast/ui/toast.progress-bar.tsx

import { Box } from "@/design-system/components/layout/ui/box";
import type { ToastRecord } from "@/design-system/components/toast/types/toast.types";

export function ToastProgressBar({ record }: { record: ToastRecord }) {
  if (record.duration === null) return null;

  return (
    <Box
      pos={"absolute"}
      left={0}
      top={0}
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
