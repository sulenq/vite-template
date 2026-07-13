// src/design-system/components/typography/ui/rich-text-editor.preset.tsx

"use client";

import type { RichEditorPresetProps } from "@/design-system/components/typography/types/rich-text-editor.type";
import {
  Control,
  RichTextEditor,
} from "@/design-system/components/typography/ui/rich-text-editor";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const RichTextEditorPresetEssential = (props: RichEditorPresetProps) => {
  // Props
  const { editorOptions, ...rootProps } = props;

  // Hooks
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing your content here...",
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
          <Control.Bold />
          <Control.Italic />
          <Control.Underline />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.BulletList />
          <Control.OrderedList />
        </RichTextEditor.ControlGroup>

        <RichTextEditor.ControlGroup>
          <Control.Undo />
          <Control.Redo />
        </RichTextEditor.ControlGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor.Root>
  );
};
