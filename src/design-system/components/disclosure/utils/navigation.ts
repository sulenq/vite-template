export function back() {
  if (typeof window === "undefined") return;

  window.history.back();
}
