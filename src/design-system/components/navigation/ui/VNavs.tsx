import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import type { VNavsProps } from "@/design-system/components/navigation/types/vnavs.type";

export const VNavs = (props: VNavsProps) => {
  // Props
  const { ...restProps } = props;

  return <VScrollContainer {...restProps}></VScrollContainer>;
};
