# CodeXlatr — AI-Powered Language Porting

![Status](https://img.shields.io/badge/Status-In%20Development-ffb703)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=white)

CodeXlatr is a monorepo housing a modern React/Vite client and a TypeScript Express API that leverage OpenAI to translate code between programming languages. The UI is designed for side-by-side comparison, instant conversions, and responsive use on tablets or desktops.

---

## Features

- **Side-by-side Editors** – Monaco-based editors for source and target code with rich UI controls and responsive layout.
- **Live Language Context** – Each editor surfaces the selected language, badges, and quick actions (clear/copy) inside the panel.
- **OpenAI-Powered Translation** – The server calls `gpt-4o-mini` via the official OpenAI SDK to translate code while preserving context and annotations.
- **Workspace Tooling** – npm workspaces orchestrate both apps with a single dependency tree and concurrent dev server.
- **Environment Management** – `.env.local` at the repo root drives both client (through Vite) and server (via dotenv) secrets.
- **TypeScript Everywhere** – Client, server, and shared types are all authored in TypeScript for safer refactors.

---

## Tech Stack

- **Runtime:** Node.js 20+, Vite 7, React 18, Express 5
- **Language:** TypeScript (client + server)
- **Styling:** Custom CSS + MUI components
- **Editor:** `@monaco-editor/react`
- **AI SDK:** `openai` official Node client
- **Tooling:** npm workspaces, concurrently, nodemon

---

## Quick Start

### 1. Install

```bash
git clone https://github.com/<your-handle>/code_translator.git
cd code_translator
npm install
```

### 2. Environment

```bash
cp .env.local.sample .env.local
# edit .env.local
OPENAI_API_KEY=sk-your-key
```

### 3. Development

```bash
# run client + server together
npm run dev

# or run individually
npm run start --workspace server
npm run start --workspace client
```

### 4. Production Build

```bash
npm run build --workspace client   # Vite build
npm run build --workspace server   # tsc build (dist/)
```

---

## Repository Structure

```
code_translator/
├── package.json                # workspace root scripts
├── .env.local.sample           # environment template
├── client/                     # React + Vite app
│   ├── src/
│   │   ├── components/         # CodeEditor, LanguageSelector, EditorHeader
│   │   ├── icons/              # SVG icon components (Copy, Delete, etc.)
│   │   ├── main.tsx            # Vite entry
│   │   └── index.css           # global theme + responsive layout
│   ├── vite.config.ts
│   └── package.json
└── server/                     # Express API
    ├── index.ts                # main server entry
    ├── types.ts                # shared request/response types
    ├── tsconfig.json
    └── package.json
```

---

## Client Overview (`client/`)

- **LanguageSelector** – Hero panel with AI marketing content, language dropdowns, and CTA to launch the editor.
- **CodeEditor** – Two Monaco instances (input/output) with inline action icons, mid-panel “Run Conversion” button, and snackbar feedback when copying.
- **EditorHeader** – Sticky workspace bar with home icon and product name.
- **Responsive Design** – Custom CSS variables, gradients, and media queries tailored for desktop, tablets (iPad Mini/Pro), and mobile widths.

Run scripts from repo root using workspaces:

| Script                             | Description                      |
| ---------------------------------- | -------------------------------- |
| `npm run start --workspace client` | Vite dev server on port 5173     |
| `npm run build --workspace client` | Production build (`client/dist`) |
| `npm run test --workspace client`  | Vitest/Jest tests (if present)   |

---

## Server Overview (`server/`)

- **Express + TypeScript** – `index.ts` sets up CORS, JSON parsing, and `/convert` POST route.
- **OpenAI SDK** – Uses `new OpenAI({ apiKey })` and `chat.completions.create` with `gpt-4o-mini`.
- **Config** – `dotenv` loads `.env.local` at repo root (with fallback to `server/.env.local` if needed).
- **Types** – Strong typing for request/response payloads (see `types.ts`) with validation + error handling.

Key scripts (`package.json` in `server/`):

| Script                                 | Description                        |
| -------------------------------------- | ---------------------------------- |
| `npm run start --workspace server`     | Build then run `dist/index.js`     |
| `npm run start:dev --workspace server` | Nodemon for live-reload TypeScript |
| `npm run build --workspace server`     | `tsc --project tsconfig.json`      |

---

## Environment Variables

| Variable          | Location            | Description                         |
| ----------------- | ------------------- | ----------------------------------- |
| `OPENAI_API_KEY`  | `.env.local` (root) | Required for server translation API |
| `PORT` (optional) | `.env.local`        | Express port (defaults to 4000)     |

The client can optionally read public env vars via Vite (prefix with `VITE_` if needed later).

---

## API Reference

- `GET /server-health` – health check returning `{ message: "Okay!" }`.
- `POST /convert` – JSON body `{ sourceCode, sourceLang, targetLang }`. Returns `{ message, response }` where `response` is the OpenAI completion result.

Validation ensures all fields are present; errors return `400` or `500` with descriptive messages.

---

## Development Notes

- **Formatting/Linting** – follow TypeScript best practices; Monaco, React, and Express files already include type definitions.
- **Styling** – `index.css` defines CSS variables (accent colors, gradients) and responsive adjustments for iPad layouts.
- **Icons** – Local TSX components, no external icon library required (Copy, Delete, Proceed, HomeIcon).
- **Future Ideas** – rename product, add theme variants, integrate persistent history, or extend server with queueing/logging.

---

## Credits

- **OpenAI** – AI completions provided by [`openai` Node SDK](https://www.npmjs.com/package/openai), currently targeting `gpt-4o-mini`.
- **Monaco Editor** – Code editing experience via [`@monaco-editor/react`](https://www.npmjs.com/package/@monaco-editor/react).
- **MUI** – UI primitives, icons, and responsive utilities from [Material UI](https://mui.com/).
- **Vite + React** – Client build tooling and SPA framework.
- **Express + TypeScript** – Server runtime powering the translation API.
