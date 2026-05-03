[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# claude-skills

A collection of Claude Code skills for common development tasks.

## Skills

| Skill | Description | Install |
|-------|-------------|---------|
| [csv-summarizer](csv-summarizer/) | Analyze CSV files and generate statistical summaries | Copy `skill.md` to your `.claude/skills/` |
| [image-enhancer](image-enhancer/) | Batch image enhancement with ImageMagick and platform presets | Copy `skill.md` to your `.claude/skills/` |
| [changelog-generator](changelog-generator/) | Generate release notes from git history | Copy `skill.md` to your `.claude/skills/` |
| [article-extractor](article-extractor/) | Extract articles with 4-backend fallback chain | Copy `skill.md` to your `.claude/skills/` |

## Install

Copy any skill's `skill.md` into your project's `.claude/skills/` directory:

```bash
# Example: install the CSV summarizer
mkdir -p .claude/skills/csv-summarizer
cp csv-summarizer/skill.md .claude/skills/csv-summarizer/
```

Claude Code automatically discovers skills in `.claude/skills/`.

## Contributing

Each skill lives in its own directory with:
- `skill.md` — The skill definition (YAML frontmatter + instructions)
- `README.md` — Usage documentation and examples

## License

MIT
