import { Box, Container, Grid } from "@mui/material";
import React from "react";
import Proceed from "../icons/Proceed";

import SelectDropdown from "./SelectDropdown";

const LanguageSelector = ({
  setLoadEditor,
  sourceLang,
  setSourceLang,
  targetLang,
  setTargetLang,
}) => {
  return (
    <>
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
            <Grid
              rowSpacing={1}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={8}>
                <h3>Select Source/Target Language</h3>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <SelectDropdown
                    label={"Source Language"}
                    lang={sourceLang}
                    handleChange={setSourceLang}
                  />
                </Grid>
                <Grid item>
                  <SelectDropdown
                    label={"Target Language"}
                    lang={targetLang}
                    handleChange={setTargetLang}
                  />
                </Grid>
              </Grid>
              <Proceed setLoadEditor={setLoadEditor} />
            </Grid>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default LanguageSelector;
