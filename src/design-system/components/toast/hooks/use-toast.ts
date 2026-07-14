import { toast } from "@/design-system/components/toast/core/toast.manager";

/** Thin wrapper for hook-style ergonomics. `toast` itself works fine outside components too. */
export function useToast() {
  return toast;
}
