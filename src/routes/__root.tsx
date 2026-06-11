// src/routes/__root.tsx

import { ChakraSystemProvider } from "@/design-system/chakra/providers/chakra-system.provider";
import { ColorModeProvider } from "@/design-system/chakra/providers/color-mode-provider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import "@fontsource-variable/plus-jakarta-sans";
import "@/app.css";
import z from "zod";

export const Route = createRootRoute({
  validateSearch: z.object({
    d: z.string().optional(),
  }),

  component: RootComponent,
});

function RootComponent() {
  return (
    <ColorModeProvider>
      <ChakraSystemProvider>
        <Outlet />
      </ChakraSystemProvider>
    </ColorModeProvider>
  );
}
