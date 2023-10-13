import ReactCodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { red } from "@radix-ui/colors";
import React from "react";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

export type Lang = "javascript" | "python" | "text";

const getExtension = (lang: Lang) => {
  switch (lang) {
    case "javascript":
      return javascript({ jsx: true, typescript: true });
    case "python":
      return python();
    default:
      return;
  }
};

interface CodeEditorProps extends ReactCodeMirrorProps {
  error?: boolean;
  lang: Lang;
}

function CodeEditor({
  error = false,
  value,
  lang,
  ...restProps
}: CodeEditorProps) {
  const extension = getExtension(lang);
  return (
    <ReactCodeMirror
      style={{
        border: error ? `2px solid ${red.red8}` : undefined,
        borderRadius: "12px",
        padding: "3px"
      }}
      value={value}
      extensions={extension ? [extension] : []}
      height="500px"
      {...restProps}
    ></ReactCodeMirror>
  );
}

export default CodeEditor;
