// src/routes/__root.tsx

import "@/app.css";
import { ChakraSystemProvider } from "@/design-system/chakra/providers/chakra-system.provider";
import { ColorModeProvider } from "@/design-system/chakra/providers/color-mode-provider";
import { settingsNavKeySchema } from "@/features/settings/schemas/setting-nav-key.scheama";
import "@fontsource-variable/plus-jakarta-sans";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createRootRoute({
  validateSearch: z.object({
    d: z.string().optional(),
    currentSettingNavKey: settingsNavKeySchema.optional(),
  }),

  component: RootComponent,
});

function RootComponent() {
  return (
    <ColorModeProvider>
      <ChakraSystemProvider>
        {/* <DisclosurePurgeHandler /> */}

        <Outlet />
      </ChakraSystemProvider>
    </ColorModeProvider>
  );
}
