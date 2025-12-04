import OpenAI from "openai";

export type ConvertRequestBody = {
  sourceCode?: string;
  sourceLang?: string;
  targetLang?: string;
};

export type ChatCompletionResponse = Awaited<
  ReturnType<OpenAI["chat"]["completions"]["create"]>
>;

export type ConvertResponseBody = {
  message: string;
  response: ChatCompletionResponse;
};

export type ErrorResponseBody = {
  message: string;
  error?: string;
};
