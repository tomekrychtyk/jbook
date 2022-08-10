import ReactDOM from "react-dom";
import { useState } from "react";
import CodeEditor from "./components/codeEditor";
import { Preview } from "./components/Preview";
import bundle from "./bundler";

const App = () => {
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
        initialValue="const b = 7;"
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
