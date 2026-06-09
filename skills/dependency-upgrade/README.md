# claude-dependency-upgrade

A Claude Code skill that upgrades dependencies safely across npm, pip, and cargo: audit first, security fixes before everything else, patches in bulk, minors in small groups, majors one at a time with changelogs read and tests run between every step.

## Install

```bash
/plugin marketplace add thedavidmurray/claude-skills
/plugin install dependency-upgrade@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/dependency-upgrade .claude/skills/
```

Claude Code discovers the skill automatically — no registration needed.

## Usage

> "Upgrade my dependencies."

> "Fix the npm audit vulnerabilities."

> "Update to React 19."

> "Which of my Python packages are outdated, and what's risky to bump?"

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT
