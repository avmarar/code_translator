import {
  useState,
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
} from "react";
import Editor from "@monaco-editor/react";
import {
  CircularProgress,
  Snackbar,
  Alert,
  type SnackbarOrigin,
  type SnackbarCloseReason,
} from "@mui/material";

import { CopyToClipboard } from "react-copy-to-clipboard";

import EditorHeader from "./EditorHeader";
import Copy from "../icons/Copy";
import Delete from "../icons/Delete";

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
      <EditorHeader setLoadEditor={setLoadEditor} />
      <div className="code__container">
        <div className="editor-card">
          <div className="editor-card__meta">
            <span className="editor-card__badge">Input</span>
            <div className="editor-card__labels--center">
              <p className="editor-card__label">SOURCE</p>
              <p className="editor-card__sub">
                Language: {sourceLang || "select a language"}
              </p>
            </div>
            <button
              className="editor-icon-btn editor-icon-btn--danger"
              onClick={() => setInput("")}
              aria-label="Clear input"
            >
              <Delete />
            </button>
          </div>
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
        <div className="convert-column">
          <button
            className="convert-fab"
            onClick={handleSubmit}
            disabled={!input || loading}
          >
            {loading ? "…" : "⇄"}
          </button>
        </div>
        <div className="editor-card">
          <div className="editor-card__meta">
            <span className="editor-card__badge">Output</span>
            <div className="editor-card__labels--center">
              <p className="editor-card__label">TARGET</p>
              <p className="editor-card__sub">
                Language: {targetLang || "select a language"}
              </p>
            </div>
            <CopyToClipboard text={output} onCopy={handleCopy}>
              <button
                className="editor-icon-btn"
                aria-label="Copy output"
                title="Copy output"
              >
                <Copy />
              </button>
            </CopyToClipboard>
          </div>
          {loading ? (
            <div className="loader">
              <CircularProgress sx={{ color: "#28C2B6" }} />
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
          sx={{
            width: "100%",
            bgcolor: "#28C2B6",
            color: "#101530",
            "& .MuiAlert-icon": { color: "#101530" },
          }}
        >
          Copied Successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CodeEditor;
