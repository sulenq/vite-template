import { useState, type ReactNode } from "react";
import { Box, Button, Text } from "@chakra-ui/react";

export type ToastStackProps<TItem> = {
  groupLabel: string;
  items: TItem[];
  getId: (item: TItem) => string;
  maxVisible: number;
  renderItem: (item: TItem) => ReactNode;
  onCloseAll?: () => void;
  closeAllLabel?: string;
};

/**
 * Purely presentational stacking behavior — expand/collapse is local state
 * because no other part of the app needs to know a given stack's UI state.
 * Reused for both `toaster.tsx` (live toasts) and `notification-center.tsx`
 * (history), which is why it's generic over `TItem` instead of `ToastRecord`.
 */
export function ToastStack<TItem>({
  groupLabel,
  items,
  getId,
  maxVisible,
  renderItem,
  onCloseAll,
  closeAllLabel = "Close all",
}: ToastStackProps<TItem>) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const collapsedTop = items.slice(0, maxVisible);
  const overflowCount = items.length - collapsedTop.length;

  if (!expanded) {
    return (
      <Box
        position="relative"
        onClick={() => setExpanded(true)}
        cursor="pointer"
        role="group"
      >
        {collapsedTop.map((item, index) => (
          <Box
            key={getId(item)}
            position={index === 0 ? "relative" : "absolute"}
            top={index === 0 ? undefined : `${-index * 6}px`}
            left={0}
            right={0}
            transform={index === 0 ? undefined : `scale(${1 - index * 0.04})`}
            zIndex={collapsedTop.length - index}
            pointerEvents={index === 0 ? "auto" : "none"}
          >
            {renderItem(item)}
          </Box>
        ))}
        {overflowCount > 0 ? (
          <Text fontSize="xs" color="fg.muted" mt={1} textAlign="center">
            {`+${overflowCount} more in ${groupLabel}`}
          </Text>
        ) : null}
      </Box>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Text fontSize="xs" fontWeight="medium" color="fg.muted">
          {groupLabel}
        </Text>

        <Box display="flex" gap={2}>
          {onCloseAll ? (
            <Button size="2xs" variant="ghost" onClick={onCloseAll}>
              {closeAllLabel}
            </Button>
          ) : null}
          <Button size="2xs" variant="ghost" onClick={() => setExpanded(false)}>
            {"Collapse"}
          </Button>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {items.map((item) => (
          <Box key={getId(item)}>{renderItem(item)}</Box>
        ))}
      </Box>
    </Box>
  );
}
