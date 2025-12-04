# Code Translator Monorepo

This repository now uses a single npm workspace to manage both the React client and the Node.js server that power the code translator. All dependencies are installed once at the root and each app remains in its original folder.

## Structure

- `client` – React front-end created with Create React App (`@code-translator/client`)
- `server` – Express + OpenAI powered API (`@code-translator/server`)

## Getting Started

1. Install dependencies for every workspace from the repo root:
   ```bash
   npm install
   ```
2. Copy `.env.local.sample` to `.env.local` in the repository root and add your environment secrets (`OPENAI_API_KEY`, etc.). The server automatically loads this file at runtime.

## Useful Scripts

All commands are run from the repo root.

- `npm run dev` – start the server and client together via `concurrently`.
- `npm run start:server` – run only the Express API.
- `npm run start:client` – run only the React app.
- `npm run build` – build the client for production (runs CRA build).
- `npm test` – run the client test suite.

You can also use the native npm workspace syntax if you prefer, e.g. `npm run start --workspace server`.
