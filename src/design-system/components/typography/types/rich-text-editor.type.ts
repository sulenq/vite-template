// src/design-system/components/typography/types/rich-text-editor.type.ts

import type {
  BoxProps,
  StackProps,
  IconButtonProps,
  Select,
} from "@chakra-ui/react";
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
  isDisabled?: (editor: Editor) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProps?: (editor: Editor) => Record<string, any>;
};

export type ButtonControlProps = Omit<IconButtonProps, "aria-label"> & {
  icon: React.ReactNode;
  label: string;
};

export type BooleanControlConfig = BaseControlConfig & {
  icon: React.ElementType;
  command: (editor: Editor) => void;
  getVariant?: (editor: Editor) => IconButtonProps["variant"];
};

export type SelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

export type SelectControlConfig = BaseControlConfig & {
  options: SelectOption[];
  width?: Select.RootProps["width"];
  getValue: (editor: Editor) => string;
  command: (editor: Editor, value: string) => void;
  placeholder?: string;
  renderValue?: (value: string, option?: SelectOption) => React.ReactNode;
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
