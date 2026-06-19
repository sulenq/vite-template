// src/design-system/stores/use-dialog-animation-store.ts

import { create } from "zustand";

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

  setClickOrigin: (dKey: string, clickOrigin: Point) => void;
  setDialogOffset: (dKey: string, dialogOffset: Point) => void;

  getClickOrigin: (dKey: string) => Point;
  getDialogOffset: (dKey: string) => Point;

  clear: (dKey: string) => void;
};

const DEFAULT_POINT: Point = {
  x: 0,
  y: 0,
};

export const useDialogAnimationStore = create<DialogAnimationStore>()(
  (set, get) => ({
    dialogs: {},

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

        return {
          dialogs,
        };
      });
    },
  }),
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

export function updateDialogOffset(
  dKey: string,
  dialogElement: HTMLElement | null,
) {
  if (!dialogElement) {
    return;
  }

  const { x: clickOriginX, y: clickOriginY } = useDialogAnimationStore
    .getState()
    .getClickOrigin(dKey);

  const rect = dialogElement.getBoundingClientRect();

  const dialogCenterX = rect.left + rect.width / 2;
  const dialogCenterY = rect.top + rect.height / 2;

  // const offsetX = clickOriginX - dialogCenterX;
  // const offsetY = clickOriginY - dialogCenterY;

  const offsetX = clickOriginX - window.innerWidth / 2;
  const offsetY = clickOriginY - window.innerHeight / 2;

  console.log({
    clickOriginX,
    clickOriginY,
    dialogCenterX,
    dialogCenterY,
    offsetX,
    offsetY,
  });

  useDialogAnimationStore.getState().setDialogOffset(dKey, {
    x: offsetX,
    y: offsetY,
  });

  dialogElement.style.setProperty(DIALOG_OFFSET_X_VAR, `${offsetX}px`);

  dialogElement.style.setProperty(DIALOG_OFFSET_Y_VAR, `${offsetY}px`);
}

export function getDialogOffset(dKey: string) {
  return useDialogAnimationStore.getState().getDialogOffset(dKey);
}
