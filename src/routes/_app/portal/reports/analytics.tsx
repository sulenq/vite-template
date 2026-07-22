// src/routes/_app/portal/reports/analytics.tsx

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/portal/reports/analytics")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/portal/reports/balance-sheet"!</div>;
}
