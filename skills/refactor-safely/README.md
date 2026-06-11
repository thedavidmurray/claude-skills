# claude-refactor-safely

A Claude Code skill that enforces behavior-preserving refactoring discipline: verify the test safety net first (writing characterization tests if coverage is missing), then restructure in small reversible steps that each keep tests green and get their own commit — reverting rather than debugging forward when anything goes red.

## Install

```bash
/plugin marketplace add thedavidmurray/claude-skills
/plugin install refactor-safely@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/refactor-safely .claude/skills/
```

Claude Code discovers the skill automatically — no registration needed.

## Usage

> "Refactor this without breaking it."

> "Clean up this module — it's a mess, but it works."

> "Extract the validation logic out of this 400-line function."

> "Rename this everywhere and move it to its own file."

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT
