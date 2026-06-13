// src/routes/index.lazy.tsx

import { IconButton } from "@/design-system/components/button/ui/button";
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import { VStack } from "@/design-system/components/layout/container";
import { SettingsTrigger } from "@/features/settings/components/settings.disclosure";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <VStack h={"100vh"} gap={10}>
      <SettingsTrigger dKey={"settings"} w={"fit"} mt={"auto"}>
        <IconButton>
          <AppLucideIcon icon={SettingsIcon} />
        </IconButton>
      </SettingsTrigger>
    </VStack>
  );
}
