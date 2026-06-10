import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const chakraConfig = defineConfig({
  conditions: {
    hover: "&:is(:hover, [data-hover]):not(:disabled, [data-disabled])",
  },
  globalCss: {
    "html, body": {
      bg: "bg.body",
      fontWeight: "normal",
    },
    "div, span, section, article, li, ul, ol, a, label, strong, em": {
      fontSize: "md",
      fontWeight: "normal",
    },
  },

  // Theme config ---------------------------------------------------

  theme: {
    breakpoints: {},

    keyframes: {},

    tokens: {
      colors: {},
      gradients: {},

      sizes: {},
      spacing: {},

      fonts: {
        heading: { value: "Plus Jakarta Sans, sans-serif" },
        body: { value: "Plus Jakarta Sans, sans-serif" },
        number: { value: "Plus Jakarta Sans, sans-serif" },
      },
      fontSizes: {
        xs: { value: "0.75rem" }, // 12px
        sm: { value: "0.875rem" }, // 14px
        md: { value: "0.9375rem" }, // 15px
        lg: { value: "1.0625rem" }, // 17px
        xl: { value: "1.25rem" }, // 20px
        "2xl": { value: "1.5rem" }, // 24px
        "3xl": { value: "1.875rem" }, // 30px
        "4xl": { value: "2.25rem" }, // 36px
        "5xl": { value: "3rem" }, // 48px
        "6xl": { value: "3.75rem" }, // 60px
        "7xl": { value: "4.5rem" }, // 72px
        "8xl": { value: "6rem" }, // 96px
        "9xl": { value: "8rem" }, // 128px
      },
      fontWeights: {
        normal: { value: "500" },
        medium: { value: "550" },
        semibold: { value: "600" },
        bold: { value: "700" },
        extrabold: { value: "800" },
      },
      letterSpacings: {},
      lineHeights: {},

      radii: {},

      borders: {},
      borderWidths: {},

      shadows: {},

      easings: {},

      opacity: {},

      zIndex: {},

      assets: {},

      durations: {},
      animations: {},

      aspectRatios: {},
    },

    semanticTokens: {
      colors: {
        cyan: {
          solid: {
            value: {
              base: "{colors.cyan.500}",
              _dark: "{colors.cyan.500}",
            },
          },
          contrast: {
            value: {
              base: "{colors.cyan.50} !important",
              _dark: "{colors.cyan.950} !important",
            },
          },
          fg: {
            value: {
              base: "{colors.cyan.600} !important",
              _dark: "{colors.cyan.400} !important",
            },
          },
          muted: {
            value: {
              base: "{colors.cyan.100} !important",
              _dark: "{colors.cyan.900} !important",
            },
          },
          subtle: {
            value: {
              base: "{colors.cyan.50} !important",
              _dark: "{colors.cyan.950} !important",
            },
          },
          emphasized: { value: "{colors.cyan.800}" },
          focusRing: {
            value: {
              base: "{colors.cyan.500}",
              _dark: "{colors.cyan.500}",
            },
          },
          border: {
            value: {
              base: "{colors.cyan.200} !important",
              _dark: "{colors.cyan.800} !important",
            },
          },
        },
      },
      gradients: {},
      shadows: {},
      radii: {},
      borders: {},
    },

    textStyles: {},

    layerStyles: {},

    animationStyles: {},

    recipes: {},

    slotRecipes: {},
  },
});

export const chakraSystem = createSystem(defaultConfig, chakraConfig);
