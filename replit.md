# IE Daily Control

IE Daily Control is a garment industrial engineering cockpit for monitoring sewing-line efficiency, manpower, bottlenecks, daily controls, and improvement work.

## Run & Operate

- `pnpm --filter @workspace/ie-daily-control run dev` — run the tracker web app
- `pnpm --filter @workspace/ie-daily-control run typecheck` — typecheck the tracker frontend
- `pnpm --filter @workspace/ie-daily-control run build` — build the tracker frontend
- `pnpm --filter @workspace/api-server run dev` — run the shared API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/ie-daily-control/src/App.tsx` — app navigation and persistent UI state
- `artifacts/ie-daily-control/src/components/` — dashboard, line operations, checklists, reports, simulator, and modals
- `artifacts/ie-daily-control/server.ts` — local health and AI audit/team assignment endpoints with rule-based fallbacks
- `artifacts/ie-daily-control/src/index.css` — theme tokens and responsive visual system
- `artifacts/ie-daily-control/src/mockData.ts` — seeded local operational data

## Architecture decisions

- The tracker is client-heavy and uses browser localStorage for operational edits and preferences.
- The tracker runs its own Express/Vite server so its AI endpoints and frontend share one managed service.
- AI audit and team assignment requests fall back to deterministic IE heuristics when no Gemini credential is configured.
- Tracker-owned service routes use root-level paths (`/health`, `/ai-audit`, `/ai-team-assignment`) because `/api/*` is reserved for the shared API service.

## Product

- Executive dashboard with efficiency, output, attendance, WIP, checklist, and morning huddle telemetry
- Daily checklist, todo schedule, line records, lean toolkit, monthly summary, and reports
- IE simulator, capacity calculator, line/team configuration, scorecard, and local user/settings preferences
- AI audit and team assignment workflows with practical fallback recommendations

## User preferences

- Preserve the uploaded tracker’s existing information architecture and local browser persistence while making it runnable in the project.

## Gotchas

- The tracker workflow supplies `PORT` and `BASE_PATH`; do not run its Vite build without those variables.
- The root artifact workflow runs `tsx server.ts`, not Vite directly, because the imported app includes its own Express endpoints.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
