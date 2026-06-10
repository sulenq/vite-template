import { ChakraSystemProvider } from "@/chakra/providers/chakra-system.provider";
import { ColorModeProvider } from "@/chakra/providers/color-mode-provider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import "@fontsource-variable/plus-jakarta-sans";
import "@/app.css";

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
