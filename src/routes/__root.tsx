import { ChakraSystemProvider } from "@/design-system/chakra/providers/chakra-system.provider";
import { ColorModeProvider } from "@/design-system/chakra/providers/color-mode-provider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import "@fontsource-variable/plus-jakarta-sans";
import "@/app.css";

// -----------------------------------------------------------------

export const Route = createRootRoute({
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
