[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# claude-md-author

A Claude Code skill for writing and auditing CLAUDE.md memory files that Claude actually follows — what belongs there versus in a skill, hook, or path-scoped rule, plus a line-by-line audit workflow for slimming bloated files.

## Installation

```
/plugin marketplace add thedavidmurray/claude-skills
/plugin install claude-md-author@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/claude-md-author .claude/skills/
```

Claude Code discovers the skill automatically — no registration needed.

## Usage

Example prompts that trigger the skill:

```
Write a CLAUDE.md for this project
Audit my CLAUDE.md — Claude keeps ignoring half of it
Should this rule go in CLAUDE.md or a hook?
Set up project memory for our team conventions
```

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT
