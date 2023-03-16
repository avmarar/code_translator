import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

import { API_KEY } from "./config";

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

app.post("/convert", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Server listening on http:localhost:${PORT}`);
});
