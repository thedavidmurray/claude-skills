---
name: tdd-workflow
description: Enforce test-driven development discipline for new features, bug fixes, and refactoring. Requires failing test first, then minimal implementation, then refactor. Use when the user says "TDD", "write a test first", "red green refactor", or starts implementing a feature.
category: testing
---
# TDD Workflow

Strict RED-GREEN-REFACTOR cycle. Tests are not optional.

## When to Use

- User says "TDD this" or "write tests first"
- Implementing a new feature
- Fixing a bug
- Refactoring existing code

## Cycle

1. **RED** — write one failing test that describes the desired behavior.
2. **GREEN** — write the minimal code to make it pass. Nothing extra.
3. **REFACTOR** — clean up while keeping tests green.

Repeat for each behavior.

## Rules

- No implementation without a failing test
- One behavior per test
- Tests run in milliseconds — if they're slow, fix the test
- Coverage target: 80%+ for new code

## Output Format

For each cycle:
```markdown
- RED: `tests/foo.test.ts` — test added
- GREEN: `src/foo.ts` — implementation added
- REFACTOR: ...
```

## Anti-patterns

- Don't write tests after implementation ("test-driven" means the test led)
- Don't batch multiple behaviors into one huge test
- Don't refactor before you're green
