# IE Daily Control — Base44 Dev Environment

## Overview

pnpm monorepo (Node 24, TypeScript 5.9) for a garment industrial engineering cockpit.
The web app (`artifacts/ie-daily-control`) is the user-facing entry point on port 3000.

## Architecture

- **web** (`artifacts/ie-daily-control`): Vite + React 19 SPA served by its own Express server (`tsx server.ts`). Runs Vite in middleware mode (live reload). Has AI endpoints (`/ai-audit`, `/ai-team-assignment`) that fall back to deterministic IE heuristics when `GEMINI_API_KEY` is not set. Uses browser localStorage for operational data — no DB dependency.
- **api** (`artifacts/api-server`): Express 5 skeleton on port 5000 (just `/api/healthz`). Builds with esbuild then runs the bundle. Not used by the web app.
- **db**: PostgreSQL 16 (Drizzle ORM). Schema is currently empty. Only the api server connects to it.

## Running

```bash
docker compose -f docker-compose.base44.yml up -d
```

- Web: http://localhost:3000 (preview port)
- API: http://localhost:5000

## Required env vars

- `PORT` and `BASE_PATH` — set in compose `environment:` for the web service (Vite config throws without them).
- `DATABASE_URL` — set in compose `environment:` for the api service (local PostgreSQL).
- `GEMINI_API_KEY` — optional. Enables Gemini-powered AI audit/team assignment. Without it, heuristic fallbacks are used. Set via the Base44 secrets dashboard.

## Gotchas

- pnpm 12 (via corepack in node:24) requires `allowBuilds` entries in `pnpm-workspace.yaml` for packages with build scripts. Already configured for `@google/genai`, `esbuild`, `protobufjs`.
- The web service `dev` script is `tsx server.ts` (not `vite` directly) because the app bundles its own Express endpoints.
- Vite config has `allowedHosts: true` so the preview proxy hostname works.
- The `minimumReleaseAge: 1440` setting in `pnpm-workspace.yaml` enforces a 1-day supply-chain delay — use `--frozen-lockfile` to install from the existing lockfile.

## Verification

- `curl http://localhost:3000/health` → `{"status":"ok"}`
- `curl http://localhost:5000/api/healthz` → `{"status":"ok"}`
- Frontend loads at `/` with Vite HMR active (look for `/@vite/client` in the HTML source).
