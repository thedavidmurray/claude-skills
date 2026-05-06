[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-file-organizer

A Claude Code skill for intelligently organizing files and folders. It analyzes current directory structure, identifies organizational patterns (by type, purpose, or date), finds duplicate files with confirmation before deletion, proposes a reorganization plan for approval, and executes with an audit log. It includes special handling for Obsidian vault organization.

## Installation

```bash
mkdir -p .claude/skills/file-organizer
cp -r file-organizer/ .claude/skills/file-organizer/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/file-organizer/skill.md` - Intelligent file organization
```

## Usage

```
/organize ~/Downloads
/organize --duplicates ~/Documents
/organize --structure ~/Projects
/organize --dry-run ~/folder
```

## Workflow

1. **Understand Scope** — Clarify directory, main problem, and approach
2. **Analyze Current State** — File types, sizes, date ranges, issues
3. **Identify Patterns** — By type, purpose, or date
4. **Find Duplicates** — Hash-based exact match detection (with confirmation before deletion)
5. **Propose Plan** — Present structure and changes for approval
6. **Execute** — Move and create folders with logging
7. **Summary** — What changed, new structure, maintenance tips

## Safety Rules

- Always confirm before deleting anything
- Log all moves for potential undo
- Preserve modification dates
- Offer dry-run preview

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
