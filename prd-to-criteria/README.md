[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-prd-to-criteria

A Claude Code skill that transforms Product Requirement Document acceptance criteria into machine-verifiable completion checks. It converts human-readable requirements like "API returns 200 for valid requests" into executable shell commands with pass/fail assertions, producing YAML-formatted criteria ready for automated task verification.

## Installation

```bash
mkdir -p .claude/skills/prd-to-criteria
mkdir -p .claude/skills && cp -r prd-to-criteria .claude/skills/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/prd-to-criteria/SKILL.md` - PRD to verification criteria
```

## Usage

```bash
/prd-to-criteria path/to/prd.md
/prd-to-criteria path/to/prd.md --dry-run
/prd-to-criteria path/to/prd.md --format yaml
```

## What It Does

Given acceptance criteria like:
```markdown
- [ ] API returns 201 for successful registration
- [ ] Invalid email returns 400 with error message
- [ ] Tests cover edge cases
```

It generates:
```yaml
completion_criteria:
  required:
    - command: "curl -s -X POST localhost:8000/api/users ... | grep 201"
      description: "Valid registration returns 201"
    - command: "pytest tests/test_registration.py -v"
      description: "Registration tests pass"
```

## Criterion Types

| Criterion | Generated Check |
|-----------|-----------------|
| "API returns XXX" | `curl` command checking status code |
| "File exists" | File existence check |
| "Tests pass" | `pytest` or `npm test` command |
| "Performance < Xms" | Timing command with threshold |
| Subjective criteria | Flagged as manual verification required |

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
