import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { AppIcon } from "@/design-system/components/icon/ui/app-icon";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { Tooltip } from "@/design-system/components/overlay/ui/tooltip";
import { DEFAULT_TOAST_GROUP } from "@/design-system/components/toast/core/toast.config";
import type { ToastStackProps } from "@/design-system/components/toast/types/toast.types";
import { P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { useFirstMountEffect } from "@/shared/hooks/use-first-mount-effect";
import { t } from "@/shared/libs/i18n/-typed";
import { Box } from "@chakra-ui/react";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ToastStack<TItem>({
  groupLabel,
  items,
  getId,
  maxVisible,
  renderItem,
  onCloseAll,
  onClickOutside,
}: ToastStackProps<TItem>) {
  // Stores
  const { theme } = useThemeStore();

  // Hooks
  // const { maxVisiblePerGroup } = getToastConfig();

  // States
  const [expanded, setExpanded] = useState(false);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  useFirstMountEffect(
    {
      onUpdate: () => {
        if (items.length === 0) {
          setExpanded(false);
        }
      },
    },
    [items],
  );

  useEffect(() => {
    if (!expanded) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
        if (onClickOutside) {
          onClickOutside(event);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [expanded, onClickOutside]);

  // Resolved Values
  // const overflowCount = Math.max(items.length - maxVisible, 0);

  return (
    <VStack
      ref={containerRef}
      data-state={expanded ? "expanded" : "collapsed"}
      flexShrink={0}
      gap={expanded ? 2 : 0}
    >
      {/* Header [expanded] */}
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
          {onCloseAll && (
            <Button
              size={"2xs"}
              fontSize={"sm"}
              variant={"subtle"}
              rounded={"full"}
              onClick={() => {
                setExpanded(false);
                onCloseAll();
              }}
            >
              {t["common.dismiss_all"]()}
            </Button>
          )}

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

      {/* Items */}
      <VStack
        pos={"relative"}
        onClick={!expanded ? () => setExpanded(true) : undefined}
        cursor={!expanded ? "pointer" : undefined}
        rounded={theme.radii.container}
      >
        {items.map((item, index) => {
          const isStackedVisible = index < maxVisible;
          const isFirstIndex = index === 0;
          const isCollapsed = !expanded;

          return (
            <Box
              key={getId(item)}
              data-stack-state={
                expanded ? "expanded" : isStackedVisible ? "stacked" : "hidden"
              }
              display={!expanded && !isStackedVisible ? "none" : "block"}
              pos={isCollapsed && !isFirstIndex ? "absolute" : "relative"}
              top={isCollapsed && !isFirstIndex ? 0 : undefined}
              right={isCollapsed && !isFirstIndex ? 0 : undefined}
              bottom={isCollapsed && !isFirstIndex ? 0 : undefined}
              left={isCollapsed && !isFirstIndex ? 0 : undefined}
              overflow={isCollapsed && !isFirstIndex ? "clip" : undefined}
              rounded={theme.radii.container}
              zIndex={
                expanded ? undefined : isStackedVisible ? maxVisible - index : 0
              }
              transformOrigin={"bottom"}
              transform={
                isCollapsed && !isFirstIndex
                  ? `scale(${1 - index * 0.05}) translateY(${index * 34 - index * (20 + index * 2)}px)`
                  : "scale(1)"
              }
              mt={expanded && index > 0 ? 2 : 0}
              transition={"transform 200ms ease, margin-top 200ms ease"}
              pointerEvents={expanded || isFirstIndex ? "auto" : "none"}
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
