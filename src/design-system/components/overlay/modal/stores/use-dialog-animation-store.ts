// src/design-system/components/modal/stores/use-dialog-animation-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const DIALOG_OFFSET_X_VAR = "--dialog-offset-x";
export const DIALOG_OFFSET_Y_VAR = "--dialog-offset-y";

type Point = {
  x: number;
  y: number;
};

type DialogAnimationState = {
  clickOrigin: Point;
  dialogOffset: Point;
};

type DialogAnimationStore = {
  dialogs: Record<string, DialogAnimationState>;
  zIndexCounter: number;

  setClickOrigin: (dKey: string, clickOrigin: Point) => void;
  setDialogOffset: (dKey: string, dialogOffset: Point) => void;

  getClickOrigin: (dKey: string) => Point;
  getDialogOffset: (dKey: string) => Point;

  clear: (dKey: string) => void;
};

const DEFAULT_POINT: Point = { x: 0, y: 0 };

export const useDialogAnimationStore = create<DialogAnimationStore>()(
  persist(
    (set, get) => ({
      dialogs: {},
      zIndexCounter: 0,

      setClickOrigin(dKey, clickOrigin) {
        set((state) => ({
          dialogs: {
            ...state.dialogs,
            [dKey]: {
              clickOrigin,
              dialogOffset: state.dialogs[dKey]?.dialogOffset ?? DEFAULT_POINT,
            },
          },
        }));
      },

      setDialogOffset(dKey, dialogOffset) {
        set((state) => ({
          dialogs: {
            ...state.dialogs,
            [dKey]: {
              clickOrigin: state.dialogs[dKey]?.clickOrigin ?? DEFAULT_POINT,
              dialogOffset,
            },
          },
        }));
      },

      getClickOrigin(dKey) {
        return get().dialogs[dKey]?.clickOrigin ?? DEFAULT_POINT;
      },

      getDialogOffset(dKey) {
        return get().dialogs[dKey]?.dialogOffset ?? DEFAULT_POINT;
      },

      clear(dKey) {
        set((state) => {
          const dialogs = { ...state.dialogs };
          delete dialogs[dKey];
          return { dialogs };
        });
      },
    }),
    {
      name: "dialog-animation",

      partialize: (state) => ({
        dialogs: Object.fromEntries(
          Object.entries(state.dialogs).map(([dKey, data]) => [
            dKey,
            {
              clickOrigin: data.clickOrigin,
              dialogOffset: DEFAULT_POINT,
            },
          ]),
        ),
      }),
    },
  ),
);

export function updateClickOrigin(dKey: string, target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const rect = target.getBoundingClientRect();

  useDialogAnimationStore.getState().setClickOrigin(dKey, {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  });
}

export function updateDialogOffset(dKey: string) {
  const { x: clickOriginX, y: clickOriginY } = useDialogAnimationStore
    .getState()
    .getClickOrigin(dKey);

  if (clickOriginX === 0 && clickOriginY === 0) {
    useDialogAnimationStore.getState().setDialogOffset(dKey, { x: 0, y: 0 });
    return;
  }

  const offsetX = clickOriginX - window.innerWidth / 2;
  const offsetY = clickOriginY - window.innerHeight / 2;

  useDialogAnimationStore.getState().setDialogOffset(dKey, {
    x: offsetX,
    y: offsetY,
  });
}

export function getDialogOffset(dKey: string) {
  return useDialogAnimationStore.getState().getDialogOffset(dKey);
}

export function clearDialogOffset(dKey: string) {
  useDialogAnimationStore.getState().clear(dKey);
}
