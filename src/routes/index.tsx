// src/routes/index.lazy.tsx

import { RootPage } from "@/features/root/components/root.page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RootPage />;
}
