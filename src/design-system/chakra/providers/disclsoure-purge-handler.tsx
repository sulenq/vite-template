import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

interface DisclosureSearchRoute {
  d?: string;
  [key: string]: unknown;
}

export function DisclosurePurgeHandler() {
  const router = useRouter();

  useEffect(() => {
    const navigationEntries = performance.getEntriesByType("navigation");

    if (navigationEntries.length > 0) {
      const navigationType = (
        navigationEntries[0] as PerformanceNavigationTiming
      ).type;

      if (navigationType === "reload") {
        const currentSearch = router.state.location
          .search as DisclosureSearchRoute;
        const dParam = currentSearch.d;

        if (dParam && typeof dParam === "string") {
          const n = dParam.split(".").length;

          if (n > 0) {
            window.history.go(-n);
          }
        }
      }
    }
  }, [router]);

  return null;
}
