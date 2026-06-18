// src/design-system/components/layout/ui/scroll-container.tsx

"use client";

import {
  VStack,
  type StackProps,
} from "@/design-system/components/layout/ui/container";
import { useEffect, useRef, useState } from "react";

interface ScrollContainerProps extends StackProps {}

export const VScrollContainer = (props: ScrollContainerProps) => {
  // Props
  const { children, borderColor = "an1", ...restProps } = props;

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const [scrollTop, setScrollTop] = useState<number>(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <VStack
      ref={containerRef}
      overflowY={"auto"}
      borderTop={"1px solid"}
      borderColor={scrollTop !== 0 ? borderColor : "transparent"}
      transition={"200ms"}
      {...restProps}
    >
      {children}
    </VStack>
  );
};
