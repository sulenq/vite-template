import { IconButton } from "@/design-system/components/button/ui/button";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { Tooltip } from "@/design-system/components/overlay/ui/tooltip";
import { DEFAULT_TOAST_GROUP } from "@/design-system/components/toast/core/toast-config";
import type { ToastStackProps } from "@/design-system/components/toast/types/toast.types";
import { P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { t } from "@/shared/libs/i18n/-typed";
import { Box } from "@chakra-ui/react";
import { ChevronUpIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

/**
 * Purely presentational stacking behavior — expand/collapse is local state
 * because no other part of the app needs to know a given stack's UI state.
 * Reused for both `toaster.tsx` (live toasts) and `notification-center.tsx`
 * (history).
 *
 * IMPORTANT: every item is always mounted, in both collapsed and expanded
 * states — only its position/opacity/transform change. This is deliberate:
 * a previous version rendered two entirely different JSX trees depending on
 * `expanded`, which made React unmount+remount every toast item on toggle.
 * That broke hover-pause (no `pointerleave` fires on an unmounted node,
 * leaving timers stuck forever) and reset the progress bar's CSS animation.
 * Keeping one continuous tree fixes both, and as a side benefit makes the
 * expand/collapse transition itself animatable via `data-state`.
 */
export function ToastStack<TItem>({
  groupLabel,
  items,
  getId,
  maxVisible,
  renderItem,
  onCloseAll,
}: ToastStackProps<TItem>) {
  // Stores
  const { theme } = useThemeStore();

  // Hooks
  // const { maxVisiblePerGroup } = getToastConfig();

  // States
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  // Resolved Values
  // const overflowCount = Math.max(items.length - maxVisible, 0);

  return (
    <VStack
      flexShrink={0}
      gap={2}
      data-state={expanded ? "expanded" : "collapsed"}
    >
      {/* Stack expanded header */}
      <HStack
        justifyContent={"space-between"}
        align={"center"}
        h={"26px"}
        px={3}
        mt={expanded ? 0 : "-26px"}
        visibility={expanded ? "visible" : "hidden"}
        opacity={expanded ? 1 : 0}
        transition={"200ms"}
      >
        <P fontWeight={"semibold"}>
          {groupLabel === DEFAULT_TOAST_GROUP
            ? t["common.system"]()
            : groupLabel}
        </P>

        <Box display={"flex"} gap={2}>
          {onCloseAll ? (
            <Tooltip content={t["common.clear_all"]()}>
              <IconButton
                size={"2xs"}
                variant={"subtle"}
                rounded={"full"}
                onClick={onCloseAll}
              >
                <AppIcon icon={TrashIcon} size={"sm"} />
              </IconButton>
            </Tooltip>
          ) : null}

          <Tooltip content={t["common.show_less"]()}>
            <IconButton
              size={"2xs"}
              variant={"subtle"}
              rounded={"full"}
              onClick={() => setExpanded(false)}
            >
              <AppIcon icon={ChevronUpIcon} size={"sm"} />
            </IconButton>
          </Tooltip>
        </Box>
      </HStack>

      {/* Stack items */}
      <VStack
        position={"relative"}
        onClick={!expanded ? () => setExpanded(true) : undefined}
        cursor={!expanded ? "pointer" : undefined}
        gap={2}
        rounded={theme.radii.container}
      >
        {items.map((item, index) => {
          const isStackedVisible = index < maxVisible;

          return (
            <Box
              key={getId(item)}
              data-stack-state={
                expanded ? "expanded" : isStackedVisible ? "stacked" : "hidden"
              }
              display={!expanded && !isStackedVisible ? "none" : "block"}
              zIndex={
                expanded ? undefined : isStackedVisible ? maxVisible - index : 0
              }
              mt={expanded ? 0 : index === 0 ? 0 : "-16%"}
              bg={"bg.body"}
              rounded={theme.radii.container}
              transition={"200ms"}
              transform={
                expanded
                  ? undefined
                  : `scale(${Math.max(1 - index * 0.04, 0.9)})`
              }
              pointerEvents={expanded || index === 0 ? "auto" : "none"}
            >
              {renderItem({
                item,
                index,
                expanded,
              })}
            </Box>
          );
        })}
      </VStack>

      {/* Stack additional item count */}
      {/* {!expanded && overflowCount > 0 ? (
        <Text fontSize={"xs"} color={"fg.muted"} mt={3} textAlign={"center"}>
          {`+${overflowCount} more in ${groupLabel}`}
        </Text>
      ) : null} */}
    </VStack>
  );
}
