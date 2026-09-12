# Skills

Project-local skills, one per directory (`<name>/SKILL.md`), each with YAML frontmatter (`name`, `description`) followed by the actual instructions/commands.

| Skill | Use for |
|---|---|
| `dev` | Launch the Next.js dev server (`npm run dev`, http://localhost:8080). |
| `lint` | Lint the source (`npm run lint` / `lint:styles` / `lint:styles:fix`). |
| `build` | Production build (`npm run build` / `build:prod`). |
| `graphify` | Turn the codebase into a knowledge graph; query/path/explain/affected. |
| `refactor` | Refactor existing code safely: graphify impact analysis → `frontend-developer`/`backend-developer` edits → tests → `code-reviewer`. |

Each `SKILL.md`'s `description` field is what the assistant matches against the user's request to decide whether to activate it — keep it specific and behavior-oriented (see existing files for the pattern) rather than editing this index when a skill's purpose changes.
