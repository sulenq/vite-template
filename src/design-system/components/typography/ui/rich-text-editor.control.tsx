// src/design-system/components/typography/ui/rich-text-editor.control.tsx

"use client";

import { IconButton } from "@/design-system/components/button/ui/button";
import { CloseButton } from "@/design-system/components/button/ui/close-button";
import {
  AppLucideIcon,
  AppTablerIcon,
} from "@/design-system/components/icon/ui/app-icon";
import type { SelectProps } from "@/design-system/components/input/types/select.type";
import SelectInput from "@/design-system/components/input/ui/select";
import { HStack, VStack } from "@/design-system/components/layout/ui/flex-box";
import { Popover } from "@/design-system/components/overlay/ui/popover";
import { Tooltip } from "@/design-system/components/overlay/ui/tooltip";
import { Portal } from "@/design-system/components/utilities/ui/portal";
import type { IconButtonProps } from "@chakra-ui/react";
import { ColorSwatch } from "@chakra-ui/react";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconHighlight,
  IconItalic,
  IconLetterA,
  IconLink,
  IconLinkOff,
  IconList,
  IconListNumbers,
  IconMinus,
  IconQuote,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
} from "@tabler/icons-react";
import "@tiptap/extension-font-family";
import "@tiptap/extension-highlight";
import "@tiptap/extension-link";
import "@tiptap/extension-subscript";
import "@tiptap/extension-superscript";
import "@tiptap/extension-text-align";
import "@tiptap/extension-text-style";
import "@tiptap/extension-underline";
import "@tiptap/starter-kit";
import { UnderlineIcon } from "lucide-react";
import { forwardRef, useId, useState } from "react";
import type {
  BooleanControlConfig,
  ButtonControlProps,
  SelectControlConfig,
  SwatchControlConfig,
} from "../types/rich-text-editor.type";
import { useRichTextEditorContext } from "./rich-text-editor.context";

export const ButtonControl = forwardRef<HTMLButtonElement, ButtonControlProps>(
  function ButtonControl(props, ref) {
    // Props
    const { icon, tablerIcon, label, ...rest } = props;

    return (
      <Tooltip content={label}>
        <IconButton ref={ref} aria-label={label} {...rest}>
          {icon}

          {tablerIcon && <AppTablerIcon icon={tablerIcon} />}
        </IconButton>
      </Tooltip>
    );
  },
);

///////////////////// Boolean Control /////////////////////

export function createBooleanControl(config: BooleanControlConfig) {
  const { label, icon, tablerIcon, isDisabled, command, getVariant, getProps } =
    config;

  const BooleanControl = forwardRef<HTMLButtonElement, IconButtonProps>(
    function BooleanControl(props, ref) {
      const { editor } = useRichTextEditorContext();
      if (!editor) return null;
      const disabled = isDisabled ? isDisabled(editor) : false;
      const dynamicProps = getProps ? getProps(editor) : {};
      const variant =
        getVariant && !getProps ? getVariant(editor) : dynamicProps.variant;

      return (
        <ButtonControl
          ref={ref}
          label={label}
          icon={icon || <AppTablerIcon icon={tablerIcon} />}
          variant={variant}
          onClick={() => command(editor)}
          disabled={disabled}
          {...props}
        />
      );
    },
  );

  BooleanControl.displayName = `BooleanControl(${label})`;
  return BooleanControl;
}

///////////////////// Select Control (with options) /////////////////////

export function createSelectControl(config: SelectControlConfig) {
  const {
    label,
    options,
    w = "80px",
    getValue,
    command,
    isDisabled,
    getProps,
  } = config;

  function SelectControl(props: SelectProps) {
    const { editor } = useRichTextEditorContext();
    const controlId = useId();

    if (!editor) return null;

    const currentValue = getValue(editor);
    const disabled = isDisabled ? isDisabled(editor) : false;

    const dynamicProps = getProps ? getProps(editor) : {};

    return (
      <SelectInput
        selectOptions={options}
        variant={"ghost"}
        positioning={{ sameWidth: false }}
        placeholder={label}
        flexShrink={0}
        w={w}
        _hover={{
          bg: "bg.subtle",
        }}
        {...props}
        value={currentValue}
        onValueChange={(value) => command(editor, value)}
        disabled={disabled}
        ids={{ trigger: controlId }}
        {...dynamicProps}
      />
    );
  }

  return SelectControl;
}

