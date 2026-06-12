// src/routes/index.lazy.tsx

import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { AppLucideIcon } from "@/design-system/components/icon/ui/app-icon";
import { Box } from "@/design-system/components/layout/container";
import { SettingsTrigger } from "@/features/settings/components/settings.disclosure";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SettingsIcon } from "lucide-react";

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box h={"100vh"} gap={10}>
      <SettingsTrigger dKey="settings">
        <IconButton>
          <AppLucideIcon icon={SettingsIcon} />
        </IconButton>
      </SettingsTrigger>

      <Button>Tes Button</Button>
    </Box>
  );
}
