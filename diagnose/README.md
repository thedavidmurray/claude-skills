[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-Skill-blueviolet)](https://edgelesslab.com)

# claude-diagnose

A Claude Code skill that applies a disciplined, phased approach to debugging hard bugs and performance regressions. The skill guides through six phases: building a feedback loop, reproducing the bug, generating falsifiable hypotheses, targeted instrumentation, fixing with a regression test, and cleanup. It emphasizes that a fast, deterministic feedback loop is the core skill — everything else is mechanical.

## Installation

```bash
mkdir -p .claude/skills/diagnose
mkdir -p .claude/skills && cp -r diagnose .claude/skills/
```

Then reference it in your `CLAUDE.md`:

```markdown
## Skills
- `.claude/skills/diagnose/SKILL.md` - Disciplined debugging methodology
```

## Usage

The skill activates when you say "diagnose this", "debug this", report a bug, say something is broken or throwing, or describe a performance regression:

```
Diagnose this: the login endpoint returns 500 intermittently
Debug this: memory leak in the data pipeline
Something is broken: the queue processor stops after 100 jobs
```

## The Six Phases

1. **Build a feedback loop** — The most critical phase. Construct a fast, deterministic pass/fail signal for the bug.
2. **Reproduce** — Run the loop and confirm you see the exact failure the user described.
3. **Hypothesise** — Generate 3-5 ranked, falsifiable hypotheses before testing any of them.
4. **Instrument** — Map each probe to a specific hypothesis. Change one variable at a time.
5. **Fix + regression test** — Write the regression test before the fix when a correct seam exists.
6. **Cleanup + post-mortem** — Remove instrumentation, document the root cause, flag architectural issues.

## Links

- [edgelesslab.com](https://edgelesslab.com)

## License

MIT License. Copyright (c) 2026 Edgeless.
