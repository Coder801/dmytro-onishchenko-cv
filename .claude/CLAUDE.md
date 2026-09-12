# Project Overview

Personal CV / resume site built with Next.js (Pages Router), React 19, TypeScript, and SCSS Modules. Resume content is data-driven: layered JSON profiles (`src/data/resume/**`) are merged server-side (`src/server/resume`, `src/utils/mergeResume.ts`) and served via API routes / SSR.

## Available agents

- frontend-developer — UI, components, SCSS Modules, client-side logic
- backend-developer — Next.js API routes, resume data layer, server-side logic
- code-reviewer — code quality, architecture review, best practices

See `.claude/agents/README.md` for the full mapping of file → subagent_type.

## General principle

Prefer delegating tasks to specialized agents when applicable.

# graphify

- **graphify** (`.claude/skills/graphify/SKILL.md`) - any input to knowledge graph. Trigger: `/graphify`
  When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.
