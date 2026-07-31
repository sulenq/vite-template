// src/design-system/components/branding/ui/logo.tsx

import { resolveSemanticColor } from "@/design-system/chakra/utils/chakra-system-resolver";
import { useColorMode } from "@/design-system/hooks/use-color-mode";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import type { LogoProps } from "@/design-system/components/branding/types/logo.type";
import { Center } from "@chakra-ui/react";
import { useMemo } from "react";

export const Logo = (props: LogoProps) => {
  // Props
  const { color, boxSize = 16, ...restProps } = props;

  // Hooks
  const { colorMode } = useColorMode();
  const { theme } = useThemeStore();

  // Resolved Values
  const resolvedBoxSize =
    typeof boxSize === "number" ? `${boxSize}px` : boxSize;
  const resolvedColor = useMemo(() => {
    if (color) return color;
    if (theme.colorPalette === "gray") {
      return colorMode === "dark" ? "#fff" : "#1b1b1b";
    }
    return (
      resolveSemanticColor(`${theme.colorPalette}.fg`, colorMode) || "#888888"
    );
  }, [color, theme.colorPalette, colorMode]);

  return (
    <Center
      flexShrink={0}
      w={`${resolvedBoxSize + 8}px`}
      h={`${resolvedBoxSize + 8}px`}
      {...restProps}
    >
      <svg
        width={boxSize}
        height={boxSize}
        viewBox={"0 0 23.99 23.99"}
        fill={resolvedColor}
        xmlns={"http://www.w3.org/2000/svg"}
        style={{ fillRule: "evenodd", clipRule: "evenodd" }}
      >
        <path
          d={
            "M0 0c0.03,4.96 1.55,9.57 4.13,13.4 -1.31,0.4 -2.69,0.62 -4.13,0.62l0 9.9c4.35,0 8.43,-1.16 11.95,-3.18 3.54,2.07 7.65,3.26 12.04,3.26l0 -9.96c-7.73,0 -14.01,-6.27 -14.08,-14.02l-9.9 0z"
          }
        />
        <rect x={"14.16"} y={"0.07"} width={"9.83"} height={"9.83"} />
      </svg>
    </Center>
  );
};
