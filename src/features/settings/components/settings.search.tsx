//src/features/settings/components/settings.search.tsx

"use client";

import { FocusSearch } from "@/design-system/components/overlay/ui/focus-search";

interface SettingsSearchProps {
  children: React.ReactNode;
  modalKey: string;
  queryKey: string;
}

export const SettingsSearchTrigger = (props: SettingsSearchProps) => {
  // Props
  const { children, modalKey, queryKey, ...restProps } = props;

  return (
    <FocusSearch modalKey={modalKey} queryKey={queryKey} {...restProps}>
      {children}
    </FocusSearch>
  );
};
