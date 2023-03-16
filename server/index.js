import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

import { API_KEY } from "./config.js";

const app = express();
const PORT = process.env.PORT || "4000";
const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello World!!!",
  });
});

app.post("/convert", async (req, res) => {
  const sourceCode = req.body.sourceCode;
  const sourceLang = req.body.sourceLang;
  const targetLang = req.body.targetLang;

  const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: `##### Translate this function  from ${sourceLang} into ${targetLang}\n### ${sourceLang}\n    \n    ${sourceCode}\n    \n### ${targetLang}`,
    temperature: 0,
    max_tokens: 54,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["###"],
  });
  res.json({
    message: "Successful",
    response: response.data.choices[0],
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http:localhost:${PORT}`);
});
