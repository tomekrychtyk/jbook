import { useState } from "react";
import CodeEditor from "./CodeEditor";
import { Preview } from "./Preview";
import bundle from "../bundler";

const CodeCell = () => {
  const [input, setInput] = useState<string | undefined>("");
  const [code, setCode] = useState<string | undefined>("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        onChange={(value) => {
          setInput(value);
        }}
        initialValue="const a = 1;"
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

export default CodeCell;