///////////////////// Swatch Control (with color swatches) /////////////////////

export function createSwatchControl(config: SwatchControlConfig) {
  const {
    label,
    swatches,
    getValue,
    command,
    showRemove = false,
    onRemove,
    isDisabled,
    icon,
    tablerIcon,
    getProps,
  } = config;

  const SwatchControl = forwardRef<HTMLButtonElement, IconButtonProps>(
    function SwatchControl(props, ref) {
      const { editor } = useRichTextEditorContext();
      const [open, setOpen] = useState(false);
      const triggerId = useId();

      if (!editor) return null;
      const currentValue = getValue(editor);
      const disabled = isDisabled ? isDisabled(editor) : false;
      const dynamicProps = getProps ? getProps(editor) : {};

      return (
        <Popover.Root
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          ids={{ trigger: triggerId }}
          size={"sm"}
        >
          <Tooltip content={label} ids={{ trigger: triggerId }}>
            <Popover.Trigger>
              <IconButton
                ref={ref}
                aria-label={label}
                disabled={disabled}
                {...dynamicProps}
                {...props}
              >
                <VStack align={"center"} gap={"1px"}>
                  {icon}

                  {tablerIcon && <AppTablerIcon icon={tablerIcon} />}

                  <ColorSwatch value={currentValue} h={"4px"} w={"100%"} />
                </VStack>
              </IconButton>
            </Popover.Trigger>
          </Tooltip>

          <Portal>
            <Popover.Positioner>
              <Popover.Content width={"auto"}>
                <Popover.Body>
                  <HStack align={"center"} wrap={"wrap"} gap={1}>
                    {swatches.map((swatch) => (
                      <ColorSwatch
                        key={swatch.value}
                        cursor="button"
                        value={swatch.color}
                        onClick={() => {
                          command(editor, swatch.value);
                          setOpen(false);
                        }}
                      />
                    ))}
                    {showRemove && onRemove && (
                      <Popover.CloseTrigger asChild>
                        <CloseButton
                          onClick={() => {
                            onRemove(editor);
                            setOpen(false);
                          }}
                        />
                      </Popover.CloseTrigger>
                    )}
                  </HStack>
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      );
    },
  );

  SwatchControl.displayName = `SwatchControl(${label || "Unnamed"})`;
  return SwatchControl;
}

// -------------------------------------------------------------------------------------

export const FontFamily = createSelectControl({
  label: "Font Family",
  w: "80px",
  options: [
    { value: "default", label: "Default" },
    { value: "serif", label: "Serif" },
    { value: "mono", label: "Monospace" },
    { value: "cursive", label: "Cursive" },
  ],
  getValue: (editor) =>
    editor.getAttributes("textStyle")?.fontFamily || "default",
  command: (editor, value) =>
    value === "default"
      ? editor.chain().focus().unsetFontFamily().run()
      : editor.chain().focus().setFontFamily(value).run(),
});

export const FontSize = createSelectControl({
  label: "Font Size",
  w: "80px",
  options: [
    { value: "12px", label: "12px" },
    { value: "14px", label: "14px" },
    { value: "16px", label: "16px" },
    { value: "18px", label: "18px" },
  ],
  getValue: (editor) => editor.getAttributes("textStyle")?.fontSize || "14px",
  command: (editor, value) =>
    editor.chain().focus().setMark("textStyle", { fontSize: value }).run(),
});

export const Bold = createBooleanControl({
  label: "Bold",
  tablerIcon: IconBold,
  command: (editor) => editor.chain().focus().toggleBold().run(),
  getVariant: (editor) => (editor.isActive("bold") ? "subtle" : "ghost"),
});

export const Italic = createBooleanControl({
  label: "Italic",
  tablerIcon: IconItalic,
  command: (editor) => editor.chain().focus().toggleItalic().run(),
  getVariant: (editor) => (editor.isActive("italic") ? "subtle" : "ghost"),
});

export const Underline = createBooleanControl({
  label: "Underline",
  icon: <AppLucideIcon icon={UnderlineIcon} />,
  command: (editor) => editor.chain().focus().toggleUnderline().run(),
  getVariant: (editor) => (editor.isActive("underline") ? "subtle" : "ghost"),
});

export const Strikethrough = createBooleanControl({
  label: "Strikethrough",
  tablerIcon: IconStrikethrough,
  command: (editor) => editor.chain().focus().toggleStrike().run(),
  getVariant: (editor) => (editor.isActive("strike") ? "subtle" : "ghost"),
});

