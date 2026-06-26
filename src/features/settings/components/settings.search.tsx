//src/features/settings/components/settings.search.tsx

"use client";

import { FocusSearch } from "@/design-system/components/overlay/ui/focus-search";
import { useSearchParam } from "@/design-system/hooks/use-search-param";
import { useSettingsNavSearch } from "@/features/settings/hooks/use-settings-nav-search";
import type { SettingNavKey } from "@/features/settings/types/settings-navs.type";
import { RootRoute } from "@/routes/-typed";
import { back } from "@/utils/client/navigation";

export interface SettingsSearchTriggerProps {
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
  const { queryValue } = useSearchParam(queryKey);
  const settingsNavSearchHooks = useSettingsNavSearch({
    queryValue: queryValue ?? "",
  });

  return (
    <FocusSearch.Root
      modalKey={modalKey}
      queryKey={queryKey}
      queryValue={queryValue ?? ""}
      onResultSelect={(result) => {
        back();
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
      {...settingsNavSearchHooks}
    >
      <FocusSearch.Trigger>{children}</FocusSearch.Trigger>
    </FocusSearch.Root>
  );
};
