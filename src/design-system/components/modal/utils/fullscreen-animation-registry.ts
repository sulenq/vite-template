// src/design-system/stores/fullscreen-animation-registry.ts

type FullscreenAnimator = (next: boolean) => void;

const registry = new Map<string, FullscreenAnimator>();

export function registerFullscreenAnimator(
  dKey: string,
  fn: FullscreenAnimator,
) {
  registry.set(dKey, fn);
}

export function unregisterFullscreenAnimator(dKey: string) {
  registry.delete(dKey);
}

export function triggerFullscreenAnimation(dKey: string, next: boolean) {
  registry.get(dKey)?.(next);
}
