// src/design-system/hooks/use-viewport.ts

import { useEffect, useState } from "react";

interface Viewport {
  width: number;
  height: number;
}

function getViewport(): Viewport {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useViewport() {
  const [viewport, setViewport] = useState<Viewport>(() => getViewport());

  useEffect(() => {
    let rafId: number | null = null;

    const handleResize = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        setViewport(getViewport());
        rafId = null;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return viewport;
}
