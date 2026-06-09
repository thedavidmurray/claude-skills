[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-test-driven-development

A Claude Code skill that enforces strict test-driven development discipline. It implements the RED-GREEN-REFACTOR cycle: write a failing test first, watch it fail for the right reason, write minimal code to pass, then refactor. The skill blocks production code from being written without a prior failing test, counters common rationalizations for skipping TDD, and integrates with any project test framework.

## Installation

```bash
mkdir -p .claude/skills/test-driven-development
mkdir -p .claude/skills && cp -r test-driven-development .claude/skills/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/test-driven-development/SKILL.md` - TDD enforcement
```

## Usage

The skill activates automatically when you say "implement", "add feature", "fix bug", or "refactor". It enforces the cycle throughout the session:

```
Implement user authentication
Add feature: password reset
Fix bug: empty email accepted
Refactor: extract validation logic
```

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

The skill verifies that:
1. A failing test was written before any production code
2. The test failed for the expected reason (feature missing, not typos)
3. Minimal code was written to make it pass
4. All tests remain green after refactoring

## File Index

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill definition with TDD workflow |
| `references/testing-anti-patterns.md` | Common testing mistakes to avoid |
| `references/quick-reference.md` | TDD cycle cheat sheet |
| `assets/tdd-cycle.txt` | ASCII cycle diagram |

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
