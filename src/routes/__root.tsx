// src/routes/__root.tsx

import "@/app.css";
import { ChakraSystemProvider } from "@/design-system/chakra/providers/chakra-system.provider";
import { ColorModeProvider } from "@/design-system/chakra/providers/color-mode-provider";
import { LocaleProvider } from "@/libs/i18n/locale-provider";
import { rootSearchSchema } from "@/schemas/root-search.schema";
import "@fontsource-variable/plus-jakarta-sans";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  validateSearch: rootSearchSchema,

  component: RootComponent,
});

function RootComponent() {
  return (
    <ColorModeProvider>
      <ChakraSystemProvider>
        <LocaleProvider>
          {/* <ModalPurgeHandler /> */}

          <Outlet />
        </LocaleProvider>
      </ChakraSystemProvider>
    </ColorModeProvider>
  );
}
