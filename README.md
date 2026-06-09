[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# claude-skills

A collection of 18 Claude Code skills for common development tasks — and a hands-on resource for learning how skills work, how to use them well, and how to write your own.

## What is a skill?

A skill is a folder containing a `SKILL.md` file: YAML frontmatter (a `name` and a `description`) followed by markdown instructions. Claude Code loads every skill's name and description at startup, and when your request matches a skill's description, Claude reads the full file and follows it. Larger skills bundle extra material — `references/`, `scripts/`, `templates/` — that Claude only reads when needed. This is called **progressive disclosure**: cheap to carry, detailed when invoked.

Two things follow from this that trip people up:

1. **The description is the trigger.** Claude decides whether to use a skill based on the frontmatter description alone. A vague description ("Helps with testing") never fires; a specific one ("Use when running tests, generating test scaffolds, or checking coverage") fires reliably.
2. **The filename must be `SKILL.md`** — uppercase, exactly. Lowercase `skill.md` silently fails on case-sensitive filesystems (Linux, Claude Code on the web).

## Install

Skills live in one of two places:

- **Project skills** — `.claude/skills/` inside a repo, shared with everyone who works on it
- **Personal skills** — `~/.claude/skills/`, available in all your sessions

```bash
# Install one skill into the current project
mkdir -p .claude/skills
cp -r commit-hygiene .claude/skills/

# Or install for yourself, in every project
mkdir -p ~/.claude/skills
cp -r commit-hygiene ~/.claude/skills/
```

Skills with subdirectories (`scripts/`, `references/`, `templates/`) work the same way — copy the whole folder. Claude Code discovers skills automatically; **no registration in `CLAUDE.md` is needed**. Start a new session after installing, then just describe the task — or ask Claude directly what skills it has available.

## Learning path

If you're using this repo to upskill in Claude, work through it in this order:

### 1. Use a skill and watch it work

Install [`csv-summarizer`](csv-summarizer/) or [`changelog-generator`](changelog-generator/) — both produce visible output from a single request. Drop a CSV into a conversation or ask "generate a changelog since the last tag" and observe how Claude picks up the skill without being told to.

### 2. Read skills as worked examples

Every skill here is also a study object. These four show distinct patterns:

| Read this | To learn |
|-----------|----------|
| [diagnose](diagnose/) | A tight process skill: six phases, clear entry/exit criteria, under 120 lines |
| [commit-hygiene](commit-hygiene/) | Quantitative rules Claude can enforce (size thresholds, message formats) instead of vague "write good commits" |
| [make-interfaces-feel-better](make-interfaces-feel-better/) | Progressive disclosure done well: a lean core file pointing to four reference files loaded on demand |
| [test-driven-development](test-driven-development/) | Enforcing discipline against the model's own shortcuts — anti-rationalization tables, iron laws, verification checklists |

Notice what the good ones share: descriptions packed with trigger phrases, concrete commands instead of advice, output formats spelled out, and explicit "when NOT to use" sections.

### 3. Write your own

Install [`skill-creator`](skill-creator/) and ask Claude to "create a skill for X" — it scaffolds the directory, walks the frontmatter contract, and validates against a quality checklist. The fastest way to internalize what makes skills work is to write one for something you do repeatedly and iterate when it doesn't trigger.

### 4. Go deeper

- [`prompt-engineering`](prompt-engineering/) — the instruction-design principles underneath every skill, hook, and agent prompt
- [`mcp-server-scaffold`](mcp-server-scaffold/) — when a skill isn't enough and you need real tools: scaffold an MCP server in TypeScript or Python

## Skill catalog

### Engineering Discipline

| Skill | Description |
|-------|-------------|
| [commit-hygiene](commit-hygiene/) | Enforce commit size thresholds and conventional commit messages to reduce defect rates |
| [test-driven-development](test-driven-development/) | Enforce strict RED-GREEN-REFACTOR TDD discipline before writing production code |
| [precommit-validation](precommit-validation/) | Pre-commit security and quality validation |

### Testing

| Skill | Description |
|-------|-------------|
| [test-runner](test-runner/) | Run tests, generate scaffolds, manage coverage with framework auto-detection |
| [prd-to-criteria](prd-to-criteria/) | Transform PRD acceptance criteria into machine-verifiable completion checks |

### Code Quality

| Skill | Description |
|-------|-------------|
| [code-review](code-review/) | Code review covering security, performance, quality, and correctness |
| [diagnose](diagnose/) | Disciplined six-phase debugging loop for hard bugs and performance regressions |

### Documentation & Design

| Skill | Description |
|-------|-------------|
| [dev-docs](dev-docs/) | Generate README, API docs, ADRs, and inline documentation |
| [make-interfaces-feel-better](make-interfaces-feel-better/) | UI polish: animations, typography, surfaces, micro-interactions |

### Tooling & Infrastructure

| Skill | Description |
|-------|-------------|
| [mcp-server-scaffold](mcp-server-scaffold/) | Scaffold production-ready MCP servers with TypeScript/Python templates |
| [skill-creator](skill-creator/) | Guide for creating and structuring new Claude Code skills |
| [prompt-engineering](prompt-engineering/) | Prompt engineering patterns for LLM agents and hooks |
| [link-ingest](link-ingest/) | Ingest any URL into a knowledge base with scraping, Obsidian notes, and ChromaDB |
| [file-organizer](file-organizer/) | Organize files, find duplicates, suggest better structures |

### Content & Analysis

| Skill | Description |
|-------|-------------|
| [csv-summarizer](csv-summarizer/) | Analyze CSV files and generate statistical summaries with charts |
| [image-enhancer](image-enhancer/) | Batch image enhancement with ImageMagick and platform presets |
| [changelog-generator](changelog-generator/) | Generate release notes from git history |
| [article-extractor](article-extractor/) | Extract clean article content with a 4-backend fallback chain |

### External dependencies

Most skills are self-contained. The exceptions:

- **precommit-validation, code-review, test-runner, dev-docs** can optionally use [zen-mcp-server](https://github.com/BeehiveInnovations/zen-mcp-server) tools; each documents a native fallback when it isn't configured
- **csv-summarizer** needs Python with pandas/matplotlib/seaborn; **image-enhancer** needs ImageMagick
- **link-ingest** and **article-extractor** work best with optional API keys (Firecrawl, Tavily) but degrade gracefully without them

## Anatomy of a skill

```
my-skill/
├── SKILL.md        # required: frontmatter + instructions
├── references/     # optional: docs Claude reads on demand
├── scripts/        # optional: executable helpers
└── assets/         # optional: templates used in output
```

```yaml
---
name: my-skill                  # must match the directory name, kebab-case
description: >                  # the trigger — pack it with use-case phrases
  Does X for Y. Use when the user says "do X", "fix Y", or asks about Z.
---
```

Keep `SKILL.md` lean (aim for under 200 lines) and move detail into `references/`. State when to use the skill *and when not to*. Show exact commands and output formats — instructions beat advice.

## Troubleshooting

**Skill never triggers**
- Filename must be exactly `SKILL.md` (uppercase)
- The frontmatter `name` must be kebab-case and match the directory
- Rewrite the description to include the literal phrases you're saying — the description is the only thing Claude sees before deciding
- Start a fresh session; skills are discovered at session start

**Skill triggers at the wrong times**
- Narrow the description; add a "When NOT to use" section to the body

**Skill triggers but Claude ignores parts of it**
- The file may be too long — move detail to `references/` and keep the core file directive
- Make rules checkable ("commits over 400 lines must be split") rather than aspirational ("keep commits small")

## Further reading

- [Claude Code skills documentation](https://code.claude.com/docs/en/skills) — official reference for skill discovery, frontmatter, and locations
- [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills) — Anthropic's engineering post on the design philosophy
- [anthropics/skills](https://github.com/anthropics/skills) — Anthropic's official skill collection, more worked examples

## Contributing

Each skill lives in its own directory with:
- `SKILL.md` — the skill definition (YAML frontmatter + instructions)
- `README.md` — human-facing usage documentation and examples
- `LICENSE` — MIT license
- Optional: `scripts/`, `references/`, `assets/` subdirectories

Run new skills past the [skill-creator](skill-creator/) quality checklist before submitting.

## License

MIT
