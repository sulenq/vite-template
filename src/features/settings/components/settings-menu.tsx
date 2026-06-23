// src/features/settings/components/settings-menu.tsx

"use client";

import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { Nav } from "@/design-system/components/layout/ui/nav";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";
import { SETTINGS_MENUS } from "@/features/settings/constants/settings-menus";
import type { SettingNavKey } from "@/features/settings/types/settings-navs.type";
import { RootRoute } from "@/routes/-typed";
import { Separator } from "@/design-system/components/layout/ui/separator";
import { t } from "@/libs/i18n";

export const SettingsMenu = (props: StackProps) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const navigate = RootRoute.useNavigate();
  const isSmallViewport = useIsSmallViewport();

  // Utils
  function handleMenuClick(navKey: SettingNavKey) {
    navigate({
      search: (prev) => ({
        ...prev,
        activeSettingNavKey: navKey,
      }),
      replace: isSmallViewport ? false : true,
    });
  }

  return (
    <VScrollContainer gap={1} {...restProps}>
      {SETTINGS_MENUS.map((navKey, index) => {
        if (navKey === "separator") {
          return <Separator key={index} my={1} />;
        }

        const nav = SETTINGS_NAVS[navKey];

        return (
          <Nav
            key={navKey}
            onClick={() => {
              handleMenuClick(navKey);
            }}
          >
            <AppTablerIcon icon={nav.icon} />
            {t[`settings.${navKey}.label`]()}
          </Nav>
        );
      })}
    </VScrollContainer>
  );
};
