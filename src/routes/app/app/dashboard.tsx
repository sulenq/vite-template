import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/app/dashboard"!</div>;
}
