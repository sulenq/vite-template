import type { VScrollContainerProps } from "@/design-system/components/layout/types/scroll-container.type";
import type { NavItem } from "@/shared/types/nav.type";

export type VNavsProps = VScrollContainerProps & {
  navs: NavItem[];
};
