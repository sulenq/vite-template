// src/routes/index.tsx

import { Button } from "@/design-system/components/button/ui/button";
import { Center } from "@/design-system/components/layout/ui/center";
import { NavLink } from "@/design-system/components/navigation/ui/link";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Center minH={"100dvh"}>
      <NavLink to={"/demo"}>
        <Button primary>Demo Page</Button>
      </NavLink>
    </Center>
  );
}
