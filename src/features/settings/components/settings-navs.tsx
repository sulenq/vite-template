// src/features/settings/components/settings.navs.tsx

"use client";

import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import type { StackProps } from "@/design-system/components/layout/types/container.type";
import type { TabNav } from "@/design-system/components/layout/types/nav.type";
import { Divider } from "@/design-system/components/layout/ui/divider";
import { NavItem } from "@/design-system/components/layout/ui/nav";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { Route } from "@/routes/__root";
import { useNavigate } from "@tanstack/react-router";
import {
  BellIcon,
  CircleHelpIcon,
  ClockIcon,
  InfoIcon,
  KeyRoundIcon,
  LanguagesIcon,
  LockIcon,
  PlugIcon,
  ShieldUserIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";

interface SettingsNavsProps extends StackProps {}

export const SETTINGS_NAVS: TabNav[] = [
  {
    icon: <AppLucideIcon icon={UserIcon} />,
    label: "Profile",
    tab: "profile",
  },
  {
    icon: <AppLucideIcon icon={ShieldUserIcon} />,
    label: "Account",
    tab: "account",
  },
  {
    icon: <AppLucideIcon icon={LockIcon} />,
    label: "Privacy",
    tab: "privacy",
  },
  {
    icon: <AppLucideIcon icon={BellIcon} />,
    label: "Notifications",
    tab: "notifications",
  },
  "divider",
  {
    icon: <AppLucideIcon icon={SunIcon} />,
    label: "Appearance",
    tab: "appearance",
  },
  {
    icon: <AppLucideIcon icon={LanguagesIcon} />,
    label: "Language",
    tab: "language",
  },
  {
    icon: <AppLucideIcon icon={ClockIcon} />,
    label: "Date & Time",
    tab: "datetime",
  },
  "divider",
  {
    icon: <AppLucideIcon icon={PlugIcon} />,
    label: "Integrations",
    tab: "integrations",
  },
  {
    icon: <AppLucideIcon icon={KeyRoundIcon} />,
    label: "API",
    tab: "api",
  },
  "divider",
  {
    icon: <AppLucideIcon icon={CircleHelpIcon} />,
    label: "Support",
    tab: "support",
  },
  {
    icon: <AppLucideIcon icon={InfoIcon} />,
    label: "About",
    tab: "about",
  },
];

export const SettingsNavs = (props: SettingsNavsProps) => {
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
        "settings-tab": tab,
      }),
      replace: true,
    });
  }

  return (
    <VScrollContainer gap={1} minW={"250px"} {...restProps}>
      {SETTINGS_NAVS.map((nav, index) => {
        if (nav === "divider") {
          return <Divider key={index} my={1} />;
        }

        return (
          <NavItem
            key={nav.tab}
            onClick={() => {
              handleNavItemClick(nav.tab);
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
