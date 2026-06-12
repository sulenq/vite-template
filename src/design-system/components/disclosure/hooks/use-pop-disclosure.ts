// src/design-system/components/disclosure/hooks/use-pop-disclosure.ts

import { useMemo } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { Route as RootRoute } from "@/routes/__root";

export function usePopDisclosure(dKey: string) {
  const { d } = useSearch({
    from: RootRoute.id,
  });
  const navigate = useNavigate();

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
      window.history.back();
      return;
    }

    open();
  }

  return {
    isOpen,
    open,
    toggle,
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

//     return d === dKey || d.startsWith(dKey);
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
