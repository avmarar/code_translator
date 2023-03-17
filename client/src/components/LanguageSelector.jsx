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
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }} className="loading">
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
        </Box>
      </Container>
    </>
  );
};

export default LanguageSelector;
