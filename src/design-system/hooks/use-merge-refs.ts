import type { Ref } from "react";
import { useCallback, useRef } from "react";

export const useMergedRefs = <T>(...refs: Ref<T>[]) => {
  // Refs
  const refsRef = useRef(refs);

  return useCallback((node: T | null) => {
    for (const ref of refsRef.current) {
      if (!ref) continue;

      if (typeof ref === "function") {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  }, []);
};
