import { useRef } from "react";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "./codeEditor.css";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null);
  const valueRef = useRef<any>();
  const handleEditorChange = (value: string | undefined) => {
    valueRef.current = value;
    onChange(value);
  };

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor
  ): void => {
    editorRef.current = editor;
  };

  const onFormatClick = () => {
    const unformatted = valueRef.current;
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        value={initialValue}
        language="javascript"
        height="500px"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
