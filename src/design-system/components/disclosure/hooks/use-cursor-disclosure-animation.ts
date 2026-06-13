import { getLastOrigin } from "@/design-system/components/disclosure/utils/animation";
import { useEffect, useRef } from "react";

export function useCursorDisclosureAnimation(isOpen: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const origin = getLastOrigin();

    console.log({ origin });

    if (origin) {
      el.style.transformOrigin = `-${origin.x * 20}px -${origin.y * 20}px`;
    }

    el.style.animation = isOpen
      ? "scaleUpOvershootFromCursor 220ms ease-out"
      : "scaleDownToCursor 160ms ease-in";
  }, [isOpen]);

  return ref;
}
