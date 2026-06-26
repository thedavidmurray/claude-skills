---
name: systematic-debugging
description: Systematic debugging workflow for software defects. Reproduce → isolate → instrument → fix → verify. Use when the user says "debug this", "something is broken", "this isn't working", "investigate a bug", or when tests fail unexpectedly.
category: software-development
---
# Systematic Debugging

Root-cause debugging discipline. Stop guessing; start bisecting.

## When to Use

- Bug reported or observed
- Test failure with unclear cause
- Unexpected behavior in production or dev

## Process

1. **Reproduce** — get a deterministic, repeatable trigger. If you can't reproduce it, you can't fix it.
2. **Isolate** — narrow to the smallest failing case. Remove code until only the bug remains.
3. **Instrument** — add logging, breakpoints, or assertions at the boundary of the suspect area.
4. **Hypothesize** — list 2–3 possible causes with predictions that distinguish them.
5. **Test hypotheses** — change one thing at a time; verify each prediction.
6. **Fix** — implement the minimal change that addresses the root cause.
7. **Verify** — rerun the repro, run the full suite, confirm no regressions.

## Output Format

```markdown
## Debug Report

**Symptom:** <one sentence>
**Root cause:** <what was actually wrong>
**Fix:** <what changed>
**Verification:** <how you confirmed>
```

## Anti-patterns

- Don't fix symptoms without understanding cause
- Don't apply multiple changes at once
- Don't declare fixed without running the repro
