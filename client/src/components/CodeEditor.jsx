import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { CircularProgress, Button } from "@mui/material";

import Copy from "../icons/Copy";
import Delete from "../icons/Delete";
import Home from "../icons/Home";

const CodeEditor = ({ sourceLang, targetLang, setLoadEditor }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    fetch("http://localhost:4000/convert", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache",
      body: JSON.stringify({
        sourceCode: input,
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
        setLoading(false);
        setOutput(targetCode);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <header className="header__container">
        <div className="header">
          <Home setLoadEditor={setLoadEditor} />
          <h3
            style={{ display: "flex", width: "70%", justifyContent: "center" }}
          >
            Source
          </h3>
          <div className="header__right__source">
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="success"
              size="medium"
            >
              Convert
            </Button>
            <Delete />
          </div>
        </div>
        <div className="header">
          <h3
            style={{ display: "flex", width: "95%", justifyContent: "center" }}
          >
            Target
          </h3>
          <div className="header__right__target">
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
            value={input}
            onChange={(value) => {
              setInput(value);
            }}
            language={sourceLang}
            theme="vs-dark"
          />
        </div>
        <div className="output">
          {loading ? (
            <div className="loader">
              <CircularProgress color="success" />
            </div>
          ) : (
            <Editor
              height="90vh"
              className="editor"
              language={targetLang}
              options={{
                domReadOnly: true,
                readOnly: true,
              }}
              defaultValue=""
              value={output}
              onChange={(value) => setOutput(value)}
              theme="vs-dark"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
