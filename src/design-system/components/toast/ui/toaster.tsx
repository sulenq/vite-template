import { Box, Portal } from "@chakra-ui/react";
import { useVisibleToastGroups } from "@/design-system/components/toast/hooks/use-visible-toasts";
import { usePageVisibility } from "@/design-system/components/toast/hooks/use-page-visibility";
import { toast } from "@/design-system/components/toast/core/toast.manager";
import { getToastConfig } from "@/design-system/components/toast/core/toast.config";
import { ToastStack } from "@/design-system/components/toast/ui/toast.stack";
import { ToastItem } from "@/design-system/components/toast/ui/toast.item";

export function Toaster() {
  usePageVisibility();
  const groups = useVisibleToastGroups();
  const { maxVisiblePerGroup } = getToastConfig();

  return (
    <Portal>
      {/* Single global keyframes definition, shared by every ToastProgressBar instance. */}
      <style>
        {
          "@keyframes toast-progress-shrink { from { transform: scaleX(1); } to { transform: scaleX(0); } }"
        }
      </style>

      <Box
        position="fixed"
        bottom={4}
        right={4}
        display="flex"
        flexDirection="column"
        gap={3}
        zIndex="toast"
        width="360px"
        maxWidth="calc(100vw - 32px)"
      >
        {groups.map(({ group, ordered }) => (
          <ToastStack
            key={group}
            groupLabel={group}
            items={ordered}
            getId={(record) => record.id}
            maxVisible={maxVisiblePerGroup}
            renderItem={(record) => <ToastItem record={record} />}
            onCloseAll={() =>
              ordered.forEach((record) => toast.close(record.id))
            }
          />
        ))}
      </Box>
    </Portal>
  );
}
