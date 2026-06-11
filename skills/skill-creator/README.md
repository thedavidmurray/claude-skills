[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-skill-creator

A Claude Code skill for creating and updating Claude Code skills. It guides you through identifying the right skill category (Document & Asset Creation, Workflow Automation, or MCP Enhancement), selecting a workflow pattern (Sequential, Multi-MCP, Iterative, Context-Aware, or Domain-Specific), writing frontmatter that routes correctly, and structuring bundled resources. It also includes quality checklists and validation steps.

## Installation

```bash
/plugin marketplace add thedavidmurray/claude-skills
/plugin install skill-creator@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/skill-creator .claude/skills/
```

Claude Code discovers the skill automatically — no registration needed.

## Usage

```
/skill-creator                    # Interactive skill creation
/skill-creator init <name>        # Initialize new skill directory
/skill-creator validate <path>    # Validate existing skill
/skill-creator category <name>    # Show category template
/skill-creator pattern <name>     # Show pattern template
```

## What It Covers

- **YAML frontmatter standard** — Required fields, description quality, trigger terms
- **Three skill categories** — Document creation, workflow automation, MCP enhancement
- **Five workflow patterns** — Sequential, Multi-MCP, Iterative, Context-Aware, Domain-Specific
- **Bundled resources** — When to use scripts/, references/, assets/
- **Quality checklist** — Structural, triggering, and functional verification

## File Index

| File | Purpose |
|------|---------|
| `SKILL.md` | Main skill definition with creation workflow |
| `scripts/init_skill.sh` | Scaffolds a new skill directory with template |
| `references/category-templates.md` | Starter templates for each skill category |
| `references/pattern-examples.md` | Detailed examples of the five workflow patterns |

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
