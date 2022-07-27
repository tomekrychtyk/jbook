import MonacoEditor from "@monaco-editor/react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}: CodeEditorProps) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value);
  };

  return (
    <MonacoEditor
      onChange={handleEditorChange}
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
      }}
    />
  );
};

export default CodeEditor;
