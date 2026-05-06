[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# claude-skills

A collection of Claude Code skills for common development tasks.

## Skills

### Engineering Discipline

| Skill | Description | Repo |
|-------|-------------|------|
| [commit-hygiene](commit-hygiene/) | Enforce commit size thresholds and conventional commit messages to reduce defect rates | [claude-commit-hygiene](https://github.com/thedavidmurray/claude-commit-hygiene) |
| [test-driven-development](test-driven-development/) | Enforce strict RED-GREEN-REFACTOR TDD discipline before writing production code | [claude-test-driven-development](https://github.com/thedavidmurray/claude-test-driven-development) |
| [precommit-validation](precommit-validation/) | Comprehensive pre-commit security and quality validation | [claude-precommit-validation](https://github.com/thedavidmurray/claude-precommit-validation) |

### Testing

| Skill | Description | Repo |
|-------|-------------|------|
| [test-runner](test-runner/) | Run tests, generate scaffolds, manage coverage with auto-detection | [claude-test-runner](https://github.com/thedavidmurray/claude-test-runner) |
| [prd-to-criteria](prd-to-criteria/) | Transform PRD acceptance criteria into machine-verifiable completion checks | [claude-prd-to-criteria](https://github.com/thedavidmurray/claude-prd-to-criteria) |

### Code Quality

| Skill | Description | Repo |
|-------|-------------|------|
| [code-review](code-review/) | Comprehensive code review covering security, performance, quality, and correctness | [claude-code-review](https://github.com/thedavidmurray/claude-code-review) |
| [diagnose](diagnose/) | Disciplined six-phase debugging loop for hard bugs and performance regressions | [claude-diagnose](https://github.com/thedavidmurray/claude-diagnose) |

### Documentation & Design

| Skill | Description | Repo |
|-------|-------------|------|
| [dev-docs](dev-docs/) | Generate README, API docs, ADRs, and inline documentation | [claude-dev-docs](https://github.com/thedavidmurray/claude-dev-docs) |
| [make-interfaces-feel-better](make-interfaces-feel-better/) | UI polish: animations, typography, surfaces, micro-interactions | [claude-make-interfaces-feel-better](https://github.com/thedavidmurray/claude-make-interfaces-feel-better) |

### Tooling & Infrastructure

| Skill | Description | Repo |
|-------|-------------|------|
| [mcp-server-scaffold](mcp-server-scaffold/) | Scaffold production-ready MCP servers with TypeScript/Python templates | [claude-mcp-server-scaffold](https://github.com/thedavidmurray/claude-mcp-server-scaffold) |
| [skill-creator](skill-creator/) | Guide for creating and structuring new Claude Code skills | [claude-skill-creator](https://github.com/thedavidmurray/claude-skill-creator) |
| [prompt-engineering](prompt-engineering/) | Advanced prompt engineering patterns for LLM agents and hooks | [claude-prompt-engineering](https://github.com/thedavidmurray/claude-prompt-engineering) |
| [link-ingest](link-ingest/) | Ingest any URL into a knowledge base with scraping, Obsidian notes, and ChromaDB | [claude-link-ingest](https://github.com/thedavidmurray/claude-link-ingest) |
| [file-organizer](file-organizer/) | Intelligently organize files, find duplicates, suggest better structures | [claude-file-organizer](https://github.com/thedavidmurray/claude-file-organizer) |

### Content & Analysis

| Skill | Description | Repo |
|-------|-------------|------|
| [csv-summarizer](csv-summarizer/) | Analyze CSV files and generate statistical summaries | — |
| [image-enhancer](image-enhancer/) | Batch image enhancement with ImageMagick and platform presets | — |
| [changelog-generator](changelog-generator/) | Generate release notes from git history | — |
| [article-extractor](article-extractor/) | Extract articles with 4-backend fallback chain | — |

## Install

Copy any skill directory into your project's `.claude/skills/`:

```bash
# Example: install commit-hygiene
mkdir -p .claude/skills/commit-hygiene
cp -r commit-hygiene/ .claude/skills/commit-hygiene/
```

For skills with subdirectories (scripts, references, assets), copy the whole directory:

```bash
cp -r mcp-server-scaffold/ .claude/skills/mcp-server-scaffold/
```

Claude Code automatically discovers skills in `.claude/skills/`.

Then reference the skill in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/commit-hygiene/skill.md` - Commit hygiene enforcement
```

## Contributing

Each skill lives in its own directory with:
- `skill.md` (or `SKILL.md`) — The skill definition (YAML frontmatter + instructions)
- `README.md` — Usage documentation and examples
- `LICENSE` — MIT license
- Optional: `scripts/`, `references/`, `assets/` subdirectories

## License

MIT
