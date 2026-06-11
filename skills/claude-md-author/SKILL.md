---
name: claude-md-author
description: Write, audit, and slim down CLAUDE.md memory files so Claude actually follows them. Covers what belongs in CLAUDE.md versus a skill, hook, or path-scoped rule, the memory hierarchy and imports, and line-by-line auditing of existing files. Use when user says "write a CLAUDE.md", "set up CLAUDE.md", "improve my CLAUDE.md", "audit my CLAUDE.md", "Claude keeps ignoring my instructions", "what should go in CLAUDE.md", or asks about project memory, instruction files, or .claude/rules.
metadata:
  tags: [claude-md, memory, instructions, claude-code, configuration, meta]
  tier: task-specific
  domain: kernel
when_to_apply: When creating or auditing CLAUDE.md files, or when instructions in them are being ignored
---
# CLAUDE.md Author

CLAUDE.md is loaded into every session's context. Every line costs tokens on every
request, and long or vague files get skimmed, not followed. The job is to keep it
short, concrete, and limited to things that belong nowhere else.

## The Placement Decision

Before writing anything into CLAUDE.md, check it belongs there:

| Content | Belongs in |
|---------|-----------|
| Facts needed every session: build/test/lint commands, conventions, project layout, "always X" rules | `CLAUDE.md` |
| Multi-step procedures, workflows, anything with phases | A skill (see `skill-creator`) |
| Rules that must be *enforced*, not just remembered (block commands, run formatters) | A hook (see `hook-creator`) |
| Rules that apply only to part of the codebase | `.claude/rules/*.md` with a `paths` frontmatter field |
| Personal preferences that shouldn't be committed | `CLAUDE.local.md` (gitignored) or `~/.claude/CLAUDE.md` |

## Where Memory Files Live

Loaded every session, broadest first:

1. **Managed policy** — org-enforced (e.g. `/etc/claude-code/CLAUDE.md` on Linux)
2. **User** — `~/.claude/CLAUDE.md`: your preferences across all projects
3. **Project** — `./CLAUDE.md` or `./.claude/CLAUDE.md`: shared with the team via git
4. **Local** — `./CLAUDE.local.md`: personal, add to `.gitignore`

Loaded on demand: `subdir/CLAUDE.md` (when Claude reads files in that directory) and
path-scoped rules in `.claude/rules/`. Use `/memory` to see exactly what loaded.

**Imports**: `@path/to/file` pulls another file in at launch (relative to the
importing file, max 4 hops). If the repo already has an `AGENTS.md`, make CLAUDE.md
one line: `@AGENTS.md`.

## Writing Rules

1. **Under 200 lines.** Longer files consume context and reduce adherence to every line.
2. **Every line must be checkable.** "Use 2-space indentation" — yes. "Write clean code" — delete.
3. **Commands must be real.** Run each one before writing it down. A stale `npm run test:unit` that no longer exists teaches Claude to distrust the file.
4. **State the deviation, not the default.** Claude already knows common conventions. Only write what's *different* about this project ("we use tabs", "tests live next to source, not in tests/").
5. **No procedures.** If it has steps, it's a skill.
6. **No duplicates of config.** Don't restate what `package.json`, `pyproject.toml`, or CI files already say — reference them: `See @package.json for scripts.`

## Workflow: Writing a New CLAUDE.md

1. Collect real commands: build, test (full + single file), lint, typecheck, run. Verify each.
2. Identify non-obvious conventions by scanning the codebase: naming, file layout, error-handling patterns, forbidden imports.
3. Collect gotchas the team knows ("the dev server needs X env var", "never edit generated/")
4. Write it with this skeleton:

```markdown
# <project>

## Commands
- Build: `...`
- Test all: `...` / single file: `...`
- Lint + typecheck: `...`

## Conventions
- <only deviations from common practice, one checkable line each>

## Gotchas
- <things that will waste 20 minutes if unknown>
```

5. Keep it under 60 lines for most projects. Growth should be earned, line by line.

## Workflow: Auditing an Existing CLAUDE.md

Go line by line and tag each one:

| Tag | Meaning | Action |
|-----|---------|--------|
| KEEP | Concrete, current, needed every session | Keep |
| STALE | Command/path/fact no longer true | Fix or delete |
| VAGUE | Aspirational, not checkable ("be careful with...") | Rewrite concretely or delete |
| PROCEDURE | Multi-step workflow | Move to a skill |
| SCOPED | Only applies to part of the repo | Move to `.claude/rules/` with `paths` |
| ENFCE | Must never be violated | Reinforce with a hook |
| DUP | Restates package config or framework defaults | Delete or replace with `@import` |

Then report the before/after line count and what moved where. Verify every surviving
command by running it.

## Anti-Patterns

| Anti-pattern | Why it fails | Fix |
|---|---|---|
| "IMPORTANT: ALWAYS..." in caps everywhere | Emphasis inflation — when everything shouts, nothing does | Reserve emphasis for the 1-2 rules that genuinely matter most |
| Pasting style guides wholesale | Hundreds of lines Claude mostly knows | Link or import; write only deviations |
| Instructions for humans (badges, contributing guides) | Wrong audience — CLAUDE.md is for Claude | Keep human docs in README.md |
| Adding a rule after every mistake Claude makes | File grows monotonically, adherence drops | Audit on every addition; one in, one out |
| Repeating the same rule in user + project files | Conflicts and drift | One home per rule |

## Output Format

```
CLAUDE.md audit: 184 lines → 52 lines

KEEP     31  (commands verified: 6/6 pass)
STALE     9  deleted (3 dead commands, 6 moved paths)
VAGUE    12  deleted or rewritten
PROCEDURE 2  → proposed skills: deploy-checklist, release-notes
SCOPED    4  → .claude/rules/frontend.md (paths: ["src/ui/**"])
DUP      18  → replaced with @package.json reference
```

## When NOT to Use

- Writing a README or human-facing docs — that's `dev-docs`
- The instruction needs *enforcement* — write a hook instead
- Capturing a workflow — that's a skill

## Related Skills

- `skill-creator` — where procedures go
- `hook-creator` — where enforced rules go
- `subagent-creator` — delegating work to isolated agents
- `prompt-engineering` — the instruction-writing principles behind all of these
