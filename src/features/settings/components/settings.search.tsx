// src/features/settings/components/settings.search.tsx

"use client";

import { FocusSearch } from "@/design-system/components/overlay/ui/focus-search";
import { SETTINGS_SEARCH_QUERY_KEY } from "@/features/settings/hooks/use-settings-nav-search";
import type { SettingNavKey } from "@/features/settings/types/settings-navs.type";
import { useSettingsNavIndex } from "@/features/settings/utils/settings.nav-index";
import { RootRoute } from "@/routes/-typed";

interface SettingsSearchTriggerProps {
  children: React.ReactNode;
  modalKey: string;
}

export const SettingsSearchTrigger = (props: SettingsSearchTriggerProps) => {
  const { children, modalKey } = props;
  const { activeSettingNavKey } = RootRoute.useSearch();
  const navigate = RootRoute.useNavigate();
  const index = useSettingsNavIndex();

  return (
    <FocusSearch.Root
      modalKey={modalKey}
      queryKey={SETTINGS_SEARCH_QUERY_KEY}
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
      <FocusSearch.Trigger>{children}</FocusSearch.Trigger>
    </FocusSearch.Root>
  );
};
