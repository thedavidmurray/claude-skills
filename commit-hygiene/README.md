[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-commit-hygiene

A Claude Code skill that enforces evidence-based commit size thresholds and conventional commit message standards to reduce defect rates. Research shows commits over 400 lines have a 40%+ defect rate versus ~15% for commits under 200 lines. This skill validates staged changes against quantitative thresholds (Green/Yellow/Red zones), detects sensitive files, checks for conventional commit format, and suggests splitting strategies when commits are too large.

## Installation

```bash
# Copy the skill to your project
mkdir -p .claude/skills/commit-hygiene
mkdir -p .claude/skills && cp -r commit-hygiene .claude/skills/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/commit-hygiene/SKILL.md` - Commit size and message validation
```

Claude Code automatically discovers skills in `.claude/skills/`.

## Usage

The skill activates automatically when you say "commit", "ready to commit", or "push". You can also invoke it directly:

```
/commit-check
/commit-check --suggest-split
/commit-check --message "feat(api): add user endpoint"
/commit-check --strict
```

## What It Checks

- **Size zones**: Files changed, lines added/deleted, total changes (Green/Yellow/Red)
- **Commit message**: Conventional commits format, subject length, imperative mood
- **Sensitive files**: Blocks `.env`, credentials, private keys from being staged
- **Category mixing**: Warns when a commit mixes features, fixes, refactors, and tests

## Thresholds

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| Files changed | ≤5 | 5-10 | >10 |
| Lines added | ≤150 | 150-300 | >300 |
| Total changes | ≤250 | 250-400 | >400 |

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
