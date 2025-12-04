import { Box, Button, Container, Stack } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";

import SelectDropdown from "./SelectDropdown";
import EditorHeader from "./EditorHeader";

type LanguageSelectorProps = {
  setLoadEditor: Dispatch<SetStateAction<boolean>>;
  sourceLang: string;
  setSourceLang: Dispatch<SetStateAction<string>>;
  targetLang: string;
  setTargetLang: Dispatch<SetStateAction<string>>;
};

const LanguageSelector = ({
  setLoadEditor,
  sourceLang,
  setSourceLang,
  targetLang,
  setTargetLang,
}: LanguageSelectorProps) => {
  const readyToStart = Boolean(sourceLang && targetLang);
  const sameLanguages =
    readyToStart &&
    sourceLang.trim().toLowerCase() === targetLang.trim().toLowerCase();

  return (
    <>
      <EditorHeader displayHomeIcon={false} />
      <section className="hero">
        <Container maxWidth="lg">
          <div className="hero__inner">
            <div className="hero__intro">
              <span className="hero__badge">AI-powered workflow</span>
              <h1>Translate code between languages in seconds</h1>
              <p className="hero__subtitle">
                Drop in a function, choose the languages, and let our GPT-4o
                mini powered translator handle the details.
              </p>
              <ul className="hero__points">
                <li>⚡ Understands idiomatic patterns across ecosystems.</li>
                <li>🔁 Preserves function intent and annotations.</li>
                <li>📝 Outputs clean, ready-to-run snippets.</li>
              </ul>
              <Button
                variant="contained"
                size="large"
                disabled={!readyToStart || sameLanguages}
                onClick={() => setLoadEditor(true)}
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  borderRadius: "999px",
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 20px 35px rgba(40, 194, 182, 0.35)",
                  background: readyToStart
                    ? "linear-gradient(135deg, #28C2B6, #14a897)"
                    : "rgba(40, 194, 182, 0.4)",
                  color: "#101530",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1fb2a5, #119a8d)",
                  },
                }}
              >
                Start translating
              </Button>
              {!readyToStart && (
                <p className="hero__hint">
                  Select both source and target languages to continue.
                </p>
              )}
              {sameLanguages && (
                <p className="hero__hint" style={{ color: "#E63946" }}>
                  Source and target languages must be different.
                </p>
              )}
            </div>
            <div className="hero__panel">
              <div className="hero__panel-header">
                <div>
                  <p className="hero__panel-title">Select languages</p>
                  <p className="hero__panel-subtitle">
                    Pick the languages you want to convert between.
                  </p>
                </div>
                <span className="hero__panel-chip">Live Preview</span>
              </div>
              <Stack
                spacing={2}
                direction="column"
                sx={{ width: "100%", mt: 2 }}
              >
                <SelectDropdown
                  label="Source Language"
                  lang={sourceLang}
                  handleChange={setSourceLang}
                />
                <SelectDropdown
                  label="Target Language"
                  lang={targetLang}
                  handleChange={setTargetLang}
                />
              </Stack>
              <Box component="pre" className="hero__snippet">
                {`// Sample output
def greet(name: str) -> str:
    return f"Hello, {name}!"`}
              </Box>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default LanguageSelector;
