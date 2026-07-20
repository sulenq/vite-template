// src/routes/_app/route.tsx

import { Button } from "@/design-system/components/button/ui/button";
import { PageContainer } from "@/design-system/components/layout/ui/page-container";
import { SettingsTrigger } from "@/features/settings/components/settings";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <SettingsTrigger modalKey={"settings"} mt={"auto"}>
        <Button>Settings</Button>
      </SettingsTrigger>
      <Outlet />
    </PageContainer>
  );
}
