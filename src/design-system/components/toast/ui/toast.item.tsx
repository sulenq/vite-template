// src/design-system/components/toast/ui/toast.item.tsx

import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { ButtonGroup } from "@/design-system/components/button/ui/button-group";
import { CloseButton } from "@/design-system/components/button/ui/close-button";
import { Collapsible } from "@/design-system/components/disclosure/ui/collapsible";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { getToastConfig } from "@/design-system/components/toast/core/toast.config";
import {
  toast,
  toastTimerControls,
} from "@/design-system/components/toast/core/toast.manager";
import type { ToastItemProps } from "@/design-system/components/toast/types/toast.types";
import { ToastIcon } from "@/design-system/components/toast/ui/toast.icon";
import { ToastProgressBar } from "@/design-system/components/toast/ui/toast.progress-bar";
import { P } from "@/design-system/components/typography/ui/p";
import { useColorModeValue } from "@/design-system/hooks/use-color-mode";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { useFirstMountEffect } from "@/shared/hooks/use-first-mount-effect";
import { isEmptyArray } from "@/shared/utils/data/array";
import { tintDark } from "@/shared/utils/style/color";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export function ToastItem(props: ToastItemProps & { stackExpanded?: boolean }) {
  // Props
  const { record, index, stackExpanded, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Hooks
  const {
    showDeletedFromHistoryIndicator,
    maxVisiblePerGroup,
    showProgressBar,
  } = getToastConfig();

  // Constants
  const stackBg = useColorModeValue(
    [tintDark("bg.body", 0), tintDark("bg.body", 2), tintDark("bg.body", 3)],
    [tintDark("bg.body", 0), tintDark("bg.body", 8), tintDark("bg.body", 9)],
  );

  // Derived Values
  const isFirstIndex = index === 0;
  const hasExpandableContent = Boolean(
    record.description || (record.actions && !isEmptyArray(record.actions)),
  );

  // States
  const [toastItemExpanded, setToastItemExpanded] = useState<boolean>(false);

  // Collapse item when stack is collapsed
  useFirstMountEffect(
    {
      onUpdate: () => {
        if (stackExpanded === false) setToastItemExpanded(false);
      },
    },
    [stackExpanded],
  );

  // useEffect(() => {
  //   // Safety net: if this node unmounts while paused (e.g. a parent stack
  //   // toggles expand/collapse mid-hover), the browser never fires
  //   // `pointerleave`. Without this, the toast's timer would stay paused
  //   // forever since nothing else would ever call resume.
  //   return () => {
  //     toastTimerControls.resumeIfOrphaned(record.id);
  //   };
  // }, [record.id]);

  if (record.variant === "custom" && record.renderer) {
    return <>{record.renderer(record)}</>;
  }

  return (
    <VStack
      data-state={record.status}
      aria-live={record.variant === "error" ? "assertive" : "polite"}
      role={record.variant === "error" ? "alert" : "status"}
      pos={"relative"}
      overflow={"clip"}
      p={3}
      bg={stackExpanded ? "bg.body" : `${stackBg[index % maxVisiblePerGroup]}`}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={theme.radii.container}
      shadow={"md"}
      opacity={record.status === "visible" ? 1 : 0}
      tabIndex={0}
      cursor={!stackExpanded || hasExpandableContent ? "pointer" : "auto"}
      transform={
        record.status === "visible" ? "translateY(0)" : "translateY(-20px)"
      }
      transition={"transform 300ms, opacity 300ms"}
      onPointerEnter={() => toastTimerControls.pauseTimer(record.id)}
      onPointerLeave={() => toastTimerControls.resumeTimer(record.id)}
      onKeyDown={(event) => {
        if (event.key === "Escape") toast.close(record.id);
      }}
      onClick={() => {
        if (!stackExpanded || !hasExpandableContent) return;
        setToastItemExpanded((prev) => !prev);
      }}
      {...restProps}
    >
      {/* Header */}
      <HStack align={"center"} gap={2}>
        <ToastIcon record={record} />

        {/* Title */}
        {record.title ? (
          <P fontWeight={"medium"} whiteSpace={"nowrap"}>
            {record.title}
          </P>
        ) : null}

        {/* Description (collapsed) */}
        {record.description && (
          <P
            fontSize={"sm"}
            color={"fg.subtle"}
            lineClamp={1}
            mt={"1px"}
            opacity={toastItemExpanded ? 0 : 1}
            transition={"200ms"}
          >
            {record.description}
          </P>
        )}

        {/* Actions */}
        <HStack align={"center"} gap={1} ml={"auto"}>
          {record.quickAction && (
            <Button
              variant={"subtle"}
              size={"2xs"}
              rounded={"full"}
              fontSize={"sm"}
              onClick={(event) => {
                event.stopPropagation();
                record?.quickAction?.onClick(record.id);
              }}
            >
              {record.quickAction.content}
            </Button>
          )}

          {hasExpandableContent && (
            <IconButton
              variant={"subtle"}
              size={"2xs"}
              rounded={"full"}
              onClick={(event) => {
                if (stackExpanded) event.stopPropagation();
                setToastItemExpanded((prev) => !prev);
              }}
            >
              <AppIcon
                icon={ChevronDownIcon}
                size={"sm"}
                transform={
                  toastItemExpanded ? "rotate(180deg)" : "rotate(0deg)"
                }
                transition={"transform 200ms"}
              />
            </IconButton>
          )}

          <CloseButton
            aria-label={"Close notification"}
            variant={"subtle"}
            size={"2xs"}
            rounded={"full"}
            boxSize={3.5}
            onClick={(event: React.MouseEvent) => {
              event.stopPropagation();
              toast.close(record.id);
            }}
          />
        </HStack>
      </HStack>

      {/* Content */}
      <VStack
        pl={7}
        mt={toastItemExpanded ? 2 : 0}
        display={stackExpanded || isFirstIndex ? "flex" : "none"}
        opacity={stackExpanded || isFirstIndex ? 1 : 0}
        pointerEvents={stackExpanded || isFirstIndex ? "auto" : "none"}
        transition={"opacity 200ms"}
      >
        <Collapsible.Root open={toastItemExpanded}>
          <Collapsible.Content>
            {/* Description */}
            {record.description && stackExpanded && (
              <P
                color={"fg.muted"}
                fontSize={"sm"}
                lineClamp={toastItemExpanded ? undefined : 1}
              >
                {record.description}
              </P>
            )}

            {/* Actions */}
            {record.actions && !isEmptyArray(record.actions) && (
              <ButtonGroup gap={2} mt={record.description ? 4 : 0}>
                {record.actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={"subtle"}
                    size={"2xs"}
                    rounded={"full"}
                    fontSize={"sm"}
                    onClick={(event) => {
                      event.stopPropagation();
                      action.onClick(record.id);
                    }}
                  >
                    {action.content}
                  </Button>
                ))}
              </ButtonGroup>
            )}
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Removed from history flag */}
        {showDeletedFromHistoryIndicator && record.isDeletedFromHistory && (
          <P fontSize={"xs"} color={"fg.muted"} mt={1}>
            {"Removed from history"}
          </P>
        )}
      </VStack>

      {showProgressBar && <ToastProgressBar record={record} />}
    </VStack>
  );
}
