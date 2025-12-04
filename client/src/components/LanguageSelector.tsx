import { Box, Container, Stack } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";

import Proceed from "../icons/Proceed";
import SelectDropdown from "./SelectDropdown";

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
  return (
    <Container maxWidth="xl" sx={{ bgcolor: "#f9f9f9" }}>
      <Box
        sx={{
          bgcolor: "white",
          boxShadow: 2,
          maxWidth: "1000px",
          height: "100vh",
          margin: "auto",
        }}
      >
        <header className="page_header">
          <h2>Programming Language Translator</h2>
        </header>
        <div className="loading">
          <Stack spacing={3} alignItems="center">
            <h3>Select Source/Target Language</h3>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
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
            <Proceed setLoadEditor={setLoadEditor} />
          </Stack>
        </div>
      </Box>
    </Container>
  );
};

export default LanguageSelector;
