import { IconButton } from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { HStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/ui/p";
import { HEADER_H } from "@/design-system/constants/styles";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { back } from "@/utils/client/navigation";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";

export const SettingsMenuHeader = () => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  return (
    <HStack align={"center"} justify={"space-between"} h={HEADER_H} p={2}>
      <HStack w={"40px"}>
        {isSmallViewport && (
          <IconButton onClick={back}>
            <AppTablerIcon icon={IconChevronLeft} />
          </IconButton>
        )}

        {!isSmallViewport && (
          <IconButton>
            <AppTablerIcon icon={IconSearch} />
          </IconButton>
        )}
      </HStack>

      <P fontWeight={"semibold"} textAlign={"center"}>
        Settings
      </P>

      <HStack w={"40px"}>
        <ColorModeToggleButton />
      </HStack>
    </HStack>
  );
};
