# claude-changelog-generator

A Claude Code skill that turns raw git history into polished, user-facing
release notes. It parses commits over any range, rewrites technical messages
into plain language, and renders Markdown, HTML, or JSON ready to publish.

## Install

```bash
mkdir -p .claude/skills && cp -r changelog-generator .claude/skills/
```

## Usage

> "/changelog"

> "Generate a changelog since v1.2.0"

> "Create release notes for what changed in the last 2 weeks"

> "Summarize commits since the last tag and update CHANGELOG.md"

## Contents

- `examples/` — sample changelog output, including breaking changes, JSON, and HTML formats

Full behavior reference: [SKILL.md](SKILL.md)

## License

MIT — Copyright (c) 2025 Edgeless Labs. See [LICENSE](LICENSE).
