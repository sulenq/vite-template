// src/features/settings/components/settings.search.tsx

"use client";

import { FocusSearchTrigger } from "@/design-system/components/overlay/ui/focus-search";
import { useSettingsNavIndex } from "@/features/settings/hooks/use-settings-nav.search-index";
import type { SettingNavKey } from "@/features/settings/types/settings-navs.type";
import { RootRoute } from "@/routes/-typed";

interface SettingsSearchTriggerProps {
  children: React.ReactNode;
  modalKey: string;
  queryKey: string;
}

export const SettingsSearchTrigger = (props: SettingsSearchTriggerProps) => {
  // Props
  const { children, modalKey, queryKey } = props;

  // Hooks
  const { activeSettingNavKey } = RootRoute.useSearch();
  const navigate = RootRoute.useNavigate();
  const index = useSettingsNavIndex();

  return (
    <FocusSearchTrigger
      modalKey={modalKey}
      queryKey={queryKey}
      index={index}
      onResultSelect={(result) => {
        setTimeout(() => {
          navigate({
            to: ".",
            search: (prev) => ({
              ...prev,
              activeSettingNavKey: result.id as SettingNavKey,
            }),
            replace: !!activeSettingNavKey,
          });
        }, 200);
      }}
    >
      {children}
    </FocusSearchTrigger>
  );
};
