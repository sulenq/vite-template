// src/design-system/chakra/providers/disclsoure-purge-handler.tsx

import { useEffect } from "react";

export function DisclosurePurgeHandler() {
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

    const url = new URL(window.location.href);

    if (!url.searchParams.has("d")) {
      return;
    }

    document.documentElement.dataset.disclosurePurging = "true";

    queueMicrotask(() => {
      url.searchParams.delete("d");

      window.history.replaceState(window.history.state, "", url);

      requestAnimationFrame(() => {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
        document.body.style.removeProperty("pointer-events");
        document.body.removeAttribute("data-scroll-locked");

        requestAnimationFrame(() => {
          delete document.documentElement.dataset.disclosurePurging;
        });
      });
    });
  }, []);

  return null;
}
