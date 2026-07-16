import { Button } from "@/design-system/components/button/ui/button";
import { ButtonGroup } from "@/design-system/components/button/ui/button-group";
import { CloseButton } from "@/design-system/components/button/ui/close-button";
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
import { isEmptyArray } from "@/shared/utils/data/array";
import { tintDark } from "@/shared/utils/style/color";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function ToastItem(props: ToastItemProps) {
  // Props
  const { record, index, expanded, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  // Hooks
  const {
    showDeletedFromHistoryIndicator,
    leaveAnimationDuration,
    maxVisiblePerGroup,
    showProgressBar,
  } = getToastConfig();

  // Constants
  const stackBg = useColorModeValue(
    [tintDark("bg.body", 0), tintDark("bg.body", 2), tintDark("bg.body", 3)],
    [tintDark("bg.body", 0), tintDark("bg.body", 8), tintDark("bg.body", 12)],
  );

  // Derived Values
  const isFirstIndex = index === 0;

  // States
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [isDescriptionExpandable, setIsDescriptionExpandable] = useState(false);

  // Safety net: if this node unmounts while paused (e.g. a parent stack
  // toggles expand/collapse mid-hover), the browser never fires
  // `pointerleave`. Without this, the toast's timer would stay paused
  // forever since nothing else would ever call resume.
  useEffect(() => {
    return () => {
      toastTimerControls.resumeIfOrphaned(record.id);
    };
  }, [record.id]);

  useLayoutEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    const checkExpandable = () => {
      setIsDescriptionExpandable(el.scrollHeight > el.clientHeight);
    };

    checkExpandable();

    // handle resize (misal window resize, font load, dsb)
    const resizeObserver = new ResizeObserver(checkExpandable);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [record.description]);

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
      gap={1}
      // minH={"76px"}
      p={3}
      // bg={"bg.body"}
      bg={expanded ? "bg.body" : stackBg[index % maxVisiblePerGroup]}
      border={"1px solid"}
      borderColor={"border"}
      rounded={theme.radii.container}
      shadow={"md"}
      opacity={record.status === "visible" ? 1 : 0}
      tabIndex={0}
      cursor={isDescriptionExpandable || !expanded ? "pointer" : "auto"}
      transition={`opacity ${leaveAnimationDuration}ms ease, transform ${leaveAnimationDuration}ms ease`}
      transform={
        record.status === "visible" ? "translateY(0)" : "translateY(-6px)"
      }
      onPointerEnter={() => toastTimerControls.pauseTimer(record.id)}
      onPointerLeave={() => toastTimerControls.resumeTimer(record.id)}
      onKeyDown={(event) => {
        if (event.key === "Escape") toast.close(record.id);
      }}
      onClick={() => {
        if (!expanded) return;
        setShowDescription((prev) => !prev);
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
        {record.description && !expanded && (
          <P color={"fg.subtle"} lineClamp={1}>
            {record.description}
          </P>
        )}

        {/* Actions */}
        <HStack align={"center"} gap={2} ml={"auto"}>
          {record.inlineAction && (
            <Button
              size={"2xs"}
              fontSize={"sm"}
              variant={"outline"}
              onClick={(event) => {
                event.stopPropagation();
                record?.inlineAction?.onClick(record.id);
              }}
            >
              {record.inlineAction.label}
            </Button>
          )}

          <CloseButton
            aria-label={"Close notification"}
            size={"2xs"}
            variant={"subtle"}
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
        display={expanded || isFirstIndex ? "flex" : "none"}
        opacity={expanded || isFirstIndex ? 1 : 0}
        pointerEvents={expanded || isFirstIndex ? "auto" : "none"}
        transition={"opacity 150ms ease"}
      >
        {/* Description */}
        {record.description && expanded && (
          <P
            ref={descriptionRef}
            color={"fg.muted"}
            lineClamp={showDescription ? undefined : 1}
          >
            {record.description}
          </P>
        )}

        {/* Actions */}
        {record.actions && !isEmptyArray(record.actions) && (
          <ButtonGroup gap={2} mt={2}>
            {record.actions.map((action) => (
              <Button
                key={action.label}
                size={"2xs"}
                fontSize={"xs"}
                variant={"outline"}
                onClick={() => action.onClick(record.id)}
              >
                {action.label}
              </Button>
            ))}
          </ButtonGroup>
        )}

        {/* Removed from history flag */}
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
