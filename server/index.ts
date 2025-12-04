import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express, { type Request, type Response } from "express";
import cors from "cors";
import OpenAI from "openai";

import {
  ConvertRequestBody,
  ConvertResponseBody,
  ErrorResponseBody,
} from "./types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootEnvPath = path.resolve(__dirname, "../../.env.local");
const localEnvPath = path.resolve(__dirname, "../.env.local");
dotenv.config({ path: rootEnvPath });
dotenv.config({ path: localEnvPath, override: true });

const app = express();
const PORT = process.env.PORT || "4000";
const API_KEY = process.env.OPENAI_API_KEY;

if (!API_KEY) {
  throw new Error(
    "OPENAI_API_KEY is not set. Please set it in your environment variables."
  );
}

const openai = new OpenAI({
  apiKey: API_KEY,
});

const buildPrompt = ({
  sourceCode,
  sourceLang,
  targetLang,
}: Required<ConvertRequestBody>): string =>
  `Translate this function from ${sourceLang} to ${targetLang}\n${sourceCode}`;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/server-health", (req, res) => {
  res.json({
    message: "Okay!",
  });
});

app.post(
  "/convert",
  async (
    req: Request<
      unknown,
      ConvertResponseBody | ErrorResponseBody,
      ConvertRequestBody
    >,
    res: Response<ConvertResponseBody | ErrorResponseBody>
  ) => {
    const { sourceCode, sourceLang, targetLang } = req.body;

    if (!sourceCode || !sourceLang || !targetLang) {
      return res.status(400).json({
        message: "Missing required fields",
        error: "sourceCode, sourceLang and targetLang are required",
      });
    }

    try {
      const promptContent = buildPrompt({
        sourceCode,
        sourceLang,
        targetLang,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: promptContent }],
      });

      return res.json({
        message: "Successful",
        response,
      });
    } catch (error) {
      console.error("OpenAI request failed", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      return res.status(500).json({
        message: "Failed to convert code",
        error: errorMessage,
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on http:localhost:${PORT}`);
});
