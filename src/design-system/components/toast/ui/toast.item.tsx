import { CloseButton } from "@/design-system/components/button/ui/close-button";
import { VStack } from "@/design-system/components/layout/ui/flex-box";
import { getToastConfig } from "@/design-system/components/toast/core/toast.config";
import {
  toast,
  toastTimerControls,
} from "@/design-system/components/toast/core/toast.manager";
import type { ToastItemProps } from "@/design-system/components/toast/types/toast.types";
import { ToastIcon } from "@/design-system/components/toast/ui/toast.icon";
import { ToastProgressBar } from "@/design-system/components/toast/ui/toast.progress-bar";
import { P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { Button, HStack } from "@chakra-ui/react";
import { useEffect } from "react";

export function ToastItem(props: ToastItemProps) {
  // Props
  const { record, index, expanded, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Hooks
  const {
    showDeletedFromHistoryIndicator,
    leaveAnimationDuration,
    maxVisiblePerGroup,
    showProgressBar,
  } = getToastConfig();

  // Constants
  const stackBg = ["bg.body", "bg.subtle", "bg.muted"];

  // Derived Values
  const isFirstIndex = index === 0;

  // Safety net: if this node unmounts while paused (e.g. a parent stack
  // toggles expand/collapse mid-hover), the browser never fires
  // `pointerleave`. Without this, the toast's timer would stay paused
  // forever since nothing else would ever call resume.
  useEffect(() => {
    return () => {
      toastTimerControls.resumeIfOrphaned(record.id);
    };
  }, [record.id]);

  if (record.variant === "custom" && record.renderer) {
    return <>{record.renderer(record)}</>;
  }

  return (
    <VStack
      role={record.variant === "error" ? "alert" : "status"}
      aria-live={record.variant === "error" ? "assertive" : "polite"}
      position={"relative"}
      overflow={"clip"}
      gap={1}
      p={3}
      // bg={"bg.body"}
      bg={expanded ? "bg.body" : stackBg[index % maxVisiblePerGroup]}
      border={"1px solid"}
      borderColor={"border"}
      rounded={theme.radii.container}
      shadow={"md"}
      onPointerEnter={() => toastTimerControls.pauseTimer(record.id)}
      onPointerLeave={() => toastTimerControls.resumeTimer(record.id)}
      onKeyDown={(event) => {
        if (event.key === "Escape") toast.close(record.id);
      }}
      tabIndex={0}
      data-state={record.status}
      transition={`opacity ${leaveAnimationDuration}ms ease, transform ${leaveAnimationDuration}ms ease`}
      opacity={record.status === "visible" ? 1 : 0}
      transform={
        record.status === "visible" ? "translateY(0)" : "translateY(-6px)"
      }
      {...restProps}
    >
      <HStack align={"center"} gap={2}>
        <ToastIcon record={record} />

        {record.title ? <P fontWeight={"medium"}>{record.title}</P> : null}

        <CloseButton
          aria-label={"Close notification"}
          size={"2xs"}
          variant={"subtle"}
          ml={"auto"}
          bg={"an1"}
          rounded={"full"}
          boxSize={4}
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            toast.close(record.id);
          }}
        />
      </HStack>

      <VStack
        pl={7}
        h={expanded || isFirstIndex ? "auto" : 0}
        opacity={expanded || isFirstIndex ? 1 : 0}
        transition={"200ms"}
      >
        {record.description ? (
          <P color={"fg.muted"}>{record.description}</P>
        ) : null}

        {record.actions && record.actions.length > 0 ? (
          <HStack gap={2} mt={2}>
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
          <P fontSize={"xs"} color={"fg.muted"} mt={1}>
            {"Removed from history"}
          </P>
        ) : null}
      </VStack>

      {showProgressBar && <ToastProgressBar record={record} />}
    </VStack>
  );
}
