import { Button } from "@/design-system/components/button/ui/button";
import { ButtonGroup } from "@/design-system/components/button/ui/button-group";
import { CloseButton } from "@/design-system/components/button/ui/close-button";
import { Collapsible } from "@/design-system/components/disclosure/ui/collapsible";
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
import { cssCalc } from "@/shared/utils/style/css-calc";
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

  // States
  const [description, setDescription] = useState<{
    expanded: boolean;
    scrollHeight: number;
    clientHeight: number;
  }>({
    expanded: false,
    scrollHeight: 0,
    clientHeight: 0,
  });

  useEffect(() => {
    // Safety net: if this node unmounts while paused (e.g. a parent stack
    // toggles expand/collapse mid-hover), the browser never fires
    // `pointerleave`. Without this, the toast's timer would stay paused
    // forever since nothing else would ever call resume.
    return () => {
      toastTimerControls.resumeIfOrphaned(record.id);
    };
  }, [record.id]);

  useLayoutEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    const checkExpandable = () => {
      console.log(el.scrollHeight, el.clientHeight);
      setDescription((prev) => ({
        ...prev,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      }));
    };

    checkExpandable();

    const resizeObserver = new ResizeObserver(checkExpandable);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [expanded, record.description]);

  useFirstMountEffect(
    {
      onUpdate: () => {
        if (!expanded) {
          setDescription((prev) => ({ ...prev, expanded: false }));
        }
      },
    },
    [expanded],
  );

  if (record.variant === "custom" && record.renderer) {
    return <>{record.renderer(record)}</>;
  }

  // console.log(description);

  return (
    <VStack
      data-state={record.status}
      aria-live={record.variant === "error" ? "assertive" : "polite"}
      role={record.variant === "error" ? "alert" : "status"}
      pos={"relative"}
      overflow={"clip"}
      gap={1}
      p={3}
      bg={expanded ? "bg.body" : stackBg[index % maxVisiblePerGroup]}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={theme.radii.container}
      shadow={"md"}
      opacity={record.status === "visible" ? 1 : 0}
      tabIndex={0}
      cursor={!expanded || record.description ? "pointer" : "auto"}
      transition={"200ms"}
      transform={
        record.status === "visible" ? "translateY(0)" : "translateY(-6px)"
      }
      onPointerEnter={() => toastTimerControls.pauseTimer(record.id)}
      onPointerLeave={() => toastTimerControls.resumeTimer(record.id)}
      onKeyDown={(event) => {
        if (event.key === "Escape") toast.close(record.id);
      }}
      onClick={() => {
        if (!expanded || !record.description) return;
        setDescription((prev) => ({ ...prev, expanded: !prev.expanded }));
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
            pos={description.expanded ? "absolute" : undefined}
            // pos={"absolute"}
            left={"152px"}
            top={"14px"}
            w={
              description.expanded
                ? cssCalc(`100% - 28px - 16px - 16px`)
                : "full"
            }
            // w={cssCalc(`100% - 28px - 16px - 16px`)}
            mt={"1px"}
            color={description.expanded ? "fg.muted" : "fg.subtle"}
            // color={"red"}
            // lineClamp={1}
            lineClamp={description.expanded ? undefined : 1}
            // opacity={description.expanded ? 0 : 1}
            transformOrigin={"top"}
            transform={description.expanded ? "translate(-112px, 25px)" : ""}
            transition={"transform 200ms, color 200ms"}
          >
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
        transition={"opacity 200ms"}
      >
        {/* Description */}
        {record.description && expanded && (
          <Collapsible.Root open={description.expanded}>
            <Collapsible.Content>
              <P
                color={"transparent"}
                // color={"red"}
                fontSize={"sm"}
                lineClamp={description.expanded ? undefined : 1}
              >
                {record.description}
              </P>
            </Collapsible.Content>
          </Collapsible.Root>
          // <Box
          //   w={"full"}
          //   maxH={description.expanded ? "500px" : "20px"}
          //   transition={"max-height 300ms ease"}
          //   overflow={"hidden"}
          // >
          //   <P
          //     ref={descriptionRef}
          //     color={"fg.muted"}
          //     fontSize={"sm"}
          //     lineClamp={description.expanded ? undefined : 1}
          //   >
          //     {record.description}
          //   </P>
          // </Box>
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
