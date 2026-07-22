// src/routes/_app/portal/reports/income-statement.tsx

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/portal/reports/income-statement")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/portal/reports/income-statement"!</div>;
}