export const Code = createBooleanControl({
  label: "Code",
  tablerIcon: IconCode,
  command: (editor) => editor.chain().focus().toggleCode().run(),
  getVariant: (editor) => (editor.isActive("code") ? "subtle" : "ghost"),
});

export const Subscript = createBooleanControl({
  label: "Subscript",
  tablerIcon: IconSubscript,
  command: (editor) => editor.chain().focus().toggleSubscript().run(),
  getVariant: (editor) => (editor.isActive("subscript") ? "subtle" : "ghost"),
});

export const Superscript = createBooleanControl({
  label: "Superscript",
  tablerIcon: IconSuperscript,
  command: (editor) => editor.chain().focus().toggleSuperscript().run(),
  getVariant: (editor) => (editor.isActive("superscript") ? "subtle" : "ghost"),
});

export const H1 = createBooleanControl({
  label: "H1",
  tablerIcon: IconH1,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 1 }) ? "subtle" : "ghost",
});

export const H2 = createBooleanControl({
  label: "H2",
  tablerIcon: IconH2,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 2 }) ? "subtle" : "ghost",
});

export const H3 = createBooleanControl({
  label: "H3",
  tablerIcon: IconH3,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 3 }) ? "subtle" : "ghost",
});

export const H4 = createBooleanControl({
  label: "H4",
  tablerIcon: IconH4,
  command: (editor) => editor.chain().focus().toggleHeading({ level: 4 }).run(),
  getVariant: (editor) =>
    editor.isActive("heading", { level: 4 }) ? "subtle" : "ghost",
});

export const BulletList = createBooleanControl({
  label: "Bullet List",
  tablerIcon: IconList,
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  getVariant: (editor) => (editor.isActive("bulletList") ? "subtle" : "ghost"),
});

export const OrderedList = createBooleanControl({
  label: "Ordered List",
  tablerIcon: IconListNumbers,
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  getVariant: (editor) => (editor.isActive("orderedList") ? "subtle" : "ghost"),
});

export const Blockquote = createBooleanControl({
  label: "Blockquote",
  tablerIcon: IconQuote,
  command: (editor) => editor.chain().focus().toggleBlockquote().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
});

export const Hr = createBooleanControl({
  label: "Horizontal Rule",
  tablerIcon: IconMinus,
  command: (editor) => editor.chain().focus().setHorizontalRule().run(),
  getVariant: (editor) => (editor.isActive("blockquote") ? "subtle" : "ghost"),
});

export const Link = createBooleanControl({
  label: "Link",
  tablerIcon: IconLink,
  command: (editor) => {
    const url = window.prompt("Enter URL");
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  },
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
});

export const Unlink = createBooleanControl({
  label: "Unlink",
  tablerIcon: IconLinkOff,
  command: (editor) => editor.chain().focus().unsetLink().run(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
});

export const AlignLeft = createBooleanControl({
  label: "Align Left",
  tablerIcon: IconAlignLeft,
  command: (editor) => editor.chain().focus().setTextAlign("left").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "left" }) ? "subtle" : "ghost",
});

export const AlignCenter = createBooleanControl({
  label: "Align Center",
  tablerIcon: IconAlignCenter,
  command: (editor) => editor.chain().focus().setTextAlign("center").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "center" }) ? "subtle" : "ghost",
});

export const AlignJustify = createBooleanControl({
  label: "Align Justify",
  tablerIcon: IconAlignJustified,
  command: (editor) => editor.chain().focus().setTextAlign("justify").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "justify" }) ? "subtle" : "ghost",
});

export const AlignRight = createBooleanControl({
  label: "Align Right",
  tablerIcon: IconAlignRight,
  command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  getVariant: (editor) =>
    editor.isActive({ textAlign: "right" }) ? "subtle" : "ghost",
});

export const Undo = createBooleanControl({
  label: "Undo",
  tablerIcon: IconArrowBackUp,
  command: (editor) => editor.chain().focus().undo().run(),
  isDisabled: (editor) => !editor.can().undo(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
});

export const Redo = createBooleanControl({
  label: "Redo",
  tablerIcon: IconArrowForwardUp,
  command: (editor) => editor.chain().focus().redo().run(),
  isDisabled: (editor) => !editor.can().redo(),
  getVariant: (editor) => (editor.isActive("link") ? "subtle" : "ghost"),
});

export const TextColor = createSwatchControl({
  label: "Text Color",
  icon: <AppTablerIcon icon={IconLetterA} size={"sm"} />,
  swatches: [
    { label: "Black", value: "#000000", color: "#000000" },
    { label: "Red", value: "#FF0000", color: "#FF0000" },
    { label: "Green", value: "#00FF00", color: "#00FF00" },
    { label: "Blue", value: "#0000FF", color: "#0000FF" },
    { label: "Yellow", value: "#FFFF00", color: "#FFFF00" },
    { label: "Purple", value: "#800080", color: "#800080" },
    { label: "Orange", value: "#FFA500", color: "#FFA500" },
  ],
  getValue: (editor) => {
    const color = editor.getAttributes("textStyle")?.color;
    return color || "";
  },
  getProps: (editor) => ({
    variant: editor.getAttributes("textStyle")?.color ? "subtle" : "ghost",
  }),
  command: (editor, color) =>
    editor.chain().focus().setMark("textStyle", { color }).run(),
  onRemove: (editor) => editor.chain().focus().unsetMark("textStyle").run(),
});

export const Highlight = createSwatchControl({
  label: "Highlight",
  tablerIcon: IconHighlight,
  swatches: [
    { label: "Yellow", value: "#FFFF00", color: "#FFFF00" },
    { label: "Green", value: "#00FF00", color: "#00FF00" },
    { label: "Cyan", value: "#00FFFF", color: "#00FFFF" },
    { label: "Pink", value: "#FF69B4", color: "#FF69B4" },
    { label: "Orange", value: "#FFA500", color: "#FFA500" },
    { label: "Purple", value: "#DDA0DD", color: "#DDA0DD" },
  ],
  getValue: (editor) => {
    const color = editor.getAttributes("highlight")?.color;
    return color || "";
  },
  getProps: (editor) => ({
    variant: editor.getAttributes("highlight")?.color ? "subtle" : "ghost",
  }),
  command: (editor, color) =>
    editor.chain().focus().toggleHighlight({ color }).run(),
  showRemove: true,
  onRemove: (editor) => editor.chain().focus().unsetHighlight().run(),
});

// export const TextStyle = createSelectControl({
//   label: "Text Style",
//   width: "120px",
//   placeholder: "Paragraph",
//   options: [
//     { value: "paragraph", label: "Paragraph" },
//     { value: "heading1", label: "Heading 1" },
//     { value: "heading2", label: "Heading 2" },
//     { value: "heading3", label: "Heading 3" },
//     { value: "blockquote", label: "Quote" },
//     { value: "horizontalRule", label: "Divider", icon: <LuMinus /> },
//   ],
//   getValue: (editor) => {
//     if (editor.isActive("heading", { level: 1 })) return "heading1";
//     if (editor.isActive("heading", { level: 2 })) return "heading2";
//     if (editor.isActive("heading", { level: 3 })) return "heading3";
//     if (editor.isActive("blockquote")) return "blockquote";
//     return "paragraph";
//   },
//   command: (editor, value) => {
//     if (value === "paragraph") {
//       editor.chain().focus().setParagraph().run();
//     } else if (value === "heading1") {
//       editor.chain().focus().toggleHeading({ level: 1 }).run();
//     } else if (value === "heading2") {
//       editor.chain().focus().toggleHeading({ level: 2 }).run();
//     } else if (value === "heading3") {
//       editor.chain().focus().toggleHeading({ level: 3 }).run();
//     } else if (value === "blockquote") {
//       editor.chain().focus().toggleBlockquote().run();
//     } else if (value === "horizontalRule") {
//       editor.chain().focus().setHorizontalRule().run();
//     }
//   },
//   renderValue: (value, option) => {
//     const textStyle: Record<string, BoxProps> = {
//       paragraph: { fontWeight: "normal", fontSize: "sm" },
//       heading1: { fontWeight: "bold", fontSize: "lg" },
//       heading2: { fontWeight: "semibold", fontSize: "md" },
//       heading3: { fontWeight: "medium", fontSize: "sm" },
//       blockquote: { fontStyle: "italic", fontSize: "sm" },
//       horizontalRule: { fontWeight: "medium", fontSize: "sm" },
//     };
//     return <Box {...textStyle[value]}>{option?.label || "Paragraph"}</Box>;
//   },
// });
