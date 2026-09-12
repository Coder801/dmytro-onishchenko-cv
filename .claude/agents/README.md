# Agents

Subagent definitions for this project. Invoke via the `Agent` tool with the frontmatter `name` as `subagent_type` (matches the filename for all of these).

| File | name (subagent_type) | Use for |
|---|---|---|
| `frontend-developer.md` | `frontend-developer` | React + Next.js + TypeScript + SCSS Modules — UI, components, client-side logic. |
| `backend-developer.md` | `backend-developer` | Next.js API routes, resume data layer (layering/merging), server-side logic. |
| `code-reviewer.md` | `code-reviewer` | Read-only code quality/architecture review — finds bugs, enforces consistency. |

Each file's own frontmatter (`description`, `tools`, `model`) is the source of truth for when the agent activates and what it can touch — this table is just an index.
