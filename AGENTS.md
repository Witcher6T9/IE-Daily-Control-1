# Base44 Dev Environment

## What this is
A pnpm workspace monorepo for "IE Daily Control" — a garment industrial engineering cockpit. The user-facing app is `artifacts/ie-daily-control`, a Vite + React + TypeScript SPA with its own Express server (`server.ts`) that serves both the frontend (Vite middleware mode) and AI endpoints (`/ai-audit`, `/ai-team-assignment`).

## How to run
- `docker compose -f docker-compose.base44.yml up -d` — starts the web app on port 3000.
- The compose uses `node:24-slim`, installs `pnpm@9.15.9` (pinned because pnpm 12's `ERR_PNPM_IGNORED_BUILDS` fails the install), runs `pnpm install --frozen-lockfile`, then `pnpm --filter @workspace/ie-daily-control run dev` (which runs `tsx server.ts`).
- Health check: `GET /health` returns `{"status":"ok"}`.

## Required env vars
- `PORT` — must be set (Vite config throws without it). Set to `3000` in compose.
- `BASE_PATH` — must be set (Vite config throws without it). Set to `/` in compose.

## Optional secrets
- `GEMINI_API_KEY` — Google Gemini key for AI audit/team-assignment features. Without it, the app falls back to rule-based heuristics. Obtain from https://aistudio.google.com/apikey.

## Architecture notes
- The app uses **localStorage** for data persistence (not the separate `@workspace/api-server` or `@workspace/db` packages). Those packages exist in the workspace but are not needed to run the preview.
- `server.ts` runs Vite in middleware mode in dev, so the Express server handles both API routes and the SPA.
- The `pnpm-workspace.yaml` has a `minimumReleaseAge: 1440` supply-chain policy and platform-specific `overrides` that strip non-linux binaries (the project targets linux-x64 only).
- The Vite config conditionally loads Replit-specific plugins only when `REPL_ID` is set, so they don't affect the Base44 environment.
