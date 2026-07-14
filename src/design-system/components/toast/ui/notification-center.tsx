import { Box, Button, Text } from "@chakra-ui/react";
import { X } from "lucide-react";
import { useToastHistory } from "@/design-system/components/toast/hooks/use-toast-history";
import type { HistoryEntry } from "@/design-system/components/toast/types/toast.types";
import { ToastStack } from "@/design-system/components/toast/ui/toast.stack";
import { getToastConfig } from "@/design-system/components/toast/core/toast.config";

function HistoryEntryItem({
  entry,
  onDelete,
}: {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
}) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={2}
      bg={entry.read ? "bg.subtle" : "bg.panel"}
      position="relative"
    >
      <Box display="flex" justifyContent="space-between" gap={2}>
        <Box flex="1">
          {entry.title ? (
            <Text fontSize="sm" fontWeight="medium">
              {entry.title}
            </Text>
          ) : null}
          {entry.description ? (
            <Text fontSize="sm" color="fg.muted">
              {entry.description}
            </Text>
          ) : null}
          <Text fontSize="xs" color="fg.muted" mt={1}>
            {`v${entry.version}${entry.isUpdate ? " · updated" : ""}${
              entry.dismissedReason ? ` · ${entry.dismissedReason}` : ""
            }`}
          </Text>
        </Box>

        <Box
          as="button"
          aria-label={"Delete from history"}
          onClick={() => onDelete(entry.historyEntryId)}
        >
          <X size={14} />
        </Box>
      </Box>
    </Box>
  );
}

export function NotificationCenter() {
  const { groups, deleteOne, deleteMany, markAllRead } = useToastHistory();
  const { maxVisiblePerGroup } = getToastConfig();

  if (groups.length === 0) {
    return (
      <Text fontSize="sm" color="fg.muted">
        {"No notifications yet"}
      </Text>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" justifyContent="flex-end">
        <Button size="2xs" variant="ghost" onClick={markAllRead}>
          {"Mark all as read"}
        </Button>
      </Box>

      {groups.map(({ group, entries }) => (
        <ToastStack
          key={group}
          groupLabel={group}
          items={entries}
          getId={(entry) => entry.historyEntryId}
          maxVisible={maxVisiblePerGroup}
          renderItem={(entry) => (
            <HistoryEntryItem entry={entry} onDelete={deleteOne} />
          )}
          onCloseAll={() =>
            deleteMany(entries.map((entry) => entry.historyEntryId))
          }
          closeAllLabel={"Clear group"}
        />
      ))}
    </Box>
  );
}
