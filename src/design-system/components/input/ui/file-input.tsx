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
import { getFileIcon } from "@/design-system/components/input/utils/get-file-icon";
import { HStack } from "@/design-system/components/layout/ui/stack";
import { ClampedP, P } from "@/design-system/components/typography/ui/p";
import { useThemeStore } from "@/design-system/stores/use-theme-store";
import { isImageFile } from "@/shared/utils/data/file";
import { FileUpload, useFileUploadContext } from "@chakra-ui/react";
import { IconArrowBackUp, IconUpload, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";

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

// Existing files are NOT native File objects, so they can't use Ark's
// FileUpload.Item/ItemDeleteTrigger (those are wired to acceptedFiles
// internal state). This renders the same visual shape manually instead.
const ExistingFileItem = (props: {
  file: FileInputExistingItem;
  disabled?: boolean;
  onToggleDelete?: (id: string) => void;
}) => {
  // Props
  const { file, disabled, onToggleDelete } = props;

  // Stores
  const { theme } = useThemeStore();

  return (
    <HStack
      p={3}
      pl={4}
      bg={"bg.body"}
      rounded={theme.radii.component}
      opacity={file.markedForDelete ? 0.5 : 1}
    >
      {file.url && isImageFile(file.mimeType ?? "") ? (
        <img
          src={file.url}
          alt={file.name}
          style={{
            aspectRatio: "1 / 1",
            height: "20px",
            objectFit: "cover",
            borderRadius: theme.radii.component,
          }}
        />
      ) : (
        <FileIcon mimeType={file.mimeType ?? ""} />
      )}
      <HStack align={"center"} gap={4}>
        <ClampedP
          textDecoration={file.markedForDelete ? "line-through" : undefined}
        >
          {file.name}
        </ClampedP>
      </HStack>
      <IconButton
        size={"xs"}
        h={"32px"}
        ml={"auto"}
        my={"auto"}
        disabled={disabled}
        aria-label={file.markedForDelete ? "Undo remove file" : "Remove file"}
        onClick={() => onToggleDelete?.(file.id)}
      >
        <AppTablerIcon icon={file.markedForDelete ? IconArrowBackUp : IconX} />
      </IconButton>
    </HStack>
  );
};

export const FileInput = (props: FileInputProps) => {
  const [resetKey, setResetKey] = useState(0);

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
  } = props;

  // Stores
  const { theme } = useThemeStore();

  // Resolved Values
  // `maxFiles` is the combined cap — subtract existing (not staged-for-delete)
  // to get how many new files are actually still allowed.
  const existingRemainingCount = existingFiles.filter(
    (file) => !file.markedForDelete,
  ).length;
  const effectiveMaxFiles = Math.max(maxFiles - existingRemainingCount, 0);
  const isSlotFull = effectiveMaxFiles <= 0;

  return (
    <FileUpload.Root
      key={resetKey}
      accept={accept}
      maxFiles={effectiveMaxFiles}
      disabled={disabled || isSlotFull}
      onFileReject={(details) => {
        // Force remount on next render so Ark UI's internal dedup state is
        // cleared — this ensures the same file selection always re-triggers
        // onFileReject instead of being silently swallowed.
        setResetKey((k) => k + 1);
        console.log("rejected");
        // TODO: replace with real toast engine
        const tooMany = details.files.some((f) =>
          f.errors.includes("TOO_MANY_FILES"),
        );
        if (tooMany) {
          console.error(
            `Only ${effectiveMaxFiles} slot(s) left — you selected too many files at once ${details.files.length}.`,
          );
        }
      }}
    >
      <FileUpload.HiddenInput {...inputProps} />

      {existingFiles.length > 0 && (
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

      {/* Full on combined count — force the user to un-mark or delete an
          existing file before a new one can be added. */}
      {!isSlotFull &&
        (variant === "dropzone" ? (
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
        ))}

      <FileInputList />
    </FileUpload.Root>
  );
};
