// src/design-system/chakra/providers/disclsoure-purge-handler.tsx

"use client";

import { useEffect, useRef } from "react";
import { RootRoute } from "@/routes/typed";

export function ModalPurgeHandler() {
  const navigate = RootRoute.useNavigate();
  const search = RootRoute.useSearch();
  const modalKeylRef = useRef(search.activeModalKey);

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");

    if (navigationEntries.length === 0) {
      return;
    }

    const navigationType = (navigationEntries[0] as PerformanceNavigationTiming)
      .type;

    if (navigationType !== "reload") {
      return;
    }

    if (!modalKeylRef.current) {
      return;
    }

    document.documentElement.dataset.modalPurging = "true";

    queueMicrotask(() => {
      navigate({
        replace: false,
        search: (prev) => ({
          ...prev,
          activeModalKey: undefined,
        }),
      });

      requestAnimationFrame(() => {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
        document.body.style.removeProperty("pointer-events");
        document.body.removeAttribute("data-scroll-locked");

        requestAnimationFrame(() => {
          delete document.documentElement.dataset.modalPurging;
        });
      });
    });
  }, [navigate]);

  return null;
}
