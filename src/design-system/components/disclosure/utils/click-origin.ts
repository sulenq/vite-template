const CLICK_ORIGIN_X_VAR = "--click-origin-x";
const CLICK_ORIGIN_Y_VAR = "--click-origin-y";

const DIALOG_OFFSET_X_VAR = "--dialog-offset-x";
const DIALOG_OFFSET_Y_VAR = "--dialog-offset-y";

export function updateClickOrigin(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return;
  }

  const rect = target.getBoundingClientRect();

  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const root = document.documentElement;

  document.documentElement.style.setProperty("--dialog-offset-x", `${x}px`);
  document.documentElement.style.setProperty("--dialog-offset-y", `${y}px`);

  root.style.setProperty(CLICK_ORIGIN_X_VAR, `${x}px`);
  root.style.setProperty(CLICK_ORIGIN_Y_VAR, `${y}px`);
}

export function getClickOrigin() {
  const styles = getComputedStyle(document.documentElement);

  return {
    x: parseFloat(styles.getPropertyValue(CLICK_ORIGIN_X_VAR)) || 0,
    y: parseFloat(styles.getPropertyValue(CLICK_ORIGIN_Y_VAR)) || 0,
  };
}

export function updateDialogOffset() {
  const { x: clickOriginX, y: clickOriginY } = getClickOrigin();

  const dialogCenterX = window.innerWidth / 2;
  const dialogCenterY = window.innerHeight / 2;

  const offsetX = clickOriginX - dialogCenterX;
  const offsetY = clickOriginY - dialogCenterY;

  const root = document.documentElement;

  root.style.setProperty(DIALOG_OFFSET_X_VAR, `${offsetX}px`);
  root.style.setProperty(DIALOG_OFFSET_Y_VAR, `${offsetY}px`);
}
