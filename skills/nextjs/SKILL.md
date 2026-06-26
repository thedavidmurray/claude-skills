---
name: nextjs
description: Next.js 14+ full-stack React framework — app router, server components, API routes, deployment patterns. Use when the user says "Next.js", "app router", "server component", "next.js deploy", or is building a Next.js project.
category: software-development
---
# Next.js

Next.js 14+ patterns and gotchas.

## When to Use

- User mentions Next.js
- Building React apps with App Router
- Need server components, routing, or API routes guidance

## App Router

- Default to Server Components; add 'use client' only when needed
- colocate data fetching in Server Components
- Use `loading.tsx` and `error.tsx` for route-level state
- Prefer `generateStaticParams` for dynamic routes

## API Routes

- Route handlers in `app/api/<route>/route.ts`
- Export named handlers: `GET`, `POST`, etc.
- Set proper CORS and timeout policies

## Deployment

- Vercel: zero-config for most apps
- Self-hosted: standalone output + Node adapter
- Environment: `NEXT_PUBLIC_*` only for client-bound values

## Output Format

```markdown
## Next.js Review

- Router: App Router confirmed
- Server components: ...
- Data fetching: ...
- Risks: ...
```

## Anti-patterns

- Don't add 'use client' by default
- Don't fetch client-side when Server Component fetch is simpler
- Don't put secrets in `NEXT_PUBLIC_*` env vars
