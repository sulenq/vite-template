// src/features/settings/components/settings.navs.tsx

"use client";

import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { Divider } from "@/design-system/components/layout/ui/divider";
import { NavItem } from "@/design-system/components/layout/ui/nav";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { SETTINGS_NAVS } from "@/features/settings/constants/settings-navs";
import { SETTINGS_NAV_ITEMS } from "@/features/settings/constants/settings.nav-items";
import { Route } from "@/routes/__root";
import { useNavigate } from "@tanstack/react-router";

interface SettingsNavsProps extends StackProps {}

export const SettingsNavigation = (props: SettingsNavsProps) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const navigate = useNavigate({
    from: Route.fullPath,
  });

  // Utils
  function handleNavItemClick(tab: string) {
    navigate({
      search: (prev) => ({
        ...prev,
        settingsPage: tab,
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
