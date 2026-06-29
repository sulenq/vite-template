// src/design-system/stores/useTheme.ts

import { COLOR_PALETTES } from "@/design-system/shared/constants/colors";
import { ROUNDED_PRESETS } from "@/design-system/shared/constants/presets";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STORAGE_KEY = "theme-config";

interface ThemeStore {
  colorPalette: string;
  primaryColor: string;
  primaryColorHex: string;
  radii: {
    label: string;
    component: string;
    container: string;
  };
  ambienceColor: boolean;
}

export const DEFAULT: ThemeStore = {
  colorPalette: COLOR_PALETTES[0].palette,
  primaryColor: `${COLOR_PALETTES[0].palette}.solid`,
  primaryColorHex: COLOR_PALETTES[0].primaryHex,
  radii: ROUNDED_PRESETS[5],
  ambienceColor: false,
};

type ThemeConfigStore = {
  theme: ThemeStore;
  setTheme: (
    config: Partial<ThemeStore> | ((prev: ThemeStore) => Partial<ThemeStore>),
  ) => void;
};

export const useThemeStore = create<ThemeConfigStore>()(
  persist(
    (set) => ({
      theme: DEFAULT,
      setTheme: (config) => {
        set((state) => {
          const update =
            typeof config === "function" ? config(state.theme) : config;
          return { theme: { ...state.theme, ...update } };
        });
      },
    }),
    { name: STORAGE_KEY },
  ),
);
