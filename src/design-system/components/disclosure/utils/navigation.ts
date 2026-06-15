// src/design-system/components/disclosure/utils/navigation.ts

let lastBackTimestamp = 0;

export function closeDisclosure() {
  if (typeof window === "undefined") return;

  const now = Date.now();

  if (now - lastBackTimestamp < 300) {
    return;
  }

  lastBackTimestamp = now;

  window.history.back();
}
