---
name: refactor-safely
description: Discipline for behavior-preserving refactoring under a test safety net. Verify coverage first, write characterization tests if absent, then apply small reversible steps that keep tests green, committing after each. Use when user says "refactor this without breaking it", "clean up this code", "restructure this module", "extract this into a function", "this code is a mess", or "rename this everywhere".
metadata:
  tags: [refactoring, quality, testing, discipline]
  tier: task-specific
  domain: product
when_to_apply: When restructuring existing code without changing what it does — enforce safety net first, then small green-to-green steps
---
# Refactor Safely

## Overview

Refactoring is changing structure without changing behavior. If behavior changed, it wasn't a refactor — it was an unreviewed feature or an unnoticed bug.

**Core principle:** Never refactor without a safety net. Never take a step you can't revert in seconds.

## The Iron Laws

```
1. A REFACTOR NEVER CHANGES OBSERVABLE BEHAVIOR
2. REFACTORING COMMITS NEVER MIX WITH FEATURE OR BUGFIX CHANGES
```

Found a bug mid-refactor? Note it, finish or revert the refactor, fix the bug in a separate commit with its own failing test (see test-driven-development). Want to improve behavior? That's a feature — do it before or after, never during.

## Phase 0 — Safety Net

**Do not touch the code until this phase is done.**

1. Identify every observable behavior of the code being changed: return values, side effects, errors thrown, output written, calls made.
2. Run the existing tests over that code. Check they actually exercise the paths you'll change (mutate a line, watch a test fail — if nothing fails, coverage is illusory).
3. **If coverage is missing, write characterization tests first.** Golden-master style: feed the code real inputs, capture what it *currently* does, assert exactly that.

```bash
# Golden-master pattern: capture current output as the spec
my-tool --input fixtures/case1.json > tests/golden/case1.expected
# Test asserts: output == case1.expected
```

**Capture current behavior even if it looks wrong.** A characterization test documents what *is*, not what *should be*. If the current behavior is a bug, it still must survive the refactor unchanged — file the bug separately. Changing it silently means nobody reviewed the change.

No way to build a safety net at all? Stop — see "When NOT to Use".

## Phase 1 — Plan Small Reversible Steps

Break the refactor into steps where **each step independently keeps all tests green**. Show the plan to the user before executing (Output Format below).

### Catalog of safe step types, in the order to apply them

| Order | Step | Why this order |
|-------|------|----------------|
| 1 | **Rename** (variable, function, class, file) | Cheapest, clarifies before restructuring; do it while the code is still familiar |
| 2 | **Extract variable** | Names intermediate values, exposes seams |
| 3 | **Extract function/method** | Carves units out of long bodies; needs good names from steps 1-2 |
| 4 | **Inline** (variable, function) | Removes indirection that earlier extraction revealed as useless |
| 5 | **Move** (function/class to another module) | Only after the unit has clean boundaries from steps 3-4 |
| 6 | **Change signature** (add/remove/reorder params) — update **all** call sites in the same step | Riskiest; do last, when structure is settled |

One step type per step. "Rename and move" is two steps.

## Phase 2 — Execute

For **each** step:

1. Make the single change.
2. Run the tests. Green required.
3. Commit immediately with a `refactor:` message (see commit-hygiene — these steps land naturally in the green zone, ≤150 lines).

```bash
npm test && git add -p && git commit -m "refactor(parser): extract validateHeader from parse"
```

**The revert rule:** if tests go red and you can't see why within a few minutes, `git checkout .` (or `git reset --hard HEAD`) and retry with a smaller step. Never debug forward on red during a refactor — the last commit is seconds away and known-good. Debugging forward is how refactors turn into rescues.

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "I'll just fix this bug while I'm here" | Now the diff contains a behavior change nobody can review. Note it, fix it in its own commit with its own test. |
| "Tests are too slow to run each step" | Run the focused subset per step, full suite per commit. If even that's too slow, fixing the loop *is* the prerequisite — see diagnose Phase 1. |
| "This is a trivial change" | Trivial renames break call sites, reflection, serialization, and string references. The test run takes 30 seconds. |
| "I'll commit when the whole refactor is done" | One giant red-zone commit, nothing revertable, review quality gone. Commit per green step. |
| "The current behavior is obviously a bug, I'll correct it" | Then it's a bugfix, not a refactor. Characterize what *is*; fix the bug in a separate, reviewed commit. |
| "I don't need characterization tests, I can see it's equivalent" | Eyeballing equivalence is how 'no functional changes' commits ship regressions. Mutate a line; if no test fails, you have no net. |
| "Reverting loses my work" | The last green commit is minutes old. Debugging forward on red loses more. |
| "I'll do the rename, move, and signature change in one go" | Three steps means a red test tells you nothing about which one broke it. One step type per step. |

## When NOT to Use

- **Greenfield code** — nothing to preserve; just write it well (with test-driven-development).
- **Intentional behavior changes** — that's a feature or bugfix; this skill's guarantees don't apply.
- **No possible safety net** — if the code's behavior can't be captured by any test, script, or golden master, refactoring it is gambling. Build a feedback loop first using the techniques in diagnose Phase 1, or explicitly get the user's sign-off on the risk.

## Verification Checklist

Before declaring the refactor complete:

- [ ] Safety net existed before the first edit (verified by watching a test fail on mutation)
- [ ] Every step committed separately, all tests green at every commit
- [ ] No commit mixes refactoring with behavior changes (`git log --oneline` reads as pure `refactor:`)
- [ ] Full test suite green at the end
- [ ] No characterization test was "fixed" to match new behavior
- [ ] Bugs discovered along the way are filed/noted, not silently fixed
- [ ] Dead code from inlining/moving removed

Can't check all boxes? Some step changed behavior. Find it before merging.

## Output Format

Present the plan before executing:

```
Refactor: split UserService.process into validate + persist

Safety net: 14 existing tests cover process(); added 2 characterization
tests for the malformed-date path (current behavior: silently coerces —
looks like a bug, filed as #214, preserved as-is).

Steps (each = green tests + one commit):
1. rename: processData → process            [rename]
2. extract: validation block → validateUser [extract function]
3. extract: db block → persistUser          [extract function]
4. move: validateUser → validators.ts       [move]
5. change signature: persistUser takes User, not raw dict
   (3 call sites updated in same step)      [change signature]

Proceeding step by step; will revert any step red for >5 minutes.
```

## Related Skills

- `test-driven-development` — for the new tests; bugs found mid-refactor get RED-GREEN-REFACTOR treatment separately
- `commit-hygiene` — per-step commit sizing and `refactor:` message format
- `diagnose` — feedback-loop construction when no test seam exists
- `code-review` — review the refactor series after completion
