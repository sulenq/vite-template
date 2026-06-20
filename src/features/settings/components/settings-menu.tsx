// src/features/settings/components/settings.navs.tsx

"use client";

import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { Divider } from "@/design-system/components/layout/ui/divider";
import { NavItem } from "@/design-system/components/layout/ui/nav";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";
import { SETTINGS_NAV_ITEMS } from "@/features/settings/constants/settings.nav-items";
import type { SettingNavKey } from "@/features/settings/types/settings-navs.type";
import { RootRoute } from "@/routes/typed";

interface SettingsNavsProps extends StackProps {}

export const SettingsMenu = (props: SettingsNavsProps) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const navigate = RootRoute.useNavigate();

  // Utils
  function handleNavItemClick(navKey: SettingNavKey) {
    navigate({
      search: (prev) => ({
        ...prev,
        currentSettingNavKey: navKey,
      }),
      replace: true,
    });
  }

  return (
    <VScrollContainer gap={1} minW={"250px"} {...restProps}>
      {SETTINGS_NAV_ITEMS.map((navKey, index) => {
        if (navKey === "divider") {
          return <Divider key={index} my={1} />;
        }

        const nav = SETTINGS_NAVS[navKey];

        return (
          <NavItem
            key={navKey}
            onClick={() => {
              handleNavItemClick(navKey);
            }}
          >
            {nav.icon}
            {nav.label}
          </NavItem>
        );
      })}
    </VScrollContainer>
  );
};
