// src/design-system/components/input/ui/file-input.tsx

import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type {
  FileIconProps,
  FileInputProps,
} from "@/design-system/components/input/types/file-input.type";
import { getFileIcon } from "@/design-system/components/input/utils/get-file-icon";
import { HStack } from "@/design-system/components/layout/ui/stack";
import { ClampedP, P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { isImageFile } from "@/shared/utils/data/file";
import { FileUpload, useFileUploadContext } from "@chakra-ui/react";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useMemo } from "react";

const FileIcon = (props: FileIconProps) => {
  // Props
  const { mimeType, ...restProps } = props;

  // Resolved Values
  const icon = useMemo(() => getFileIcon(mimeType), [mimeType]);

  return <AppTablerIcon icon={icon} {...restProps} />;
};

const FileInputList = () => {
  // Stores
  const { theme } = useThemeStore();

  // Contexts
  const fileUpload = useFileUploadContext();

  return (
    <FileUpload.ItemGroup>
      {fileUpload.acceptedFiles.map((file) => (
        <FileUpload.Item
          key={file.name}
          file={file}
          p={3}
          pl={4}
          bg={"bg.body"}
          rounded={theme.radii.component}
        >
          {isImageFile(file.type) ? (
            <FileUpload.ItemPreviewImage aspectRatio={"square"} h={"20px"} />
          ) : (
            <FileIcon mimeType={file.type} />
          )}

          <HStack align={"center"} gap={4}>
            <ClampedP>{file.name}</ClampedP>

            <FileUpload.ItemSizeText whiteSpace={"nowrap"} mt={1} />
          </HStack>

          <FileUpload.ItemDeleteTrigger asChild>
            <IconButton
              size={"xs"}
              h={"32px"}
              ml={"auto"}
              my={"auto"}
              aria-label={"Remove file"}
            >
              <AppTablerIcon icon={IconX} />
            </IconButton>
          </FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

export const FileInput = (props: FileInputProps) => {
  // Props
  const {
    inputProps,
    variant = "button",
    accept,
    maxFiles = 5,
    disabled,
    label = "Upload files",
  } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <FileUpload.Root accept={accept} maxFiles={maxFiles} disabled={disabled}>
      <FileUpload.HiddenInput {...inputProps} />

      {variant === "dropzone" ? (
        <FileUpload.Dropzone
          w={"full"}
          bg={"bg.body"}
          rounded={theme.radii.component}
        >
          <AppTablerIcon icon={IconUpload} color={"fg.muted"} />

          <FileUpload.DropzoneContent>
            <FileUpload.Label>{label}</FileUpload.Label>
            <P textAlign={"center"} color={"fg.subtle"}>
              Click to upload or drag and drop
            </P>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
      ) : (
        <FileUpload.Trigger asChild>
          <Button variant={"outline"} disabled={disabled}>
            <AppTablerIcon icon={IconUpload} />

            {label}
          </Button>
        </FileUpload.Trigger>
      )}

      <FileInputList />
    </FileUpload.Root>
  );
};
