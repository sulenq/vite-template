import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/admin/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/admin/dashboard"!</div>;
}
