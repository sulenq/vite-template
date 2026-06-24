// src/features/settomgs/components/settings-menu.tsx

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { ColorModeToggleButton } from "@/design-system/components/button/ui/color-mode-button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import { HStack } from "@/design-system/components/layout/ui/container";
import { P } from "@/design-system/components/typography/ui/p";
import { HEADER_H } from "@/design-system/constants/styles";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { back } from "@/utils/client/navigation";
import { IconChevronLeft, IconSearch } from "@tabler/icons-react";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { VStack } from "@/design-system/components/layout/ui/container";
import { NavButton } from "@/design-system/components/layout/ui/nav";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { Separator } from "@/design-system/components/layout/ui/separator";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { SETTINGS_NAV_GROUPS } from "@/features/settings/constants/settings-nav-groups";
import { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";
import { t } from "@/libs/i18n";
import { RootRoute } from "@/routes/-typed";
import { IconChevronRight } from "@tabler/icons-react";
import { Fragment } from "react/jsx-runtime";

export const SettingsMenu = () => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  return (
    <VStack
      className={"settings-menu"}
      overflowY={"auto"}
      minW={["full", null, "250px"]}
      bg={isSmallViewport ? "bg.canvas" : "bg.body"}
    >
      <SettingsMenuHeader />

      <SettingsMenuBody p={2} />
    </VStack>
  );
};

export const SettingsMenuHeader = () => {
  // Hooks
  const isSmallViewport = useIsSmallViewport();

  return (
    <HStack
      className={"settings-menu__header"}
      align={"center"}
      justify={"space-between"}
      h={HEADER_H}
      p={2}
    >
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

export const SettingsMenuBody = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Store
  const { theme } = useThemeStore();

  // Hooks
  const { activeSettingNavKey } = RootRoute.useSearch();
  const navigate = RootRoute.useNavigate();
  const isSmallViewport = useIsSmallViewport();

  return (
    <VScrollContainer
      className={"settings-menu__body"}
      gap={isSmallViewport ? 4 : 2}
      {...restProps}
    >
      {SETTINGS_NAV_GROUPS.map((group, index) => {
        const isFirstIndex = index === 0;

        return (
          <Fragment key={index}>
            {!isSmallViewport && !isFirstIndex && <Separator />}

            <VStack className={"nav-group"}>
              {(group?.label || group?.labelKey) && (
                <P fontSize={"xs"} color={"fg.subtle"} px={2} mb={2}>
                  {group.label || (group.labelKey ? t[group.labelKey]() : "")}
                </P>
              )}

              <VStack
                className={"nav-list"}
                gap={1}
                bg={"bg.body"}
                rounded={theme.radii.container}
                p={isSmallViewport ? 2 : 0}
              >
                {group.list.map((navKey) => {
                  const nav = SETTINGS_NAVS[navKey];
                  const isNavActive = activeSettingNavKey === navKey;

                  return (
                    <NavButton
                      key={navKey}
                      variant={isNavActive ? "subtle" : "ghost"}
                      onClick={() => {
                        navigate({
                          search: (prev) => ({
                            ...prev,
                            activeSettingNavKey: navKey,
                          }),
                          replace: !!activeSettingNavKey,
                        });
                      }}
                    >
                      <AppTablerIcon icon={nav.icon} />

                      {t[`settings.${navKey}.label`]()}

                      {isSmallViewport && (
                        <AppTablerIcon
                          icon={IconChevronRight}
                          color={"fg.subtle"}
                          ml={"auto"}
                        />
                      )}
                    </NavButton>
                  );
                })}
              </VStack>
            </VStack>
          </Fragment>
        );
      })}
    </VScrollContainer>
  );
};
