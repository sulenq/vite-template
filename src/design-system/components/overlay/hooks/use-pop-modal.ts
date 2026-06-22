// src/design-system/components/modal/hooks/use-pop-modal.ts

import { RootRoute } from "@/routes/typed";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef } from "react";

export function usePopModal(modalKey: string) {
  const lastCloseAtRef = useRef(0);
  const { activeModalKey } = RootRoute.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeModalKey) {
      document.body.style.overflow = "";
      document.body.style.pointerEvents = "";
    }
  }, [activeModalKey]);

  const isOpen = useMemo(() => {
    if (typeof activeModalKey !== "string") return false;

    return (
      activeModalKey === modalKey || activeModalKey.startsWith(modalKey + ".")
    );
  }, [modalKey, activeModalKey]);

  function open() {
    navigate({
      to: ".",
      search: { activeModalKey: modalKey },
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

// export function usePopModal(modalKey: string) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const activeModalKey = searchParams.get("activeModalKey") ?? undefined;

//   const isOpen = useMemo(() => {
//     if (typeof activeModalKey !== "string") return false;

//     return activeModalKey === modalKey || activeModalKey.startsWith(modalKey + ".");
//   }, [modalKey, activeModalKey]);

//   function open() {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("activeModalKey", modalKey);

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
