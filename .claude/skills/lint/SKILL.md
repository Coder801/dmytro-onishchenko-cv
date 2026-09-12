---
name: lint
description: Lint the source code and styles. Use when the user asks to lint, format, or auto-fix code style issues, or says things like "run lint", "format the code", "fix lint errors".
---

Lint:

```bash
npm run lint                # ESLint on the codebase
npm run lint:styles         # Stylelint on *.css/*.scss
npm run lint:styles:fix     # Stylelint --fix
```

Run this after making source changes and before considering a task done, to catch style/lint issues early.
