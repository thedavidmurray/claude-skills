# claude-changelog-generator

A Claude Code skill that turns raw git history into polished, user-facing release notes.

Paste in a version range or a time window, and the skill parses your commits, rewrites
technical messages into plain language, and renders clean Markdown, HTML, or JSON output
ready to publish.

---

## What it does

- Reads any git range: tag-to-tag, date-based, or explicit SHA range
- Parses [Conventional Commits](https://www.conventionalcommits.org/) automatically
- Falls back to heuristic categorisation for non-conventional repos
- Rewrites commit messages into user-focused language
- Groups entries by category with consistent ordering
- Filters internal-only commits (tests, refactors, CI) by default
- Always surfaces breaking changes — they are never suppressed
- Outputs Markdown (default), HTML, or JSON

---

## Example output

Given these commits between `v2.4.0` and `v2.5.0`:

```
feat(workspaces): add team workspaces with member invitations
perf(sync): batch file writes to reduce round-trip latency
fix(upload): prevent hang when uploading files larger than 500 MB
fix(scheduler): correct UTC offset for users in half-hour timezones
refactor(core): extract file-watcher into separate module   ← filtered out
chore: bump dependencies                                     ← filtered out
```

The skill produces:

```markdown
# Release v2.5.0 — 2025-06-15

## New Features

- **Team Workspaces**: Create separate workspaces for different projects and invite
  team members to collaborate.

## Performance

- Sync is now significantly faster — file writes are batched to reduce server round-trips.

## Bug Fixes

- Fixed a hang that occurred when uploading files larger than 500 MB.
- Resolved incorrect scheduling times for users in half-hour UTC offset timezones.
```

See [`examples/example_changelog.md`](examples/example_changelog.md) for more output
samples including breaking changes, JSON format, and HTML format.

---

## Installation

### Option A — Single project

Copy `skill.md` into your project's skill directory:

```bash
mkdir -p .claude/skills/changelog-generator
cp skill.md .claude/skills/changelog-generator/skill.md
```

### Option B — Global (all projects)

Copy to your global Claude skills directory:

```bash
mkdir -p ~/.claude/skills/changelog-generator
cp skill.md ~/.claude/skills/changelog-generator/skill.md
```

Claude Code automatically discovers skill files in `.claude/skills/` (project-level)
and `~/.claude/skills/` (user-level). No further configuration is required.

### Optional: configuration file

Place `.changelog.yml` at your repository root to override defaults (output format,
style, emoji headings, term expansions). See the **Configuration** section below.

---

## Usage

Once installed, invoke the skill in any Claude Code session from within a git repository.

| Command | Effect |
|---|---|
| `/changelog` | Since last git tag (or last 30 commits if no tags exist) |
| `/changelog --since "2 weeks ago"` | Time-based range |
| `/changelog v1.2.0..v1.3.0` | Between two tags or commit SHAs |
| `/changelog --format html` | Output as HTML |
| `/changelog --format json` | Output as structured JSON |
| `/changelog --include-internal` | Include refactor/test/chore commits |
| `/changelog --style brief` | One-liner per entry (default) |
| `/changelog --style detailed` | Multi-sentence descriptions with context |
| `/changelog --output CHANGELOG.md` | Write directly to file |

---

## Commit Convention Reference

The skill follows the [Conventional Commits 1.0](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Format

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Type → Category mapping

| Commit type | Changelog category | Shown by default |
|---|---|---|
| `feat`, `feature` | New Features | Yes |
| `fix`, `bugfix`, `hotfix` | Bug Fixes | Yes |
| `perf` | Performance | Yes |
| `security` | Security | Yes |
| `docs` | Documentation | Yes |
| `deprecate` | Deprecations | Yes |
| `revert` | Reverts | Yes |
| `refactor` | *(internal)* | No |
| `test`, `tests` | *(internal)* | No |
| `chore`, `build`, `ci`, `cd` | *(internal)* | No |
| `style`, `format` | *(internal)* | No |
| `BREAKING CHANGE` / `!` suffix | Breaking Changes | Always |
| *(no prefix / unknown)* | Other Changes | Yes |

### Breaking change detection

A commit is treated as a breaking change if:
- The subject starts with `BREAKING CHANGE:` or `BREAKING:`
- The type ends with `!` — e.g. `feat!:` or `fix(api)!:`
- The commit body or footer contains `BREAKING CHANGE:`

Breaking changes are always shown in the changelog regardless of filter settings.

### Scope as label

Scopes are used as section labels within each category:

```
feat(api): add pagination to list endpoints
→  New Features > API: Added pagination support to list endpoints
```

---

## Configuration

Place `.changelog.yml` at the repository root:

```yaml
# .changelog.yml

# Default output format: markdown | html | json
default_format: markdown

# Default style: brief | detailed
default_style: brief

# Include refactor/test/chore commits by default
include_internal: false

# Use scope as a label in the changelog entry
include_scopes_as_labels: true

# Default output file for --output flag
output_file: CHANGELOG.md

# Emoji prefixes per category
categories:
  - id: breaking_changes
    emoji: "💥"
    heading: "Breaking Changes"
  - id: new_features
    emoji: "✨"
    heading: "New Features"
  - id: bug_fixes
    emoji: "🐛"
    heading: "Bug Fixes"
  - id: performance
    emoji: "⚡"
    heading: "Performance"
  - id: security
    emoji: "🔒"
    heading: "Security"
  - id: deprecations
    emoji: "⚠️"
    heading: "Deprecations"
  - id: documentation
    emoji: "📖"
    heading: "Documentation"
  - id: reverts
    emoji: "↩️"
    heading: "Reverts"

# Abbreviation expansions applied when rewriting messages
expansions:
  auth: authentication
  UI: interface
  DB: database
  cfg: configuration
  perf: performance
```

---

## CI/CD integration

### GitHub Actions — release notes on tag push

```yaml
name: Release Changelog
on:
  push:
    tags:
      - 'v*'

jobs:
  changelog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Generate changelog
        run: |
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null \
            || git rev-list --max-parents=0 HEAD)
          CURRENT_TAG=${GITHUB_REF#refs/tags/}
          git log "${PREV_TAG}..HEAD" --no-merges \
            --pretty=format:"- %s" > release-notes.txt
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          body_path: release-notes.txt
```

### Pre-release workflow

```bash
# Review the draft changelog
/changelog --style detailed

# Write to CHANGELOG.md
/changelog --output CHANGELOG.md

# Commit and tag
git add CHANGELOG.md
git commit -m "docs: update changelog for v2.5.0"
git tag -a v2.5.0 -m "Release v2.5.0"
```

---

## Tips

- Run the skill from the repository root so git commands resolve correctly.
- Use annotated tags (`git tag -a`) for cleaner `git describe` output.
- The generated changelog is a first draft — review it before publishing.
- For monorepos, use the scope filter (e.g. `--scope api`) to generate per-package changelogs.
- Pair with the `commit-hygiene` skill to keep messages consistent before they reach the changelog.

---

## License

MIT — Copyright (c) 2025 Edgeless Labs. See [LICENSE](LICENSE).
