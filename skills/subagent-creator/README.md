[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# subagent-creator

A Claude Code skill for creating custom subagents — markdown files in `.claude/agents/` defining specialized agents with their own system prompt, tool restrictions, and isolated context window.

## Installation

```
/plugin marketplace add thedavidmurray/claude-skills
/plugin install subagent-creator@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/subagent-creator .claude/skills/
```

Claude Code discovers the skill automatically — no registration needed.

## Usage

Example prompts that trigger the skill:

```
Create a code-reviewer agent with read-only tools
Make an agent that researches our API conventions
Should this be a subagent or a skill?
Why does Claude never delegate to my custom agent?
```

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT
