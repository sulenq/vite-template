// src/design-system/components/input/ui/file-input.tsx

import {
  Button,
  IconButton,
} from "@/design-system/components/button/ui/button";
import { AppTablerIcon } from "@/design-system/components/icon/ui/app-icon";
import type {
  ExistingFileItemProps,
  FileIconProps,
  FileinputInnerProps,
  FileInputProps,
  FileItemProps,
  NewFileItemProps,
} from "@/design-system/components/input/types/file-input.type";
import { getFileIcon } from "@/design-system/components/input/utils/file-input.utils";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { Image } from "@/design-system/components/media/ui/image";
import { ClampedP, P } from "@/design-system/components/typography/ui/p";
import { useIsSmallViewport } from "@/design-system/hooks/use-is-small-viewport";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { useObjectUrl } from "@/shared/hooks/use-object-url";
import { t } from "@/shared/libs/i18n/-typed";
import { isEmptyArray } from "@/shared/utils/data/array";
import { formatFileSize, isImageFile } from "@/shared/utils/data/file";
import {
  FileUpload,
  FormatByte,
  useFieldContext,
  useFileUploadContext,
} from "@chakra-ui/react";
import {
  IconArrowBackUp,
  IconArrowDownDashed,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useMemo, useRef, useState } from "react";

export const FileInput = (props: FileInputProps) => {
  // Props
  const {
    inputProps,
    variant = "auto",
    accept,
    maxFiles = 1,
    maxFileSize = 5 * 1024 * 1024, // 5MB
    disabled,
    label = t["common.upload_files"](),
    existingFiles = [],
    onToggleDeleteExisting,
    ...restProps
  } = props;

  // Contexts
  const fieldContext = useFieldContext();
  const isFieldInvalid = fieldContext?.invalid;

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
        accept={accept}
        maxFiles={maxFiles}
        maxFileSize={maxFileSize}
        variant={variant}
        disabled={disabled}
        label={label}
        invalid={isFieldInvalid}
        effectiveMaxFiles={effectiveMaxFiles}
        existingFiles={existingFiles}
        onToggleDeleteExisting={onToggleDeleteExisting}
        acceptedFilesRef={acceptedFilesRef}
        filesToRestoreRef={filesToRestoreRef}
      />
    </FileUpload.Root>
  );
};

const FileInputInner = (props: FileinputInnerProps) => {
  // Props
  const {
    accept,
    maxFiles,
    maxFileSize,
    variant,
    disabled,
    label,
    invalid,
    effectiveMaxFiles,
    existingFiles,
    onToggleDeleteExisting,
    acceptedFilesRef,
    filesToRestoreRef,
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Contexts
  const { acceptedFiles, setFiles, dragging } = useFileUploadContext();

  // Hooks
  const isSmallViewport = useIsSmallViewport();

  // Resolved Values
  const resolvedVariant =
    variant === "auto" ? (isSmallViewport ? "button" : "dropzone") : variant;

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
          {resolvedVariant === "button" && (
            <FileUpload.Trigger asChild>
              <Button
                variant={"outline"}
                w={"full"}
                disabled={disabled}
                borderColor={invalid ? "border.error" : undefined}
              >
                <AppTablerIcon icon={IconUpload} />
                {label}
              </Button>
            </FileUpload.Trigger>
          )}

          {resolvedVariant === "dropzone" && (
            <VStack pos={"relative"} w={"full"}>
              <FileUpload.Dropzone
                w={"full"}
                minH={"220px"}
                p={4}
                border={"2px dashed"}
                borderColor={dragging ? "transparent" : "border.muted"}
                rounded={theme.radii.component}
                cursor={"pointer"}
              >
                <FileUpload.DropzoneContent
                  gap={4}
                  transform={dragging ? "translateY(25%)" : ""}
                  transition={"200ms"}
                >
                  <AppTablerIcon
                    icon={dragging ? IconArrowDownDashed : IconUpload}
                    size={"lg"}
                    color={"fg.muted"}
                  />

                  <VStack>
                    <FileUpload.Label>
                      {dragging
                        ? t["common.drop_it_here"]()
                        : t["common.chose_or_drag_to_upload"]()}
                    </FileUpload.Label>

                    <P
                      fontSize={"sm"}
                      textAlign={"center"}
                      color={"fg.subtle"}
                      opacity={dragging ? 0 : 1}
                      transition={"200ms"}
                    >
                      {accept?.map((a: string) => a).join(", ")}
                      {` max ${maxFiles} files `}
                      {maxFileSize && (
                        <>
                          (<FormatByte value={maxFileSize} />)
                        </>
                      )}
                    </P>
                  </VStack>

                  <Button
                    variant={"outline"}
                    size={"xs"}
                    pointerEvents={"none"}
                    opacity={dragging ? 0 : 1}
                    transition={"200ms"}
                  >
                    {t["common.browse_files"]()}
                  </Button>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>

              {dragging && (
                <svg
                  width={"100%"}
                  height={"100%"}
                  preserveAspectRatio={"none"}
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "visible",
                    pointerEvents: "none",
                  }}
                >
                  <rect
                    x={1}
                    y={1}
                    width={"calc(100% - 2px)"}
                    height={"calc(100% - 2px)"}
                    rx={theme.radii.component}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={1.5}
                    strokeDasharray={"6 4"}
                    style={{
                      animation: "marching-ants 0.6s linear infinite",
                      vectorEffect: "non-scaling-stroke",
                    }}
                  />
                </svg>
              )}

              <style>{`
                @keyframes marching-ants {
                  to { stroke-dashoffset: -10; }
                }
              `}</style>
            </VStack>
          )}
        </>
      )}

      {acceptedFiles.map((file) => (
        <NewFileItem
          key={file.name}
          file={file}
          disabled={disabled}
          border={"1px solid"}
          borderColor={invalid ? "border.error" : "border.muted"}
          onDelete={() => setFiles(acceptedFiles.filter((f) => f !== file))}
        />
      ))}
    </>
  );
};

const FileItem = (props: FileItemProps) => {
  // Props
  const {
    name,
    mimeType,
    sizeLabel,
    previewUrl,
    markedForDelete,
    disabled,
    onDelete,
    ...restProps
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
      {...restProps}
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
        aria-label={
          markedForDelete
            ? t["common.undo_remove_file"]()
            : t["common.remove_file"]()
        }
        onClick={onDelete}
      >
        <AppTablerIcon icon={markedForDelete ? IconArrowBackUp : IconX} />
      </IconButton>
    </HStack>
  );
};

const NewFileItem = (props: NewFileItemProps) => {
  // Props
  const { file, disabled, onDelete, ...restProps } = props;

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
      {...restProps}
    />
  );
};

const ExistingFileItem = (props: ExistingFileItemProps) => {
  // Props
  const { file, disabled, onToggleDelete, ...restProps } = props;

  return (
    <FileItem
      name={file.name}
      mimeType={file.mimeType ?? ""}
      previewUrl={file.url}
      markedForDelete={file.markedForDelete}
      disabled={disabled}
      onDelete={() => onToggleDelete?.(file.id)}
      {...restProps}
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
