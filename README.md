[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

# claude-skills

A collection of 25 Claude Code skills for common development tasks — and a hands-on resource for learning how skills work, how to use them well, and how to extend Claude with skills, hooks, and subagents of your own.

## What is a skill?

A skill is a folder containing a `SKILL.md` file: YAML frontmatter (a `name` and a `description`) followed by markdown instructions. Claude Code loads every skill's name and description at startup, and when your request matches a skill's description, Claude reads the full file and follows it. Larger skills bundle extra material — `references/`, `scripts/`, `templates/` — that Claude only reads when needed. This is called **progressive disclosure**: cheap to carry, detailed when invoked.

Two things follow from this that trip people up:

1. **The description is the trigger.** Claude decides whether to use a skill based on the frontmatter description alone. A vague description ("Helps with testing") never fires; a specific one ("Use when running tests, generating test scaffolds, or checking coverage") fires reliably.
2. **The filename must be `SKILL.md`** — uppercase, exactly. Lowercase `skill.md` silently fails on case-sensitive filesystems (Linux, Claude Code on the web).

## Install

### One-command install (recommended)

This repo is a Claude Code plugin marketplace. Add it once, then install everything — or just the skills you want:

```
/plugin marketplace add thedavidmurray/claude-skills
/plugin install all-skills@claude-skills
```

Or pick individual skills:

```
/plugin install diagnose@claude-skills
/plugin install commit-hygiene@claude-skills
```

Installed plugins update via `/plugin` and work across all your projects.

### Manual install

Skills also work as plain folders, copied from a clone of this repo into one of two places:

- **Project skills** — `.claude/skills/` inside a repo, shared with everyone who works on it
- **Personal skills** — `~/.claude/skills/`, available in all your sessions

```bash
# Install one skill into the current project
mkdir -p .claude/skills
cp -r skills/commit-hygiene .claude/skills/

# Or install for yourself, in every project
mkdir -p ~/.claude/skills
cp -r skills/commit-hygiene ~/.claude/skills/
```

Skills with subdirectories (`scripts/`, `references/`, `templates/`) work the same way — copy the whole folder. Claude Code discovers skills automatically; **no registration in `CLAUDE.md` is needed**. Start a new session after installing, then just describe the task — or ask Claude directly what skills it has available.

## Learning path

If you're using this repo to upskill in Claude, work through it in this order:

### 1. Use a skill and watch it work

Install [`csv-summarizer`](skills/csv-summarizer/) or [`changelog-generator`](skills/changelog-generator/) — both produce visible output from a single request. Drop a CSV into a conversation or ask "generate a changelog since the last tag" and observe how Claude picks up the skill without being told to.

### 2. Read skills as worked examples

Every skill here is also a study object. These four show distinct patterns:

| Read this | To learn |
|-----------|----------|
| [diagnose](skills/diagnose/) | A tight process skill: six phases, clear entry/exit criteria, under 120 lines |
| [commit-hygiene](skills/commit-hygiene/) | Quantitative rules Claude can enforce (size thresholds, message formats) instead of vague "write good commits" |
| [make-interfaces-feel-better](skills/make-interfaces-feel-better/) | Progressive disclosure done well: a lean core file pointing to four reference files loaded on demand |
| [test-driven-development](skills/test-driven-development/) | Enforcing discipline against the model's own shortcuts — anti-rationalization tables, iron laws, verification checklists |

Notice what the good ones share: descriptions packed with trigger phrases, concrete commands instead of advice, output formats spelled out, and explicit "when NOT to use" sections.

### 3. Write your own

Install [`skill-creator`](skills/skill-creator/) and ask Claude to "create a skill for X" — it scaffolds the directory, walks the frontmatter contract, and validates against a quality checklist. The fastest way to internalize what makes skills work is to write one for something you do repeatedly and iterate when it doesn't trigger.

### 4. Go deeper: the full extension surface

Skills are one of four ways to extend Claude Code. The remaining three each have a skill that teaches them:

- [`claude-md-author`](skills/claude-md-author/) — memory: what belongs in `CLAUDE.md` vs a skill vs a hook, and how to audit a bloated one
- [`hook-creator`](skills/hook-creator/) — enforcement: deterministic shell commands at lifecycle events, for rules Claude must never break
- [`subagent-creator`](skills/subagent-creator/) — delegation: specialized agents with their own context window and tool restrictions
- [`mcp-server-scaffold`](skills/mcp-server-scaffold/) — tools: when instructions aren't enough and Claude needs new capabilities
- [`prompt-engineering`](skills/prompt-engineering/) — the instruction-design principles underneath all of the above

## Skill catalog

### Engineering Discipline

| Skill | Description |
|-------|-------------|
| [commit-hygiene](skills/commit-hygiene/) | Enforce commit size thresholds and conventional commit messages to reduce defect rates |
| [test-driven-development](skills/test-driven-development/) | Enforce strict RED-GREEN-REFACTOR TDD discipline before writing production code |
| [precommit-validation](skills/precommit-validation/) | Pre-commit security and quality validation |
| [refactor-safely](skills/refactor-safely/) | Behavior-preserving refactoring under a test safety net, in small reversible steps |
| [git-rescue](skills/git-rescue/) | Recover lost commits, undo bad rebases/merges, hunt regressions with bisect |

### Testing

| Skill | Description |
|-------|-------------|
| [test-runner](skills/test-runner/) | Run tests, generate scaffolds, manage coverage with framework auto-detection |
| [prd-to-criteria](skills/prd-to-criteria/) | Transform PRD acceptance criteria into machine-verifiable completion checks |

### Code Quality

| Skill | Description |
|-------|-------------|
| [code-review](skills/code-review/) | Code review covering security, performance, quality, and correctness |
| [diagnose](skills/diagnose/) | Disciplined six-phase debugging loop for hard bugs and performance regressions |

### Documentation & Design

| Skill | Description |
|-------|-------------|
| [dev-docs](skills/dev-docs/) | Generate README, API docs, ADRs, and inline documentation |
| [make-interfaces-feel-better](skills/make-interfaces-feel-better/) | UI polish: animations, typography, surfaces, micro-interactions |
| [a11y-review](skills/a11y-review/) | Accessibility review for web UIs against checkable WCAG 2.2 AA rules |

### Claude Extension Authoring

| Skill | Description |
|-------|-------------|
| [skill-creator](skills/skill-creator/) | Guide for creating and structuring new Claude Code skills |
| [claude-md-author](skills/claude-md-author/) | Write and audit CLAUDE.md memory files Claude actually follows |
| [hook-creator](skills/hook-creator/) | Create and debug hooks that enforce rules deterministically |
| [subagent-creator](skills/subagent-creator/) | Create custom subagents with scoped tools and prompts |
| [mcp-server-scaffold](skills/mcp-server-scaffold/) | Scaffold production-ready MCP servers with TypeScript/Python templates |
| [prompt-engineering](skills/prompt-engineering/) | Prompt engineering patterns for LLM agents and hooks |

### Tooling & Infrastructure

| Skill | Description |
|-------|-------------|
| [dependency-upgrade](skills/dependency-upgrade/) | Safe, ordered dependency upgrades across npm, pip, and cargo |
| [link-ingest](skills/link-ingest/) | Ingest any URL into a knowledge base with scraping, Obsidian notes, and ChromaDB |
| [file-organizer](skills/file-organizer/) | Organize files, find duplicates, suggest better structures |

### Content & Analysis

| Skill | Description |
|-------|-------------|
| [csv-summarizer](skills/csv-summarizer/) | Analyze CSV files and generate statistical summaries with charts |
| [image-enhancer](skills/image-enhancer/) | Batch image enhancement with ImageMagick and platform presets |
| [changelog-generator](skills/changelog-generator/) | Generate release notes from git history |
| [article-extractor](skills/article-extractor/) | Extract clean article content with a 4-backend fallback chain |

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

Each skill lives in its own directory under `skills/` with:
- `SKILL.md` — the skill definition (YAML frontmatter + instructions)
- `README.md` — human-facing usage documentation and examples
- `.claude-plugin/plugin.json` — manifest so the skill is individually installable as a plugin
- `LICENSE` — MIT license
- Optional: `scripts/`, `references/`, `assets/` subdirectories

To add a skill: create `skills/<name>/` with the files above, add an entry to `.claude-plugin/marketplace.json`, and run `claude plugin validate .` plus `claude plugin validate skills/<name>`. Run new skills past the [skill-creator](skills/skill-creator/) quality checklist before submitting.

## License

MIT
