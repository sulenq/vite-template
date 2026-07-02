// src/design-system/chakra/recipes/input.recipe.ts

import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
  variants: {
    variant: {
      outline: {
        borderColor: "border.subtle",
      },
      filled: {
        bg: "bg.subtle",
      },
    },
  },
});
