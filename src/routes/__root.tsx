// src/routes/__root.tsx

import "@/app.css";
import { ChakraSystemProvider } from "@/design-system/chakra/providers/chakra-system.provider";
import { ColorModeProvider } from "@/design-system/chakra/providers/color-mode-provider";
import { modalSchema } from "@/design-system/components/overlay/modal/schemas/modal.schema";
import { settingsNavKeySchema } from "@/features/settings/schemas/setting-nav-key.schema";
import "@fontsource-variable/plus-jakarta-sans";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import z from "zod";

export const Route = createRootRoute({
  validateSearch: z.object({
    activeModalKey: modalSchema.optional(),
    activeSettingNavKey: settingsNavKeySchema.optional(),
  }),

  component: RootComponent,
});

function RootComponent() {
  return (
    <ColorModeProvider>
      <ChakraSystemProvider>
        {/* <ModalPurgeHandler /> */}

        <Outlet />
      </ChakraSystemProvider>
    </ColorModeProvider>
  );
}
