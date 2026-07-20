// src/routes/app/portal/dashboard.tsx

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/portal/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/app/dashboard"!</div>;
}
