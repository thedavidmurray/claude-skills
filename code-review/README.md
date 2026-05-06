[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-code-review

A Claude Code skill for comprehensive code review covering security, performance, quality, and correctness. The skill activates proactively after writing significant code — before telling the user it's done — to catch issues early. It supports four review modes: quick scan, full analysis, security-focused, and performance-focused.

## Installation

```bash
mkdir -p .claude/skills/code-review
cp -r code-review/ .claude/skills/code-review/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/code-review/skill.md` - Proactive code review
```

## Usage

```
/review [file_or_directory] [options]
/review src/api.py
/review src/ --type security
/review src/auth.ts --type performance --severity high
/review . --type quick
```

**Options:**
- `--type <full|security|performance|quick>` — Review focus (default: full)
- `--severity <critical|high|medium|low|all>` — Minimum severity to report
- `--model <o3|gemini-pro|flash>` — Model for analysis

## Review Dimensions

| Dimension | What's Checked |
|-----------|----------------|
| Security | Injection, auth bypass, secrets, input validation |
| Performance | N+1 queries, unnecessary loops, memory leaks |
| Quality | Code smells, duplication, complexity |
| Correctness | Logic errors, edge cases, error handling |
| Style | Consistency, naming, documentation |

## Proactive Triggers

The skill runs automatically after:
- Writing a new function, class, or module
- Implementing a feature
- Refactoring existing code
- Making security-sensitive changes

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
