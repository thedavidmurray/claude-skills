[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-dev-docs

A Claude Code skill for generating development documentation with consistent formatting. It covers five documentation types: inline code docs, API reference, project READMEs, how-to guides, and architecture decision records (ADRs). The skill provides templates for each type and supports brief, detailed, and comprehensive documentation styles.

## Installation

```bash
mkdir -p .claude/skills/dev-docs
cp -r dev-docs/ .claude/skills/dev-docs/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/dev-docs/skill.md` - Documentation generation
```

## Usage

```
/dev-docs
/dev-docs code src/api.py
/dev-docs readme
/dev-docs api src/routes/
/dev-docs arch "Decision: use PostgreSQL over MongoDB"
/dev-docs guide "How to deploy to production"
```

## Documentation Types

| Type | Output |
|------|--------|
| `code` | Inline docstrings, type hints, complexity notes |
| `api` | Endpoint reference, parameters, response schemas |
| `readme` | Project README with quick start and examples |
| `guide` | Step-by-step how-to guides |
| `arch` | Architecture decision records (ADRs) |

## Documentation Styles

- **Brief** — Function signature, one-line description, basic example
- **Detailed** — Full parameter docs, return values, exceptions, examples
- **Comprehensive** — Everything plus complexity analysis, call flow, related functions

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
