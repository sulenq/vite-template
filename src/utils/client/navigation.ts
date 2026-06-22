// src/design-system/utils/navigation.ts

let lastBackAt = 0;

export function back() {
  if (typeof window === "undefined") {
    return;
  }

  const now = Date.now();

  if (now - lastBackAt < 300) {
    return;
  }

  lastBackAt = now;

  window.history.back();
}
