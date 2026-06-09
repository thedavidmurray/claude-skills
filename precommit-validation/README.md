[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-precommit-validation

A Claude Code skill for comprehensive pre-commit validation covering security vulnerabilities and code quality. It activates proactively before any git commit — checking for secrets in the diff, debug code, missing error handling, input validation gaps, and untested new functionality.

## Installation

```bash
mkdir -p .claude/skills/precommit-validation
mkdir -p .claude/skills && cp -r precommit-validation .claude/skills/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/precommit-validation/SKILL.md` - Pre-commit security and quality checks
```

## Usage

```
/precommit
/precommit --security
/precommit --quick
/precommit --thorough
```

## Proactive Triggers

The skill runs automatically when you say:
- "commit", "push", "deploy", or "ship it"
- After completing a feature implementation
- After fixing bugs
- Before creating a pull request

## What It Checks

- No secrets/credentials in the diff
- No debug code (console.log, print statements left in)
- Error handling is present
- Input validation for user data
- Tests exist for new functionality
- No unaddressed TODO/FIXME

## Output

```
Pre-Commit Analysis

Security Check: PASS
- No secrets detected
- Input validation present

Quality Check: WARNINGS
- Missing docstring in new_function()

READY TO COMMIT
```

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
