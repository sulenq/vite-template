export const CLICK_ORIGIN_X_VAR = "--click-origin-x";
export const CLICK_ORIGIN_Y_VAR = "--click-origin-y";

export const DIALOG_OFFSET_X_VAR = "--dialog-offset-x";
export const DIALOG_OFFSET_Y_VAR = "--dialog-offset-y";

export function updateClickOrigin(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const rect = target.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const root = document.documentElement;
  root.style.setProperty(CLICK_ORIGIN_X_VAR, `${x}px`);
  root.style.setProperty(CLICK_ORIGIN_Y_VAR, `${y}px`);
}

export function getClickOrigin() {
  const root = document.documentElement;
  const styles = getComputedStyle(root);
  const clickOrigin = {
    x: parseFloat(styles.getPropertyValue(CLICK_ORIGIN_X_VAR)) || 0,
    y: parseFloat(styles.getPropertyValue(CLICK_ORIGIN_Y_VAR)) || 0,
  };

  return clickOrigin;
}

export function updateDialogOffset(dialogElement: HTMLElement | null) {
  if (!dialogElement) {
    return;
  }

  const { x: clickOriginX, y: clickOriginY } = getClickOrigin();

  if (clickOriginX === 0 && clickOriginY === 0) {
    dialogElement.style.setProperty(DIALOG_OFFSET_X_VAR, "0px");
    dialogElement.style.setProperty(DIALOG_OFFSET_Y_VAR, "0px");

    return;
  }

  const offsetX = clickOriginX - window.innerWidth / 2;
  const offsetY = clickOriginY - window.innerHeight / 2;

  dialogElement.style.setProperty(DIALOG_OFFSET_X_VAR, `${offsetX}px`);
  dialogElement.style.setProperty(DIALOG_OFFSET_Y_VAR, `${offsetY}px`);
}
