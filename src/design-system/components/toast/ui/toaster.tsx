import { VStack } from "@/design-system/components/layout/ui/flex-box";
import { getToastConfig } from "@/design-system/components/toast/core/toast.config";
import { toast } from "@/design-system/components/toast/core/toast.manager";
import { usePageVisibility } from "@/design-system/components/toast/hooks/use-page-visibility";
import { useVisibleToastGroups } from "@/design-system/components/toast/hooks/use-visible-toasts";
import type { ToastPlacement } from "@/design-system/components/toast/types/toast.types";
import { ToastItem } from "@/design-system/components/toast/ui/toast.item";
import { ToastStack } from "@/design-system/components/toast/ui/toast.stack";
import { Portal } from "@chakra-ui/react";

const EDGE_OFFSET = 0;

function getPlacementStyles(placement: ToastPlacement) {
  const isTop = placement.startsWith("top");
  const isCentered = placement === "top" || placement === "bottom";
  const isEnd = placement.endsWith("end");

  return {
    top: isTop ? EDGE_OFFSET : undefined,
    bottom: isTop ? undefined : EDGE_OFFSET,
    left: isCentered ? "50%" : isEnd ? undefined : EDGE_OFFSET,
    right: isCentered ? undefined : isEnd ? EDGE_OFFSET : undefined,
    transform: isCentered ? "translateX(-50%)" : undefined,
    // Newest group closest to the screen edge it's anchored to.
    flexDirection: (isTop ? "column" : "column-reverse") as
      | "column"
      | "column-reverse",
  };
}

export function Toaster() {
  usePageVisibility();
  const groups = useVisibleToastGroups();
  const { maxVisiblePerGroup, placement } = getToastConfig();
  const placementStyles = getPlacementStyles(placement);

  return (
    <Portal>
      <VStack
        flexDir={placementStyles.flexDirection}
        gap={2}
        position={"fixed"}
        top={placementStyles.top}
        bottom={placementStyles.bottom}
        left={placementStyles.left}
        right={placementStyles.right}
        zIndex={"toast"}
        overflowY={"auto"}
        w={"360px"}
        maxW={"calc(100vw - 32px)"}
        h={"fit"}
        maxH={"100dvh"}
        p={4}
        transform={placementStyles.transform}
      >
        {groups.map(({ group, ordered }) => (
          <ToastStack
            key={group}
            groupLabel={group}
            items={ordered}
            getId={(record) => record.id}
            maxVisible={maxVisiblePerGroup}
            renderItem={({ item, index, expanded }) => (
              <ToastItem record={item} index={index} expanded={expanded} />
            )}
            onCloseAll={() =>
              ordered.forEach((record) => toast.close(record.id))
            }
          />
        ))}
      </VStack>
    </Portal>
  );
}
