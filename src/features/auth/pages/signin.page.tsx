// src/features/auth/pages/signin.page.tsx

"use client";

import type { StackProps } from "@/design-system/components/layout/types/flex-box.type";
import { SimpleGrid } from "@/design-system/components/layout/ui/grid";
import { PageContainer } from "@/design-system/components/layout/ui/page-container";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { SigninForm } from "@/features/auth/components/ui/signin.form";
import { FeaturesCarousel } from "@/features/branding/components/ui/features-carousel";

export type SigninPageProps = StackProps & {};

export const SigninPage = (props: SigninPageProps) => {
  // Props
  const { ...restProps } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <PageContainer p={4} {...restProps}>
      <SimpleGrid
        columns={[1, null, 2]}
        flex={1}
        overflow={"clip"}
        w={"full"}
        maxW={"1200px"}
        maxH={[null, null, "680px"]}
        m={"auto"}
        borderColor={"border.subtle"}
        rounded={theme.radii.container}
      >
        <FeaturesCarousel />

        <SigninForm />
      </SimpleGrid>
    </PageContainer>
  );
};
