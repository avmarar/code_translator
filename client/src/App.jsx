import React, { useState } from "react";
import Editor from "@monaco-editor/react";

import Copy from "./icons/Copy";
import Delete from "./icons/Delete";
import LangSelect from "./components/LangSelect";

const App = () => {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");

  const handleSourceLangChange = (value) => {
    setSourceLang(value);
  };

  const handleTargetLangChange = (value) => {
    setTargetLang(value);
  };

  const handleSubmit = () => {
    console.log(value);
    console.log(sourceLang);
    console.log(targetLang);
    fetch("http://localhost:4000/convert", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      body: JSON.stringify({
        sourceCode: value,
        sourceLang,
        targetLang,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let response = data?.response?.text.split("```");
        const targetCode =
          response.length === 1
            ? response[0].substr(response[0].indexOf("\n") + 2)
            : response[1].substr(response[1].indexOf("\n") + 1);
        setOutput(targetCode);
      })
      .catch((err) => console.error(err));
  };
  return (
    <main className="app">
      <header className="header__container">
        <div className="header">
          <h3>Source</h3>
          <div className="header__right">
            <LangSelect
              label="Source Language"
              lang={sourceLang}
              handleChange={handleSourceLangChange}
            />
            <button className="runBtn" onClick={handleSubmit}>
              Convert
            </button>
            <Delete />
          </div>
        </div>

        <div className="header">
          <h3>Target</h3>
          <div className="header__right">
            <LangSelect
              label="Target Language"
              lang={targetLang}
              handleChange={handleTargetLangChange}
            />
            <Copy />
          </div>
        </div>
      </header>
      <div className="code__container">
        <div className="code">
          <Editor
            height="90vh"
            className="editor"
            defaultValue=""
            value={value}
            onChange={(value) => {
              setValue(value);
            }}
            defaultLanguage={sourceLang}
            theme="vs-dark"
          />
        </div>
        <div className="output">
          <Editor
            height="90vh"
            className="editor"
            defaultLanguage={targetLang}
            options={{
              domReadOnly: true,
              readOnly: true,
            }}
            defaultValue=""
            value={output}
            onChange={(value) => setOutput(value)}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
