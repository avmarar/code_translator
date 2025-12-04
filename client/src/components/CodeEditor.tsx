import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
} from "react";
import Editor from "@monaco-editor/react";
import {
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  type SnackbarOrigin,
  type SnackbarCloseReason,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Copy from "../icons/Copy";
import Delete from "../icons/Delete";
import Home from "../icons/Home";

type CodeEditorProps = {
  sourceLang: string;
  targetLang: string;
  setLoadEditor: Dispatch<SetStateAction<boolean>>;
};

const anchorOrigin: SnackbarOrigin = {
  vertical: "top",
  horizontal: "right",
};

const CodeEditor = ({
  sourceLang,
  targetLang,
  setLoadEditor,
}: CodeEditorProps) => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    fetch("http://localhost:4000/convert", {
      method: "POST",
      mode: "cors",
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
      .then((res) => res.json())
      .then((data) => {
        console.log(data?.response);
        const response = data?.response?.choices?.[0]?.message?.content ?? "";
        setLoading(false);
        setOutput(response);
      })
      .catch((err) => console.error(err));
  };

  const handleCopy = () => setOpen(true);
  const handleClose = (
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
            <Delete setInput={setInput} />
          </div>
        </div>
        <div className="header">
          <h3
            style={{ display: "flex", width: "95%", justifyContent: "center" }}
          >
            Target
          </h3>
          <div className="header__right__target">
            <CopyToClipboard text={output} onCopy={handleCopy}>
              <span>
                <Copy />
              </span>
            </CopyToClipboard>
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
            onChange={(value) => setInput(value ?? "")}
            defaultLanguage={sourceLang.toLowerCase()}
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
              defaultLanguage={targetLang.toLowerCase()}
              options={{
                domReadOnly: true,
                readOnly: true,
              }}
              defaultValue=""
              value={output}
              onChange={(value) => setOutput(value ?? "")}
              theme="vs-dark"
            />
          )}
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        key={`${anchorOrigin.vertical}${anchorOrigin.horizontal}`}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CodeEditor;
