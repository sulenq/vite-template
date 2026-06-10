import { chakraConfig } from "@/chakra/chakra-system";
import type { ColorMode } from "@/chakra/hooks/use-color-mode";

// -----------------------------------------------------------------

export const resolveSemanticColor = (
  token: string | null,
  colorMode: ColorMode,
): string | null => {
  if (!token) return null;

  const semanticColors = chakraConfig.theme?.semanticTokens?.colors;

  if (!semanticColors) return null;

  const cleanPath = token.replace(/^colors\./, "");
  const parts = cleanPath.split(".");

  const semanticColorValue = semanticColors[parts[0]][parts[1]].value;

  if (!semanticColorValue) return null;

  if (typeof semanticColorValue === "string") return semanticColorValue;

  const resolvedToken =
    colorMode === "light" ? semanticColorValue.base : semanticColorValue._dark;
  if (typeof resolvedToken !== "string") return "";

  // Remove !important and {}
  return resolvedToken.replace(/\s*!important/g, "").replace(/[{}]/g, "");
};
