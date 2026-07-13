// src/design-system/components/typography/types/rich-text-editor.type.ts

import type { SelectProps } from "@/design-system/components/input/types/select.type";
import type { BoxProps, IconButtonProps, StackProps } from "@chakra-ui/react";
import type { TablerIcon } from "@tabler/icons-react";
import type { Editor, EditorContent, EditorOptions } from "@tiptap/react";
import type * as React from "react";

export type RichEditorPresetProps = RichTextEditorRootProps & {
  editorOptions?: Partial<EditorOptions>;
};

export type RichTextEditorRootProps = {};

export type RichTextEditorProps = BoxProps & {
  editor: Editor | null;
  disabled?: boolean;
};

export type RichTextEditorContextValue = {
  editor: Editor | null;
};

export type RichTextEditorToolbarVariant = "sticky" | "floating" | "fixed";

export type RichTextEditorToolbarProps = StackProps & {
  variant?: RichTextEditorToolbarVariant;
  stickyOffset?: string;
};

export type RichTextEditorContentProps = Omit<
  React.ComponentProps<typeof EditorContent>,
  "editor"
>;

export type RichTextEditorControlGroupProps = StackProps;

export type BaseControlConfig = {
  label: string;
  icon?: React.ElementType;
  tablerIcon?: TablerIcon;
  isDisabled?: (editor: Editor) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProps?: (editor: Editor) => Record<string, any>;
};

export type ButtonControlProps = Omit<IconButtonProps, "aria-label"> & {
  icon?: React.ReactNode;
  tablerIcon?: TablerIcon;
  label: string;
};

export type BooleanControlConfig = BaseControlConfig & {
  icon?: React.ElementType;
  tablerIcon?: TablerIcon;
  command: (editor: Editor) => void;
  getVariant?: (editor: Editor) => IconButtonProps["variant"];
};

export type SelectOption = {
  icon?: React.ReactNode;
  tablerIcon?: TablerIcon;
  value: string;
  label: string;
};

export type SelectControlConfig = BaseControlConfig &
  SelectProps & {
    options: SelectOption[];
    getValue: (editor: Editor) => string;
    command: (editor: Editor, value: string) => void;
    placeholder?: string;
    // renderValue?: (value: string, option?: SelectOption) => React.ReactNode;
  };

export type SwatchOption = {
  value: string;
  color: string;
  label?: string;
};

export type SwatchControlConfig = BaseControlConfig & {
  swatches: SwatchOption[];
  getValue: (editor: Editor) => string;
  command: (editor: Editor, value: string) => void;
  showRemove?: boolean;
  onRemove?: (editor: Editor) => void;
};
