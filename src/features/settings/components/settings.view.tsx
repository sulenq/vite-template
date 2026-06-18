//src/feature/settings/components/settings.view.tsx

"use client";

import {
  Box,
  VStack,
  type StackProps,
} from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";

interface SettingsViewProps extends StackProps {}

export const SettingsView = (props: SettingsViewProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <VScrollContainer align={"center"} p={4} {...restProps}>
      <VStack gap={4} w={"full"} maxW={"500px"}>
        <Box
          w={"full"}
          h={"200px"}
          bg={"bg.body"}
          shadow={"md"}
          rounded={"md"}
        />

        <Box
          w={"full"}
          h={"200px"}
          bg={"bg.body"}
          shadow={"md"}
          rounded={"md"}
        />

        <Box
          w={"full"}
          h={"400px"}
          bg={"bg.body"}
          shadow={"md"}
          rounded={"md"}
        />
      </VStack>
    </VScrollContainer>
  );
};
