"use client";

import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type {
  ButtonProps,
  GroupProps,
  InputProps,
  StackProps,
} from "@chakra-ui/react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  mergeRefs,
  useControllableState,
} from "@chakra-ui/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import * as React from "react";

export interface PasswordVisibilityProps {
  /**
   * The default visibility state of the password input.
   */
  defaultVisible?: boolean;
  /**
   * The controlled visibility state of the password input.
   */
  visible?: boolean;
  /**
   * Callback invoked when the visibility state changes.
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * Custom icons for the visibility toggle button.
   */
  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode };
}

export interface PasswordInputProps
  extends InputProps, PasswordVisibilityProps {
  rootProps?: GroupProps;
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(function PasswordInput(props, ref) {
  const {
    rootProps,
    defaultVisible,
    visible: visibleProp,
    onVisibleChange,
    visibilityIcon = {
      on: <AppTablerIcon icon={IconEye} />,
      off: <AppTablerIcon icon={IconEyeOff} />,
    },
    ...restProps
  } = props;

  const [visible, setVisible] = useControllableState({
    value: visibleProp,
    defaultValue: defaultVisible || false,
    onChange: onVisibleChange,
  });

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <InputGroup
      endElement={
        <VisibilityTrigger
          disabled={restProps.disabled}
          onPointerDown={(e) => {
            if (restProps.disabled) return;
            if (e.button !== 0) return;
            e.preventDefault();
            setVisible(!visible);
          }}
        >
          {visible ? visibilityIcon.off : visibilityIcon.on}
        </VisibilityTrigger>
      }
      w={restProps?.w || "fit"}
      {...rootProps}
    >
      <Input
        {...restProps}
        ref={mergeRefs(ref, inputRef)}
        type={visible ? "text" : "password"}
      />
    </InputGroup>
  );
});

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        tabIndex={-1}
        ref={ref}
        me={"-2"}
        aspectRatio={"square"}
        size={"sm"}
        variant={"ghost"}
        height={"calc(100% - {spacing.2})"}
        aria-label={"Toggle password visibility"}
        {...props}
      />
    );
  },
);

interface PasswordStrengthMeterProps extends StackProps {
  max?: number;
  value: number;
}

export const PasswordStrengthMeter = React.forwardRef<
  HTMLDivElement,
  PasswordStrengthMeterProps
>(function PasswordStrengthMeter(props, ref) {
  const { max = 4, value, ...rest } = props;

  const percent = (value / max) * 100;
  const { label, colorPalette } = getColorPalette(percent);

  return (
    <Stack align={"end"} gap={1} ref={ref} {...rest}>
      <HStack width={"full"} {...rest}>
        {Array.from({ length: max }).map((_, index) => (
          <Box
            key={index}
            height={1}
            flex={1}
            rounded={"sm"}
            data-selected={index < value ? "" : undefined}
            layerStyle={"fill.subtle"}
            colorPalette={"neutral"}
            _selected={{
              colorPalette,
              layerStyle: "fill.solid",
            }}
          />
        ))}
      </HStack>
      {label && <HStack textStyle="xs">{label}</HStack>}
    </Stack>
  );
});

function getColorPalette(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: "Low", colorPalette: "red" };
    case percent < 66:
      return { label: "Medium", colorPalette: "orange" };
    default:
      return { label: "High", colorPalette: "green" };
  }
}
