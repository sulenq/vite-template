import type {
  SplitterPanelProps,
  SplitterResizeTriggerProps,
  SplitterRootProps,
} from "@/design-system/components/layout/types/splitter.type";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { Splitter as ChakraSplitter } from "@chakra-ui/react";
import { forwardRef } from "react";

const SplitterRoot = forwardRef<HTMLDivElement, SplitterRootProps>(
  (props, ref) => {
    // Stores
    const { theme } = useThemeStore();

    return (
      <ChakraSplitter.Root
        ref={ref}
        colorPalette={theme.colorPalette}
        {...props}
      />
    );
  },
);

const SplitterPanel = forwardRef<HTMLDivElement, SplitterPanelProps>(
  (props, ref) => {
    return <ChakraSplitter.Panel ref={ref} {...props} />;
  },
);

const SplitterResizeTrigger = forwardRef<
  HTMLButtonElement,
  SplitterResizeTriggerProps
>((props, ref) => {
  return <ChakraSplitter.ResizeTrigger ref={ref} {...props} />;
});

export const Splitter = {
  Root: SplitterRoot,
  Panel: SplitterPanel,
  ResizeTrigger: SplitterResizeTrigger,
};
