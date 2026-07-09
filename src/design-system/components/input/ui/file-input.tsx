// src/design-system/components/input/ui/file-input.tsx

import {
  Button,
  FileUpload,
  Float,
  Icon,
  useFileUploadContext,
} from "@chakra-ui/react";
import { IconFile, IconUpload, IconX } from "@tabler/icons-react";

import type { FileInputProps } from "../types/file-input.type";

// Renders the accepted-files list from Ark's own internal state.
// Reading it here (instead of from the `files` prop) is the actual test:
// if this list updates correctly on select AND on delete, it proves Ark's
// file-upload machine stayed in sync with the composed native input.
function FileInputList() {
  const fileUpload = useFileUploadContext();

  return (
    <FileUpload.ItemGroup>
      {fileUpload.acceptedFiles.map((file) => (
        <FileUpload.Item key={file.name} file={file}>
          <Icon>
            <IconFile />
          </Icon>
          <FileUpload.ItemName />
          <FileUpload.ItemSizeText />
          <Float placement={"top-end"}>
            <FileUpload.ItemDeleteTrigger asChild>
              <Button size={"2xs"} variant={"ghost"} aria-label={"Remove file"}>
                <Icon>
                  <IconX />
                </Icon>
              </Button>
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
}

export function FileInput(props: FileInputProps) {
  const {
    inputProps,
    variant = "button",
    accept,
    maxFiles = 5,
    disabled,
    label = "Upload files",
  } = props;

  return (
    <FileUpload.Root accept={accept} maxFiles={maxFiles} disabled={disabled}>
      {/*
        THE ACTUAL TEST: register()'s onChange/onBlur/name/ref are spread
        directly onto Ark's hidden input. If Ark composes props via
        mergeProps instead of overriding them, both RHF's form state AND
        Ark's internal `acceptedFiles` state should update together.
      */}
      <FileUpload.HiddenInput {...inputProps} />

      {variant === "dropzone" ? (
        <FileUpload.Dropzone>
          <Icon fontSize={"2xl"} color={"fg.muted"}>
            <IconUpload />
          </Icon>
          <FileUpload.DropzoneContent>
            <FileUpload.Label>{label}</FileUpload.Label>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>
      ) : (
        <FileUpload.Trigger asChild>
          <Button variant={"outline"} disabled={disabled}>
            <Icon>
              <IconUpload />
            </Icon>
            {label}
          </Button>
        </FileUpload.Trigger>
      )}

      <FileInputList />
    </FileUpload.Root>
  );
}
