// src/design-system/components/media/ui/image.tsx

import type { ImageProps } from "@/design-system/components/media/types/image.type";
import { Image as ChakraImage } from "@chakra-ui/react";

export const Image = (props: ImageProps) => <ChakraImage {...props} />;
