// src/routes/_app/route.tsx

import { PageContainer } from "@/design-system/components/layout/ui/page-container";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
}
