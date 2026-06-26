---
name: web-dev-ops
description: Operate web development projects end-to-end. Audit local sites for structure and content, deploy paired PRs, run health checks. Use when the user says "ship the site", "deploy this", "check the dev server", "audit the site", or needs full-stack web workflow coverage.
category: tooling
---
# Web Dev Ops

Full lifecycle coverage for web projects.

## When to Use

- User asks to deploy or ship
- Need to audit a site for structure/content gaps
- Health checks before/after deploy

## Process

1. **Audit** — scan routes, assets, metadata, and code structure.
2. **Checklist** — SEO, a11y, perf, security headers.
3. **Deploy** — paired branch + PR; deploy after green checks.
4. **Verify** — navigate to live URLs; confirm routes and assets load.

## Output Format

```markdown
## Deploy Report

- Build: PASS
- Routes checked: 12/12
- Live URL: https://...
```

## Anti-patterns

- Don't deploy without visiting the live URL
- Don't skip health checks between environments
- Don't deploy breaking changes without a rollback plan
