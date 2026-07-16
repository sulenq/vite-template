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
import { useRef, useState } from "react";

export function ToastItem(props: ToastItemProps) {
  // Props
  const { record, index, expanded, ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  // Refs
  const timeoutRef = useRef<number | null>(null);

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
  const [toastItem, setToastItem] = useState<{
    expanded: boolean;
    descriptionExpanded: boolean;
    lineClamp: number;
  }>({
    expanded: false,
    descriptionExpanded: false,
    lineClamp: 0,
  });

  // Collapse toast item when stack collapsed
  useFirstMountEffect(
    {
      onUpdate: () => {
        if (!expanded) {
          setToastItem((prev) => ({ ...prev, expanded: false }));
        }
      },
    },
    [expanded],
  );

  useFirstMountEffect(
    {
      onUpdate: () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (toastItem.expanded) {
          timeoutRef.current = setTimeout(() => {
            setToastItem((current) => ({
              ...current,
              descriptionExpanded: true,
            }));
            timeoutRef.current = null;
          }, 100);
        } else {
          setToastItem((current) => ({
            ...current,
            descriptionExpanded: false,
          }));
        }

        return () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        };
      },
    },
    [toastItem.expanded],
  );

  if (record.variant === "custom" && record.renderer) {
    return <>{record.renderer(record)}</>;
  }

  console.log(toastItem);

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
        setToastItem((prev) => ({ ...prev, expanded: !prev.expanded }));
      }}
      {...restProps}
    >
      {/* Header */}
      <HStack align={"center"} gap={2}>
        <ToastIcon record={record} />

        {/* Title */}
        {record.title ? (
          <P fontWeight={"medium"} whiteSpace={"nowrap"} lineClamp={1}>
            {/* {record.title} */}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, error
            libero? Non, modi dolor.
          </P>
        ) : null}

        {/* Description (collapsed) */}
        {record.description && (
          <Collapsible.Root
            open={toastItem.expanded}
            collapsedHeight={"20px"}
            pos={toastItem.expanded ? "absolute" : undefined}
            // pos={"absolute"}
            left={"152px"}
            top={"14px"}
            w={
              toastItem.expanded ? cssCalc(`100% - 28px - 16px - 16px`) : "full"
            }
            // w={cssCalc(`100% - 28px - 16px - 16px`)}
            mt={"1px"}
            color={toastItem.expanded ? "fg.muted" : "fg.subtle"}
            // color={"red"}
            // lineClamp={1}
            lineClamp={toastItem.expanded ? undefined : 1}
            // opacity={toastItem.expanded ? 0 : 1}
            transformOrigin={"top"}
            transform={toastItem.expanded ? "translate(-112px, 25px)" : ""}
            transition={"transform 200ms, color 200ms"}
            transitionDelay={"line-clamp 100ms"}
          >
            <Collapsible.Content>
              <P fontSize={"sm"}>{record.description}</P>
            </Collapsible.Content>
          </Collapsible.Root>
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
          <Collapsible.Root open={toastItem.expanded}>
            <Collapsible.Content>
              <P
                color={"transparent"}
                // color={"red"}
                fontSize={"sm"}
                lineClamp={toastItem.expanded ? undefined : 1}
              >
                {record.description}
              </P>
            </Collapsible.Content>
          </Collapsible.Root>
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
