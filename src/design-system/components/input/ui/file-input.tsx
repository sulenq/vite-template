// src/design-system/components/input/ui/file-input.tsx

import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type {
  FileIconProps,
  FileInputExistingItem,
  FileInputProps,
} from "@/design-system/components/input/types/file-input.type";
import { getFileIcon } from "@/design-system/components/input/utils/file-input.utils";
import { HStack } from "@/design-system/components/layout/ui/flex-box";
import { Image } from "@/design-system/components/media/ui/image";
import { ClampedP, P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { useObjectUrl } from "@/shared/hooks/use-object-url";
import { isEmptyArray } from "@/shared/utils/data/array";
import { formatFileSize, isImageFile } from "@/shared/utils/data/file";
import { FileUpload, useFileUploadContext } from "@chakra-ui/react";
import { IconArrowBackUp, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";

export const FileInput = (props: FileInputProps) => {
  // Props
  const {
    inputProps,
    variant = "button",
    accept,
    maxFiles = 5,
    disabled,
    label = "Upload files",
    existingFiles = [],
    onToggleDeleteExisting,
    ...restProps
  } = props;

  // Refs
  const acceptedFilesRef = useRef<File[]>([]);
  const filesToRestoreRef = useRef<File[]>([]);

  // States
  const [resetKey, setResetKey] = useState(0);

  // Resolved Values
  const existingRemainingCount = existingFiles.filter(
    (file) => !file.markedForDelete,
  ).length;
  const effectiveMaxFiles = Math.max(maxFiles - existingRemainingCount, 0);

  return (
    <FileUpload.Root
      key={resetKey}
      accept={accept}
      maxFiles={effectiveMaxFiles}
      disabled={disabled || effectiveMaxFiles <= 0}
      onFileReject={(details) => {
        filesToRestoreRef.current = acceptedFilesRef.current;
        setResetKey((k) => k + 1);
        // TODO: replace with real toast engine
        const tooMany = details.files.some((f) =>
          f.errors.includes("TOO_MANY_FILES"),
        );
        if (tooMany) {
          console.error(
            `Only ${effectiveMaxFiles} slot(s) left — you selected too many files at once (${details.files.length}).`,
          );
        }
      }}
      {...restProps}
    >
      <FileUpload.HiddenInput {...inputProps} />

      <FileInputInner
        variant={variant}
        disabled={disabled}
        label={label}
        effectiveMaxFiles={effectiveMaxFiles}
        existingFiles={existingFiles}
        onToggleDeleteExisting={onToggleDeleteExisting}
        acceptedFilesRef={acceptedFilesRef}
        filesToRestoreRef={filesToRestoreRef}
      />
    </FileUpload.Root>
  );
};

const FileInputInner = (props: {
  variant: "button" | "dropzone";
  disabled?: boolean;
  label: string;
  effectiveMaxFiles: number;
  existingFiles: FileInputExistingItem[];
  onToggleDeleteExisting?: (id: string) => void;
  acceptedFilesRef: RefObject<File[]>;
  filesToRestoreRef: RefObject<File[]>;
}) => {
  // Props
  const {
    variant,
    disabled,
    label,
    effectiveMaxFiles,
    existingFiles,
    onToggleDeleteExisting,
    acceptedFilesRef,
    filesToRestoreRef,
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Contexts
  const { acceptedFiles, setFiles } = useFileUploadContext();

  // Keep parent's snapshot ref up-to-date so it can save files before remount
  useEffect(() => {
    acceptedFilesRef.current = acceptedFiles;
  }, [acceptedFiles, acceptedFilesRef]);

  useEffect(() => {
    const toRestore = filesToRestoreRef.current;
    if (toRestore.length > 0) {
      filesToRestoreRef.current = [];
      setFiles(toRestore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Derived Values
  const isSlotFull =
    effectiveMaxFiles <= 0 || acceptedFiles.length >= effectiveMaxFiles;

  return (
    <>
      {(!isEmptyArray(existingFiles) || !isEmptyArray(acceptedFiles)) && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {existingFiles.map((file) => (
            <ExistingFileItem
              key={file.id}
              file={file}
              disabled={disabled}
              onToggleDelete={onToggleDeleteExisting}
            />
          ))}
        </div>
      )}

      {!isSlotFull && (
        <>
          {variant === "button" && (
            <FileUpload.Trigger asChild>
              <Button variant={"outline"} disabled={disabled}>
                <AppTablerIcon icon={IconUpload} />
                {label}
              </Button>
            </FileUpload.Trigger>
          )}

          {variant === "dropzone" && (
            <FileUpload.Dropzone
              w={"full"}
              bg={"bg.body"}
              rounded={theme.radii.component}
              cursor={"pointer"}
            >
              <AppTablerIcon icon={IconUpload} color={"fg.muted"} />
              <FileUpload.DropzoneContent>
                <FileUpload.Label>{label}</FileUpload.Label>
                <P textAlign={"center"} color={"fg.subtle"}>
                  Click to upload or drag and drop
                </P>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
          )}
        </>
      )}

      {acceptedFiles.map((file) => (
        <NewFileItem
          key={file.name}
          file={file}
          disabled={disabled}
          onDelete={() => setFiles(acceptedFiles.filter((f) => f !== file))}
        />
      ))}
    </>
  );
};

const FileItem = (props: {
  name: string;
  mimeType: string;
  sizeLabel?: string;
  previewUrl?: string;
  markedForDelete?: boolean;
  disabled?: boolean;
  onDelete: () => void;
}) => {
  // Props
  const {
    name,
    mimeType,
    sizeLabel,
    previewUrl,
    markedForDelete,
    disabled,
    onDelete,
  } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <HStack
      align={"center"}
      gap={4}
      w={"full"}
      p={3}
      pl={4}
      bg={"bg.body"}
      border={"1px solid"}
      borderColor={"border.subtle"}
      rounded={theme.radii.component}
      opacity={markedForDelete ? 0.5 : 1}
    >
      {previewUrl && isImageFile(mimeType) ? (
        <Image
          src={previewUrl}
          alt={name}
          h={"20px"}
          aspectRatio={"square"}
          objectFit={"cover"}
        />
      ) : (
        <FileIcon mimeType={mimeType} />
      )}

      <ClampedP textDecoration={markedForDelete ? "line-through" : undefined}>
        {name}
      </ClampedP>

      {sizeLabel && (
        <P whiteSpace={"nowrap"} color={"fg.subtle"} ml={"auto"}>
          {sizeLabel}
        </P>
      )}

      <IconButton
        size={"xs"}
        h={"32px"}
        disabled={disabled}
        aria-label={markedForDelete ? "Undo remove file" : "Remove file"}
        onClick={onDelete}
      >
        <AppTablerIcon icon={markedForDelete ? IconArrowBackUp : IconX} />
      </IconButton>
    </HStack>
  );
};

const NewFileItem = (props: {
  file: File;
  disabled?: boolean;
  onDelete: () => void;
}) => {
  // Props
  const { file, disabled, onDelete } = props;

  // Resolved Values
  const previewUrl = useObjectUrl(isImageFile(file.type) ? file : undefined);

  return (
    <FileItem
      name={file.name}
      mimeType={file.type}
      sizeLabel={formatFileSize(file.size)}
      previewUrl={previewUrl}
      disabled={disabled}
      onDelete={onDelete}
    />
  );
};

const ExistingFileItem = (props: {
  file: FileInputExistingItem;
  disabled?: boolean;
  onToggleDelete?: (id: string) => void;
}) => {
  // Props
  const { file, disabled, onToggleDelete } = props;

  return (
    <FileItem
      name={file.name}
      mimeType={file.mimeType ?? ""}
      previewUrl={file.url}
      markedForDelete={file.markedForDelete}
      disabled={disabled}
      onDelete={() => onToggleDelete?.(file.id)}
    />
  );
};

const FileIcon = (props: FileIconProps) => {
  // Props
  const { mimeType, ...restProps } = props;

  // Resolved Values
  const icon = useMemo(() => getFileIcon(mimeType), [mimeType]);

  return <AppTablerIcon icon={icon} {...restProps} />;
};
