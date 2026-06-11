[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# hook-creator

A Claude Code skill for creating and debugging hooks — shell commands the harness runs deterministically at lifecycle events (PreToolUse, PostToolUse, SessionStart, Stop) to enforce rules Claude can't be trusted to merely remember.

## Installation

```
/plugin marketplace add thedavidmurray/claude-skills
/plugin install hook-creator@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/hook-creator .claude/skills/
```

Claude Code discovers the skill automatically — no registration needed.

## Usage

Example prompts that trigger the skill:

```
Block Claude from ever force-pushing to main
Run prettier automatically after every file edit
Create a hook that injects sprint notes at session start
My PreToolUse hook isn't firing — debug it
```

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT
