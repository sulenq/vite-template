// src/design-system/components/typography/ui/rich-text-editor.preset.tsx

"use client";

import type { RichEditorPresetProps } from "@/design-system/components/typography/types/rich-text-editor.type";
import {
  Control,
  RichTextEditor,
} from "@/design-system/components/typography/ui/rich-text-editor";
import { t } from "@/shared/libs/i18n/-typed";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const RichTextEditorPresetEssential = (props: RichEditorPresetProps) => {
  // Props
  const { editorOptions, ...rootProps } = props;

  // Hooks
  const editor = useEditor({
    extensions: [
      StarterKit,
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      TextStyleKit,
      Placeholder.configure({
        placeholder: t["rich_text_editor.default_placeholder"](),
      }),
    ],
    content: "",
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    ...editorOptions,
  });

  if (!editor) return null;

  return (
    <RichTextEditor.Root
      editor={editor}
      borderWidth={"1px"}
      rounded={"l2"}
      {...rootProps}
    >
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.FontSize />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.AlignLeft />
          <Control.AlignCenter />
          <Control.AlignRight />
          <Control.AlignJustify />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.H1 />
          <Control.H2 />
          <Control.H3 />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  );
};
