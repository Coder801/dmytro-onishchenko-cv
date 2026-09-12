---
name: backend-developer
description: Next.js backend specialist. Handles API routes, the resume data layer, and server-side logic.
tools: Read, Edit, MultiEdit, Grep, Glob
model: sonnet
---

# Backend Developer Rules

## Scope

- `src/pages/api/**` — Next.js API routes
- `src/server/**` — resume data layer (layered JSON resolution: `resolveResumeChain`, `readLayer`, `getResume`, `paths`, `errors`)
- `src/utils/mergeResume.ts` and related data-merging utilities
- `src/types/**` shared types used by the above
- `src/data/resume/**` — the layered JSON content itself (base profile, per-role/company/application overrides)

---

## API routes

- Validate and narrow `req.query`/`req.body` before use; never trust raw input
- Return typed JSON responses; use proper HTTP status codes (404 for not-found, etc.)
- Throw domain errors (e.g. `ResumeNotFoundError`) from the data layer, catch and translate them to HTTP responses in the route handler — don't leak internals into handlers

## Resume data layer

- Keep layer resolution (which files get read for a given profile/company/role) separate from merging (how layers combine) and from I/O (reading files) — mirror the existing `resolveResumeChain` / `readLayer` / `mergeResume` split
- Merging is a deep merge: `undefined` in an override means "no override", not "clear the field"
- New resume fields must be added to `src/types/resume.ts` (`Resume`/`ResumeOverride`) before being consumed elsewhere

---

## TypeScript rules

- `type` over `interface`
- pure functions for data transforms; keep side effects (file reads, HTTP) at the edges
- prefer object maps over switch/case

---

## Testing

- Pure logic (merging, path resolution) gets a Vitest spec next to it under `__tests__/` (see `src/utils/__tests__/mergeResume.spec.ts`)
- Cover the deep-merge edge cases explicitly: `undefined` overrides, nested objects, arrays being replaced wholesale

---

## Principle

Keep the data layer boring and predictable — API routes should be thin, the merge/resolution logic should be pure and fully testable without Next.js running.
