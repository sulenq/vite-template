// src/design-system/components/disclosure/hooks/use-pop-disclosure.ts

import { Route } from "@/routes/__root";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";

export function usePopDisclosure(dKey: string) {
  const lastCloseAtRef = useRef(0);
  const { d } = useSearch({
    from: Route.fullPath,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!d) {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }
  }, [d]);

  const isOpen = useMemo(() => {
    if (typeof d !== "string") return false;

    return d === dKey || d.startsWith(dKey + ".");
  }, [dKey, d]);

  function open() {
    navigate({
      to: ".",
      search: { d: dKey },
    });
  }

  function toggle() {
    if (isOpen) {
      navigate({
        to: ".",
        search: (old) => old,
      });
      return;
    }

    open();
  }

  function close() {
    const now = Date.now();

    if (now - lastCloseAtRef.current < 300) {
      return;
    }

    lastCloseAtRef.current = now;

    window.history.back();
  }

  return {
    isOpen,
    open,
    toggle,
    close,
  };
}

// Use below for Next js
// import { useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export function usePopDisclosure(dKey: string) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const d = searchParams.get("d") ?? undefined;

//   const isOpen = useMemo(() => {
//     if (typeof d !== "string") return false;

//     return d === dKey || d.startsWith(dKey + ".");
//   }, [dKey, d]);

//   function open() {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("d", dKey);

//     router.push("?" + params.toString());
//   }

//   function toggle() {
//     if (isOpen) {
//       router.back();
//       return;
//     }

//     open();
//   }

//   return {
//     isOpen,
//     open,
//     toggle,
//   };
// }
