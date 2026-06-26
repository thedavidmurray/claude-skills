# Autoreason

Structured reasoning skill for Claude Code. Apply disciplined decomposition, evidence gathering, and verification to complex decisions.

## Install

```bash
/plugin install autoreason@claude-skills
```

Or copy into a project:

```bash
cp -r skills/autoreason .claude/skills/
```

## Usage

Ask Claude to "run autoreason on this decision" or "deep reasoning about X".

## What it produces

A markdown report with:

- Scope statement
- 3–7 decomposed sub-problems
- Evidence and analysis per sub-problem
- Synthesized recommendation with confidence
- Falsification tests
