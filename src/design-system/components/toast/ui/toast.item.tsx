import { CloseButton } from "@/design-system/components/button/ui/close-button";
import { getToastConfig } from "@/design-system/components/toast/core/toast.config";
import {
  toast,
  toastTimerControls,
} from "@/design-system/components/toast/core/toast.manager";
import type { ToastRecord } from "@/design-system/components/toast/types/toast.types";
import { ToastIcon } from "@/design-system/components/toast/ui/toast.icon";
import { ToastProgressBar } from "@/design-system/components/toast/ui/toast.progress-bar";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

export function ToastItem({ record }: { record: ToastRecord }) {
  const { showDeletedFromHistoryIndicator } = getToastConfig();

  if (record.variant === "custom" && record.renderer) {
    return <>{record.renderer(record)}</>;
  }

  return (
    <Box
      role={record.variant === "error" ? "alert" : "status"}
      aria-live={record.variant === "error" ? "assertive" : "polite"}
      position={"relative"}
      borderWidth={"1px"}
      borderRadius={"md"}
      p={"3"}
      pb={"4"}
      bg={"bg.body"}
      overflow={"hidden"}
      onPointerEnter={() => toastTimerControls.pauseTimer(record.id)}
      onPointerLeave={() => toastTimerControls.resumeTimer(record.id)}
      onKeyDown={(event) => {
        if (event.key === "Escape") toast.close(record.id);
      }}
      tabIndex={0}
      data-state={record.status}
    >
      <Box display={"flex"} gap={"2"} alignItems={"flex-start"}>
        <ToastIcon record={record} />

        <Box flex={"1"}>
          {record.title ? (
            <Text fontWeight={"medium"} fontSize={"sm"}>
              {record.title}
            </Text>
          ) : null}
          {record.description ? (
            <Text fontSize={"sm"} color={"fg.muted"}>
              {record.description}
            </Text>
          ) : null}

          {record.actions && record.actions.length > 0 ? (
            <HStack gap={"2"} mt={"2"}>
              {record.actions.map((action) => (
                <Button
                  key={action.label}
                  size={"xs"}
                  variant={"outline"}
                  onClick={() => action.onClick(record.id)}
                >
                  {action.label}
                </Button>
              ))}
            </HStack>
          ) : null}

          {showDeletedFromHistoryIndicator && record.isDeletedFromHistory ? (
            <Text fontSize={"xs"} color={"fg.muted"} mt={"1"}>
              {"Removed from history"}
            </Text>
          ) : null}
        </Box>

        <CloseButton
          aria-label={"Close notification"}
          size={"2xs"}
          rounded={"full"}
          boxSize={4}
          onClick={() => toast.close(record.id)}
        />
      </Box>

      <ToastProgressBar record={record} />
    </Box>
  );
}
