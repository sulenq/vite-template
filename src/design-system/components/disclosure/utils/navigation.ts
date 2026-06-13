// src/design-system/components/disclosure/utils/navigation.ts

export function back() {
  if (typeof window === "undefined") return;

  window.history.back();
}
