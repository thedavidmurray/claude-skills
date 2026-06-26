---
name: testing-reference
description: Testing conventions, quality gates, coverage requirements, and test naming patterns. Use when naming tests, setting coverage thresholds, configuring CI test steps, or auditing test suites.
category: testing
---
# Testing Reference

Standard testing conventions and quality gates.

## When to Use

- Naming a new test
- Setting coverage thresholds
- Configuring CI test runs
- Reviewing test quality

## Naming Conventions

- Files: `<module_name>.test.<ext>`
- Suites: `describe('<module>', () => { ... })`
- Tests: `it('should <behavior> when <condition>', () => { ... })`

## Quality Gates

| Gate | Threshold |
|------|-----------|
| Line coverage | >= 80% |
| Branch coverage | >= 70% |
| Critical path coverage | 100% |
| Test runtime | < 5 min for full suite |

## CI Steps

1. Install deps
2. Lint
3. Type check
4. Unit tests
5. Integration tests (if present)
6. Coverage report

## Anti-patterns

- Don't use vague names like "test1" or "works"
- Don't assert nothing (tests that always pass)
- Don't couple tests to implementation details
