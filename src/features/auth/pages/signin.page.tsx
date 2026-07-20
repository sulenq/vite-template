"use client";

import type { StackProps } from "@/design-system/components/layout/types/flex-box.type";
import { SimpleGrid } from "@/design-system/components/layout/ui/grid";
import { PageContainer } from "@/design-system/components/layout/ui/page-container";
import { SigninForm } from "@/features/auth/components/ui/signin.form";
import { FeaturesCarousel } from "@/features/branding/components/ui/features-carousel";

export type SigninPageProps = StackProps & {};

export const SigninPage = (props: SigninPageProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <PageContainer {...restProps}>
      <SimpleGrid columns={[1, null, 2]} m={"auto"}>
        <FeaturesCarousel />

        <SigninForm />
      </SimpleGrid>
    </PageContainer>
  );
};
