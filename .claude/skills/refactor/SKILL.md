---
name: refactor
description: Guided workflow for refactoring existing code safely — graph-based impact analysis, delegated implementation, test verification, and review. Use when the user asks to refactor, rename, restructure, extract, or otherwise significantly change code that already exists (not for writing new features from scratch).
---

Refactoring is riskier than adding new code — the goal here is to see the blast radius before touching anything, then verify nothing broke after.

## 1. Impact analysis (graphify)

Before editing, orient using the project's knowledge graph (`graphify-out/`, built by the `graphify` skill):

```bash
graphify affected "<file-or-symbol>"   # reverse traversal — what depends on this, i.e. what can break
graphify god-nodes                     # most-connected files — extra caution if the target is one of these
graphify query "how is <X> used across the codebase"
graphify path "<A>" "<B>"              # relationship between two modules, if the refactor touches both
```

Use the result to scope the refactor: list the files/call sites that will need to change, and flag anything highly connected (god node) as higher-risk before proceeding.

If `graphify-out/graph.json` doesn't exist yet, fall back to `Grep`/`Explore` for impact analysis and mention that the graph isn't built (`npm run index`).

## 2. Delegate the implementation

Hand the actual code changes to the `frontend-developer` agent (subagent_type `frontend-developer`) for UI/component work, or `backend-developer` (subagent_type `backend-developer`) for API routes / resume data layer work — pass it the list of affected files/call sites from step 1 so it doesn't have to rediscover them. For multi-file mechanical renames, a single agent call covering the full file list is fine; for large or logically-independent groups of changes, split into parallel agent calls per group.

## 3. Verify

After the edits:
```bash
npm run lint    # or the `lint` skill
npm test        # Vitest — run existing unit tests, don't skip this even for "pure" renames
```

Update or add tests for behavior that moved or changed shape as part of the refactor — a refactor that leaves tests red or stale isn't done.

## 4. Review

Delegate to the `code-reviewer` agent (subagent_type `code-reviewer`) for a pass over the diff, specifically checking that the refactor didn't change behavior and didn't leave dead code (old exports, unused helpers) behind.

## 5. Refresh the graph

```bash
npm run index   # keep graphify-out/ in sync with the new structure
```
(Skipped automatically if the project's git hooks are installed — `graphify hook status` to check.)

## Notes

- Do not commit — the user commits manually and splits commits by change type.
- If the refactor is large enough that step 1 surfaces more affected files than expected, stop and confirm scope with the user before proceeding rather than silently expanding the change.
