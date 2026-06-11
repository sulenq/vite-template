import {
  Flex,
  HStack,
  Stack,
} from "@/design-system/components/layout/flex-box";
import { createLazyFileRoute } from "@tanstack/react-router";

// -----------------------------------------------------------------

export const Route = createLazyFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack gap={10}>
      <HStack>
        <Flex w={"50px"} h={"100px"} bg={"red"} />
        <Flex w={"50px"} h={"200px"} bg={"cyan.solid"} />
      </HStack>

      <Flex>
        <Flex w={"50px"} h={"100px"} bg={"red"} />
        <Flex w={"50px"} h={"200px"} bg={"cyan.solid"} />
      </Flex>
    </Stack>
  );
}
