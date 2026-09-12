---
name: build
description: Build the project for production. Use when the user asks to build the app, verify it compiles/typechecks for production, or says things like "build the project", "check the production build".
---

Build for production:

```bash
npm run build        # next build --turbopack
npm run build:prod   # same, with NODE_ENV=production
```

- Use `npm start` (`next start --port 8080`) to serve the production build locally afterwards.
