---
name: verification-loop
description: Comprehensive verification system for software development sessions. Build, type check, lint, test, security, and diff review. Use when the user says "verify", "run verification", "check before merging", "quality gate", or after completing a batch of changes.
category: testing
---
# Verification Loop

Run the full quality gate before merging or shipping.

## When to Use

- User says "verify this" or "run verification"
- After implementing a batch of changes
- Before creating a PR or merge
- When something feels wrong but tests pass

## Checks

Run in order; stop on first failure unless instructed otherwise:

1. **Build** — project compiles / bundles without errors
2. **Types** — `tsc --noEmit` or equivalent type check passes
3. **Lint** — linting passes (ESLint, ruff, etc.)
4. **Tests** — full test suite passes
5. **Security** — known patterns checked (secrets, SQLi, XSS)
6. **Diff review** — review the actual git diff for unwanted changes

## Output Format

```markdown
## Verification Results

| Check | Status |
|-------|--------|
| Build | PASS |
| Types | PASS |
| Lint | FAIL: 2 warnings in src/foo.ts |
| Tests | PASS |
| Security | PASS |
| Diff | REVIEW: 3 unintended changes |

## Recommendation
...
```

## Anti-patterns

- Don't skip steps because "it should be fine"
- Don't pass verification with warnings you haven't read
- Don't approve a diff you haven't reviewed line-by-line
