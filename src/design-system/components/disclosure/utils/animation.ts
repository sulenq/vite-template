// src/design-system/components/disclosure/utils/animation.ts

type Origin = {
  x: number;
  y: number;
};

let lastOrigin: Origin | null = null;

export function setCursorOrigin(e: MouseEvent, el: HTMLElement) {
  const rect = el.getBoundingClientRect();

  lastOrigin = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };

  el.style.transformOrigin = `${lastOrigin.x}px ${lastOrigin.y}px`;
}

export function getLastOrigin() {
  return lastOrigin;
}
