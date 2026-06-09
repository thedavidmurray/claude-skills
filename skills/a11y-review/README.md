# claude-a11y-review

A Claude Code skill that reviews web UIs against checkable WCAG 2.2 AA rules — keyboard access, contrast ratios, semantic HTML, form labels, ARIA correctness — and reports findings grouped by severity (blocker / serious / polish).

## Install

```bash
/plugin marketplace add thedavidmurray/claude-skills
/plugin install a11y-review@claude-skills
```

Or copy it manually from a clone of this repo:

```bash
mkdir -p .claude/skills && cp -r skills/a11y-review .claude/skills/
```

Claude Code discovers the skill automatically — no registration needed.

## Usage

> "Is this component accessible?"

> "Run an a11y review on the checkout form."

> "Check this modal for keyboard and screen reader support."

> "Does this color scheme pass WCAG contrast?"

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT
