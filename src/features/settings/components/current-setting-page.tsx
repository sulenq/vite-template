//src/feature/settings/components/settings.view.tsx

"use client";

import type { StackProps } from "@/design-system/components/layout/types/container.type";
import { VStack } from "@/design-system/components/layout/ui/container";
import { VScrollContainer } from "@/design-system/components/layout/ui/scroll-container";
import { P } from "@/design-system/components/typography/p";
import { HEADER_H } from "@/design-system/constants/styles";
import { SETTINGS_CONTENTS } from "@/features/settings/constants/settings-contents";
import { RootRoute } from "@/routes/typed";

interface SettingsViewProps extends StackProps {}

export const CurrentSettingPage = (props: SettingsViewProps) => {
  // Props
  const { ...restProps } = props;

  // Hooks
  const { currentSettingNavKey } = RootRoute.useSearch();

  return (
    <VScrollContainer flex={1} align={"center"} p={4} {...restProps}>
      <VStack flex={1} gap={4} w={"full"} maxW={"600px"}>
        {currentSettingNavKey && SETTINGS_CONTENTS[currentSettingNavKey]}

        {!currentSettingNavKey && (
          <P textAlign={"center"} pb={HEADER_H} m={"auto"}>
            Please select settings menu
          </P>
        )}
      </VStack>
    </VScrollContainer>
  );
};

// export const ResetPassword = () => {
//   // Hooks
//   const { isOpen, open, close } = usePopDisclosure("settings.reset-password");

//   return (
//     <Disclosure.Root
//       dKey="settings.reset-password"
//       opened={isOpen}
//       open={open}
//       close={close}
//       clickOriginAnimation
//     >
//       <Disclosure.Trigger>
//         <Button>Reset Password</Button>
//       </Disclosure.Trigger>

//       <Disclosure.Content>
//         <Disclosure.Body></Disclosure.Body>

//         <Disclosure.Footer>
//           <Button>Cancel</Button>

//           <ResetPasswordConfirmation />
//         </Disclosure.Footer>
//       </Disclosure.Content>
//     </Disclosure.Root>
//   );
// };

// export const ResetPasswordConfirmation = () => {
//   // Hooks
//   const { isOpen, open, close } = usePopDisclosure(
//     "settings.reset-password.confirmation",
//   );

//   return (
//     <Disclosure.Root
//       dKey="settings.reset-password.confirmation"
//       opened={isOpen}
//       open={open}
//       close={close}
//       clickOriginAnimation
//     >
//       <Disclosure.Trigger>
//         <Button>Reset</Button>
//       </Disclosure.Trigger>

//       <Disclosure.Content>
//         <Disclosure.Body>Reset Password Confirmation Content</Disclosure.Body>

//         <Disclosure.Footer>
//           <Button>Cancel</Button>

//           <Button>Reset</Button>
//         </Disclosure.Footer>
//       </Disclosure.Content>
//     </Disclosure.Root>
//   );
// };
