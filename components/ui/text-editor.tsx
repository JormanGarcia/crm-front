import { RichTextEditorProps } from "@mantine/rte";
import dynamic from "next/dynamic";
import React from "react";
import { theme } from "stitches.config";
const RichTextEditor = dynamic(import("@mantine/rte"), {
  ssr: false,
});

const TextEditor = React.forwardRef(
  (props: RichTextEditorProps & { name?: string }, ref) => {
    return (
      <RichTextEditor
        controls={[
          ["bold", "underline", "italic"],
          ["h1", "h2", "h3", "h4", "h5"],
          ["unorderedList"],
        ]}
        {...props}
        styles={{
          root: {
            color: theme.colors.text500.value,
            borderColor: theme.colors.gray400.value,
            fontFamily: theme.fonts.sans.value,
            letterSpacing: "0%",
            minHeight: 250,
          },
          toolbar: { color: "red", background: theme.colors.gray200.value },
        }}
        sticky={false}
      />
    );
  }
);

export default TextEditor;
