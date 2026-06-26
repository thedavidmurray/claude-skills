---
name: frontend-patterns
description: Frontend development patterns for React, Next.js, state management, performance optimization, and UI best practices. Use when reviewing or writing frontend code, implementing components, optimizing bundle size, or debugging render issues.
category: software-development
---
# Frontend Patterns

Proven patterns for maintainable frontend code.

## When to Use

- Writing or reviewing React/Next.js code
- Debugging renders, state, or performance
- Choosing state management or data-fetching strategy

## Patterns

### Components
- Single responsibility per component
- Colocate state with its consumer
- Extract repeated JSX into small components

### State
- Local state for UI-only state
- Server state via fetch/cache (not global store)
- URL state for shareable filters/pages

### Data Fetching
- Fetch at the route or server component level
- Cache immutable data; revalidate on interval
- Handle loading, error, and empty states explicitly

### Performance
- Lazy load routes and heavy components
- Avoid inline object/function props in lists
- Measure before optimizing

## Output Format

```markdown
## Frontend Review

- Structure: ...
- State: ...
- Performance: ...
- Risks: ...
```

## Anti-patterns

- Don't lift state unnecessarily
- Don't put server state in Redux/Zustand
- Don't optimize without profiling
